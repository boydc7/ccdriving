'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { sendEnrollmentEmail, fetchClasses } from '@/app/actions';
import styles from './enroll.module.css';

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

function formatPhoneNumber(value: string) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

function formatDate(dateString: string) {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
  // Add timezone offset to prevent day shift
  const dateObj = new Date(dateString + 'T12:00:00');
  return dateObj.toLocaleDateString('en-US', options);
}

export default function EnrollPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const [phone, setPhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchClasses()
      .then(data => {
        setCourses(data);
        setIsLoaded(true);
      })
      .catch(err => {
        console.error("Failed to load courses:", err);
        setIsLoaded(true);
      });
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    setter(formatPhoneNumber(e.target.value));
  };

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
      setPhone('');
      setCellPhone('');
      setHasSubmitted(false);
    }
  };

  const openCourses = courses.filter(c => !c.isFull);

  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <h1 className="fade-in">Online Enrollment</h1>
        <p className={styles.subtitle}>Fill out the form below to register for an upcoming driver's education course.</p>
      </div>

      <div className={`fade-in`} style={{ maxWidth: '900px', margin: '0 auto 2rem auto', padding: '1.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <strong>Important:</strong> Classes are filled on a first come, first serve basis only after we receive your application or a mailed copy of the application along with a <strong>$250 non-refundable registration fee</strong>.
        </p>
        <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '6px', border: '1px solid var(--border)', display: 'inline-block' }}>
          <p style={{ margin: 0, fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Checks should be mailed to:</p>
          <address style={{ fontStyle: 'normal', lineHeight: '1.5' }}>
            <strong>CCDS</strong><br />
            7 Sunny Crest Road<br />
            York, ME 03909
          </address>
        </div>
      </div>

      {isLoaded && openCourses.length === 0 && (
        <div style={{ maxWidth: '900px', margin: '0 auto 2rem auto', padding: '1rem', backgroundColor: '#fff7ed', borderLeft: '4px solid #ea580c', color: '#9a3412', borderRadius: '4px' }} className="fade-in">
          <strong>Notice:</strong> There are no scheduled courses currently open for enrollment. Only Private Lessons are currently available.
        </div>
      )}

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
          <form onSubmit={handleSubmit} className={hasSubmitted ? styles.wasValidated : ''}>
            <div className={styles.formGrid}>
              {/* Student Information */}
              <div className={styles.formSection}>
                <h3>Student Information</h3>
                
                <div className="form-group">
                  <label htmlFor="studentName" className="form-label">Student's Full Legal Name <span style={{color: 'red'}}>*</span></label>
                  <input type="text" id="studentName" name="studentName" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dob" className="form-label">Date of Birth <span style={{color: 'red'}}>*</span></label>
                  <input type="date" id="dob" name="dob" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="highSchool" className="form-label">High School <span style={{color: 'red'}}>*</span></label>
                  <input type="text" id="highSchool" name="highSchool" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="gradYear" className="form-label">Year of Graduation <span style={{color: 'red'}}>*</span></label>
                  <input type="text" id="gradYear" name="gradYear" className="form-input" pattern="19[5-9]\d|20\d{2}|2100" title="Please enter a valid 4-digit year between 1950 and 2100" maxLength={4} required />
                </div>

                <div className="form-group">
                  <label htmlFor="presentClass" className="form-label">Present Class <span style={{color: 'red'}}>*</span></label>
                  <select id="presentClass" name="presentClass" className="form-select" required>
                    <option value="">Select Class</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="eyewear" className="form-label">Corrective Eyewear <span style={{color: 'red'}}>*</span></label>
                  <select id="eyewear" name="eyewear" className="form-select" defaultValue="None" required>
                    <option value="Glasses">Glasses</option>
                    <option value="Contacts">Contacts</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="medical" className="form-label">Medical conditions requiring medication</label>
                  <textarea id="medical" name="medical" className="form-textarea" style={{ minHeight: '60px' }}></textarea>
                </div>
              </div>

              {/* Contact Information */}
              <div className={styles.formSection}>
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label htmlFor="parentName" className="form-label">Parent/Guardian Name <span style={{color: 'red'}}>*</span></label>
                  <input type="text" id="parentName" name="parentName" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Mailing Address <span style={{color: 'red'}}>*</span></label>
                  <input type="text" id="address" name="address" className="form-input" required />
                </div>
                
                <div className={styles.row2} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="city" name="city" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state" className="form-label">State <span style={{color: 'red'}}>*</span></label>
                    <select id="state" name="state" className="form-select" defaultValue="ME" required>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip" className="form-label">Zip Code <span style={{color: 'red'}}>*</span></label>
                    <input type="text" id="zip" name="zip" className="form-input" pattern="[0-9]{5}" title="Please enter a 5-digit zip code" minLength={5} maxLength={5} required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone <span style={{color: 'red'}}>*</span></label>
                  <input type="tel" id="phone" name="phone" className="form-input" value={phone} onChange={(e) => handlePhoneChange(e, setPhone)} placeholder="(123) 456-7890" pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}" minLength={14} maxLength={14} title="Must be a valid 10-digit phone number" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cellPhone" className="form-label">Student Cell Phone</label>
                  <input type="tel" id="cellPhone" name="cellPhone" className="form-input" value={cellPhone} onChange={(e) => handlePhoneChange(e, setCellPhone)} placeholder="(123) 456-7890" pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}" title="Must be a valid 10-digit phone number" maxLength={14} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Parent Email Address <span style={{color: 'red'}}>*</span></label>
                  <input type="email" id="email" name="email" className="form-input" pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" title="Please provide a valid email address" required />
                </div>

                <div className="form-group">
                  <label htmlFor="studentEmail" className="form-label">Student Email Address</label>
                  <input type="email" id="studentEmail" name="studentEmail" className="form-input" pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" title="Please provide a valid email address" />
                </div>
              </div>

              {/* Course Selection & Additional Info */}
              <div className={`${styles.formSection} ${styles.fullWidth}`}>
                <h3>Course Selection & Additional Info</h3>
                
                <div className="form-group">
                  <label htmlFor="course" className="form-label">Which course are you interested in? <span style={{color: 'red'}}>*</span></label>
                  <select id="course" name="course" className="form-select" required>
                    <option value="">Select a course</option>
                    {openCourses.map((course, idx) => (
                      <option key={idx} value={`${course.name} (${formatDate(course.startDate)} - ${formatDate(course.endDate)})`}>
                        {course.name} ({formatDate(course.startDate)} - {formatDate(course.endDate)})
                      </option>
                    ))}
                    <option value="Private Lessons">Private Lessons</option>
                  </select>
                </div>

                <div className={styles.row2} style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="form-group">
                    <label htmlFor="schedulingContact" className="form-label">Contact for scheduling & best time to call</label>
                    <textarea id="schedulingContact" name="schedulingContact" className="form-textarea" placeholder="e.g., Mother after 5pm weekdays" style={{ minHeight: '80px' }}></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="studentAvailability" className="form-label">Student availability (days and times)</label>
                    <textarea id="studentAvailability" name="studentAvailability" className="form-textarea" placeholder="e.g., Mon/Wed after 3pm" style={{ minHeight: '80px' }}></textarea>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="hearAbout" className="form-label">How did you hear about us?</label>
                  <select id="hearAbout" name="hearAbout" className="form-select">
                    <option value="">Select option</option>
                    <option value="Friend">Friend</option>
                    <option value="Newspaper">Newspaper</option>
                    <option value="Website">Website</option>
                    <option value="Brochure">Brochure</option>
                    <option value="Search Engine">Search Engine</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalInfo" className="form-label">Additional information or notes</label>
                  <textarea id="additionalInfo" name="additionalInfo" className="form-textarea" style={{ minHeight: '80px' }}></textarea>
                </div>
              </div>
            </div>

            {status === 'error' && (
              <div className={styles.errorMessage}>{message}</div>
            )}

            <div className={styles.submitSection}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={status === 'loading'}
                onClick={() => setHasSubmitted(true)}
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
