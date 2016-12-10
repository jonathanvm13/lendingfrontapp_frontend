import React from 'react';
import Store from '../stores/Store';
import LendingFrontActions from '../actions/LendingFrontActions';
import {Form} from 'formsy-react';
import GeneralInput from './GeneralInput.react';
import GeneralSelect from './GeneralSelect.react';
import UsaCities from '../utils/UsaCities';
import UsaStates from '../utils/UsaStates';

function getState() {
  return {
    businessData: Store.getBusinessData(),
    canSubmit: false,
  };
}

const BusinessForm = React.createClass({

  getInitialState() {
    return getState();
  },

  submit(data) {
    console.log(data);
    LendingFrontActions.addBusinessData(data);

    this.props.nextStep();
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  render() {
    return (
      <div className="form-container">
        <h2 className="center-self">Business</h2>
        <Form
          className="pure-form pure-form-stacked center-self"
          onSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}>
          <label>Tax Id</label>
          <GeneralInput
            ref="taxId"
            type="text"
            name="taxId"
            value={this.state.businessData.taxId}/>

          <label>Business Name</label>
          <GeneralInput
            ref="businessName"
            type="text"
            name="businessName"
            value={this.state.businessData.businessName}/>

          <label>Business Address</label>
          <GeneralInput
            ref="businessAddress"
            type="text"
            name="businessAddress"
            value={this.state.businessData.businessAddress}/>

          <label>City</label>
          <GeneralSelect
            options={UsaCities}
            ref="city"
            value={this.state.businessData.city}
            name="city"/>

          <label>State</label>
          <GeneralSelect
            options={UsaStates}
            ref="state"
            value={this.state.businessData.state}
            name="state"/>

          <label>Postal Code</label>
          <GeneralInput
            ref="postalCode"
            type="text"
            name="postalCode"
            value={this.state.businessData.postalCode}/>

          <label>Requested Amount</label>
          <GeneralInput
            ref="amount"
            type="number"
            name="amount"
            value={this.state.businessData.amount}/>

          <button
            className="pure-button"
            type="submit"
            disabled={!this.state.canSubmit}>Next</button>

        </Form>

      </div>
    );
  },
});

export default BusinessForm;
