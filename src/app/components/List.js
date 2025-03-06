'use client';
import { useState } from 'react';
import { IoTrash, IoCheckmark } from 'react-icons/io5';
import styles from '../page.module.css';

export default function List({ items, onSelect, onDelete }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <div
          key={item.name}
          className={styles.listItem}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className={styles.listItemContent}>
            <span className={styles.listItemName}>{item.name}</span>
            <span className={styles.listItemDate}>
              {formatDate(item.timestamp)}
            </span>
          </div>
          <div className={styles.listItemActions}>
            {hoveredIndex === index && (
              <>
                <button
                  className={`${styles.listItemButton} ${styles.loadButton}`}
                  onClick={() => onSelect(item.name)}
                >
                  <IoCheckmark />
                </button>
                <button
                  className={`${styles.listItemButton} ${styles.deleteButton}`}
                  onClick={() => onDelete(item.name)}
                >
                  <IoTrash />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 