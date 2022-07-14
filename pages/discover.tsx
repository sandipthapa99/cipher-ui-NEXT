import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Button, Row } from 'react-bootstrap'
import Image from 'next/image'
import CommonCard from '@components/common/CommonCard'

const Discover: NextPage = () => {
  return (
    <Layout title="Discover | Cipher">
      <div className="discover-page">
        <Breadcrum currentPage="Discover" />
        <Container fluid="xl">
          <div className="discover-page__top-container">
            <div className="gradient"></div>
            <figure className="thumbnail-img">
              <Image
                src="/discover/main.svg"
                layout="fill"
                objectFit="cover"
                alt="about-page-main-image"
              />
            </figure>
            <div className="overlay">
              <h1>
                Looking to earn money <br /> quickly?
              </h1>
              <div className="bottom">
                <p>It doesn't even take a minute to sign up</p>
                <Button className="btn">Join Us</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Discover
