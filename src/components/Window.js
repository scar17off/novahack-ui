import { useState, useRef, useEffect } from 'react';
import styles from '../App.module.css';

export default function Window({ title, children }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [uiVisible, setUiVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for Insert key (keyCode 45)
      if (e.keyCode === 45) {
        setUiVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragRef.current.isDragging) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        
        setPosition({
          x: dragRef.current.initialX + dx,
          y: dragRef.current.initialY + dy
        });
      }
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.minimizeButton}`)) return;
    
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y
    };
    
    document.body.style.userSelect = 'none';
  };

  if (!uiVisible) return null;

  return (
    <div 
      className={`${styles.window} ${menuOpen ? styles.open : styles.collapsed}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div 
        className={styles.titleBar}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.titleText}>
          <span className={styles.accent}>NOVA</span>
          <span className={styles.hackText}>HACK</span>
        </div>
        <button 
          className={styles.minimizeButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '−' : '+'}
        </button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
} 