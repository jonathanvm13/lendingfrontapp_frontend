import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import LoanApi from '../utils/LoanApi';

const LendingFrontActions = {

  nextStep() {
    AppDispatcher.dispatch({
      actionType: Constants.FORM_NEXT_STEP,
    });
  },

  previousStep() {
    AppDispatcher.dispatch({
      actionType: Constants.FORM_PREVIOUS_STEP,
    });
  },

  addBusinessData(businessData) {
    AppDispatcher.dispatch({
      actionType: Constants.FORM_ADD_BUSINESSDATA,
      businessData,
    });
  },

  addOwnerData(ownerData) {
    AppDispatcher.dispatch({
      actionType: Constants.FORM_ADD_OWNERDATA,
      ownerData,
    });
  },

  sendRequest(formData) {
    LoanApi
      .loanRequest(formData)
      .then(messageDecision => {
        AppDispatcher.dispatch({
          actionType: Constants.FORM_SHOW_SERVER_MESSAGE,
          messageDecision,
        });
      })
      .catch(error => {
        AppDispatcher.dispatch({
          actionType: Constants.FORM_SHOW_SERVER_MESSAGE,
          messageDecision: error.message,
        });
      });
  },

};

export default LendingFrontActions;
