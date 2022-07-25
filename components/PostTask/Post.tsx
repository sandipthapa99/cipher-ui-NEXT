import InputField from '@components/common/InputField';
import { faFolderOpen } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

import PostModal from './PostModal';

const Post = () => {
	const [showModal, setShowModal] = useState(false);
	const handleShow = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
	return (
		<>
			<div className="apply-post">
				<div className="folder">
					<FontAwesomeIcon
						icon={faFolderOpen}
						style={{
							width: '120px',
							height: '120px',
							verticalAlign: 'middle',
							display: 'inline-block',
							fontSize: '12px',
							color: '#FFCA6A',
						}}
					/>
				</div>
				<div className="text-post">
					<p className="head">No active Task posts</p>
					<p className="para">
						Post a task to the marketplace and let merchant come to you.
					</p>
				</div>
				<div className="btn-cont">
					<Button variant="light" className="post-btn" onClick={handleShow}>
						Post a Task
					</Button>
				</div>
			</div>

			<Modal show={showModal} onHide={handleClose} className="post-modal">
				<Modal.Header closeButton className="mt-4"></Modal.Header>
				<Modal.Body>
					<PostModal />
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="light"
						style={{ border: '1px solid #211d4f' }}
						className="save-draft"
					>
						Save Draft
					</Button>
					<Button className="post" style={{ backgroundColor: '#211d4f' }}>
						Post
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Post;
