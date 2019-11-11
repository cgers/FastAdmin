/**
 * The Interface for content inside a JSON web Token.
 */
interface ITokenData {
  exp: Date
  iat: Date
  gid: string
  name: string
}
export default ITokenData
