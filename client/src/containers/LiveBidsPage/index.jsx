import React from "react";
import { Button, Modal, Input, Table, message, Empty, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigButton from "../../components/BigButton";
import AreaTable from './../../components/AreaTable';
import { actions as bidsActions }  from '../../store/bids';
import { actions as chatActions }  from '../../store/chat';
import { actions as requestActions }  from '../../store/requestForm';
import { actions as userActions }  from '../../store/user';
import { sendMessage } from '../App/ws.js'
import "./style.css";

class LiveBidsPage extends React.Component {
  constructor(props) {
    super(props);
    this.priceInput = React.createRef();
  }

  state = {
      visible: false,
      requestId: '',
  };

  handleMarkRead = (id) => {
    const { userId, actions } = this.props;
    sendMessage('MARK_AS_READ', { userId, id }, (res) => {
      if (res === true) {
        actions.removeUnread({ id });
      }
    });
  };

  renderTable = (bids) => {
    const {userId, isDealer, isLoading, unreadLiveBids} = this.props;

    const filtered = bids.filter(el => !el.isClosed);
    if (!isLoading && (!filtered || !filtered.length)) {
      return (<Table
          dataSource={filtered}
          columns={this.getColumns()}
          locale={this.getLocale()}/>);
    }
    else {
      return filtered.map((bid) => {
        return <AreaTable
            key={bid._id}
            id={bid._id}
            unreadLiveBids={unreadLiveBids}
            handleMarkRead={this.handleMarkRead}
            userId={userId}
            isDealer={isDealer}
            dataSource={bid.responses}
            requestInfo={bid}
            setBidClosed={this.setBidClosed}
            columns={this.getColumns()}
            loading={isLoading}
            locale={this.getLocale()}/>
      });
    }
  };

  renderTable2 = (bids) => {
    const { isLoading, unreadLiveBids } = this.props;
    const filtered = bids.filter(bid => !bid.isClosed);
        return (<Table
          dataSource={filtered}
          columns={this.getColumns()}
          loading={isLoading}
          locale={this.getLocale()}
          rowClassName={(record) => unreadLiveBids.indexOf(record._id) !== -1 ? 'new' : ''}
          onRow={(record) => {
            return {
              onMouseEnter: () => {
                return unreadLiveBids.indexOf(record._id) !== -1 ? this.handleMarkRead(record._id) : {}
              },
            };
          }}
        />)
  };

  setBidClosed = (bidId) => {
    const { bids, actions } = this.props;
    const newLiveBids = [...bids];

    const bidIndex = newLiveBids.findIndex((bid) => bid._id === bidId);
    if (bidIndex >= 0) {
      newLiveBids[bidIndex].isClosed = true;
      const offersArr = newLiveBids[bidIndex].responses;
      if (offersArr && offersArr.length)
        newLiveBids[bidIndex].responses.forEach((offer) => {
          offer.isClosed = true;
          actions.removeUnread({ id: offer._id });
        });
    }

    actions.setBids(newLiveBids);
  };

  clickRedirectToOffers = () => {
      this.props.history.push('/dash')
  };

  clickRedirectToChat = () => {
      this.props.history.push('/dash/chat')
  };

  onCancel = () => {
      this.setState({ visible: false })
  };

  onClickDealer = (requestId) => {
    const { userId, bids, actions } = this.props;
    const foundedBid = bids && bids.find((bid) => bid._id === requestId);
    if (foundedBid && foundedBid.responses) {
      const foundedOwnOffer = foundedBid.responses.find((offer) => offer.dealerId === userId);
      if (foundedOwnOffer) {
        if (foundedOwnOffer.isAccepted) {
          return actions.setRecipient({ offerId: foundedOwnOffer._id });
        }
        else return this.setState({ visible: true, requestId });
      }
    }
    return this.setState({ visible: true, requestId });
  };

  dealerActionBtn = (requestId) => {
    const { userId } = this.props;
    const { bids } = this.props;
    const foundedBid = bids && bids.find((bid) => bid._id === requestId);
    if (foundedBid && foundedBid.responses) {
      const foundedOwnOffer = foundedBid.responses.find((offer) => offer.dealerId === userId);
      if (foundedOwnOffer) {
        if (foundedOwnOffer.isAccepted) return 'Chat';
        else return 'Update';
      }
    }
    return 'Bid on Lead';
  };

  requestPrice = () => {
    const { requestId } = this.state;
    const { userId, bids, actions } = this.props;
    const requestData = {
      requestId,
      dealerId: userId,
      price: this.priceInput.current.input.value,
    };
    const newBids = [...bids];

    sendMessage('OFFER_CREATED', requestData, (code, offer) => {
      if (code === 200 && offer) {
        message.success('Offer was created successfully');
        let bidIndex;
        if (offer.parentBidId) {
          bidIndex = newBids.findIndex((bid) => offer.parentBidId === bid._id);
          if (bidIndex >= 0) {
            newBids[bidIndex].responses = [...newBids[bidIndex].responses, offer];
            actions.setBids([...newBids]);
          }
        }
      }
      else if (code === 201 && offer) message.success('Offer was updated');
      else message.success(`Offer update failed ${code}`);
    });

    this.onCancel();
  };

  connectDealership = (offerId) => {
    const { bids, actions } = this.props;

    sendMessage('OFFER_ACCEPTED', offerId, (foundedOffer) => {
      if (foundedOffer) {
        const bidId = foundedOffer.parentBidId;
        const newLiveBids = [...bids];
        const bidIndex = newLiveBids.findIndex((bid) => bid._id === bidId);
        if (bidIndex >= 0) {
          const offersArr = newLiveBids[bidIndex].responses;
          if (offersArr && offersArr.length) {
            newLiveBids[bidIndex].responses.some((offer) => {
              if (offer._id === offerId) {
                offer.isAccepted = true;
                return true;
              }
              return false;
            });
          }
        }
        actions.setBids(newLiveBids);
        actions.setRecipient({ offerId: foundedOffer._id });
        console.log('offer accepted successfully');
      }
      else console.log('offer acceptation error');
    });
  };

  getColumns = () => {
    const { isDealer } = this.props;

    if (isDealer) {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
        },
        {
          title: 'Manufacturer',
          dataIndex: 'manufacturer',
          key: 'manufacturer',
        },
        {
          title: 'Model',
          dataIndex: 'car',
          key: 'car',
        },
        {
          title: 'Trim',
          dataIndex: 'model',
          key: 'model',
        },
        {
          title: 'Finance Option',
          dataIndex: 'financing',
          key: 'financing',
        },
        {
          title: 'Action',
          dataIndex: '_id',
          key: '_id',
          render: requestId => (
            <span>
              {<Button onClick={() => this.onClickDealer(requestId)}>{this.dealerActionBtn(requestId)}</Button>}
            </span>
          )
        }
      ];
    } else {
      return [
        {
          title: 'Dealership',
          dataIndex: 'dealerName',
          key: 'dealerName'
        },
        {
          title: 'Offers',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Actions',
          dataIndex: '_id',
          key: '_id',
          render: offerId =>
          <span>
              <Button onClick={() => this.connectDealership(offerId)}>Connect With Dealership</Button>
          </span>
        }
      ];
    }
  };

  getLocale = () => {
    const {isDealer} = this.props;
    return ({
        emptyText:
          <Empty
            description={isDealer ?
              'Sorry no leads are available right now, please check back later!' :
              'Sorry no offers are available right now, please check back later!'
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
      })
  };

  render() {
    const { isDealer, history, bids, isLoading, unreadLiveBids } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        <section className="main-info">
          <div className="live-bids">
            <div className="live-bids-wrapper-big-button">
              <BigButton
                text="Offers"
                unreadCount={unreadLiveBids.length}
                clickRedirect={this.clickRedirectToOffers}
                isSelected={history.location.pathname === '/dash'}
              />
              <BigButton
                text="Chatting"
                clickRedirect={this.clickRedirectToChat}
                isSelected={history.location.pathname === '/dash/chat'}
              />
            </div>
            <div className="live-bids-head">
              {!isDealer && bids && !isLoading && bids.filter(bid => !bid.isClosed).length < 3 &&
              <Button type="default" onClick={() => history.push('/dash/requestOffer')}>Create new request</Button>}
            </div>
            {isLoading ?
              <div className="live-bids-spinner"><Spin size="large" /></div> :
                isDealer ? this.renderTable2([...bids].reverse()) : this.renderTable([...bids].reverse())
            }
          </div>
        </section>

        <Modal title='Create offer'
          className="BindOnLeadModal"
          visible={visible}
          onCancel={this.onCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.requestPrice}>
              Submit
            </Button>,
          ]}
        >
          <Input ref={this.priceInput} placeholder="Offer Price" />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { decodedJWT } = state.loginForm;
  const { bids = [], loading } = state.bids;
  const { isLoading: isLoadingUserData, unreadLiveBids = [] } = state.user;
  return {
    isDealer: decodedJWT && decodedJWT.role === 'dealer',
    userId: decodedJWT.id,
    requests: state.requestF,
    bids: bids,
    isLoading: loading,
    isLoadingUserData,
    unreadLiveBids,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bidsActions,
    ...chatActions,
    ...requestActions,
    ...userActions
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveBidsPage);
