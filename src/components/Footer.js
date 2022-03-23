import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'



// Import Images + CSS
import twitter from '../images/socials/twitter.svg'
import instagram from '../images/socials/instagram.svg'
import opensea from '../images/socials/opensea.svg'
import discord from '../images/socials/discord-icon.svg'
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
                        <a href="https://app.gitbook.com/s/0SyDyf0nWBtn4D7AlTXp/">About Us</a>
                    </Col>
                </Row>
                <Row className='p-3 mb-0 pb-0'>
                    {/* <Col xs={12} md={12} lg={8} xxl={8}>
                        <a href="">Contact Us</a>
                    </Col> */}
                    <Col className='mt-3 mb-0 pb-0' xs={12} md={12} lg={8} xxl={8}>
                        <a target="_blank" href="https://app.gitbook.com/s/0SyDyf0nWBtn4D7AlTXp/">Docs</a>
                    </Col>
                
                    <Col className='flex social-icons'>
                        <a
                            href="https://twitter.com/AngryAliensproj"
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
                        <a
                            href={`https://discord.gg/muybTfQR`}
                            target='_blank'
                            className='circle flex button'>
                            <img src={discord} alt="Discord" />
                        </a>
                    </Col>
                </Row>
                

            </section>

        </div>
    )
}