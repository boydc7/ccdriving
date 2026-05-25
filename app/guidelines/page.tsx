import { BookOpenCheck, AlertCircle } from 'lucide-react';
import styles from './guidelines.module.css';

export const metadata = {
  title: 'Course Guidelines | Coastal Community Driving School',
  description: 'Important course guidelines, requirements, and policies for students and parents at Coastal Community Driving School.',
};

export default function GuidelinesPage() {
  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <BookOpenCheck size={48} className={styles.headerIcon} />
        <h1 className="fade-in">Guidelines For The Course</h1>
        <p className={styles.subtitle}>
          Our goal is to help you become a safe, responsible driver. We have listed some guidelines to answer commonly asked questions and provide the information you need.
        </p>
      </div>

      <div className={`card fade-in ${styles.contentCard}`}>
        <div className={styles.introAlert}>
          <AlertCircle size={24} className={styles.alertIcon} />
          <p>
            <strong>Certification:</strong> Our school is certified by the Secretary of State. State laws mandate that you must attend all classes and finish all driving times before a Course Completion Certificate will be issued.
          </p>
        </div>

        <section className={styles.section}>
          <h2>Selection of Students</h2>
          <ul>
            <li>Students must have reached their 15th birthday before the first day of class.</li>
            <li>Selection will be on a first-come, first-serve basis.</li>
            <li>The number of students selected will not be more than 14 per class.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Classroom Instruction</h2>
          <ul>
            <li>Each student is to receive a minimum of 30 classroom hours.</li>
            <li><strong>Orientation Class:</strong> Besides regular classes, there is an Orientation Class requiring at least one parent to attend with the student. This is scheduled during an evening (6:00 PM to 8:00 PM) prior to the first regular class. You will be notified of this time by phone or mail. Driving schedules and classroom hours will be reviewed during this session.</li>
            <li>The final test will be administered during the last class.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Absenteeism</h2>
          <ul>
            <li>Simply put, students cannot miss a class.</li>
            <li>If an absence occurs, state regulations require that the student make up the missed class within two months of the original course.</li>
            <li>There will be an <strong>additional fee</strong> for making up missed class(es).</li>
            <li>Students missing classes will not receive their Course Completion Certificates until all requirements are met.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Driving Hours</h2>
          <ul>
            <li>Once driving schedules are determined, students are responsible for being on time.</li>
            <li>Every effort will be made to provide written, updated schedules to prevent miscommunication.</li>
            <li>Students can drive during study halls provided their parents sign a release form and provide a note on the day the student is to drive.</li>
            <li>Driving partners may be assigned based on each student's available schedule.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Evaluation</h2>
          <ul>
            <li>Students must maintain at least a <strong>70% grade</strong> on classroom work.</li>
            <li>Students must score an <strong>80% grade</strong> on the final exam.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Parents Ride Along</h2>
          <p className={styles.textBlock}>
            Parents have the option to ride in the Driver Ed car. This helps the parent see firsthand how the instructor teaches the concepts of safe driving. It also gives parents ideas on how to interact (i.e., understanding the "ground rules") with their student driver once the driving permit is issued, making for a smoother transition.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The Portland Trip</h2>
          <p className={styles.textBlock}>
            This trip is designed to give students an opportunity to experience driving in Maine's largest city. It is scheduled with another driver so they can share the experience. Emphasis is placed on city and expressway driving, as well as parallel parking. The trip includes eating lunch at a fast-food restaurant at the mid-way point. This trip is usually scheduled during driving hours 8 and 9 and lasts for 4½ hours.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Enrollment Cost & Refunds</h2>
          <ul>
            <li>The cost for Driver Education is subject to change; please call for current rates.</li>
            <li>Full payment is due on Orientation Class night.</li>
            <li>There will be <strong>no refunds</strong> after attendance to the first class.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Additional Driving Instruction</h2>
          <p className={styles.textBlock}>
            This is designed for any community members who wish to "upgrade" their driving skills. The rate is $70.00 / hour.
          </p>
        </section>
        
        <div className={styles.acknowledgment}>
          <p><strong>Regulated by:</strong> Secretary of State, BMV - Driver Education Program, 207-624-9000 ext. 52128</p>
        </div>
      </div>
    </div>
  );
}
