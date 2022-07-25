import TaskCard from '@components/common/TaskCard';
import SearchBySort from '@components/SearchTask/searchPageSort';
import { Col,Row } from 'react-bootstrap';
import { TaskCardProps } from 'types/taskCard';

import { tasks } from '../../staticData/task';
import GettingStartedTask from '../Task/GettingStartedCard';
import Post from './Post';
const ApplyPost = () => {
	return (
		<div style={{ margin: '2rem 0 0 0 ' }}>
			<Row>
				<Col md={8}>
					<SearchBySort />
				</Col>
			</Row>

			<Row>
				<Col md={8}>
					<div>
						<Post />
					</div>
				</Col>
				<Col md={4}>
					<div>
						<GettingStartedTask />
					</div>
				</Col>
			</Row>
		</div>
	);
};
export default ApplyPost;
