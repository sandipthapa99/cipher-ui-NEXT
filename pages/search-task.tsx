import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import type { NextPage } from 'next';
import SearchHeader from '../components/SearchTask/searchHeader';
import { Stack } from 'react-bootstrap';
import { SearchBody } from '@components/SearchTask/searchBody';

const SearchTask: NextPage = () => {
	return (
		<>
			<SearchHeader />
			<Header />
			<Stack
				direction="horizontal"
				style={{
					justifyContent: 'space-between',
					padding: '5rem 0',
					backgroundColor: '#FFFFFF',
				}}
			>
				<div style={{ marginLeft: '3rem' }}>
					<h1>Hi Harry!</h1>
					<h1>Welcome Back!</h1>
				</div>
				<Stack direction="horizontal" gap={3} style={{ marginRight: '10rem' }}>
					<SearchBody number="30" color="#ECF7FF" textOne="Tasks Assigned" />
					<SearchBody number="30" color="#EBF9F1" textOne="Tasks completed" />
					<SearchBody number="30" color="#FFF5E5" textOne="Tasks In Progress" />
					<SearchBody number="30" color="#FFEDED" textOne="Tasks Cancelled" />
				</Stack>
			</Stack>
			<Footer />
		</>
	);
};

export default SearchTask;
