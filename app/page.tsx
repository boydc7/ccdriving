import Link from 'next/link';
import Image from 'next/image';
import { Award, Car, GraduationCap, CalendarClock } from 'lucide-react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={`${styles.heroContent} fade-in`}>
            <h1 className={styles.heroTitle}>
              Learn to Drive with <span className={styles.highlight}>Confidence</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Coastal Community Driving School provides top-tier driver's education 
              for teens and adults in Southern Maine, York, and surrounding areas.
            </p>
            <div className={styles.heroActions}>
              <Link href="/enroll" className="btn btn-primary">
                Enroll Online Now
              </Link>
              <Link href="/classes" className="btn btn-secondary">
                View Upcoming Classes
              </Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.blob}></div>
            <div className={styles.photoGrid}>
              <div className={`${styles.photoWrapper} ${styles.photo1}`}>
                <Image 
                  src="/hero.jpg"
                  alt="Gary Boyd with Coastal Community student driver car"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className={`${styles.photoWrapper} ${styles.photo2}`}>
                <Image 
                  src="/hero2.jpg"
                  alt="Gary Boyd next to the student driver car"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                  priority
                />
              </div>
              <div className={`${styles.photoWrapper} ${styles.photo3}`}>
                <Image 
                  src="/hero3.jpg"
                  alt="Gary Boyd student driver car back"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                  priority
                />
              </div>
              <div className={`${styles.photoWrapper} ${styles.photo4}`}>
                <Image 
                  src="/hero4.jpg"
                  alt="Gary Boyd new photo"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                  priority
                />
              </div>
              <div className={`${styles.photoWrapper} ${styles.photo5}`}>
                <Image 
                  src="/hero5.jpg"
                  alt="Gary Boyd new photo 2"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose Coastal Community?</h2>
            <p>We focus on defensive driving, safety, and ensuring every student is fully prepared for the road.</p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <Award size={32} />
              </div>
              <div className={styles.featureCardContent}>
                <h3>Safe & Certified</h3>
                <p>State-approved curriculum and certified driving school.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <Car size={32} />
              </div>
              <div className={styles.featureCardContent}>
                <h3>Comprehensive Curriculum</h3>
                <p>Covering all state requirements, rules of the road, and crucial defensive driving techniques.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <GraduationCap size={32} />
              </div>
              <div className={styles.featureCardContent}>
                <h3>Experienced Instructors</h3>
                <p>Learn from Gary Boyd, an instructor with years of experience and a passion for teaching safe driving.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <CalendarClock size={32} />
              </div>
              <div className={styles.featureCardContent}>
                <h3>Flexible Scheduling</h3>
                <p>Classes available during the summer (mornings) and school year (evenings) to fit your busy life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Students Say</h2>
            <p>Hear from successful students and their families.</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2>Ready to get behind the wheel?</h2>
          <p>Join the hundreds of successful students who learned to drive with us.</p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
