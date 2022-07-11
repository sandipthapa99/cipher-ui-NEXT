import Image from 'next/image'
import { CommunityGuidelineCardProps } from 'types/community'

const AboutCard = ({
  Image,
  Description,
  Title,
}: CommunityGuidelineCardProps) => {
  return (
    <div className="about-card-block">
      <figure className="thumbnail-img">
        <Image
          src={Image}
          layout="fill"
          //height={300}
          objectFit="cover"
          alt="about-card-image"
        />
      </figure>
      <div className="card-content">
        <h2 className="card-title">{Title}</h2>

        <p className="card-description">
          {/* {`${aboutDescription.substring(0, 80)}...`} */}
          {Description}
        </p>
      </div>
    </div>
  )
}
export default AboutCard
