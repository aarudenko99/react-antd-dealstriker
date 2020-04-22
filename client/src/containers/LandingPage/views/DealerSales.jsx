import React from 'react';
import {Header} from ".././common/Header.jsx";
import Footer from "../../.././components/Footer/index.jsx";

var Center = require('react-center');


var styles = {
topHat: {
	marginTop: 50,
	height: "55vh"
},
centreBody: {
  marginRight: "20%",
	marginLeft: "20%",
	marginTop: "5%",
	marginBottom: "5%",
  fontSize: "20px"
},
}




export const DealerSales = () => {

	return (

<div>

<Header />


<div style={styles.topHat}>

		<h2 style={{ textAlign:'center'}} > Want a test drive? </h2>
		< br />  <br />
		<h3 style={{ textAlign:'center'}}> Email us to schedule a demo at <a href="mailto:contact@dealstryker.com ">contact@dealstryker.com</a> </h3>
		<br/ >
		<h3 style={{ textAlign:'center'}} > Or message us on Twitter <a href='https://twitter.com/DealStryker'> @DealStryker </a> </h3>
		<br />
		<br />
</div>

<Footer />
</div>

		);
};
