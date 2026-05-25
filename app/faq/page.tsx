import styles from './faq.module.css';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'FAQ | Coastal Community Driving School',
  description: 'Frequently asked questions about driving courses in Southern Maine.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How does a course start?",
      answer: "Once 10-14 students have signed up at R.W. Traip or registered by phone or online. The instructor will contact them later by phone and/or with a mailing notifying them of the next beginning course Orientation Class."
    },
    {
      question: "When are classes held?",
      answer: "During the summer, classes are held 8:00am-11:00am and during the school year from 6 - 9pm. The days the classes are held are up to 2 -3 per week involving days M-Th. There will, from time to time, be exceptions depending on school vacations, etc. The instructor strives to avoid planning classes during school vacations so students can join their parents."
    },
    {
      question: "Why hold a beginning Orientation Class?",
      answer: "This serves many purposes. First, everyone involved in the course has a chance to meet one another in person. Secondly, required paperwork becomes completed making for a smoother transition throughout the course. Thirdly, the State of Maine Bureau of Motor Vehicles (BMV) requires parental involvement."
    },
    {
      question: "Where are the classes held?",
      answer: "The Orientation and Regular Classes are currently being held in classroom M-1 of R.W. Traip High School. Directions: Go through the main doors of R. W. Traip High School, proceed straight ahead past trophy case and rest rooms on right until you the reach the door to the stairwell, go upstairs, at the top bear left... M-1 is straight ahead."
    },
    {
      question: "As a student driver, will I be assigned to drive with another student?",
      answer: "This depends on the availability of driving times. When students do drive together, the instructor strives to match students with other compatible student drivers. Furthermore; at the beginning of the course, a student can make a request to be scheduled to drive with another Driver Ed. classmate. The instructor will make attempts to align their schedules."
    },
    {
      question: "Why do the Portland Trip?",
      answer: "This provides a uniqueness unlike any of the previous driving hours since it is usually scheduled during hours 8 & 9. By this time, students have been provided solid instruction involving the basics of driving. Of course, a logical choice for city driving would be Portsmouth, New Hampshire. However, the state of New Hampshire does not allow Maine Driver Ed. Students to drive within their borders. As a result, city driving in Portland provides an ideal climate for introducing student drivers to this kind of driving environment. Besides being Maine's largest city, Portland offers a new experience for students who may not have had the opportunity to visit the city firsthand. Parallel parking on a side street with real life situations offers another interesting facet. As well as, the 1/2 hour drive up and the 1/2 hour drive back for each student on the Maine Turnpike."
    },
    {
      question: "What is the breakdown of the times each driver drives when going on the Portland Trip?",
      answer: "We have 2 student drivers go on this trip. Driver #1 drives for the first 1/2 hour to the Kennebunk exit on Interstate 95. Driver #2 will drive the next hour with the 1/2 hour completing the trip to Portland and then 1/2 hour driving around the city. Driver #1 then drives for his/her 1/2 hour of city driving. At this point, everyone needs a break including the instructor. We all have lunch (students are previously reminded to bring money) at a fast foods restaurant for the next 1/2 hour. Near the end of this meal, the instructor will often review parallel parking using 3x5 cards on the table. Students each spend 1/2 hour practicing this maneuver on a selected low traveled side street beside parked cars."
    },
    {
      question: "How do I secure a spot in an upcoming class?",
      answer: "Simply, fill out an application online (specify class desired) and mail a copy of the online application along with a non-refundable $250 prepay to secure slot. Students are requested to pay the balance at the Orientation Class. The course full payment can also be forwarded before the Orientation Class."
    },
    {
      question: "Is there anyway I can secure my spot without paying the full fee by the first class?",
      answer: "Yes, but only with the instructor's approval and a written agreement explaining the conditions of payment. This would require a $250.00 deposit (non-refundable should you cancel later). A student must have paid the full fee before the last class or they will not be able to attend this class. However, students will be accepted on a first serve basis depending on who can pay the full amount at the beginning of the course."
    },
    {
      question: "Your brochure describes each class as between 10-14 students and the duration of the class as being 5-7 weeks. Why not have larger classes?",
      answer: "The idea is to offer a quality program. It is with smaller classes that an instructor can better individualize to meet each student's needs. Learning to drive safely is the most important skill a young person can learn. This takes time and patience in a well coordinated, sequential way. The instructor's philosophy is to build a solid foundation of basic skills aligned with working as close as possible with parents."
    },
    {
      question: "How long is it between your scheduled courses throughout the year and can I sign up ahead of time?",
      answer: "Ideally, the instructor would like to process a class of students every 6 weeks. Until this school becomes known, we will be subject to supply and demand. Yes, one can sign up ahead of time for the next class or future classes thereby reserving a spot. To reserve a future class slot, the application and deposit of at least $250.00 (non-refundable) will need to be received by us."
    },
    {
      question: "Can you describe the automobile Coastal Community Driving School provides?",
      answer: "We feature a 2011 Ford Fusion. The car is well maintained with regular maintenance checks - ie. oil changes, brakes, tires, etc. Some of the features include: Remote Keyless Entry System, Tilt Steering Column, Rear-Seat Ducts, Power Windows and Door Locks, 6-way Power Driver's Seat, Anti-Lock Braking System (ABS), Air Conditioning, Integrated Control Panel, AM/FM Stereo/Single CD Player, and Electronic Speed Control."
    },
    {
      question: "How is my driving time scheduled and where do I meet the instructor when I am scheduled?",
      answer: "Driving time is scheduled to meet individual preferences as much as possible. The instructor spends considerable time setting this up and provides an updated copy of schedules, should they change. The student normally meets the instructor at the R.W. Traip parking lot when scheduled to drive. At the end of the student's driving time, the student should have a pre-arranged ride home. Students having written permission from their parents may be released from their study halls providing school policy is followed."
    },
    {
      question: "When can I receive my driving permit?",
      answer: "Once the student has successfully completed the course requirements. Driving responsibly requires one to learn to be responsible. Classroom assignments are geared to cover basic Rules of the Road (law booklet), Responsible Driving Textbook material, and Rules and Effects of Alcohol."
    },
    {
      question: "Can a student living in New Hampshire take a Driver Ed. Class in Maine?",
      answer: "Yes, but the student must complete all of his driving time (10 hours) in the state of Maine. The reverse is true for Maine students."
    },
    {
      question: "Can I drive my parent's car with them while taking Driver Ed?",
      answer: "No. It is illegal to drive with your parent until you successfully complete the Driver Ed. Course and receive your Course Completion Certificate and permit to drive."
    },
    {
      question: "Can Maine Driver Ed. Students who receive their permits, drive in New Hampshire (or any other state)?",
      answer: "We are told by our own BMV (Bureau of Motor Vehicles) that parents should check with the BMV of each individual state. Our latest check with N.H. BMV (summer 2010), we were told Maine students who had a Maine permit could not drive in N.H. Secondly, we found out any student who was a resident of N.H. could take Dr. Ed. in Maine, but it would not be accepted as an approved Dr. Ed. program."
    },
    {
      question: "How long does a Maine Driver Ed. Student have to wait to be scheduled for a road test after he/she has met all the requirements?",
      answer: "It depends on the time of year, but basically during the winter it takes 3-4 weeks, and during the summer 4-6 weeks."
    }
  ];

  return (
    <div className="container" style={{ padding: '3rem 2rem 4rem 2rem' }}>
      <div className={styles.header}>
        <HelpCircle size={48} className={styles.headerIcon} />
        <h1 className="fade-in">Frequently Asked Questions</h1>
        <p className={styles.subtitle}>Everything you need to know about our driver's education courses.</p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={`card ${styles.faqCard} fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
            <h3 className={styles.question}>{faq.question}</h3>
            <p className={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
