import React from "react";
import { Button } from 'antd';
import { NavLink } from 'react-router-dom'
import PropTypes from "prop-types";
import "./style.css";

class BigButton extends React.Component {

    render() {
        const { text, isSelected, unreadCount } = this.props;

        return (
            <Button className={"big-btn" + (isSelected ? ' selected' : '')} onClick={this.props.clickRedirect}>
                {text}
                {unreadCount ? <div className="big-btn-unread">{unreadCount}</div> : null}
            </Button>

        )
    }
}

BigButton.propTypes = {
};

export default BigButton;
