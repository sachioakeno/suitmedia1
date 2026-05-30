import React, { useEffect, useRef } from 'react';
import './Banner.css';

export default function Banner() {
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (imgRef.current) {
            // Image moves slower than scroll (parallax)
            imgRef.current.style.transform = `translateY(${scrollY * 0.45}px)`;
          }
          if (textRef.current) {
            // Text moves at different speed for depth effect
            textRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
            textRef.current.style.opacity = Math.max(0, 1 - scrollY / 400);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="banner" aria-label="Ideas page banner">
      <div className="banner__img-wrap">
        <img
          ref={imgRef}
          className="banner__img"
          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80"
          alt="Ideas creative background"
          loading="eager"
        />
        <div className="banner__overlay" />
      </div>

      {/* Diagonal clip at bottom via SVG */}
      <div className="banner__clip">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,80 1440,0 1440,80" fill="var(--white)" />
        </svg>
      </div>

      <div ref={textRef} className="banner__text">
        <h1 className="banner__title">Ideas</h1>
        <p className="banner__sub">Where all our great things begin</p>
      </div>
    </section>
  );
}
