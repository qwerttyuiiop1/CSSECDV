import React, { ReactNode } from "react";
import styles from "./components.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { IconBaseProps } from "react-icons";

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

const AddButton: React.FC<IconBaseProps> = (props) => (
	<FaPlus {...props} className={`${styles.header_button} ${styles.header_icon}`}/>
);
const RefreshButton: React.FC<IconBaseProps> = (props) => (
	<MdRefresh {...props} className={`${styles.header_button} ${styles.header_icon}`}/>
)
const MinusButton: React.FC<IconBaseProps> = (props) => (
	<FaMinus {...props} className={`${styles.header_button} ${styles.header_icon}`}/>
)
const EditButton: React.FC<IconBaseProps> = (props) => (
	<BsFillPencilFill {...props} className={styles.edit_icon}/>
);
const DeleteButton: React.FC<IconBaseProps> = (props) => (
	<FaMinus {...props} className={styles.delete_icon}/>
);


export {
	Card,
	HeaderButton,
	HeaderRow,
	AddButton,
	RefreshButton,
	MinusButton,
	EditButton,
	DeleteButton
};