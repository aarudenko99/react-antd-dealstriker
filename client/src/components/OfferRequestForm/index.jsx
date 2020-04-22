import React from "react";
import {Form, Input, Button, Radio, Spin, message} from "antd";
import Carousel from 'nuka-carousel';
import cn from 'classnames';
import carLogos from "../../assets/img/car_companies_logos";
import { sendMessage } from './../../containers/App/ws';
import { getNextSlideIndex } from "./utils";
import "./style.css";

class OfferRequestForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isSending: false,
        isCompleted: false,
        step: 0,
        selectedManufacturer: null,
        selectedCar: null,
        selectedColor: null,
        selectedModel: null,
        selectedVehicleId: null
    };

    componentDidMount(prevProps, prevState, snapshot) {
        const { actions } = this.props;
        actions.getManufacturers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isSending !== prevState.isSending && !this.state.isSending) {
            this.setState({ isCompleted: true });
        }
    }

    handleSubmit = (e, notAuthorized = false) => {
        const { history, form, id, bids, actions } = this.props;
        const { selectedManufacturer, selectedCar, selectedColor, selectedModel, selectedVehicleId } = this.state;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ isSending: true });
                const preparedObj = {
                    ...values,
                    manufacturer: selectedManufacturer,
                    car: selectedCar,
                    color: selectedColor,
                    model: selectedModel,
                    vehicleId: selectedVehicleId,
                    userId: id
                };

                if (notAuthorized) {
                    localStorage.setItem('offerRequestProgress', JSON.stringify(preparedObj));
                    history.push('/signup');
                }
                else {
                    sendMessage('OFFER_REQUEST_CREATED', preparedObj, (code, offerRequest) => {
                        if (code === 200 && offerRequest) actions.setBids([...bids, offerRequest]);
                        else if (code === 400) message.info("Sorry, we are not in your area yet. Sign up to be notified when we are", 10);
                        else if (code === 409) message.error("Limited to 3 bids at a time", 10);
                        this.setState({ isSending: false })
                    });
                }
            }
        });
    };

    handleReturnBack = () => {
        const { history } = this.props;
        history.push('/dash');
    };

    getVehicles = (manufacturerName) => {
        const { actions, manufacturers } = this.props;
        const manufacturer = manufacturers.find((item) => item.name === manufacturerName);
        actions.getVehicles(manufacturer);
    };

    setManufacturer = (manufacturer) => {
        const { actions } = this.props;
        const { selectedManufacturer } = this.state;
        if (!selectedManufacturer) this.setState({
            selectedManufacturer: manufacturer
        });
        actions.getVehicles(manufacturer);
    };

    setCar = (vehicle) => {
        const { selectedCar } = this.state;
        if (!selectedCar) this.setState({
            selectedCar: vehicle.name
        });
    };

    setColor = (colorName) => {
        const { selectedColor } = this.state;
        if (!selectedColor) this.setState({
            selectedColor: colorName
        });
    };

    setModel = (model) => {
        const { selectedModel, step } = this.state;
        if (!selectedModel) this.setState({
            selectedModel: model.id,
            selectedVehicleId: model.id,
            step: step + 1
        });
    };

    clearCarousel = () => {
        this.setState({
            selectedManufacturer: null,
            selectedCar: null,
            selectedColor: null,
            selectedModel: null,
            selectedVehicleId: null
        });
    };

    renderMobileGrids = (content) => {
        const grids = [];
        if (content && content.length) {
            for (let i = 0; i < content.length; i = i + 2)
                grids.push(<div className="cardC" key={i}>{content.slice(i, i + 2)}</div>);
        }
        return grids;
    };

    renderCarouselContent = () => {
        const {  manufacturers, vehicles, mobileQueryMatches } = this.props;
        const { selectedManufacturer, selectedCar, selectedColor } = this.state;
         if (!selectedManufacturer) {
            return manufacturers ? manufacturers.map((item, index) =>
              <div className={mobileQueryMatches ? "" : "cardC"} key={index} onClick={() => this.setManufacturer(item)}>
                <div className="imgWrapper">
                  <img src={carLogos[item.replace(' ', '').replace('-', '')]} alt={item} />
                </div>
              </div>)
            : []
        } else if (!selectedCar) {
            return vehicles ? vehicles.map((item, index) =>
              <div className={mobileQueryMatches ? "" : "cardC"} key={index} onClick={() => this.setCar(item)}>
                <div className="imgWrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <span>{item.name}</span>
              </div>)
            : []
        } else if (!selectedColor) {
            const carColors = vehicles.find(vehicle => vehicle.name == selectedCar).colors;
            return carColors ? Object.entries(carColors).map((item, index) =>
              <div className={mobileQueryMatches ? "" : "cardC"} key={index} onClick={() => this.setColor(item[1].oem_name)}>
                <div className="imgWrapper">
                  <img src={item[1].url} alt={item[1].oem_name} />
                </div>
                <span>{item[1].oem_name}</span>
              </div>)
            : []
        } else {
            const carTrims = vehicles.find(vehicle => vehicle.name == selectedCar).trims;
            return carTrims ? carTrims.map((item) =>
              <div className={mobileQueryMatches ? "" : "cardC"} key={item.id} onClick={() => this.setModel(item)}>
                <div className="imgWrapper">
                  <img src={item.url} alt={item.id} />
                </div>
                <span>{item.id}</span>
              </div>)
            : []
        }
    };

    getSlidesToShowCount = (items) => {
        const { isLoading, mobileQueryMatches } = this.props;
        if (isLoading) return 1;
        if (mobileQueryMatches) {
            if (items && items.length > 0 && items.length <= 2) return items.length;
            else return 2;
        } else {
            if (items && items.length > 0) {
              if (items.length == 3 || items.length == 1)
                return 3;
              else
                return 4;
            }
        }
    };

    render() {
        const { isLoading, form, id, history, mobileQueryMatches } = this.props;
        const { getFieldDecorator } = form;
        const { isSending, isCompleted, step, selectedManufacturer, selectedCar, selectedColor, selectedModel } = this.state;
        const carouselItems = mobileQueryMatches ? this.renderMobileGrids(this.renderCarouselContent()) : this.renderCarouselContent();

        return (
            <section className="offer">
                <div className="ant-col-md-8 offer-wrapper">
                    <div className="offer-info">
                        {history.location.pathname !== '/dash/requestOffer' ? <div className="home-section-1" /> : null}
                        <h4 className="align">Select Below to Get Started </h4>
                    </div>
                    <Form onSubmit={this.handleSubmit} className={cn("OfferPage", step > 0  ? "carSelected" : '')}>
                        <div className={"indicators" + (step !== 0 ? ' hidden': '')}>
                            <div className="selectedOptions">
                                {selectedManufacturer ? <div>{selectedManufacturer}</div> : null}
                                {selectedCar ? <div>{selectedCar}</div> : null}
                                {selectedColor ? <div>{selectedColor}</div> : null}
                                {selectedModel ? <div>{selectedModel}</div> : null}
                            </div>
                            {selectedManufacturer ? <Button type="danger" onClick={this.clearCarousel}>Remove Selections</Button> : null}
                        </div>
                        <Carousel className={step !== 0 ? ' hidden': ''}
                                  slidesToShow={this.getSlidesToShowCount(carouselItems)}
                                  slidesToScroll={1}
                                  renderBottomCenterControls={() => false}
                                  wrapAround={!(carouselItems && carouselItems.length > 0 && carouselItems.length <= 5)}
                                  renderCenterLeftControls={({ currentSlide, goToSlide, slideCount }) => (
                                      <button onClick={(e) => {
                                          e.preventDefault();
                                          if (!isLoading) goToSlide(getNextSlideIndex(currentSlide, 'prev', mobileQueryMatches, slideCount))
                                      }}>←</button>
                                  )}
                                  renderCenterRightControls={({ currentSlide, goToSlide, slideCount }) => (
                                      <button onClick={(e) => {
                                          e.preventDefault();
                                          if (!isLoading) goToSlide(getNextSlideIndex(currentSlide, 'next', mobileQueryMatches, slideCount))
                                      }}>→</button>
                                  )}
                        >
                            {
                              mobileQueryMatches
                                ? carouselItems
                                : carouselItems.length == 2 || carouselItems.length == 1
                                  ? [<div></div>, ...carouselItems, <div></div>]
                                  : carouselItems
                            }
                        </Carousel>
                        <Form.Item className={"name" + (step !== 1 ? ' hidden': '')}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your nickname!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="Nickname"
                                    maxLength={10}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className={"zip" + (step !== 1 ? ' hidden': '')}>
                            {getFieldDecorator('zip', {
                                rules: [{ required: true, message: 'Please input your zip code!' },
                                    {
                                        pattern: /^[0-9\b]+$/,
                                        message: "Passwords should have at least 8 characters, a capitalized letter, number as well as special character."
                                    }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="Zip Code"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Travel Radius" className={"distance" + (step !== 1 ? ' hidden': '')} required={false}>
                            {getFieldDecorator('distance', {
                                rules: [{ required: true, message: 'Please select travel radius!' }],
                                initialValue: "30",
                            })(
                                <Radio.Group>
                                    <Radio value="30">30</Radio>
                                    <Radio value="50">50</Radio>
                                    <Radio value="100">100 miles</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="Financial Preference" className={"financing" + (step !== 1 ? ' hidden': '')} required={false}>
                            {getFieldDecorator('financing', {
                                rules: [{ required: true, message: 'Please select financial preference!' }],
                            })(
                                <Radio.Group>
                                    <Radio value="Dealer">Dealer</Radio>
                                    <Radio value="Outside">Outside</Radio>
                                    <Radio value="None">None</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        {!isCompleted ? (id ?
                            <Button loading={isSending} type="primary" htmlType="submit"
                                    className={"OfferPage-btn" + (step !== 1 ? ' hidden' : '')}>
                                Submit
                            </Button> :
                            <Button loading={isSending} type="primary" onClick={(e) => this.handleSubmit(e, true)}
                                    className={"OfferPage-btn" + (step !== 1 ? ' hidden' : '')}>
                                Submit
                            </Button>) :
                            <Button type="primary" className={"OfferPage-btn" + (step !== 1 ? ' hidden' : '')} onClick={this.handleReturnBack}>
                                Go to the main page
                            </Button>
                        }
                    </Form>
                    {history.location.pathname === '/dash/requestOffer' && step !== 1 ?
                        <Button type="ghost" onClick={this.handleReturnBack}>
                            Back to Live bids
                        </Button> : null
                    }
                </div>
            </section>
        );
    }
}

export default Form.create({ name: "createOfferRequest" })(OfferRequestForm);
