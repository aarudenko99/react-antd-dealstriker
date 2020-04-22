import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
const Option = Select.Option;

class SelectOp extends React.Component {

  handleChange = (value) => {
    this.props.handleChange(value)
  }

  render() {
    const { car_model, defaultValue } = this.props;
    const children = [];
    car_model && Object.keys(car_model).map((model) => {
      return children.push(<Option key={model}>{model}</Option>)
    })

    return (
      <Select
        mode="tags"
        size="default"
        style={{ width: '100%' }}
        placeholder="Select Car Model"
        onChange={this.handleChange}
        tokenSeparators={[',']}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    );
  }
}

const mapState = state => ({
  car_model: state.auth.car_model
})

export const SelectOption = connect(mapState)(SelectOp);
