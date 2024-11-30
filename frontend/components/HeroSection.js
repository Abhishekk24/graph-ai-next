import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const scrollWheelAnimation = {
        animate: {
            y: [0, 10, 0],
        },
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    };

    return (
        <header style={styles.hero}>
            <motion.h1
                style={styles.title}
                variants={fadeInUp}
                transition={{ duration: 1 }}
            >
                <span style={styles.gradientText}>Graph_AI</span>
            </motion.h1>
            <motion.p
                style={styles.subtitle}
                variants={fadeInUp}
                transition={{ duration: 1.2 }}
            >
                AI-Powered Graph Generator & Analyzer
            </motion.p>
            <motion.div
                style={styles.scrollAnimation}
                variants={fadeInUp}
                transition={{ duration: 1.5 }}
            >
                <div style={styles.mouse}>
                    <motion.div
                        style={styles.wheel}
                        {...scrollWheelAnimation}
                    ></motion.div>
                </div>
                <p style={styles.scrollText}>Scroll to Explore</p>
            </motion.div>
        </header>
    );
};

const styles = {
    hero: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: "linear-gradient(to bottom, #000000, #343434)",
        color: "white",
    },
    title: {
        fontSize: "4rem",
        fontWeight: "700",
        letterSpacing: "-0.02em",
        marginBottom: "0.5rem",
    },
    gradientText: {
        background: "linear-gradient(90deg, #8B939A , #5B6467)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        fontSize: "1.8rem",
        fontWeight: "400",
        fontFamily: "'Source Code Pro', monospace",
        marginBottom: "2rem",
    },
    scrollAnimation: {
        textAlign: "center",
        marginTop: "1rem",
    },
    mouse: {
        width: "24px",
        height: "40px",
        border: "2px solid white",
        borderRadius: "20px",
        margin: "0 auto",
        position: "relative",
    },
    wheel: {
        width: "6px",
        height: "6px",
        backgroundColor: "white",
        borderRadius: "50%",
        position: "absolute",
        top: "8px",
        left: "50%",
        transform: "translateX(-50%)",
    },
    scrollText: {
        fontSize: "1rem",
        marginTop: "10px",
        color: "#ccc",
        fontFamily: "'Source Code Pro', monospace",
    },
};

export default HeroSection;
