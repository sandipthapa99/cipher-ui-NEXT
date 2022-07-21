import Image from 'next/image'
import Link from 'next/link'
import BookNowButton from './BookNowButton'
import { ServiceNearYouProviderCardProps } from 'types/serviceNearYouCards'
import ModalCard from './ModalCard'
import { useState } from 'react'
import { BookingDetails } from 'staticData/bookNowModalCard'
const ServiceNearYouProviderCard = ({
  image,
  name,
  speciality,
  price,
}: ServiceNearYouProviderCardProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="card-block service-provider-card-block">
      <div className="content">
        <div className="profile">
          <figure className="thumbnail-img">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt="serviceprovider-image"
            />
          </figure>
          <div className="intro">
            <p className="name">{name}</p>
            <p className="job">{speciality}</p>
          </div>
        </div>
        <div className="starting-price">
          <p>Starting price</p>
          <p className="price">Rs. {price}</p>
        </div>
        {BookingDetails &&
          BookingDetails.map((detail) => (
            <ModalCard
              key={detail.id}
              title={detail.title}
              price={detail.price}
              image={detail.image}
              description={detail.description}
              problemDescription={detail.problemDescription}
              show={showModal}
              handleClose={() => setShowModal(false)}
            />
          ))}

        <BookNowButton
          btnTitle="Book Now"
          backgroundColor="$primary-color"
          showModal={true}
          handleOnClick={() => setShowModal(!showModal)}
        />

        <Link href="/login">Please Login to Book Services</Link>
      </div>
    </div>
  )
}
export default ServiceNearYouProviderCard
