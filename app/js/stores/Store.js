import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'events';
import Constants from '../constants/Constants';
import assign from 'object-assign';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';
const _form = {
  business: {
    taxId: '',
    businessName: '',
    businessAddress: '',
    city: '',
    state: '',
    postalCode: '',
    amount: null,
  },
  owner: {
    socialSecurity: null,
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  },
};

let _step = 1;
let _serverMessage = '';
let _serverAnswered = false;

function nextStep() {
  _step = _step + 1;
}

function previousStep() {
  _step = _step - 1;
}

function setServerMessage(message) {
  _serverAnswered = true;
  _serverMessage = message;
}

function addBusinessData(businessData) {
  _form.business = businessData;
}

function addOwnerData(ownerData) {
  _form.owner = ownerData;
}

const Store = assign({}, EventEmitter.prototype, {

  getBusinessData() {
    return _form.business;
  },

  getOwnerData() {
    return _form.owner;
  },

  getStep() {
    return _step;
  },

  getServerMessage() {
    return _serverMessage;
  },

  getServerAnswered() {
    return _serverAnswered;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

// Register callback to handle all updates
AppDispatcher.register(action => {
  switch (action.actionType) {
    case Constants.FORM_NEXT_STEP:
      nextStep();
      Store.emitChange();
      break;

    case Constants.FORM_PREVIOUS_STEP:
      previousStep();
      Store.emitChange();
      break;

    case Constants.FORM_ADD_BUSINESSDATA:
      addBusinessData(action.businessData);
      Store.emitChange();
      break;

    case Constants.FORM_ADD_OWNERDATA:
      addOwnerData(action.ownerData);
      Store.emitChange();
      break;

    case Constants.FORM_SHOW_SERVER_MESSAGE:
      setServerMessage(action.messageDecision);
      Store.emitChange();
      break;

    default:
    // nothing
  }
});

export default Store;
