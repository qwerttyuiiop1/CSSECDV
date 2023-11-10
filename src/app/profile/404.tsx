import {
	Title,
	Card,
	CardPage,
	Separator
} from '../../components/CardPage/CardPage'

export default function User404() {
	return <CardPage>
		<Card>
			<Title> User not found </Title>
			<Separator/>
			
		</Card>
	</CardPage>
}

export function UserLoading() {
	return <CardPage>
		<Card>
			<Title> Loading </Title>
			<Separator/>

		</Card>
	</CardPage>
}