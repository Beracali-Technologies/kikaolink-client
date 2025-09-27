export const BOUNCING_TICK_STYLES = `

@keyframes glow-spread {
  0% {
    transform: scale(0.3);
    opacity: 0.4;
    box-shadow: 0 0 20px 10px currentColor;
  }
  50% {
    transform: scale(0.8);
    opacity: 0.2;
    box-shadow: 0 0 40px 20px currentColor;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
    box-shadow: 0 0 60px 30px currentColor;
  }
}

@keyframes glow-spread-slow {
  0% {
    transform: scale(0.2);
    opacity: 0.3;
  }
  70% {
    transform: scale(0.9);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.animate-glow-spread {
  animation: glow-spread 3s ease-out infinite;
}

.animate-glow-spread-slow {
  animation: glow-spread-slow 4s ease-out infinite;
  animation-delay: 0.5s;
}
`;
