import React, { useState, useRef } from "react";

const Test: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const boxRect = boxRef.current.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      const offsetX = e.clientX - boxRect.left;
      const offsetY = e.clientY - boxRect.top;

      setIsDragging(true);
      setDragOffset({ x: offsetX, y: offsetY });

      // Prevent text selection during drag
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && containerRef.current && boxRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerLeft = containerRect.left;
      const containerTop = containerRect.top;
      const containerRight = containerRect.right;
      const containerBottom = containerRect.bottom;
      const boxWidth = boxRef.current.offsetWidth;
      const boxHeight = boxRef.current.offsetHeight;
      var newX = e.clientX - containerRect.left - dragOffset.x;
      var newY = e.clientY - containerRect.top - dragOffset.y;
      // Restrict movement within the container
      newX = Math.max(
        0,
        Math.min(newX, containerRight - containerLeft - boxWidth)
      );
      newY = Math.max(
        0,
        Math.min(newY, containerBottom - containerTop - boxHeight)
      );

      boxRef.current.style.left = `${newX}px`;
      boxRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 bg-black-700"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={boxRef}
        className="absolute w-16 h-16 bg-primary-900 cursor-move"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Test;
