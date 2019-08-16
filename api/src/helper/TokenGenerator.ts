import IUser from '../interfaces/IUser'
import * as moment from 'moment'
import Security  from '../config/Security'
import { sign } from 'jsonwebtoken'

export const GenerateToken = (user: IUser): Object => {
  //Payload
  let expires = moment()
    .utc()
    .add({ hour: 2 })
    .unix()
  const payload = {
    exp: expires,
    id: user.idUserGuid,
    name: user.userName
  }

  //Secret
  let security : Security =  new Security()
  let secret = security.JWT_SECRET

  //Algorithm
  let algorithm = { algorithm: 'HS384' }
  //jwt.encode(payload, secret, algorithm)
  let auth = sign(payload, secret, algorithm)

  return {
    token: 'Bearer ' + auth
  }
}
