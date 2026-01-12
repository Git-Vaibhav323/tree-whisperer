import React from 'react';

const FloatingLeaves = () => {
  const leaves = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + i * 15}%`,
    delay: `${i * 2.5}s`,
    size: 12 + (i % 3) * 4,
    duration: `${12 + i * 2}s`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute opacity-20"
          style={{
            left: leaf.left,
            top: '-20px',
            animation: `leaf-drift ${leaf.duration} linear infinite`,
            animationDelay: leaf.delay,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary"
          >
            <path
              d="M12 2C6.5 2 2 6.5 2 12c0 3 1.5 5.5 4 7.5 0-3 1.5-5.5 4-7.5-2.5 2-4 4.5-4 7.5 2.5-2 5.5-3.5 9-4-3.5.5-6.5 2-9 4 3.5-.5 7-2.5 9-4C18.5 14 22 11 22 8c0-3.5-4.5-6-10-6z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
