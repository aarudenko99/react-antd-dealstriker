import ChatPage from '../containers/ChatPage';
import OfferRequestPage from '../containers/OfferRequestPage';
import LiveBidsPage from './../containers/LiveBidsPage';

export const dealerRoutes = [
    {
        path: '/dash',
        component: LiveBidsPage,
        exact: true,
    },
    {
        path: '/dash/chat',
        component: ChatPage,
        exact: true,
    },
    {
        path: '/dash/createOfferRequest',
        component: OfferRequestPage,
        exact: true,
    }

];

export const customerRoutes = [
    {
        path: '/dash',
        component: LiveBidsPage,
        exact: true,
    },
    {
        path: '/dash/chat',
        component: ChatPage,
        exact: true,
    },
    {
        path: '/dash/requestOffer',
        component: OfferRequestPage,
        exact: true,
    }
];

