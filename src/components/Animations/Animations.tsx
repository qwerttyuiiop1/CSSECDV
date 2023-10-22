import React from "react";
import { motion } from "framer-motion";

const SlideDown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <motion.div
		initial={{ opacity: 0, height: 0, y: -20 }}
		animate={{ opacity: 1, height: 'auto', y: 0 }}
		exit={{ opacity: 0, height: 0, y: -20 }}
		transition={{ duration: 0.3 }}> 
			{children}
	</motion.div>
}

export {
	SlideDown
}