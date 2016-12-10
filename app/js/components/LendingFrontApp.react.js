import Header from './Header.react';
import React from 'react';
import Store from '../stores/Store';
import BusinessForm from './BusinessForm.react';
import OwnerForm from './OwnerForm.react';
import Success from './Success.react';
import LendingFrontActions from '../actions/LendingFrontActions';

function getState() {
  return {
    step: Store.getStep(),
  };
}

const LendingFrontApp = React.createClass({

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },

  nextStep() {
    LendingFrontActions.nextStep();
  },

  previousStep() {
    LendingFrontActions.previousStep();
  },

  showStep() {
    switch (this.state.step) {
      case 1:
        return <BusinessForm nextStep={this.nextStep} previousStep={this.previousStep}/>;

      case 2:
        return <OwnerForm nextStep={this.nextStep} previousStep={this.previousStep}/>;

      case 3:
        return <Success/>;

      default:
        return <BusinessForm nextStep={this.nextStep} previousStep={this.previousStep}/>;
    }
  },

  render() {
    return (
      <div className="container">
        <Header />
        {this.showStep()}
      </div>
    );
  },

  onChange() {
    this.setState(getState());
  },

});

export default LendingFrontApp;
