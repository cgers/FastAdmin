import * as express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { v1_AppRoutes } from './routes/routes'
import * as passport from 'passport'
import * as path from 'path'
import rfs from "rotating-file-stream";
import * as fs from 'fs'

const app = express()


const logDirectory = path.join(__dirname, 'logs')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const apiLogStream = rfs('api.log', {
    interval: '6h',
    size: '10M',
    path: logDirectory
})

app.use(morgan('dev', { stream: apiLogStream }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Register All Application Routes after sorting them on the path
v1_AppRoutes.sort((a, b) => (a.action > b.action ? 1 : a.action < b.action ? -1 : 0)).forEach(
    route => {
      // Public Routes      
      if (!route.protected) {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err))
        })
        // Write public routes to console in green text.
        //LogControllerDetailsToConsole(route)
      } else {
        // Protected Routes via Passport (JWT)
        app[route.method](
          route.path,
          passport.authenticate('jwt', { session: false }),
          (request: Request, response: Response, next: Function) => {
            route
              .action(request, response)
              .then(() => next)
              .catch(err => next(err))
          }
        )
        // Write protected routes to console in yellow text.
        //LogControllerDetailsToConsole(route)
      }
    }
  )

  console.log('Hello')

export default app