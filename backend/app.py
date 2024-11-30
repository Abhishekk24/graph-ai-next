from flask import Flask, request, jsonify, send_from_directory
import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sys
from io import StringIO
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["STATIC_FOLDER"] = "static/graphs"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs(app.config["STATIC_FOLDER"], exist_ok=True)

# Set your Groq API key
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "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")


class GraphAI:
    def __init__(self):
        self.data = None
        self.groq_chat = self.init_groq_client()

    def init_groq_client(self):
        """Initialize Groq client with LangChain integration."""
        model = "llama3-8b-8192"
        groq_chat = ChatGroq(groq_api_key=GROQ_API_KEY, model_name=model)
        return groq_chat

    def generate_plotting_code(self, instruction: str) -> str:
        """Generate Python code for a plot based on user instructions using Groq API."""
        memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history", return_messages=True)
        system_prompt = "You are a code generation assistant that generates only valid matplotlib code based on user instructions, with no additional text."
        
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(content=system_prompt),
                MessagesPlaceholder(variable_name="chat_history"),
                HumanMessagePromptTemplate.from_template("{human_input}")
            ]
        )
        
        conversation = LLMChain(llm=self.groq_chat, prompt=prompt, memory=memory, verbose=False)
        response = conversation.predict(human_input=instruction)
        return response.strip()

    def execute_plot_code(self, code: str):
        """Safely execute Python code to create a plot."""
        if not code:
            return "Error: Code is incomplete."

        exec_env = {
            "np": np,
            "plt": plt,
            "pd": pd,
            "data": self.data,
        }

        try:
            plt.close("all")  # Close any open figures
            fig = plt.figure()  # Create a new figure context

            exec(code, exec_env)  # Execute the plotting code
            graph_path = os.path.join(app.config["STATIC_FOLDER"], "graph.png")
            fig.savefig(graph_path)
            return graph_path
        except Exception as e:
            return str(e)

    def load_data(self, filepath):
        """Load dataset from uploaded file."""
        if filepath.endswith(".csv"):
            self.data = pd.read_csv(filepath)
        elif filepath.endswith(".xlsx"):
            self.data = pd.read_excel(filepath)
        else:
            raise ValueError("Unsupported file format.")


graph_ai = GraphAI()

@app.route("/upload", methods=["POST"])
def upload_file():
    """Endpoint to upload a file."""
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)
    try:
        graph_ai.load_data(filepath)
        return jsonify({"message": "File uploaded and data loaded successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate", methods=["POST"])
def generate_plot():
    """Endpoint to generate a plot based on user instructions."""
    data = request.json
    instruction = data.get("instruction")
    if not instruction:
        return jsonify({"error": "Instruction is required."}), 400
    try:
        code = graph_ai.generate_plotting_code(instruction)
        plot_path = graph_ai.execute_plot_code(code)
        return jsonify({"plot_path": plot_path, "code": code}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
