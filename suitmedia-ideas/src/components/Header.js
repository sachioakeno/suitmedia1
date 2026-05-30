import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './Header.css';

const NAV_LINKS = [
  { label: 'Work', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Ideas', href: '/', active: true },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#' },
];

export default function Header() {
  const { visible, scrolled } = useScrollDirection();

  return (
    <header className={`header ${visible ? 'header--visible' : 'header--hidden'} ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo" aria-label="Suitmedia">
          <svg width="130" height="32" viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="14" cy="16" rx="14" ry="14" fill="#FF6B00"/>
            <path d="M8 20C8 20 10 14 14 12C18 10 20 14 20 16C20 18 18 20 16 20C14 20 12 18 12 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <text x="32" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="15" fill="white" letterSpacing="0.5">suitmedia</text>
          </svg>
        </a>

        <nav className="header__nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`header__link ${link.active ? 'header__link--active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
