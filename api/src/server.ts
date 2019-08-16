import app from './app'
import { StartupDBConnections } from './database'

const port = process.env.PORT || '5000'
/**
 * Start Express server.
 */
const server = app.listen(port, () => {
  //Start up DB Connections afterwards.
  setTimeout(() => {
    StartupDBConnections
  }, 3000)
})

export default server

export function ShutdownServer() {
  console.log('Close called')
  var server = app.listen(port)
  server.close()
}
