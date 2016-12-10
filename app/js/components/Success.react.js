import React from 'react';
import Store from '../stores/Store';

function getState() {
  return {
    loading: !Store.getServerAnswered(),
    serverMessage: Store.getServerMessage(),
  };
}

const Success = React.createClass({

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },

  render() {
    if (this.state.loading) {
      return (
        <div className="form-container">
          <div className="loader">Cargando...</div>
        </div>
      );
    }

    return (
      <div className="form-container">
       <div className="center-self response">{this.state.serverMessage}</div>
      </div>
    );
  },

  onChange() {
    this.setState(getState());
  },

});

export default Success;
