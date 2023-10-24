import React, { ReactNode } from "react";
import styles from "./modal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOptions } from "../Animations/Animations";


export const modalHandler = ([_, b]: [boolean, (a:boolean)=>void]) => { 
	return (e: React.MouseEvent<Element, MouseEvent>) => {
		e.stopPropagation();
		b(true);
	}
}
export interface BaseModalProps {
	state: [boolean, (open: boolean) => void];
	interceptClicks?: boolean;
}
const BaseModal: React.FC<BaseModalProps & { children: ReactNode }> = ({ 
	children, state, interceptClicks = true
}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const handleClick = (e: React.MouseEvent) => {
		if (state[0] === false) return;
		if (interceptClicks)
			e.stopPropagation();
		if (ref.current?.contains(e.target as Node) ===  false)
			state[1](false);
	}
	return (
		<AnimatePresence>
			{state[0] && <motion.div {...fadeInOptions}
				className={styles.modal_overlay}
				onClick={handleClick}>
				<div style={{display: 'relative'}} ref={ref}>
					{children}
				</div>
			</motion.div>}
		</AnimatePresence>
	);
}

export default BaseModal;