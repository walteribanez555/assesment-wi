export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super();
  }

  static fromError(error: Error, statusCode: number = 400): CustomError {
    return new CustomError(error.message, statusCode);
  }
}
