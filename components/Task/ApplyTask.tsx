import TaskCard from '@components/common/TaskCard';
import SearchBySort from '@components/SearchTask/searchPageSort';
import { Col,Row } from 'react-bootstrap';
import { TaskCardProps } from 'types/taskCard';

import { tasks } from '../../staticData/task';
import GettingStartedTask from './GettingStartedCard';
const ApplyTask = () => {
	const renderTasks = tasks.map(task => {
		return (
			<TaskCard
				charge={task.charge}
				date={task.date}
				description={task.description}
				location={task.location}
				time={task.time}
				title={task.title}
				key={task.id}
			/>
		);
	});
	return (
		<div style={{ margin: '2rem 0 0 0 ' }}>
			<Row>
				<Col md={6}>
					<SearchBySort />
				</Col>
			</Row>

			<Row>
				<Col>
					<div>{renderTasks}</div>
				</Col>
				<Col>
					<div>
						<GettingStartedTask />
					</div>
				</Col>
			</Row>
		</div>
	);
};
export default ApplyTask;
