import React, { ReactNode } from "react";
import { AnimationProps, motion } from "framer-motion";

const slideDownOptions: AnimationProps = {
	initial: { opacity: 0, height: 0, y: -20 },
	animate: { opacity: 1, height: 'auto', y: 0 },
	exit: { opacity: 0, height: 0, y: -20 },
	transition: { duration: 0.3 }
}
const fadeInOptions: AnimationProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.2 }
}

const SlideDown: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <motion.div {...slideDownOptions}> 
			{children}
	</motion.div>
}

export {
	SlideDown,
	slideDownOptions,
	fadeInOptions
}