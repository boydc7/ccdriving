'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Car } from 'lucide-react';
import { sendContactEmail } from '@/app/actions';
import styles from './contact.module.css';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);
    
    if (result.error) {
      setStatus('error');
      setMessage(result.error);
    } else {
      setStatus('success');
      setMessage('Thank you! Your message has been sent successfully.');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <h1 className="fade-in">Contact Us</h1>
        <p className={styles.subtitle}>Have questions? We're here to help.</p>
      </div>

      <div className={styles.contactContainer}>
        {/* Contact Info */}
        <div className={`card ${styles.infoCard} fade-in`}>
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Please fill out the form or reach out using the contact details below.</p>
          
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Mail size={24} /></div>
              <div>
                <strong>Email</strong>
                <p>info@ccdrivingschool.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Phone size={24} /></div>
              <div>
                <strong>Phone</strong>
                <p><a href="tel:207-363-2042" style={{ color: 'inherit', textDecoration: 'none' }}>207-363-2042</a></p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><MapPin size={24} /></div>
              <div>
                <strong>Location</strong>
                <p>7 Sunny Crest Road<br />York, ME 03909</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Car size={24} /></div>
              <div>
                <strong>Service Areas</strong>
                <p>Serving Southern York County and surrounding areas (York, Kittery, Eliot, Berwick, Ogunquit, Portsmouth, Wells, Kennebunk, and surrounding areas).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={`card ${styles.formCard} fade-in`} style={{ animationDelay: '0.2s' }}>
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" name="name" className="form-input" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" name="email" className="form-input" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
              <input type="tel" id="phone" name="phone" className="form-input" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-textarea" required></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <div className={styles.successMessage}>{message}</div>
            )}
            {status === 'error' && (
              <div className={styles.errorMessage}>{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
