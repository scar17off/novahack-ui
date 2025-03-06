import styles from '../styles/page.module.css';

export default function Toggle({ checked, onChange, id }) {
  return (
    <div className={styles.toggle}>
      <input 
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span className={styles.toggleIndicator} />
      </label>
    </div>
  );
} 