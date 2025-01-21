"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

interface DecodeLoaderProps {
  message: string;
  duration?: number;
  delay?: number;
}

const DecodeLoader: React.FC<DecodeLoaderProps> = ({ 
  message, 
  duration = 3000, 
  delay = 2000
}) => {
  const [decodedMessage, setDecodedMessage] = useState('');

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const decoded = message.split('').map((char, index) => {
          if (progress > (index / message.length) * duration) {
            return char;
          } else {
            return characters[Math.floor(Math.random() * characters.length)];
          }
        }).join('');

        setDecodedMessage(decoded);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          startTime = 0;
          animationFrameId = requestAnimationFrame(animate);
        }, delay);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [message, duration, delay]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="text-4xl mb-8">
        {decodedMessage}
      </div>
      <motion.div
        className="w-64 h-1 bg-green-400 rounded"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </div>
  );
};

export default DecodeLoader;

