import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OfferRequestForm from "../../components/OfferRequestForm";
import { actions as bidsActions }  from '../../store/bids';
import { actions as requestActions } from '../../store/requestForm/index';
import injectMedia from "../../components/media";

class OfferRequestPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <OfferRequestForm {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  const { isLoading, error, manufacturers, vehicles } = state.requestForm;
  const { bids = [] } = state.bids;
  return {
    id: state.loginForm.decodedJWT && state.loginForm.decodedJWT.id,
    isLoading,
    error,
    manufacturers,
    vehicles,
    bids,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bidsActions,
    ...requestActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectMedia(OfferRequestPage));
