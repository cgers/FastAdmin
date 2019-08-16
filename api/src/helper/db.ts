import * as consoleColours from './consoleColours'
import IsEmpty from './IsEmpty'
import { createConnection } from 'typeorm'
import SilentProfiles from '../config/NoLoggingProfiles'

/**
 * create connection with database
 * Note that it's not active database connection
 * TypeORM creates connection pools and uses them for your requests
 * @param Connection Creates a new connection from the file.
 */
function CreateDbConnectionPool(Connection) {
  return new Promise((resolve, reject) => {
    createConnection(Connection)
      .then(connected => {
        //Log connection details to console in cyan.
        if (!IsEmpty(process.env.NODE_ENV) && SilentProfiles.indexOf(process.env.NODE_ENV) === -1) {
          console.log(
            `${consoleColours.cyan}\nThe ${Connection.type} db connection \`${
              Connection.name
            }\` to ${Connection.host}:${Connection.port} has been established.${
              consoleColours.reset
            }\n`
          )
        }
        resolve(connected)
      })
      .catch(error => {
        console.log('CreateDbConnectionPool TypeORM connection error: ', error)
        reject(error)
      })
  })
}

export default CreateDbConnectionPool
