import React from "react";
import { Button } from 'antd';
import { NavLink } from 'react-router-dom'
import PropTypes from "prop-types";
import "./style.css";

class LiveBidsItem extends React.Component {
    

    render() {
        const {title, price} = this.props;
        return (
            <div className="live-bids-item">
                <div className="live-bids-item-wrapper">
                    <div className="live-bids-item-wrapper-text">
                        <p>{title}</p>
                    </div>
                    <div className="live-bids-item-wrapper-text">
                        <p>{price}</p>
                    </div>
                </div>
               
                <div>
                    <Button>Connect With Dealership</Button>
                </div>
                
               
            </div>
            
        )
    }
}

LiveBidsItem.propTypes = {
};

export default LiveBidsItem;
