import * as express from 'express'
/**
 * Interface for an express application
 */
interface Application {
  app: express.Application
  port: number
}

export default Application
