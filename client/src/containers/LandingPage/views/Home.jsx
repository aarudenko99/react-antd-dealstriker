import React, { Component } from 'react'
import OfferRequestForm from "../../../containers/OfferRequestPage";
import {history} from "../../../history";


var styles = {
Mcframe: {
  width: "100%",
  height: "50vh",
  marginTop: ".5%",

}
}



class View extends Component {
  state = {
    selectionSide: 'manufacturer',
    formDetails: {
      zipCode: '',
      travelRadius: '',
      financingPreference: ''
    },
    errorFormDetails: {
      zipCodeModal: '',
      email: '',
    },
    errors: {},
  };

  render() {
    return (
      <div>
        <OfferRequestForm history={history} />
        {/* how it works */}
        <div className="home-section-how-it-works pt-5 pb-5">
          <div className="overlay-light" />
          <div className="container">
            <div className="row mt-3">
              <div className="col-12 mb-4">
                <h2 className="align">How It Works</h2>
              </div>
              <div className="col-sm-12 col-md-4">
                <h4>
                  First submit what you are looking for and we send the
                  word out to dealerships in your area.
                </h4>
                <hr className="show-on-mobile-screen" />
              </div>
              <div className="col-sm-12 col-md-4">
                <h4>
                  Next the dealerships compete for your business by responding
                  with deals.
                </h4>
                <hr className="show-on-mobile-screen" />
              </div>
              <div className="col-sm-12 col-md-4">
                <h4>
                  Lastly you can connect with a dealership to claim your deal.
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* benefits */}
        <div className="home-section-benefits pt-5 pb-5">
          <div className="overlay-dark" />
          <div className="container d-flex">
            <div className="row justify-content-between align-items-end">
              <div className="col-12 mb-5">
                <h2 className="align heading-light">Benefits</h2>
              </div>
              <div className=" col-sm-6 col-md-3 benefits-widgets">
                <h2 className="align benefits-widgets-heading mb-3 mt-2">01</h2>
                Get quotes from all the dealerships in your area with the ease
                of a few clicks.
              </div>
              <div className=" col-sm-6 col-md-3 benefits-widgets">
                <h2 className="align benefits-widgets-heading mb-3 mt-2">02</h2>
                Stress-free negotiations. Let DealStryker help you negotiate for
                the best deal.
              </div>
              <div className=" col-sm-6 col-md-3 benefits-widgets">
                <h2 className="align benefits-widgets-heading mb-3 mt-2">03</h2>
                Chat with your local dealerships, we make it convenient for you
                to communicate hassle free.
              </div>
              <div className=" col-sm-6 col-md-3 benefits-widgets">
                <h2 className="align benefits-widgets-heading mb-3 mt-2">04</h2>
                Bringing innovation to the car buying experience. The new,
                better way to buy a vehicle.
              </div>
            </div>
          </div>



        </div>
      </div>
    )
  }
}

export const Home = View
