import type { NextPage } from 'next';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { Container } from 'react-bootstrap';
import SearchHeader from '../components/SearchTask/searchHeader';
import { SearchCategory } from '@components/SearchTask/searchCategory';
import SearchResults from '@components/SearchTask/SearchResults';
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
