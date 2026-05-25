'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, CarFront } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Classes', path: '/classes' },
    { name: 'Guidelines', path: '/guidelines' },
    { name: 'Instructor', path: '/instructor' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className="container">
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <div className={styles.logoIcon}>
              <CarFront size={28} />
            </div>
            <div className={styles.logoTextContainer}>
              <span className={styles.logoLine1}>Coastal Community</span>
              <span className={styles.logoLine2}>Driving School</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.navLinksGroup}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className={styles.rightActions}>
              <ThemeToggle />
              <Link href="/enroll" className={styles.enrollBtn}>
                Enroll
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileControls}>
            <Link href="/enroll" className={styles.enrollBtn} onClick={closeMenu}>
              Enroll
            </Link>
            <button 
              className={styles.menuBtn} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`${styles.mobileNavLink} ${pathname === link.path ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className={styles.mobileThemeToggle}>
            <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
