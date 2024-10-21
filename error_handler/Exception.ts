class Exception extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, Exception.prototype);
  }
}

export default Exception;
