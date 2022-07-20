import { Row, Col } from 'react-bootstrap';
import ServiceNearYouCard from './searchAside';
import { servicesNearYou } from '../../staticData/servicesNearYouCard';

const SearchResults = () => {
	const renderServiceCards = servicesNearYou.map(service => {
		return (
			<div key={service.id}>
				<ServiceNearYouCard
					image={service.image}
					servicePrice={service.servicePrice}
					serviceProvider={service.serviceProvider}
					serviceProviderLocation={service.serviceProviderLocation}
					serviceRating={service.serviceRating}
					serviceTitle={service.serviceTitle}
					haveDiscount={service.haveDiscount}
					discountOn={service.discountOn}
					discount={service.discount}
				/>
			</div>
		);
	});
	return (
		<Row>
			<Col md={4} style={{ overflowY: 'scroll', maxHeight: '178vh' }}>
				<p style={{ fontSize: '12px', color: '#495057', lineHeight: '18px' }}>
					23 Garden Cleaning Services in Kathmandu, Nepal (1 new)
				</p>
				{renderServiceCards}
			</Col>
			<Col md={8}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9640853473306!2d85.32581651514985!3d27.687504882800237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19095c0dfbe9%3A0xeabd594ec46dbdfb!2sCagtu%20Nepal!5e0!3m2!1sen!2snp!4v1658292589018!5m2!1sen!2snp"
					width="700"
					height="550"
					style={{ border: '0' }}
					allowFullScreen={true}
					loading="lazy"
				></iframe>
			</Col>
		</Row>
	);
};
export default SearchResults;
