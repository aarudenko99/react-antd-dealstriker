import React from "react";
import { Icon as AntdIcon } from 'antd';
import SettingsModal from "../../containers/App/settingsModal";
import "./style.css";

class Header extends React.Component {
    clickRedirectToOffers = () => {
        this.props.history.push('/dash')
    };

    clickLogOut = () => {
        this.props.actions.logOut()
    };

    render() {
        const { onOpenSettings } = this.props;
        return (
            <header className="header">
                <div className="header-menu">
                    <div className="logo" onClick={this.clickRedirectToOffers} />
                    <div className="header-menu-items">
                        <div className='logout' onClick={onOpenSettings}>
                            <AntdIcon type='setting' style={{ fontSize: '25px' }} />
                        </div>
                        <div className='logout' onClick={this.clickLogOut}>
                            <AntdIcon type='logout' style={{ fontSize: '25px' }} />
                        </div>
                        <SettingsModal />
                    </div>
                </div>
            </header>

        )
    }
}

export default Header;
