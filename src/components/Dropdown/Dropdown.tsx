import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownItem {
  id: number;
  label: string;
}

interface DropdownProps {
  options: DropdownItem[];
  onSelectionChange: (item: DropdownItem | null) => void;
  isBorder?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelectionChange, isBorder }) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState<DropdownItem[]>(options);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
    setOpen(false);
    onSelectionChange(items.find((item) => item.id === id) || null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={`${styles.dropdown} ${isOpen && styles.open}  ${isBorder && styles.border} `} ref={dropdownRef}>
      <h3 className={styles.dropdown_header} onClick={toggleDropdown}>
        {items.find((item) => item.id === selectedItem)?.label}
        <div className={styles.arrow_down}></div>
      </h3>
      <div className={`${styles.dropdown_body} ${isOpen && styles.open} ${isBorder && styles.border}`}>
        {items.map((item) => (
          <h3
            className={`${styles.dropdown_item} ${
              item.id === selectedItem && styles.selected_item
            }`}
            onClick={() => handleItemClick(item.id)}
            id={item.id.toString()}
            key={item.id}
          >
            {item.label}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
