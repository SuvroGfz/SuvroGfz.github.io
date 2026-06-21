import { useRef, useState, useCallback, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

interface AntigravityCardProps {
  /** CSS animation duration e.g. "5s", "6.5s" */
  floatDuration?: string;
  /** CSS animation delay e.g. "0s", "0.8s" */
  floatDelay?: string;
  children: ReactNode;
  className?: string;
  /** Index for staggered entrance animation */
  index?: number;
}

/**
 * Wraps children in an antigravity floating card with:
 * - CSS levitation animation (translateY + subtle rotateX/Y)
 * - Dynamic shadow that grows when card is "higher"
 * - 3D mouse-tracking tilt on hover (±15°)
 * - Glow border on hover
 */
export default function AntigravityCard({
  floatDuration = "6s",
  floatDelay = "0s",
  children,
  className = "",
  index = 0,
}: AntigravityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((centerY - y) / centerY) * 15;
      setTilt({ rotateX, rotateY });
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "800px",
        animation: isHovered
          ? "none"
          : `ag-float ${floatDuration} ease-in-out ${floatDelay} infinite, ag-shadow ${floatDuration} ease-in-out ${floatDelay} infinite`,
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease",
        boxShadow: isHovered
          ? "0 0 20px hsl(var(--primary) / 0.3), 0 20px 50px rgba(0,0,0,0.18)"
          : undefined,
        willChange: "transform, box-shadow",
      }}
    >
      {children}
    </motion.div>
  );
}
