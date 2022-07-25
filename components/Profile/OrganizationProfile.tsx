import Image from 'next/image'

import { OrganizationProfileInfo } from 'staticData/organizationProfile'
import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const OrganizationProfile = () => {
  return (
    <div className="organization-profile">

      {OrganizationProfileInfo && OrganizationProfileInfo.map((info) => (
        <div className="content">
          <div className="type">
            <div className="info">
              <div className='d-flex justify-content-between'>
                <h3>Company Info</h3>
                <FontAwesomeIcon icon={faPencil} className="svg-icon" />
              </div>

              <figure className="thumbnail-img">
                <Image
                  src={info.image}
                  layout="fill"
                  objectFit="cover"
                  alt="company-image"
                />
              </figure>

            </div>

          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Company name</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p>{info.name}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Company website</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p>{info.website}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Industry Field</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>

            <p>{info.industryField}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Estabilished Date</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>

            <p>{info.estabilishedDate}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Available Hours</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>

            <p>{info.availableFrom} AM - {info.availableTo}PM</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Number of employees</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p>{info.employeeNumber}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Contact no</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>

            <p>{info.contactNumber}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Address</h3>

              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            {info.address.map((place) => (
              <p>{place}</p>
            ))}

          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Description</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p className='description'>{info.description}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>Tagline</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p>{info.tagline}</p>
          </div>
          <div className="type">
            <div className='d-flex justify-content-between'>
              <h3>VAT ID</h3>
              <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p>{info.vatId}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default OrganizationProfile

