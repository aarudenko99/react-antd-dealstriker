import React from 'react';
import mainImg from '../../../assets/img/img_for_aboutUs.jpg'

var Center = require('react-center');

var topHat ={
	marginTop: 50,
}

var whiteText = {
	color: "white",
}

var centreBody = {
	marginRight: "20%",
	marginLeft: "20%",
	marginTop: "5%",
	marginBottom: "5%",
  fontSize: "20px"
}


var banner = {
 backgroundRepeat  : 'no-repeat',
 backgroundPosition: 'center',
 width: "100%"
}



export const AboutUs = () => {

	return (
			<div style={topHat}>
			<Center >
      <img style={banner} src={mainImg} alt="DealStryker About Us Banner"/>
	</Center>

<div style={centreBody}>
<p> We are a multi-faceted team with various backgrounds that came together around an idea we believe will
revolutionize the way people shop for larger purchases that are typically negotiated. <br /> <br />
The idea started with an issue we have all faced, purchasing a new car and the anxiety faced with negotiating a deal.
After a few weeks of brainstorming, we came up with the idea of creating a platform that would be mutually beneficial
 to the consumer and the seller. </p>

<p> We have created a way for consumers to save money by having dealerships compete
  for business, without the harassing emails and phone calls. </p>

  <p>	For the dealerships, we generate quality leads of local
  	individuals looking to purchase a vehicle.  Dealerships will be able to interact with consumers through an app
  and bring their sales platform into the 21st century.</p>
< br />
   <p>We aim to make the car buying experience convenient. </p>


</div>
<br />
			</div>

		);
};
