import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button,Col,Form, InputGroup, Row } from 'react-bootstrap';

interface Props{
	field: Function
}


const AddRequirements = ({field}: Props) => {
	const requirements = [];
	const [requirementState, setRequirementState] = useState(requirements);
	const [require, setRequire] = useState('');

	const addRequirements = () => {
		setRequirementState(prev => {
			const updatedValue = [
				...prev,
				{ id: prev.length === 0  ? 0 : prev.length, name: require },
			]
			field('requirements', updatedValue)
			return updatedValue
		});
		
		

		setRequire('');
	};

	const handleEnterAdd = (event:KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addRequirements();
		}
	};

	const deleteRequirements = (requirementId: number) => {
		setRequirementState(prev => {
			const filtered = prev.filter(prevItem => prevItem.id !== requirementId)

			field('requirements', filtered)

			return filtered
			
			
		
		});
		console.log(requirementId);
		console.log(requirementState);
	};

	const renderTasks = requirementState.map((requirement, index) => {
		return (
			<div
				key={index}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: '1rem',
				}}
			>
				<li>{requirement.name}</li>

				<FontAwesomeIcon
					icon={faXmark}
					className="svg-icon"
					style={{marginRight:'2rem'}}
					onClick={() => deleteRequirements(requirement.id)}
				/>
			</div>
		);
	});
	return (
		<>
			<p className="price-text" style={{ fontSize: '14px', fontWeight: 'bold' }}>
				Next, provide detail requirements
			</p>
			<p className="price-text" style={{ fontSize: '12px' }}>
				This helps merchants to find about your requirements better.
			</p>
			<Row>
				<Row ><ol style={{marginLeft:'1.5rem'}}>{renderTasks}</ol></Row>
				<Row><div className="mt-4">
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Add requirements"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						value={require}
						
						onKeyPress={handleEnterAdd}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setRequire(event.target.value);
						}}
					/>
					<Button
						variant="outline-secondary"
						id="button-addon2"
						onClick={addRequirements}
						
					>
						ADD
					</Button>
				</InputGroup>
			</div></Row>
			</Row>
				
			
			
		</>
	);
};
export default AddRequirements;
