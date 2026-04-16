import { useState, useEffect } from 'react';
import styles from './scrollToTop.module.scss';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`${styles.scrollToTopBtn} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Повернутися наверх"
    >
      &#8593;
    </button>
  );
}
