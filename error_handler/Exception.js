class Exception extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export default Exception;
