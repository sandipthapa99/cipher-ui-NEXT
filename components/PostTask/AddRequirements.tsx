import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent, useState } from 'react';
import { ChangeEvent } from 'react';
import { Button,Form, InputGroup } from 'react-bootstrap';
import { Requirement } from 'types/requirement';
import { number } from 'yup/lib/locale';

const requirements:Requirement[] = [];

const AddRequirements = () => {
	const [requirementState, setRequirementState] = useState<Requirement[]>(requirements);
	const [require, setRequire] = useState('');

	const addRequirements = () => {
		setRequirementState(prev => [
			...prev,
			{ id: prev.length === 0  ? 0 : prev.length, name: require },
		]);
		setRequire('');
	};

	const handleEnterAdd = (event:KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addRequirements();
		}
	};

	const deleteRequirements = (requirementId: number) => {
		setRequirementState(prev => prev.filter(prevItem => prevItem.id !== requirementId));
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
					onClick={() => deleteRequirements(index)}
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
			<div>
				<ol>{renderTasks}</ol>
			</div>
			<div className="mt-4">
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
			</div>
		</>
	);
};
export default AddRequirements;
