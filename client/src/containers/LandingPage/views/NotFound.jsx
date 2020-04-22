import React from 'react';

var styles = {
	centrePuppy: {
		width: "25%",
		marginLeft: "37.5%",
		marginRight: "37.5%",
	  marginTop: "3%",
	}
}


export const NotFound = () => {
    return (
      <div>
      <br />
      <br />
<img style={styles.centrePuppy} src='/assets/sadDoggo.jpg' alt='DealStryker - Sad Pupper' /> <br /> <br />
<h4 style={{ textAlign:'center'}} >{"We're"} Sorry, but this page is not available. <br /> <br />
<h5 style={{ textAlign:'center'}} > <a href="mailto:contact@dealstryker.com" > If you think you arrived here by error please let us know by clicking here. </a></h5>

<br />

<a href='/'> Click Me to Return Home! </a> </h4>
< br /> < br / >

</div>
    )
}
