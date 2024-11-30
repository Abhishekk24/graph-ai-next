import React from "react";
import { motion } from "framer-motion";
import FileUploader from "./FileUploader";
import GraphDisplay from "./GraphDisplay";
import HeroSection from "./HeroSection"; // Import HeroSection

const GraphAI = () => {
    const handleUploadSuccess = () => {
        alert("File uploaded successfully. Ready for analysis.");
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    return (
        <motion.div
            style={styles.container}
            initial="hidden"
            animate="visible"
            variants={container}
        >
            {/* Hero Section */}
            <HeroSection />

            {/* File Uploader Section */}
            <section style={styles.section}>
                <motion.h2
                    style={styles.sectionTitle}
                    variants={fadeInUp}
                    transition={{ duration: 1 }}
                >
                    Get Started
                </motion.h2>
                <motion.p
                    style={styles.sectionDescription}
                    variants={fadeInUp}
                    transition={{ duration: 1.2 }}
                >
                    Upload your dataset and let AI visualize your data with stunning insights.
                </motion.p>
                <motion.div variants={fadeInUp} transition={{ duration: 1.5 }}>
                    <FileUploader onUploadSuccess={handleUploadSuccess} />
                </motion.div>
            </section>

            {/* Graph Display Section */}
            <section style={styles.section}>
                <motion.h2
                    style={styles.sectionTitle}
                    variants={fadeInUp}
                    transition={{ duration: 1 }}
                >
                    Your Visualizations
                </motion.h2>
                <motion.p
                    style={styles.sectionDescription}
                    variants={fadeInUp}
                    transition={{ duration: 1.2 }}
                >
                    Access and interact with your saved graphs below.
                </motion.p>
                <motion.div variants={fadeInUp} transition={{ duration: 1.5 }}>
                    <GraphDisplay />
                </motion.div>
            </section>
        </motion.div>
    );
};

const styles = {
    container: {
        fontFamily: "'SF Pro Display', 'Inter', sans-serif",
        backgroundColor: "#f5f5f7",
        color: "#333",
        lineHeight: "1.6",
    },
    section: {
        padding: "40px 20px",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "2rem",
        fontWeight: "600",
        marginBottom: "1rem",
    },
    sectionDescription: {
        fontSize: "1rem",
        fontWeight: "400",
        color: "#555",
        marginBottom: "2rem",
        fontFamily: "'Source Code Pro', monospace",
    },
};

export default GraphAI;
