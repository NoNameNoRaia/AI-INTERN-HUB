'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let animationFrameId;
        let targetX = -100;
        let targetY = -100;
        let currentX = -100;
        let currentY = -100;

        const handleMouseMove = (e) => {
            setIsVisible(true);
            targetX = e.clientX;
            targetY = e.clientY;
            
            // If it's the first move, snap immediately to avoid sliding in from top left
            if (currentX === -100) {
                currentX = targetX;
                currentY = targetY;
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const updateCursor = () => {
            // Smooth easing math
            currentX += (targetX - currentX) * 0.25;
            currentY += (targetY - currentY) * 0.25;
            
            setPosition({ x: currentX, y: currentY });
            animationFrameId = requestAnimationFrame(updateCursor);
        };

        const handleMouseOver = (e) => {
            const isClickable = 
                e.target.tagName.toLowerCase() === 'a' || 
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') || 
                e.target.closest('button') ||
                window.getComputedStyle(e.target).cursor === 'pointer';
                
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseover', handleMouseOver);
        updateCursor();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className={`custom-cursor-blend ${isHovering ? 'hover' : ''}`} 
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        ></div>
    );
}
