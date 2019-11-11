/**
 * General Interface for field validations. e.g. password field is required.
 */
interface IError {
  field: string
  displayField: string
  message: string
}

export default IError
