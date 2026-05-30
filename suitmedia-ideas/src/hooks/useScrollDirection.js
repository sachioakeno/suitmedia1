import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const threshold = 10;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);

      if (Math.abs(currentY - lastY.current) < threshold) return;

      if (currentY > lastY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { visible, scrolled };
}
