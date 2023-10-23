import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Options.module.css"
import { AnimatePresence } from "framer-motion";
import { SlideDown } from "../Animations/Animations";

interface OptionsProps {
  button: ReactNode;
  content: ReactNode;
}

const Options: React.FC<OptionsProps> = ({ button, content }) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const handleOutsideClick = useCallback((event: MouseEvent) => {
	  if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
		setOpen(false);
	  }
	}, []);
	useEffect(() => {
	  window.addEventListener("click", handleOutsideClick);
	  return () => {
		window.removeEventListener("click", handleOutsideClick);
	  };
	}, [handleOutsideClick]);
	const handleClick = () => setOpen(!isOpen)
	return (
	  <div style={{ position: 'relative' }}>
		<div ref={ref} onClick={handleClick}>{button}</div>
		<AnimatePresence>
		  {isOpen && (
			<SlideDown>
			  <div className={styles.arrow} />
			  <div className={styles.options_container}>{content}</div>
			</SlideDown>
		  )}
		</AnimatePresence>
	  </div>
	);
};
const OptionsDivider = () => <div className={styles.options_divider} />

export {
	Options,
	OptionsDivider
};