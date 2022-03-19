import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'



// Import Images + CSS
import twitter from '../images/socials/twitter.svg'
import instagram from '../images/socials/instagram.svg'
import opensea from '../images/socials/opensea.svg'
import showcase from '../images/showcase.jpg'
import '../App.css'



// Import ABI + Config
import config from '../config.json'



export default function Footer() {

    const app = useSelector((state) => state.app)

    return (
        <div>
            <section id='welcome' className='footer'>
                <Row className='p-3 mb-0 pb-0'>
                    <Col xs={12} md={12} lg={8} xxl={8}>
                        About Us
                    </Col>
                </Row>
                <Row className='p-3 mb-0 pb-0'>
                    <Col xs={12} md={12} lg={8} xxl={8}>
                        Contact Us
                    </Col>
                    <Col className='mt-3 mb-0 pb-0' xs={12} md={12} lg={8} xxl={8}>
                        Docs
                    </Col>
                
                    <Col className='flex social-icons'>
                        <a
                            href="https://twitter.com/DappUniversity"
                            target='_blank'
                            className='circle flex button'>
                            <img src={twitter} alt="Twitter" />
                        </a>
                        <a
                            href="#"
                            target='_blank'
                            className='circle flex button'>
                            <img src={instagram} alt="Instagram" />
                        </a>
                        <a
                            href={`${app.openseaURL}/collection/${config.PROJECT_NAME}`}
                            target='_blank'
                            className='circle flex button'>
                            <img src={opensea} alt="Opensea" />
                        </a>
                    </Col>
                </Row>
                

            </section>

        </div>
    )
}