"use client"
import styles from "../login.module.css";
import React from "react";
import { useSession } from "next-auth/react";
import { 
	CardPage, 
	Card, 
	Title,
	Input,
	Password,
	BigButton,
	Separator,
	CardRow
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import { FcGoogle } from "react-icons/fc"
import { LuArrowRight } from "react-icons/lu"
import Link from "next/link";
import UserCard from "./UserCard";
import DetailsCard from "./DetailsCard";

export default function SignupPage() {
	const { data: session, status } = useSession();
	const [ data, setData ] = React.useState({});
	const [ stage, setStage ] = React.useState(1);
	return (
		<CardPage>
			{stage == 0 && <UserCard onSubmit={(out) => {
				setData({...data, ...out});
				setStage(1);
			}} />}
			{stage == 1 && <DetailsCard 
				onSubmit={(out) => {
					setData({...data, ...out});
					setStage(2);
				}}
				onBack={(out) => {
					setData({...data, ...out});
					setStage(0)
				}}
			/>}
		</CardPage>
	);
}