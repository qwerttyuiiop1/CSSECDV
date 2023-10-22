import React, { ReactNode } from "react";
import styles from "./card.module.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}
function wrapDiv(className: string): React.FC<DivProps> {
	const div: React.FC<DivProps> = ({ children, ...props }) => (
	  <div {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </div>
	);
	return div;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
function wrapButton(className: string): React.FC<ButtonProps> {
	const button: React.FC<ButtonProps> = ({ children, ...props }) => (
	  <button {...props} className={className + (props.className ? " " + props.className : '')}>
		{children}
	  </button>
	);
	return button;
}
  
const CardPage = wrapDiv(`${styles.main_container} ${styles.background}`);
const Card = wrapDiv(styles.card);
const Title = wrapDiv(styles.title);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
	placeholder: string;
	id: string;
	options?: RegisterOptions<FieldValues, string>;
}
const Input: React.FC<InputProps> = ({ options, type, className, ...props }) => {
	const { register } = useFormContext();
	return (
	  <input 
		{...props}
		type={type || "text"} 
		className={`${styles.input} ${className||''}`}
		{...register(props.id, options)}
		/>
	);
}
const Password: React.FC<InputProps> = ({ options, className, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const { register } = useFormContext();
	return (
	  <div className={styles.password_container}>
		<input 
		  {...props}
		  type={showPassword ? "text" : "password"}
		  className={`${styles.input} ${styles.password} ${className||''}`}
		  {...register(props.id, options)}
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
const Dropdown: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { 
	values: string[] 
	id: string
	options?: RegisterOptions<FieldValues, string>;
}> = ({values, options, ...props}) => {
	const { register } = useFormContext();
	return (
	  <select 
	  	{...props} 
		{...register(props.id, options) } 
		className={`${styles.dropdown} ${props.className||''}`}>
		{values.map((value, index) => (
		  <option key={index} value={value}>{value}</option>
		))}
	  </select>
	);
}

const BigButton = wrapButton(styles.big_button);
const SmallButton = wrapButton(styles.small_button);

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
	SmallButton,
	Dropdown
};