import React from 'react';
import { connect } from 'react-redux';
import { Empty, Spin } from "antd";
import PubNubReact from 'pubnub-react';
import ChatListItem from '../../components/ChatListItem';
import ChatArea from '../../components/ChatArea';
import { sendMessage } from "../App/ws";
import { actions as bidsActions } from "../../store/bids";
import { actions as userActions } from "../../store/user";
import moment from 'moment';
import BigButton from "../../components/BigButton";
import './style.css';

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-d44b856d-2e1a-49a9-819f-b0d5a5131a40',
      subscribeKey: 'sub-c-f3e02214-c80f-11e9-8cfd-2648cfa01a7d',
      ssl: true,
    });
    this.pubnub.init(this);
  }

  state = {
    currentOffer: undefined,
    recipientName: '',
    unreadCounts: {},
  };

  componentDidMount(prevProps, prevState, snapshot) {
    const { roomId, offers, isLoading, ownId } = this.props;
    const foundedOffer = offers.find((offer) => offer._id === roomId);
    this.loadChatData();
    if (roomId) {
      this.setState({ currentOffer: foundedOffer });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { roomId, offers, isLoading } = this.props;
    if ((isLoading !== prevProps.isLoading && !isLoading) || (offers && offers.length !== prevProps.offers.length)) {
      this.loadChatData();
    }
    if (roomId !== prevProps.roomId && roomId) {
      const foundedOffer = offers.find((offer) => offer._id === roomId);
      this.setState({ currentOffer: foundedOffer });
    }
  }

  componentWillUnmount() {
    this.pubnub.unsubscribeAll();
  }

  loadChatData = () => {
    const { offers, isLoading, ownId } = this.props;

    if (!isLoading && offers) {
      // this.pubnub.unsubscribeAll();
      this.pubnub.subscribe({ channels: offers.map(offer => offer._id), triggerEvents: true, autoload: 100 });
      offers.forEach((offer) => {
        this.pubnub.getMessage(offer._id, res => {
          if (this.state.unreadCounts && this.state.unreadCounts[offer._id] >= 0 && ownId !== res.message.userId) {
            this.setState({
              unreadCounts: {
                ...this.state.unreadCounts,
                [offer._id]: this.state.unreadCounts[offer._id] + 1,
              }
            })
          }
        })
      });
      if (offers.length) {
        sendMessage('GET_LAST_SEEN_LIST', {userId: ownId}, (list) => {
          this.pubnub.messageCounts({
            channels: offers.map(offer => offer._id),
            channelTimetokens: [offers.map(offer => list[offer._id] ? list[offer._id].toString() : (new Date().getTime() * 100000).toString())],
          }, (status, results) => {
            if (results && results.channels) this.setState({unreadCounts: results.channels});
          });
        });
      }
    }
  };

  handleEndCampaign = () => {
    const { bids, actions, ownId } = this.props;
    const { currentOffer } = this.state;
    sendMessage("END_CAMPAIGN", { userId: ownId, bidId: currentOffer.parentBidId }, (res) => {
      if (!res.error) {
        const newLiveBids = [...bids];

        const bidIndex = newLiveBids.findIndex((bid) => bid._id === currentOffer._id);
        if (bidIndex >= 0) {
          newLiveBids[bidIndex].isClosed = true;
          const offersArr = newLiveBids[bidIndex].responses;
          if (offersArr && offersArr.length)
            offersArr.forEach((offer) => {
              offer.isClosed = true;
              actions.removeUnread({ id: offer._id });
            });
        }
        actions.setBids(newLiveBids);
      }
    })
  };

  send = (text, type, formDate) => {
    const {ownId, decodedJWT} = this.props;
    const {currentOffer} = this.state;
    let message = {
      type: type,
      text,
      formDate,
      userId: ownId,
      name: decodedJWT.email,
      date: moment().format('X')
    };

    if (currentOffer && currentOffer._id) {
      this.handleMarkAsRead(currentOffer._id, currentOffer && currentOffer._id ? this.pubnub.getMessage(currentOffer._id) : []);
      this.pubnub.publish({
        message,
        channel: currentOffer._id,
        storeInHistory: true,
        sendByPost: true,
      });
      sendMessage('MESSAGE_SEND', { userId: ownId, offerId: currentOffer._id, message });
    }
  };

  handleMarkAsRead = (offerId, messagesList) => {
    const { ownId } = this.props;
    let timeToken;
    if (messagesList && messagesList.length && messagesList[messagesList.length - 1]) timeToken = messagesList[messagesList.length - 1].timetoken;
    sendMessage('SET_LAST_SEEN', { userId: ownId, offerId, date: timeToken ? timeToken.toString() : (new Date().getTime() * 100000).toString() }, (status) => {
      if (status === true) this.setState({ unreadCounts: { ...this.state.unreadCounts, [offerId]: 0 } })
    });
  };

  clickRedirectToOffers = () => {
    this.props.history.push('/dash');
  };

  clickRedirectToChat = () => {
   this.props.history.push('/dash/chat');
  };


  render() {
    const {ownId, decodedJWT, isDealer, offers, isLoading, unreadLiveBids, history} = this.props;
    const {currentOffer, unreadCounts} = this.state;
    const messages = currentOffer && currentOffer._id ? this.pubnub.getMessage(currentOffer._id) : [];

    let user = {
      id: ownId,
      avatar: "",
      name: decodedJWT.email,
      lastMessage: "Gooo"
    };

    return (
        <div className="chat-wrapper">
          <section className="chat">
            <div className="chat-top-buttons">
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
            <div className="message-container">
              <span className="message-container-title">Chat</span>
              {isLoading ? <div className="live-bids-spinner"><Spin size="large" /></div> :
                  offers && offers.length ? <div className="message-container-area">
                <div className="chatlist">
                  {offers.map((item) =>
                    <ChatListItem
                      isDealer={isDealer}
                      key={item._id}
                      {...user}
                      offer={item}
                      unreadCount={unreadCounts[item._id]}
                      onMarkAsRead={unreadCounts[item._id] ? () => this.handleMarkAsRead(item._id, messages) : null}
                      isCurrent={currentOffer && currentOffer._id === item._id}
                      isClosed={item.isClosed}
                      send={this.send}
                      onChangeOffer={(offer) => this.setState({ currentOffer: offer })}
                    />)
                  }
                </div>

                <div className={"chat-area" + (currentOffer && currentOffer.isClosed ? ' closed' : '')}>
                  <ChatArea
                      toUser={user}
                      send={this.send}
                      messages={messages ? messages.map((res) => res.message) : []}
                      onMarkAsRead={currentOffer && unreadCounts[currentOffer._id] ? () => this.handleMarkAsRead(currentOffer._id, messages) : null}
                      selfID={ownId}
                      recipientName={currentOffer && (isDealer ? currentOffer.customerName : currentOffer.dealerName)}
                      disabled={!currentOffer}
                      isClosed={currentOffer && currentOffer.isClosed}
                      isDealer={isDealer}
                      endCampaign={this.handleEndCampaign}
                      unreadCount={unreadCounts && currentOffer && unreadCounts[currentOffer._id]}
                  />
                </div>
              </div> : <Empty
                  description={
                    isDealer ? 'Sorry no chatting is available right now, please check back later!' :
                        'Sorry no offers are available right now, please check back later!'
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
          </section>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { decodedJWT } = state.loginForm;
  const { bids = [], loading } = state.bids;
  const { roomId } = state.chat;
  const { unreadLiveBids } = state.user;
  const offers = [];
  bids.forEach((bid) => offers.push(...bid.responses.filter(offer => offer.isAccepted)));
  offers.forEach((offer) => {
    const parentBid = bids.find((bid) => bid._id === offer.parentBidId);
    if (parentBid && parentBid.name) offer.customerName = parentBid.name;
  });

  return {
    isDealer: decodedJWT && decodedJWT.role === 'dealer',
    ownId: decodedJWT && decodedJWT.id,
    decodedJWT,
    roomId,
    bids,
    offers,
    isLoading: loading,
    unreadLiveBids,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bidsActions,
      ...userActions,
    },
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatPage);
