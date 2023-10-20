import React, { ReactNode } from "react";
import styles from "./card.module.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";

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
  
const CardPage = wrapDiv(`${styles.main_container} ${styles.background}`);
const Card = wrapDiv(styles.card);
const Title = wrapDiv(styles.title);

interface InputProps {
	placeholder: string;
	id: string;
}
const Input: React.FC<InputProps & { type?: string }> = ({ placeholder, id, type }) => (
  <input type={type || "text"} placeholder={placeholder} id={id} className={styles.input}/>
);
const Password: React.FC<InputProps> = ({ placeholder, id }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
	  <div className={styles.relative}>
		<input 
		  type={showPassword ? "text" : "password"}
		  placeholder={placeholder} 
		  id={id} 
		  className={`${styles.input} ${styles.password}`}
		  />
		{showPassword ? (
		  <BsEyeSlashFill
			className={styles.password_icon} 
			onClick={() => setShowPassword(!showPassword)}
			/>
		) : (
		  <BsFillEyeFill
			className={styles.password_icon}
			onClick={() => setShowPassword(!showPassword)}
			/>
		)}
	  </div>
	);
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
const BigButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.big_button} {...props}>
	{children}
  </button>
);
const SmallButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.small_button} {...props}>
	{children}
  </button>
);

const Separator: React.FC<{ text: string }> = ({ text }) => {
	return (
	  <div className={styles.separator}>
		<hr className={styles.separator_line}/>
		<span className={styles.separator_text}> {text} </span>
		<hr className={styles.separator_line}/>
	  </div>
	);

}
const CardRow = wrapDiv(styles.card_row);


export { 
	CardPage,
	Card,
	Title,
	Input,
	Password,
	BigButton,
	Separator,
	CardRow,
	SmallButton
};