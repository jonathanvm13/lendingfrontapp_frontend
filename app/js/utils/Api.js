import request from 'superagent';

const _URL = 'http://localhost:3000';

const Api = {

  getUrl() {
    return _URL;
  },

  callAjaxGet(route, cb) {
    request.get(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .end((err, res) => {
        cb(err, res);
      });
  },

  callAjaxPost(route, data, cb) {
    request.post(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .send(data)
      .end((err, res) => {
        cb(err, res);
      });
  },

  callAjaxDelete(route, cb) {
    request.del(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .end((err, res) => {
        cb(err, res);
      });
  },

  callAjaxUpdate(route, data, cb) {
    request.put(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .send(data)
      .end((err, res) => {
        cb(err, res);
      });
  },

  callAjaxPatch(route, data, cb) {
    request.patch(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .send(data)
      .end((err, res) => {
        cb(err, res);
      });
  },

};

export default Api;
