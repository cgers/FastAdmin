import { ConnectionOptions } from './config/dbConnectionStrings'
import { forEachPromise } from './helper/Utils'
import IsEmpty from './helper/isEmpty'
import * as consoleColours from './helper/consoleColours'
import SilentProfiles from './config/NoLoggingProfiles'
import CreateDbConnectionPool from './helper/db'
import { asyncForEach } from './helper/Utils'
import { getConnectionManager } from 'typeorm'

const connectionManager = getConnectionManager()

export const StartupDBConnections = forEachPromise(ConnectionOptions, CreateDbConnectionPool).then(
  async () => {
    if (!IsEmpty(process.env.NODE_ENV) && SilentProfiles.indexOf(process.env.NODE_ENV) === -1) {
      console.log(
        `\n${consoleColours.black}${
          consoleColours.BGwhite
        } All database connection pools have been established! ${consoleColours.reset} \n`
      )
      console.log(
        `\nApplication running in NODE_ENV: ${consoleColours.yellow}${process.env.NODE_ENV}${
          consoleColours.reset
        }\n`
      )
    }
  }
) // end of forEachPromise;

/**
 * This function will shutdown the database connections.
 */
export const TearDownDBConnections = async () => {
  await asyncForEach(ConnectionOptions, async con => {
    if (!IsEmpty(process.env.NODE_ENV) && SilentProfiles.indexOf(process.env.NODE_ENV) === -1) {
      console.log(`Closing Database Connection: ${con.name}`)
    }
    const connection = connectionManager.get(con.name)
    connection.close().catch(error => {
      throw error
    })
  })
  if (!IsEmpty(process.env.NODE_ENV) && SilentProfiles.indexOf(process.env.NODE_ENV) === -1) {
    console.log('DB Connections Closed')
  }
}
