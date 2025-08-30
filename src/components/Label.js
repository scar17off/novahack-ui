import styles from '../App.module.css';

export default function Label({ children }) {
  return (
    <div className={styles.label}>
      {children}
    </div>
  );
} 