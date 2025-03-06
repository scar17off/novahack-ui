'use client';
import styles from '../page.module.css';

export default function Button({ children, onClick, fullWidth = false }) {
  return (
    <button 
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
} 