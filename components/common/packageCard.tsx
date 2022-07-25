import Image from 'next/image'
import { PacakageCardProps } from 'types/packageCard'

import CardBtn from './CardBtn'
import PackageServiceHighlights from './PackageServiceHighlights'
const PackageOffersCard = ({
  title,
  price,
  offers,
  isPermium,
  advantage,
  isRecommended,
}: PacakageCardProps) => {
  return (
    <div
      className={`package-card-block ${
        isRecommended ? 'card-block-border-color' : ''
      }`}
    >
      <div className="top-container">
        <h3 className="package-title">{title}</h3>
        {isPermium ? (
          <figure className="thumbnail-img">
            <Image
              src="/service-details/premium.svg"
              layout="fill"
              objectFit="cover"
              alt="premium-image"
            />
          </figure>
        ) : (
          ''
        )}
        <h1 className="price">
          Rs{price}
          <span>/mo</span>{' '}
        </h1>
        <div className="save-recommend">
          {isRecommended ? (
            <p className="recommended">{advantage}</p>
          ) : (
            <p className="saving">{advantage}</p>
          )}
        </div>
      </div>
      <div className="offers">
        {offers.map((offer: any, i: number) => (
          <PackageServiceHighlights
            key={i}
            title={offer.label}
            isChecked={offer.isChecked}
          />
        ))}
      </div>

      <div className="btn-wrapper">
        <CardBtn btnTitle="Buy Now" backgroundColor="primary-color" />
      </div>
    </div>
  )
}
export default PackageOffersCard
