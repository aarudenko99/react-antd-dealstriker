import React from "react";
import {Input, Icon, Button, Upload, message} from 'antd';
import moment from 'moment';
import "./style.css";
import {API_URL} from "../../api";
import makeAuthManager from "../../managers/auth";

class ChatArea extends React.Component {
  constructor(props) {
    super(props);
    this.chatAreaRef = React.createRef();
    this.outTheDoorPriceRef = React.createRef();
  }

  state = {
    value: '',
    messagesPrev: [],
    uploadedFile: '',
    isUploading: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages } = this.props;
    if (this.chatAreaRef.current && messages && messages.length !== prevState.messagesPrev.length) {
      this.chatAreaRef.current.scrollTop = this.chatAreaRef.current.scrollHeight;
      this.setState({ messagesPrev: [...messages] });
    }
  }

  renderForm = (msg) => {
    const { isDealer, messages, send } = this.props;
    let price;
    if (messages) {
      const foundedPriceResponse = messages.find((message) =>
          message.formDate && message.formDate === msg.date);
      if (foundedPriceResponse) price = foundedPriceResponse.text;
    }

    return <div>
      <p className="area-item-block-message-form">
        {isDealer ?
            'The potential buyer is requesting the full out the door price. This price includes taxes, titles and other fees that are associated with purchasing the vehicle' :
            'Requested Out The Door Price'}
      </p>
      {isDealer && !price ? <Input ref={this.outTheDoorPriceRef} placeholder='Price' addonAfter={
        <Icon
            type='arrow-right'
            onClick={() => send(this.outTheDoorPriceRef.current.input.value, 'outTheDoorResponse', msg.date)}
        />
      } /> : price}
    </div>
  };

  renderAreaIterm = () => {
    const { selfID, messages, unreadCount } = this.props;

    return messages.map((msg, i) => {
      if (msg.type !== 'outTheDoorResponse')
        return <div
            key={i}
            className={"area-item" + (msg.userId === selfID ? " self" : " notSelf") + (unreadCount && i >= messages.length - unreadCount ? " new" : "")}
        >
          <div className="area-avatar"/>
          <div className="area-item-block">
            {!msg.type ? <p className="area-item-block-message">{msg.text}</p> : null}
            {msg.type === 'outTheDoorPrice' ? this.renderForm(msg) : null}
            {msg.type === 'file' ?
              <a href={msg.text} className="area-item-block-message"><Icon type='file'/>{` Download ${this.getFileNameFromPath(msg.text)}`}</a> : null}
            <div className="area-item-block-clock">
              <span className="area-item-block-clock-text">
                {moment(+msg.date * 1000).format('h:mm a')}
              </span>
            </div>
          </div>
        </div>
      else return null;
    })
  };

  onClear = () => {
    const { uploadedFile } = this.state;
    if (uploadedFile) {
      this.setState({ uploadedFile: '' });
    }
  };

  onSubmit = () => {
    const { value, uploadedFile } = this.state;
    if (value) {
      this.props.send(value);
      this.setState({ value: '' });
    }
    else if (uploadedFile) {
      this.props.send(uploadedFile, 'file');
      this.setState({ uploadedFile: '' });
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  beforeUpload = (file) => {
    const isLt2M = file.size <= 2 * 1024 * 1024;
    if (!isLt2M) message.error('File must smaller than 2MB!');
    else this.setState({ isUploading: true });
    return isLt2M;
  };

  getFileNameFromPath = (path) => {
    let fileName;
    const lastSlash = path.lastIndexOf('\\');
    if (lastSlash !== -1) fileName = path.slice(lastSlash + 1);
    return fileName;
  };

  getHeaders = () => {
    const authManager = makeAuthManager({ storage: localStorage });
    const credentials = authManager.getCredentials();
    if (credentials) {
      return {
        authorization: `Token ${credentials}`,
      };
    }
    return {};
  };

  render() {
    const { disabled, recipientName, endCampaign, isClosed, isDealer, onMarkAsRead } = this.props;
    const { value, uploadedFile, isUploading } = this.state;

    return (
      <div className="chat-message" onClick={onMarkAsRead}>
        <div className={"chat-list-item" + (!recipientName ? ' hidden' : '')}>
          <div className="chat-list-item-info">
            <div className="chat-list-item-avatar" />
            <p className="chat-name">{recipientName} {isClosed ? <span>Closed</span> : null}</p>
          </div>
        </div>
        <div ref={this.chatAreaRef} className="area">
            {this.renderAreaIterm()}
        </div>
        <div className="chat-controls">
          {!isDealer ?
            <React.Fragment>
              <Button type="danger" disabled={disabled || isClosed} onClick={endCampaign}>End Campaign</Button>
              <Button type="primary" disabled={disabled || isClosed} onClick={() => this.props.send('', 'outTheDoorPrice')}>Request Out The Door Price</Button>
              <Upload
                  name='attachment'
                  className="fileUploader"
                  action={`${API_URL}/api/users/upload`}
                  headers={this.getHeaders()}
                  disabled={disabled || isClosed}
                  beforeUpload={this.beforeUpload}
                  showUploadList={false}
                  onChange={(data) => {
                    if (data.file.response && data.file.response.status && data.file.response.path) {
                      this.setState({ uploadedFile: data.file.response.path, isUploading: false });
                    }
                  }}
              >
                <Button type='default' disabled={disabled || isClosed}>
                  <Icon
                      type='upload'
                      onClick={this.onSubmit}
                  />
                </Button>
              </Upload>
            </React.Fragment>
              : null}
        </div>
          <Input placeholder="Send a message"
            onChange={this.onChange}
            value={uploadedFile ? `File: ${this.getFileNameFromPath(uploadedFile)}` : value}
            onPressEnter={this.onSubmit}
            disabled={disabled || isClosed || isUploading || !!uploadedFile}
            onFocus={onMarkAsRead}
            addonAfter={
              <React.Fragment>
                {uploadedFile ? <Icon
                    type='close'
                    onClick={this.onClear}
                /> : null}
                <Icon
                  type={isUploading ? 'loading' : 'arrow-right'}
                  onClick={this.onSubmit}
                />
              </React.Fragment>
            }
          />
      </div>
    )
  }
}

ChatArea.propTypes = {};

export default ChatArea;
