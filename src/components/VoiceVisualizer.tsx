import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let bars: number[] = [];
    const barCount = 64;
    
    // Initialize bars
    for (let i = 0; i < barCount; i++) {
      bars.push(Math.random() * 50);
    }
    
    const draw = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Update and draw bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        
        // Update bar height
        if (isActive) {
          const target = Math.random() * 50 + 10;
          bars[i] = bars[i] + (target - bars[i]) * 0.1;
        } else {
          bars[i] = Math.max(5, bars[i] * 0.95);
        }
        
        const barHeight = bars[i];
        
        // Draw bar
        ctx.beginPath();
        ctx.moveTo(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius
        );
        ctx.lineTo(
          Math.cos(angle) * (radius + barHeight),
          Math.sin(angle) * (radius + barHeight)
        );
        
        const gradient = ctx.createLinearGradient(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.cos(angle) * (radius + barHeight),
          Math.sin(angle) * (radius + barHeight)
        );
        
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      ctx.restore();
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isActive ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={200} 
      height={200} 
      className="w-full h-full"
    />
  );
};

export default VoiceVisualizer;