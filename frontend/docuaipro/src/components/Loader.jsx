"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Brain, Zap, CheckCircle } from "lucide-react";

const loadingStates = [
  { text: "Initializing AI Engine...", icon: Brain },
  { text: "Processing PDF Document...", icon: FileText },
  { text: "Analyzing Content...", icon: Zap },
  { text: "Ready to Chat!", icon: CheckCircle },
];

export default function DocuAILoader() {
  const [currentState, setCurrentState] = useState(0);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Generate particle positions AFTER hydration to avoid SSR mismatch
  useEffect(() => {
    setParticles(
      [...Array(8)].map(() => ({
        top: `${20 + Math.random() * 60}%`,
        left: `${20 + Math.random() * 60}%`,
      }))
    );
  }, []);

  useEffect(() => {
    const stateInterval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % loadingStates.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 80);

    return () => {
      clearInterval(stateInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentIcon = loadingStates[currentState].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="relative w-80 h-80 mx-auto">
          {/* Background Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbiting Documents */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-24px",
                marginLeft: "-24px",
              }}
              animate={{
                rotate: 360,
                x: Math.cos((i * 120 * Math.PI) / 180) * 100,
                y: Math.sin((i * 120 * Math.PI) / 180) * 100,
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                x: { duration: 8, repeat: Infinity, ease: "linear" },
                y: { duration: 8, repeat: Infinity, ease: "linear" },
              }}
            >
              <FileText className="w-6 h-6 text-slate-600" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                animate={{ x: [-48, 48, -48] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            </motion.div>
          ))}

          {/* Central AI Brain */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CurrentIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Neural Network Lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-blue-400 to-purple-400 origin-bottom"
              style={{
                height: "120px",
                transformOrigin: "bottom center",
                transform: `translate(-50%, -100%) rotate(${i * 60}deg)`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Floating Particles */}
          {particles.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={pos}
              animate={{
                y: [-10, -30, -10],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
