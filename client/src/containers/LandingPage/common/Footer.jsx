import React from "react";
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png';

const Facebook = require('react-icons/lib/fa/facebook-square');
const Twitter = require('react-icons/lib/fa/twitter');
const Instagram = require('react-icons/lib/fa/instagram');


var styles = {
  socialMediaLinks: {
    display: "table",
    margin: "0 auto",
  },
  footImageStyle:{
    backgroundImage: "url(/footImage.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "375px",

  },
  logoFoot: {
    height: "300px",
    width: "auto",
    marginLeft: "25%"
  }
}


const FooterComponent = () => {
  return (
      <React.Fragment>

        <div style={styles.footImageStyle}>


          {/* call to action */}
          <div className="container pt-4 pb-4">
            <div className="row d-flex justify-content-center">
              <div className="align col-sm-12 col-md-6">
                <a
                    href="/dealerships"
                    role="button"
                    className="btn btn-lg btn-call-to-action"
                    rel="noopener noreferrer"
                >
                  Are you a Dealership?
                  <br /> Click to learn more!
                </a>
              </div>
            </div>
            <img style={styles.logoFoot} className="col-12 mb-5" src={logo} alt="Footer logo" />

          <div style={styles.socialMediaLinks}>

            <a className="col-sm-6 col-lg-4 blue-text text-lighten-4 middle " href="https://www.facebook.com/DealStryker/">< Facebook size={30} /></a>
            <a className="col-sm-6 col-lg-4 blue-text text-lighten-4 middle " href="https://twitter.com/DealStryker">< Twitter size={30} /></a>
            <a className="col-sm-6 col-lg-4 blue-text text-lighten-4 middle " href="https://www.instagram.com/dealstryker/">< Instagram size={30} /></a>

          </div>

          </div>

          <div className="home-section-info pt-5 pb-5">
            <div className="container d-flex">
              <div className="row align justify-content-around w-100">



                <div className="col-2 hide-on-mobile" />
                <div className="col-8">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <Link to="/terms">Terms of Services</Link>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <Link to="/about">About US</Link>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <Link to="/contact">Contact US</Link>
                    </div>
                  </div>
                </div>
                <div className="col-2 hide-on-mobile" />
              </div>
            </div>
          </div>

          <div className="home-section-footer align pt-4 pb-2">
            <p> © 2020 DealStryker, Inc.</p>
          </div>
        </div>
      </React.Fragment>
  );
};

export const Footer = FooterComponent;
