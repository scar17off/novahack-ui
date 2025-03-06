import styles from '../styles/page.module.css';

export default function Slider({ 
  value, 
  onChange, 
  min, 
  max, 
  unit = '',
  valueToPercent = (v) => ((v - min) / (max - min)) * 100 
}) {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderRange}>{min}{unit}</div>
      <div className={styles.sliderWrapper}>
        <input 
          type="range" 
          className={styles.slider} 
          min={min} 
          max={max} 
          value={value}
          onChange={onChange}
          style={{ '--value': `${valueToPercent(value)}%` }}
        />
      </div>
      <div className={styles.sliderRange}>{max}{unit}</div>
      <div className={styles.sliderValue}>{value}{unit}</div>
    </div>
  );
} 