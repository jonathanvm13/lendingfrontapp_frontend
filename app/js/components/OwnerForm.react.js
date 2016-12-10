import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'formsy-react';
import GeneralInput from './GeneralInput.react';
import GeneralSelect from './GeneralSelect.react';
import UsaCities from '../utils/UsaCities';
import UsaStates from '../utils/UsaStates';
import Store from '../stores/Store';
import LendingFrontActions from '../actions/LendingFrontActions';

function getState() {
  return {
    ownerData: Store.getOwnerData(),
    canSubmit: false,
    typeOfSubmit: 'submitAndRequest',
  };
}

const OwnerForm = React.createClass({

  getInitialState() {
    return getState();
  },

  submit(ownerData) {
    if (this.state.typeOfSubmit === 'submitAndRequest') {
      const businessData = Store.getBusinessData();
      const formData = {
        business: businessData,
        owner: ownerData,
      };

      LendingFrontActions.sendRequest(formData);
      this.props.nextStep();
    } else {
      LendingFrontActions.addOwnerData(ownerData);
      this.props.previousStep();
    }
  },

  saveBeforeReturnStep() {
    const currentState = this.state;
    currentState.typeOfSubmit = 'submitAndReturn';

    this.setState(currentState, this.refs.form.submit);
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
        <h2 className="center-self">Owner Details</h2>
        <Form
          className="pure-form pure-form-stacked center-self"
          onSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref="form">

          <label>Social Security Number</label>
          <GeneralInput
            ref="socialSecurity"
            type="number"
            name="socialSecurity"
            value={this.state.ownerData.socialSecurity}/>

          <label>Name</label>
          <GeneralInput
            ref="name"
            type="text"
            name="name"
            value={this.state.ownerData.name}/>

          <label>Email</label>
          <GeneralInput
            ref="email"
            type="email"
            name="email"
            validations="isEmail"
            validationError="This is not a valid email"
            value={this.state.ownerData.email}/>

          <label>Address</label>
          <GeneralInput
            ref="address"
            type="text"
            name="address"
            value={this.state.ownerData.address}/>

          <label>City</label>
          <GeneralSelect
            options={UsaCities}
            ref="city"
            value={this.state.ownerData.city}
            name="city"/>

          <label>State</label>
          <GeneralSelect
            options={UsaStates}
            ref="state"
            value={this.state.ownerData.state}
            name="state"/>

          <label>Postal Code</label>
          <GeneralInput
            ref="postalCode"
            type="text"
            name="postalCode"
            value={this.state.ownerData.postalCode}/>

          <button className="pure-button" onClick={this.saveBeforeReturnStep}>
            Return
          </button>

          <button
            className="pure-button"
            type="submit"
            disabled={!this.state.canSubmit}>Next</button>

        </Form>
      </div>
    );
  },
});

export default OwnerForm;
