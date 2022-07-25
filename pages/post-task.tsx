import type { NextPage } from 'next';
import SearchHeader from '../components/SearchTask/searchHeader';
import Header from '@components/Header';
import { SearchBody } from '@components/SearchTask/searchBody';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '@components/Footer';
import ApplyTask from '@components/Task/ApplyTask';
import ApplyPost from '@components/PostTask/ApplyPost';
const PostTask: NextPage = () => {
	return (
		<>
			<SearchHeader />
			<Header />
			<div>
				<Row>
					<div className="completed-tasks">
						<Col className="user-name-detail">
							<div className="user-name">
								<h1>Hi Harry!</h1>
								<h1>Welcome Back!</h1>
							</div>
						</Col>
						<Col className="full-tasks">
							<SearchBody
								number="30"
								color="#ECF7FF"
								textOne="Tasks Assigned"
								textColor="#3EAEFF"
							/>
							<SearchBody
								number="30"
								color="#EBF9F1"
								textOne="Tasks In Completed"
								textColor="#38C675"
							/>
							<SearchBody
								number="30"
								color="#FFF5E5"
								textOne="Tasks In Progress"
								textColor="#FF9700"
							/>
							<SearchBody
								number="4"
								color="#FFEDED"
								textOne="Tasks Cancelled"
								textColor="#FE5050"
							/>
						</Col>
					</div>
				</Row>
			</div>
			<Container>
				<ApplyPost />
			</Container>
			<Footer />
		</>
	);
};

export default PostTask;
