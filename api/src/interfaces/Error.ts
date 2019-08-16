/**
 * General Interface for field validations. e.g. password field is required.
 */
interface Error {
  field: string
  displayField: string
  message: string
}

export default Error
