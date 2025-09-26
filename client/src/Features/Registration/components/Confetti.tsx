// components/Confetti.tsx
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDuration: number;
  rotation: number;
  color: string;
  size: number;
}

const Confetti: React.FC = () => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ff8000', '#8000ff', '#ff0080', '#80ff00', '#0080ff', '#ff8080'
  ];

  useEffect(() => {
    // Create confetti pieces
    const pieces: ConfettiPiece[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 3,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 10
    }));

    setConfettiPieces(pieces);

    // Cleanup after animation
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: piece.size < 8 ? '50%' : '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${piece.animationDuration}s ease-in forwards`,
            top: '-20px',
            opacity: 0.8
          }}
        />
      ))}

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          animation-timing-function: ease-in;
        }
      `}</style>
    </div>
  );
};

export default Confetti;
