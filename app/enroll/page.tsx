'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { sendEnrollmentEmail } from '@/app/actions';
import styles from './enroll.module.css';

export default function EnrollPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEnrollmentEmail(formData);
    
    if (result.error) {
      setStatus('error');
      setMessage(result.error);
    } else {
      setStatus('success');
      setMessage('Enrollment submitted successfully! We will contact you soon with the next Orientation Class details.');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <h1 className="fade-in">Online Enrollment</h1>
        <p className={styles.subtitle}>Fill out the form below to register for an upcoming driver's education course.</p>
      </div>

      <div className={`card ${styles.formContainer} fade-in`}>
        {status === 'success' ? (
          <div className={styles.successState}>
            <CheckCircle2 size={64} className={styles.successIcon} />
            <h2>Registration Received!</h2>
            <p>{message}</p>
            <button className="btn btn-primary" onClick={() => setStatus('idle')}>
              Submit Another Enrollment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Student Information */}
              <div className={styles.formSection}>
                <h3>Student Information</h3>
                
                <div className="form-group">
                  <label htmlFor="studentName" className="form-label">Student's Full Legal Name *</label>
                  <input type="text" id="studentName" name="studentName" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dob" className="form-label">Date of Birth *</label>
                  <input type="date" id="dob" name="dob" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="highSchool" className="form-label">High School</label>
                  <input type="text" id="highSchool" name="highSchool" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="gradYear" className="form-label">Year of Graduation</label>
                  <input type="text" id="gradYear" name="gradYear" className="form-input" />
                </div>
              </div>

              {/* Contact Information */}
              <div className={styles.formSection}>
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label htmlFor="parentName" className="form-label">Parent/Guardian Name *</label>
                  <input type="text" id="parentName" name="parentName" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Mailing Address</label>
                  <input type="text" id="address" name="address" className="form-input" />
                </div>
                
                <div className={styles.row2}>
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" id="city" name="city" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip" className="form-label">Zip Code</label>
                    <input type="text" id="zip" name="zip" className="form-input" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Home Phone *</label>
                  <input type="tel" id="phone" name="phone" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cellPhone" className="form-label">Student Cell Phone</label>
                  <input type="tel" id="cellPhone" name="cellPhone" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Parent Email Address *</label>
                  <input type="email" id="email" name="email" className="form-input" required />
                </div>
              </div>

              {/* Course Selection */}
              <div className={`${styles.formSection} ${styles.fullWidth}`}>
                <h3>Course Selection</h3>
                
                <div className="form-group">
                  <label htmlFor="course" className="form-label">Which course are you interested in?</label>
                  <select id="course" name="course" className="form-select">
                    <option value="Next Available">Next Available Course</option>
                    <option value="Summer Morning">Summer (Morning Classes)</option>
                    <option value="School Year Evening">School Year (Evening Classes)</option>
                    <option value="Adult Lessons">Adult Private Lessons</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="comments" className="form-label">Comments or Questions</label>
                  <textarea id="comments" name="comments" className="form-textarea" style={{ minHeight: '80px' }}></textarea>
                </div>
              </div>
            </div>

            {status === 'error' && (
              <div className={styles.errorMessage}>{message}</div>
            )}

            <div className={styles.submitSection}>
              <p className={styles.disclaimer}>
                By submitting this form, you acknowledge that a $200 deposit will be required to hold your seat once course dates are confirmed.
              </p>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
