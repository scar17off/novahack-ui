import styles from '../styles/page.module.css';

export default function ButtonRow({ children }) {
  // Count valid children to calculate width
  const childCount = Array.isArray(children) ? children.length : 1;
  
  return (
    <div className={styles.buttonRow}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div 
              key={index} 
              className={styles.buttonCell}
              style={{ width: `${100 / childCount}%` }}
            >
              {child}
            </div>
          ))
        : <div className={styles.buttonCell}>{children}</div>
      }
    </div>
  );
} 