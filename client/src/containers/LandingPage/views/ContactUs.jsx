import React from 'react';

var styles = {
centre: {
	marginLeft: "30%",
	marginRight: "20%",
	width: "50%",
	marginBottom: "5%",
  height: "50vh",
  marginTop: "7%"
}
}



export const ContactUs = () => {
    return (
      <div style={styles.centre}>
      <h3> Want to get a hold of us?
       We would love to hear from you. </h3> <br/>
      <h3> Best way to reach us is emailing us at   <a href="mailto:contact@dealstryker.com ">contact@dealstryker.com</a> </h3>

      <br/>
      <h3> Or messaging us on Twitter <a href='https://twitter.com/DealStryker'> @DealStryker </a> </h3>
      <br />
      <br />
      </div>
    )
}
