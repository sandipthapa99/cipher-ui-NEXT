import Image from 'next/image'
import { ProfileAboutProps } from 'types/profile'
import { ProfileAboutContent } from 'staticData/profileAboutContent'
const AboutProfile = () => {
  return (
    <>
      {ProfileAboutContent &&
        ProfileAboutContent.map((about) => (
          <div className="about-profile" key={about.id}>
            <div className="portfolio">
              <h1>My Portfolio</h1>
              <div className="content">
                {about.portfolio.map((info) => (
                  <div className="image" key={info.id}>
                    <figure className="thumbnail-img">
                      <Image
                        src={info.image}
                        layout="fill"
                        objectFit="cover"
                        alt="portfolio-image"
                      />
                    </figure>
                    <p>{info.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
export default AboutProfile
