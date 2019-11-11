import * as express from 'express'
/**
 * Interface for an express application
 */
interface IApplication {
  app: express.Application
  port: number
}

export default IApplication
