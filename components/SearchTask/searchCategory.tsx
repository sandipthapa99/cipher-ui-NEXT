export interface SearchCategoryProps {}

import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';
export interface CategoryProps {
	text: string;
}
export const SearchCategory = () => {
	return (
		// <Container
		// 	fluid
		// 	style={{
		// 		padding: '3rem 0',
		// 		display: 'flex',
		// 		alignItems: 'center',
		// 		justifyContent: 'center',
		// 		alignContent: 'center',
		// 	}}
		// >
		<div className="search-category">
			<Row className="rows">
				<Col md={3}>
					
				</Col>
				<Col
					md={9}
					className="categories"
					style={{ display: 'flex', flexDirection: 'row' }}
				>
					<Category text="Category" />
					<Category text="30 km New Baneshwor, Kathmandu" />
					<Category text="Any Price" />
					<Category text="Service Type" />
					<Category text="Sort" />
				</Col>
			</Row>
		</div>
	);
};

function Input() {
	return (
		<Col className="inputdiv" md={4}>
			<input className="input" type="text" placeholder="Search For a Service" />
		</Col>
	);
}
function Category(props: CategoryProps) {
	return (
		<Col className="boxes">
			<p style={{ margin: '0 0', fontSize: '12px', color: '#868E96' }}>{props.text}</p>

			<a>
				<FontAwesomeIcon
					icon={faAngleDown}
					style={{
						width: '1.8rem',
						height: '1.8rem',
						verticalAlign: 'middle',

						fontSize: '12px',
						color: '#868E96',
					}}
				/>
			</a>
		</Col>
	);
}
