import Image from 'next/image'
import { AboutCardProps } from 'types/aboutCard'

const AboutCard = ({
  aboutImage,
  aboutDescription,
  aboutTitle,
}: AboutCardProps) => {
  return (
    <div className="about-card-block">
      <figure className="thumbnail-img">
        <Image
          src={aboutImage}
          layout="fill"
          height={300}
          objectFit="cover"
          alt="about-card-image"
        />
      </figure>
      <div className="card-content">
        <h2 className="card-title">{aboutTitle}</h2>

        <p className="card-description">
          {/* {`${aboutDescription.substring(0, 80)}...`} */}
          {aboutDescription}
        </p>
      </div>
    </div>
  )
}
export default AboutCard
