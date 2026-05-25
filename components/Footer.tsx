import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerBrand}>
          <h3 className={styles.footerTitle}>Coastal Community Driving School</h3>
          <p className={styles.footerDesc}>
            Providing quality driver's education to the students of Southern Maine and adult learners.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Serving Southern York County:</strong><br />
            York, Kittery, Eliot, Berwick, Ogunquit, Portsmouth, Wells, Kennebunk, and surrounding areas.
          </p>
        </div>
        
        <div className={styles.footerLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/enroll">Enroll Online</Link></li>
            <li><Link href="/classes">Upcoming Classes</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerContact}>
          <h4>Contact Info</h4>
          <p><Link href="/contact" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Email Us!</Link></p>
          <p>Phone: <a href="tel:207-363-2042">207-363-2042</a></p>
          <p>7 Sunny Crest Road<br />York, ME 03909</p>
        </div>
      </div>
    </footer>
  );
}
