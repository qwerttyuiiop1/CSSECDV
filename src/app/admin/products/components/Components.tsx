import React, { ReactNode } from "react";
import styles from "./components.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

type Div = React.HTMLAttributes<HTMLDivElement>
interface DivProps extends Div { children: ReactNode }
function wrapDiv(className: string): React.FC<DivProps> {
	const div: React.FC<DivProps> = ({ children, ...props }) => (
	  <div {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </div>
	);
	return div;
}

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonProps extends Button { children: ReactNode }
function wrapButton(className: string): React.FC<ButtonProps> {
	const button: React.FC<ButtonProps> = ({ children, ...props }) => (
	  <button {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </button>
	);
	return button;
}

const Card: React.FC<{
	header: React.ReactNode;
	body: React.ReactNode;
}> = ({ header, body }) => {
	return (
		<div className={styles.card}>
			{header}
			<div className={styles.divider} />
			{body}
		</div>
	);
};
const HeaderButton = wrapButton(`${styles.header_button} ${styles.header_text}`);
const HeaderRow = wrapDiv(styles.row);
const AddButton: React.FC<Button> = (props) => (
	<button {...props} className={styles.header_button}>
		<FaPlus className={styles.header_icon}/>
	</button>
);
const RefreshButton: React.FC<Button> = (props) => (
	<button {...props} className={styles.header_button}>
		<MdRefresh className={styles.header_icon}/>
	</button>
)
const MinusButton: React.FC<Button> = (props) => (
	<button {...props} className={styles.header_button}>
		<FaMinus className={styles.header_icon}/>
	</button>
)

export {
	Card,
	HeaderButton,
	HeaderRow,
	AddButton,
	RefreshButton,
	MinusButton
};