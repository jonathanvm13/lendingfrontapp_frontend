
export default class CustomError extends Error {
  constructor(message) {
    super();

    if (message) {
      this.message = message;
    } else {
      this.message = 'Something went wrong';
    }

    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}


