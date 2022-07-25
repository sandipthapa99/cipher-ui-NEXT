import Footer from '@components/Footer';
import Header from '@components/Header';
import { SearchCategory } from '@components/SearchTask/searchCategory';
import SearchResults from '@components/SearchTask/SearchResults';
import type { NextPage } from 'next';
import { Container } from 'react-bootstrap';

import SearchHeader from '../components/SearchTask/searchHeader';
const SearchPage: NextPage = () => {
	return (
		<>
			<SearchHeader />
			<Header />
			<Container style={{ height: '200vh' }}>
				<SearchCategory />
				<SearchResults />
			</Container>
			<Footer />
		</>
	);
};
export default SearchPage;
