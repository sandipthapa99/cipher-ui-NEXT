import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/pro-regular-svg-icons';
import { Button } from 'react-bootstrap';

const Post = () => {
	return (
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
				<button className="post-btn">Post a Task</button>
			</div>
		</div>
	);
};

export default Post;
