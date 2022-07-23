import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import type { NextPage } from 'next';
import SearchHeader from '../components/SearchTask/searchHeader';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBody } from '@components/SearchTask/searchBody';
import ApplyTask from '@components/Task/ApplyTask';

const SearchTask: NextPage = () => {
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
				<ApplyTask />
			</Container>

			<Footer />
		</>
	);
};

export default SearchTask;
