import React from 'react';
import { connect } from 'react-redux'
import { LocalSignUp } from '../../container/actions/auth';
import { SelectOption } from '../common/SelectOption';
import { Container, Row, Col } from 'react-bootstrap';

class DellerSign extends React.Component {
  state = {
    step: 1,
    car_models: [],
    accountType: "dealer"
  }

  handleChangeSelect = (value) => {
    this.setState({
      car_models: value
    })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    if (email && password) {
      this.props.LocalSignUp({
        email,
        password,
        // role: this.state.accountType
      })
    } else {
      alert("Cannot submit without email and password")
    }
  }

  render() {
    return (
      <Container>
        <Row>
        <Col md="2"></Col>
        <Col md="8">
          <div className="progessbar-container">
            <ul className="progessbar">
              <li className={`${this.state.step === 2 && "active"}`}>Step 1</li>
              <li className={`${this.state.step === 2 && "active-before"}`}>Step 2</li>
            </ul>
          </div>

          <div className="from-wrapper">
            <h5>Signup as Dealer</h5>
            {this.state.step === 2 && (
              <div className="step-2">
                <p>Car Brands List:</p>
                <SelectOption
                  handleChange={this.handleChangeSelect}
                  defaultValue={this.state.car_models}
                />
              </div>
            )}

            {this.state.step === 1 && (
              <form>
                <div className={`form-group`}>
                  <label className="control-label" htmlFor="dealership-name">
                    <i className="fas fa-pen"></i>
                  </label>
                  <input
                    className="form-control"
                    id="dealership-name"
                    placeholder="Dealership Name"
                    name="dealership-name"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="street-address">
                    <i className="far fa-address-card"></i>
                  </label>
                  <input
                    className="form-control"
                    id="street-address"
                    placeholder="Street Address"
                    name="street-address"
                    onChange={this.handleChange}
                    type={"text"}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="zip-code">
                    <i className="fas fa-map-pin"></i>
                  </label>
                  <input
                    className="form-control"
                    id="zip-code"
                    placeholder="Zip Code"
                    name="zip-code"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="email">
                    <i className="fas fa-envelope"></i>
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group form-lm">
                  <label className="control-label" htmlFor="password">
                    <i className="fas fa-lock"></i>
                  </label>
                  <input
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            )}
          </div>
          {this.state.step === 2 && (
            <div className="text-right submit de-submit">
              <button
                className="btn btn-lg from-btn"
                onClick={this.handleSubmit}
              >SIGN UP <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
          <div className="modal-footer de-modal-footer">
            <div className="fsb">
              {this.state.step !== 1 && (<button className="btn btn-lg from-btn mr" onClick={() => { this.setState((prevState) => ({ step: prevState.step - 1 })) }}><i className="fas fa-long-arrow-alt-left"></i>Preveous</button>)}
              {this.state.step !== 2 && (<button className="btn btn-lg from-btn fr" onClick={() => { this.setState((prevState) => ({ step: prevState.step + 1 })) }}>Next<i className="fas fa-long-arrow-alt-right"></i></button>)}
            </div>
          </div>
          </Col>
        </Row>
      </Container>

    )
  }
}

const mapState = (state) => ({

})

const mapDispatch = dispatch => ({
  LocalSignUp: (payload) => dispatch(LocalSignUp(payload))
})

export const Register = connect(mapState, mapDispatch)(DellerSign);
