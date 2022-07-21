import { Stack } from 'react-bootstrap';
export interface SearchBodyProps {
	number: string;
	textOne: string;
	color: string;
}
export const SearchBody = (props: SearchBodyProps) => {
	return (
		<Stack
			style={{
				backgroundColor: `${props.color}`,
				padding: '2rem 5rem 0.5rem 1rem',
			}}
		>
			<h1>{props.number}</h1>
			<p style={{ maxWidth: '7rem', margin: '0 0' }}>{props.textOne}</p>
		</Stack>
	);
};
