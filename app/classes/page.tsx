import { Calendar, Clock, MapPin, Laptop, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './classes.module.css';

export const metadata = {
  title: 'Upcoming Classes | Coastal Community Driving School',
  description: 'View the schedule for upcoming driver\'s education courses in Southern Maine.',
};

import { fetchClasses } from '@/app/actions';

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default async function ClassesPage() {
  const classes = await fetchClasses();

  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <Calendar size={48} className={styles.headerIcon} />
        <h1 className="fade-in">Upcoming Classes</h1>
        <p className={styles.subtitle}>Find a course that fits your schedule and start your driving journey.</p>
      </div>

      {classes.length === 0 ? (
        <div className={`card ${styles.emptyState}`}>
          <h2>No classes currently scheduled</h2>
          <p>Please check back later or contact us for more information on upcoming schedules.</p>
        </div>
      ) : (
        <div className={styles.classesList}>
          {classes.map((course, index) => {
            const courseName = course.name || `${new Date(course.startDate).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })} Course`;
            
            return (
              <div 
                key={course.id} 
                className={`card ${styles.courseCard} fade-in ${course.isFull ? styles.fullCard : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.courseHeader}>
                  <div className={styles.courseTitleRow}>
                    <h2>{courseName}</h2>
                    {course.isFull ? (
                      <span className={`${styles.badge} ${styles.badgeFull}`}>
                        <AlertCircle size={16} /> Course Full
                      </span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeOpen}`}>
                        <CheckCircle2 size={16} /> Enrolling Now
                      </span>
                    )}
                  </div>
                  <div className={styles.courseDates}>
                    <Calendar size={18} />
                    <span>{formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
                  </div>
                </div>

                <div className={styles.courseBody}>
                  <div className={styles.detailsSection}>
                    <h3>Important Dates</h3>
                    <div className={styles.importantEvent}>
                      <strong>Orientation:</strong>
                      <span>{formatDate(course.orientation.date)} @ {course.orientation.time}</span>
                    </div>
                    <div className={styles.importantEvent}>
                      <strong>Final Test:</strong>
                      <span>{formatDate(course.finalTest.date)} @ {course.finalTest.time}</span>
                    </div>
                  </div>

                  <div className={styles.detailsSection}>
                    <h3>Instructional Schedule</h3>
                    <ul className={styles.scheduleList}>
                      {course.instructionalClasses.map((cls, idx) => (
                        <li key={idx} className={styles.scheduleItem}>
                          <div className={styles.scheduleDateTime}>
                            <Clock size={16} />
                            <span>{formatDate(cls.date)}, {cls.time}</span>
                          </div>
                          <div className={styles.scheduleType}>
                            {cls.type === 'virtual' ? (
                              <span className={styles.typeVirtual}><Laptop size={14} /> Virtual</span>
                            ) : (
                              <span className={styles.typeInPerson}><MapPin size={14} /> In-Person</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.courseFooter}>
                  {!course.isFull ? (
                    <Link href="/enroll" className="btn btn-primary">
                      Enroll in this Course
                    </Link>
                  ) : (
                    <Link href="/contact" className="btn btn-secondary">
                      Join Waitlist
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
