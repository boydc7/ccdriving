import Link from 'next/link';
import { Home, PhoneCall, GraduationCap, TrafficCone } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  const destinations = [
    {
      href: '/',
      icon: Home,
      title: 'Head Home',
      description: "Signal, check your mirrors, and pull a nice legal three-point turn back to the home page.",
    },
    {
      href: '/contact',
      icon: PhoneCall,
      title: 'Ask for Directions',
      description: "Call or email Gary. Unlike most drivers, we're perfectly happy to stop and ask.",
    },
    {
      href: '/enroll',
      icon: GraduationCap,
      title: 'Enroll Online',
      description: 'Reserve your seat in an upcoming class. Portland trip and parallel parking included.',
    },
  ];

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={`${styles.header} fade-in`}>
        <div className={styles.sign}>
          <span className={styles.signExit}>Exit</span>
          <span className={styles.signNumber}>404</span>
          <span className={styles.signLabel}>Page Not Found</span>
        </div>

        <h1 className={styles.title}>
          Looks like you <span className={styles.highlight}>missed your exit</span>.
        </h1>

        <p className={styles.subtitle}>
          We checked the mirrors, signaled, and looked over our shoulder &mdash; this page just
          isn&apos;t on any of our routes. Even our best students take a wrong turn on the way
          to Portland now and then.
        </p>
      </div>

      <div className={styles.roadDivider} aria-hidden="true" />

      <div className={styles.grid}>
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          return (
            <Link
              key={destination.href}
              href={destination.href}
              className={`card ${styles.destinationCard} fade-in`}
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <div className={styles.iconWrapper}>
                <Icon size={28} />
              </div>
              <h2 className={styles.destinationTitle}>{destination.title}</h2>
              <p className={styles.destinationText}>{destination.description}</p>
            </Link>
          );
        })}
      </div>

      <p className={styles.footnote}>
        <TrafficCone size={18} className={styles.footnoteIcon} />
        Good news: wrong turns aren&apos;t graded, and there&apos;s an instructor brake on our
        side of the car. Parallel parking, however, is still graded.
      </p>
    </div>
  );
}
