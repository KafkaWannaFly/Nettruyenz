import { url } from 'node:inspector';
import React from 'react';
import { BiPhoneCall, BiMapPin, BiMailSend } from 'react-icons/bi'

const Footer: React.FC = () => {
    return (
        <>
            <div id="footer">
                <div id="footer-container">
                    <div id="web-brand">
                        <div id="web-logo">
                            <img id="web-footer-logo-img" src="../logos/fox.png" alt="web-logo" />
                            <div id="web-footer-logo-name">NetTruyenZ</div>
                        </div>
                        <div id="web-footer-slogan">Our web, your data</div>
                    </div>
                    <div id="web-contact-info">
                        <div id="contact-info-header">Contact info</div>
                        <div id="phone-number">
                            <span className="icon">
                                <BiPhoneCall />
                            </span>
                            090177013
                        </div>
                        <div id="email">
                            <span className="icon">
                                <BiMailSend />
                            </span>
                            gmail@chucknorris.com
                        </div>
                        <div id="address">
                            <span className="icon">
                                <BiMapPin/>
                            </span>
                            277 ABC XYZ
                        </div>
                    </div>
                    <div id="more-information">
                        <div className="each-row">
                            <div id="about">About us</div>
                            <div id="term-of-use">Term of use</div>
                        </div>
                        <div className="each-row">
                            <div id="advertize">Advertise</div>
                            <div id="privacy-policy">Privacy policy</div>
                        </div>
                        <div className="each-row">
                            <div id="career">Career</div>
                            <div id="faq">FAQ</div>
                        </div>
                    </div>
                </div>
                <div id="copyright">
                    HCMUS Socerers Inc. 2021
                </div>
            </div>
        </>
    );
}

export default Footer;