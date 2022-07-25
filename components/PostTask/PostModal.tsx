import InputField from '@components/common/InputField';
import Image from 'next/image';
import { Col,Form, Row } from 'react-bootstrap';

import AddRequirements from './AddRequirements';

const PostModal = () => {
	return (
		<>
			<h3>Post a Task</h3>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Give a title to your task</Form.Label>
					<Form.Control type="email" placeholder="Main Headline" />
				</Form.Group>

				<Form.Group className="mt-3">
					<Form.Label>Task Description</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Describe your requirements in few words."
						style={{ height: '100px' }}
					/>
				</Form.Group>
				<Row className="mt-3">
					<Col md={6}>
						<Form.Group>
							<Form.Label>Category</Form.Label>
							<Form.Select className="dropdown" aria-label="Choose relevant">
								<option>Gardern Cleaner</option>
								<option value="1">One</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group>
							<Form.Label>Sub-Category</Form.Label>
							<Form.Select className="dropdown" aria-label="Choose relevant">
								<option>Gardern Cleaner</option>
								<option value="1">One</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>datetime-local</Form.Label>
							<Form.Control type="datetime-local" placeholder="" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Estimated Time(hr)</Form.Label>
							<Form.Control type="number" placeholder="" />
						</Form.Group>
					</Col>
				</Row>

				<Row className="mt-3">
					<Col>
						<p className="price-text">Budget ($)</p>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col md={2}>
						<Form.Check
							type="radio"
							name="range"
							label="Range"
							id="disabled-default-radio"
						/>
					</Col>
					<Col md={1}>
						<Form.Check
							name="range"
							type="radio"
							label="Fixed"
							id="disabled-default-radio"
						/>
					</Col>
				</Row>
				<Row className="mt-2">
					<Col>
						<Form.Group>
							<Form.Control type="number" placeholder="From" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Control type="number" placeholder="To" />
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-2">
					<Form.Group className="mb-3" controlId="formBasicAddress">
						<Form.Label>Address</Form.Label>
						<Form.Control type="text" placeholder="Default" />
					</Form.Group>
				</Row>
				<Row>
					<Col className="mt-3">
						<AddRequirements />
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<p
							className="price-text"
							style={{ fontSize: '14px', fontWeight: 'bold' }}
						>
							Images & Videos
						</p>
						<p className="price-text" style={{ fontSize: '10px' }}>
							Including images or videos helps you find best merchant for your
							task.
						</p>
					</Col>
				</Row>
				<Row>
					<DragAndDrop />
				</Row>
			</Form>
		</>
	);
};
export default PostModal;

const DragAndDrop = () => {
	return (
		<Col md={4} className="drag-down">
			<figure className="thumbnail-img" style={{ marginTop: '2rem' }}>
				<Image
					src="/service-details/file-upload.svg"
					width="70px"
					height={'70px'}
					objectFit="cover"
					alt="serviceprovider-image"
				/>
			</figure>

			<h5 style={{ margin: '1rem 0 0 0 ' }}>
				Drag or {''}
				<label htmlFor="choosefile" style={{ color: '#0693E3', cursor: 'pointer' }}>
					Browse
				</label>{' '}
				Image/Video
			</h5>
			<p className="price-text" style={{ fontSize: '10px', color: '#868E96' }}>
				Maximum Image Size 20 MB
			</p>
			<p className="price-text" style={{ fontSize: '10px', color: '#868E96' }}>
				Maximum Video Size 200 MB
			</p>
			<div style={{ visibility: 'hidden' }}>
				<input type={'file'} id="choosefile" />
			</div>
		</Col>
	);
};
