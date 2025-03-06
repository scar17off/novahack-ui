'use client';
import styles from '../styles/page.module.css';

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