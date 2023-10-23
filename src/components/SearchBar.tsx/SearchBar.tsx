import React, { ChangeEvent } from 'react';
import styles from './SearchBar.module.css';
import { BiSearch } from 'react-icons/bi';

interface SearchBarProps {
  onInputChange: (value: string) => void; 
}

export default function SearchBar({ onInputChange }: SearchBarProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onInputChange(inputValue);
  };

  return (
    <div className={styles.main_container}>
      <BiSearch className={styles.icon} />
      <div className={styles.border}></div>

      <input
        className={styles.search_bar}
        type="search"
        placeholder="Search"
        onChange={handleInputChange} 
      />
    </div>
  );
}
