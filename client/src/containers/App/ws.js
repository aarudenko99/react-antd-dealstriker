import io from 'socket.io-client';
import { SOCKET_URI } from '../LiveBidsPage/config';

let callbacks = {
    get_userId: () => {},
    get_isDealer: () => {},
    set_bids: () => {},

    user_connected: () => {},
    offer_request_success: () => {},
    offer_request_created: () => {},
    offer_created: () => {},
    subscribeToChat: () => {},
    get_props: () => {},
};
export let socket;

export const getStatusSocket = function () {
    return !!socket;
};

export const sendMessage = function (type, message, callback) {
    socket.emit(type, message, callback);
};

export const setCallbacks = function(_callbacks){
    callbacks = {...callbacks, ..._callbacks};
};

export function createSocket(props, _callbacks) {
    socket = io(SOCKET_URI);
    _callbacks && setCallbacks(_callbacks);

    socket.on('connect', () => {
        log();

        socket.emit('USER_CONNECT', callbacks.get_userId(), (bidsArr) => {
            callbacks.user_connected(bidsArr);
            callbacks.subscribeToChat(bidsArr);
            callbacks.set_bids(bidsArr);
        });
    });

    socket.on('OFFER_REQUEST_CREATED', (offerRequest) => {
        const { bids, actions } = callbacks.get_props();
        actions.setBids([...bids, offerRequest]);
        actions.addUnread({ id: offerRequest._id });
    });

    socket.on('OFFER_CREATED', (offer) => {
        const { bids, actions } = callbacks.get_props();
        const newBids = [...bids];

        const newOfferParentIndex = bids.findIndex((bid) => bid._id === offer.parentBidId);
        if (newOfferParentIndex !== -1 && bids[newOfferParentIndex] && newBids[newOfferParentIndex].responses) {
            newBids[newOfferParentIndex].responses.push(offer);
            actions.setBids(newBids);
            actions.addUnread({ id: offer._id });
        }
        callbacks.offer_created(offer);
    });

    socket.on('OFFER_ACCEPTED', (bidId, offerId) => {
        const { bids, actions } = callbacks.get_props();

        const acceptedOfferParentIndex = bids.findIndex((bid) => bid._id === bidId);
        if (acceptedOfferParentIndex >= 0) {
            const newBidsArr = [...bids];
            let foundedOfferIndex =
                newBidsArr[acceptedOfferParentIndex] && newBidsArr[acceptedOfferParentIndex].responses.findIndex((offer) => offer._id === offerId);
            if (foundedOfferIndex >= 0) {
                newBidsArr[acceptedOfferParentIndex].responses[foundedOfferIndex].isAccepted = true;
                actions.setBids(newBidsArr);
            }
        }
    });

    socket.on('END_CAMPAIGN', (bidId) => {
        const { bids, actions, unreadLiveBids } = callbacks.get_props();
        const newLiveBids = [...bids];

        const bidIndex = newLiveBids.findIndex((bid) => bid._id === bidId);
        if (bidIndex >= 0) {
            newLiveBids[bidIndex].isClosed = true;
            actions.removeUnread({ id: bidId });
            const offersArr = newLiveBids[bidIndex].responses;
            if (offersArr && offersArr.length)
                offersArr.forEach((offer) => {
                    offer.isClosed = true;
                });
        }

        actions.setBids(newLiveBids);
    });

    socket.on('OFFER_UPDATED', (bidId, offerId, { price }) => {
        const { bids, actions, unreadLiveBids } = callbacks.get_props();

        const offerParentIndex = bids.findIndex((bid) => bid._id === bidId);
        if (offerParentIndex !== -1) {
            const newBidsArr = [...bids];
            let foundedOfferIndex =
                newBidsArr[offerParentIndex] && newBidsArr[offerParentIndex].responses.findIndex((offer) => offer._id === offerId);
            if (foundedOfferIndex !== -1 && newBidsArr[offerParentIndex]) {
                newBidsArr[offerParentIndex].responses[foundedOfferIndex].price = price;
                actions.setBids(newBidsArr);
                if (unreadLiveBids && unreadLiveBids.indexOf(offerId) === -1)
                    actions.addUnread({ id: offerId });
            }
        }
    });
}

export const disconnect = () => {
    if (socket) socket.close();
    console.log('disconnect socket');
};

function log() {
    console.log(`Create offer ${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'} socket connected`);
}
