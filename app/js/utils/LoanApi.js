import Api from './Api';
import CustomError from './CustomError';

const LoanApi = {

  loanRequest(formData) {
    return new Promise((resolve, reject) => {
      Api.callAjaxPost('/loan/register', formData, (err, res) => {
        console.log(res);
        if (err || !res.ok) {
          reject(new CustomError(res.body.data));
          return;
        }

        resolve(res.body.data);
      });
    });
  },
};

export default LoanApi;

