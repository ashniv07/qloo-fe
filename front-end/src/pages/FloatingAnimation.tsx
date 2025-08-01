import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, MessageCircle, FileText, Heart, Camera, Headphones, BookOpen } from 'lucide-react';

const FloatingAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState<'floating' | 'merging' | 'diary' | 'reset'>('floating');
  const [showDiary, setShowDiary] = useState(false);

  const icons = [
    { Icon: Music, color: '#1DB954', name: 'spotify' },
    { Icon: Play, color: '#FF0000', name: 'youtube' },
    { Icon: MessageCircle, color: '#00D4FF', name: 'chat' },
    { Icon: FileText, color: '#FFB800', name: 'notes' },
    { Icon: Heart, color: '#E91E63', name: 'heart' },
    { Icon: Camera, color: '#8E24AA', name: 'camera' },
    { Icon: Headphones, color: '#FF5722', name: 'music' },
  ];

  useEffect(() => {
    const animationCycle = async () => {
      setAnimationPhase('floating');
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationPhase('merging');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationPhase('diary');
      setShowDiary(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      setAnimationPhase('reset');
      setShowDiary(false);
      await new Promise(resolve => setTimeout(resolve, 500));
    };

    const runCycle = () => {
      animationCycle().then(() => {
        setTimeout(runCycle, 500);
      });
    };

    runCycle();
  }, []);

  const getFloatingPosition = (index: number) => {
    const angle = (index * 360) / icons.length;
    const radius = 180; // Increased spread
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const getMergingPosition = () => ({ x: 0, y: 0 });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: animationPhase === 'diary'
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(216, 180, 254, 0.05) 40%, transparent 70%)'
            : 'transparent'
        }}
        transition={{ duration: 1 }}
      />

      <AnimatePresence>
        {!showDiary && icons.map((item, index) => {
          const { Icon, color, name } = item;
          const floatingPos = getFloatingPosition(index);
          const mergingPos = getMergingPosition();

          return (
            <motion.div
              key={name}
              className="absolute"
              initial={{
                x: floatingPos.x,
                y: floatingPos.y,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: animationPhase === 'floating' ? floatingPos.x : mergingPos.x,
                y: animationPhase === 'floating' ? floatingPos.y : mergingPos.y,
                scale: animationPhase === 'reset' ? 0 : 1,
                rotate: animationPhase === 'floating' ? [0, 360] : 0,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{
                x: { duration: animationPhase === 'merging' ? 1.5 : 0.5, ease: "easeInOut" },
                y: { duration: animationPhase === 'merging' ? 1.5 : 0.5, ease: "easeInOut" },
                scale: { duration: 0.5, ease: "backOut" },
                rotate: {
                  duration: animationPhase === 'floating' ? 8 : 0.5,
                  repeat: animationPhase === 'floating' ? Infinity : 0,
                  ease: "linear"
                }
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: animationPhase === 'floating' ? [0, -10, 0] : 0,
                }}
                transition={{
                  y: {
                    duration: 2 + index * 0.2,
                    repeat: animationPhase === 'floating' ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full blur-md opacity-60"
                  style={{ backgroundColor: color }}
                  animate={{
                    scale: animationPhase === 'floating' ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: animationPhase === 'floating' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/30"
                  style={{ backgroundColor: `${color}20` }}
                  animate={{
                    boxShadow: animationPhase === 'floating'
                      ? [`0 4px 25px ${color}40`, `0 8px 35px ${color}60`, `0 4px 25px ${color}40`]
                      : `0 4px 25px ${color}40`
                  }}
                  transition={{
                    duration: 2,
                    repeat: animationPhase === 'floating' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {showDiary && (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotateY: -90, opacity: 0 }}
            animate={{
              scale: 1.2,
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              rotateY: 90,
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{
              duration: 0.8,
              ease: "backOut",
              delay: 0.2
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg blur-xl opacity-60"
                style={{
                  background: 'linear-gradient(45deg, #ec4899, #f472b6, #f9a8d4)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="relative w-32 h-40 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow-2xl border-2 border-pink-300"
                animate={{
                  rotateY: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-pink-400 to-pink-600 rounded-l-xl" />
                <div className="absolute right-1 top-2 bottom-2 w-0.5 bg-pink-300 opacity-60" />
                <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-pink-300 opacity-40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-pink-700" />
                </div>

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full"
                    style={{
                      top: `${20 + (i % 3) * 30}%`,
                      left: `${-10 + (i % 2) * 120}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -20, -40],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  className="text-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🌸
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {animationPhase === 'merging' && (
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(216, 180, 254, 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

export default FloatingAnimation;
