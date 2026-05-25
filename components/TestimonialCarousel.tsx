'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialCarousel.module.css';

const testimonials = [
  {
    text: "Good involvement with parents... Always felt I knew what was going on. Provided lots of different driving environments; town, highway, and city. Had good communication with kids. I really felt that Gary gave 120% to make the class work for everyone...",
    author: "Ken Hayes",
    role: "Parent",
    image: "/testimonials/andrewhayes.jpg",
    position: "50% 25%"
  },
  {
    text: "Mr. Boyd made Driver's Ed. fun. We played games that helped us learn at the same time. We joked with him and he could joke with us. When we drove, he would make it fun for us to ease the pressure! He is a fun teacher and friend!",
    author: "Alex Souther",
    role: "Student",
    image: "/testimonials/alexsouther.jpg",
    position: "50% 25%"
  },
  {
    text: "Having just moved to this area recently, we weren't sure of the requirements necessary to obtain a driver's license for our son. But with Mr. Boyd's expertise and knowledge as a Driver Education instructor, Kyle is on his way to becoming a safe, responsible driver.",
    author: "Heike L. Martin",
    role: "Parent",
    image: "/testimonials/kylemartin.jpg",
    position: "center"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.slidesWrapper}>
        {testimonials.map((testimonial, index) => {
          const isActive1 = index === currentIndex;
          const isActive2 = index === (currentIndex + 1) % testimonials.length;
          const isActive = isActive1 || isActive2;
          
          let order = 0;
          if (isActive1) order = 1;
          if (isActive2) order = 2;

          return (
            <div 
              key={index} 
              className={`${styles.slide} ${isActive ? styles.active : ''} ${isActive2 ? styles.active2 : ''}`}
              style={{ order }}
              aria-hidden={!isActive}
            >
              <div className={`card ${styles.card}`}>
              <div className={styles.imageContainer}>
                <Image 
                  src={testimonial.image} 
                  alt={`Photo for ${testimonial.author}`}
                  fill
                  style={{ objectFit: 'cover', objectPosition: testimonial.position }}
                  priority={index === 0}
                />
              </div>
              <div className={styles.cardContent}>
                <Quote className={styles.quoteIcon} size={32} />
                <p className={styles.text}>"{testimonial.text}"</p>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handlePrevious} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous testimonial">
        <ChevronLeft size={24} />
      </button>
      <button onClick={handleNext} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next testimonial">
        <ChevronRight size={24} />
      </button>

      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
