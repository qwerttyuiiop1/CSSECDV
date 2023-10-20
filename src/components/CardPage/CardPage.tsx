import React, { ReactNode } from "react";
import styles from "./card.module.css";

interface Children {
	children: ReactNode;
}
function wrapDiv(className: string): React.FC<Children> {
	const div: React.FC<Children> = ({ children }) => (
	  <div className={className}>
		{children}
	  </div>
	);
	return div;
}
  
const CardPage = wrapDiv(styles.main_container);
const Card = wrapDiv(styles.card);
const Title = wrapDiv(styles.title);


export { 
	CardPage,
	Card,
	Title,
};