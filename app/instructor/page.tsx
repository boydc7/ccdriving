import Image from 'next/image';
import styles from './instructor.module.css';

export const metadata = {
  title: 'About the Instructor | Coastal Community Driving School',
  description: 'Learn about Gary Boyd, the experienced instructor behind Coastal Community Driving School.',
};

export default function InstructorPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Decorative Header */}
      <div className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.pageTitle}>About the Instructor</h1>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        <div className={styles.grid}>
          {/* Sidebar Area */}
          <aside className={`${styles.sidebar} fade-in`}>
            <div className={`card ${styles.profileCard}`}>
              <div className={styles.imageContainer}>
                <Image 
                  src="/hero.jpg"
                  alt="Gary Boyd"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.name}>Gary Boyd</h2>
                <h3 className={styles.title}>Lead Instructor & Owner</h3>
              </div>
            </div>

            <div className={`card ${styles.credentialsCard}`}>
              <h3 className={styles.credentialsTitle}>Credentials</h3>
              <ul className={styles.credentialsList}>
                <li>Over 25 years teaching Driver Education</li>
                <li>State of Maine Certified Instructor</li>
                <li>Member of Maine Driver Education Association (MEDEA)</li>
              </ul>
            </div>
            
            {/* Sidebar Photo */}
            <div className={`card ${styles.sidebarPhotoCard}`}>
              <div className={styles.sidebarPhoto}>
                <Image 
                  src="/family4.jpg" 
                  alt="Gary Boyd and his wife" 
                  fill 
                  style={{ objectFit: 'cover', objectPosition: 'top' }} 
                />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className={`${styles.bioSection} fade-in`} style={{ animationDelay: '0.1s' }}>
            <div className={`card ${styles.bioCard}`}>
              <h2>Background & Experience</h2>
              <div className={styles.textBlock}>
                <p>
                  Gary Boyd grew up in Northern Maine as a "County Boy", who came to join the Kittery School Department over 30 years ago. He retired from the school system to spend more time with his family and friends. Over the years, he served the school system in many ways, including Special, Regular, Cooperative, and Driver Education.
                </p>
                
                {/* Embedded Wide Photo */}
                <div className={styles.inlinePhotoWide}>
                  <Image 
                    src="/family2.jpg" 
                    alt="Gary Boyd with his family" 
                    fill 
                    style={{ objectFit: 'cover', objectPosition: 'center 25%' }} 
                  />
                </div>
                
                <p>
                  In addition, he was well known for being a seasonal historic tour guide driving the local trolley in York, ME for 13 years (1987-2000). As a way to continue helping others in retirement, Gary decided to offer year-round driving classes and instruction. His Driver Ed. Classes place emphasis on working closely with parents and providing quality experiences for his students.
                </p>
                
                {/* Embedded Split Photos */}
                <div className={styles.inlinePhotoSplit}>
                  <div className={styles.splitPhoto}>
                    <Image 
                      src="/family3.jpg" 
                      alt="Gary Boyd family portrait" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div className={styles.splitPhoto}>
                    <Image 
                      src="/family5.jpg" 
                      alt="Gary Boyd family at the harbor" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                </div>
              </div>

              <h2 className={styles.sectionDivider}>Family Life</h2>
              <div className={styles.familyBlock}>
                <div className={styles.familyText}>
                  <p>
                    Gary is married to Sherrill A. Taylor/Boyd, a RN school nurse at the Village Elementary School in York, ME. They have two daughters, Melissa and Heather. Besides enjoying family and friends, he likes spending time fishing, hunting, eating good food, and going to an occasional rodeo, play, or concert.
                  </p>
                </div>
                <div className={styles.familyImageContainer}>
                  <Image 
                    src="/family.jpg"
                    alt="Gary Boyd with his family"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
