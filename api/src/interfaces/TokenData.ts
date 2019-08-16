/**
 * The Interface for content inside a JSON web Token.
 */
interface tokenData {
  exp: Date
  iat: Date
  id: string
  name: string
}
export default tokenData
