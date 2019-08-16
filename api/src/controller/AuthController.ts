import { Request, Response } from 'express'
import * as validator from 'validator'
import { getConnection, getManager, getRepository, getCustomRepository } from 'typeorm'
import PortalUser from '../entity/User'
import * as bcrypt from '../helper/bcryptJs'
import { PasswordSchema } from '../helper/PasswordValidator'
import { GenerateToken } from '../helper/TokenGenerator'
import isEmpty from '../helper/isEmpty'
import { hashPassword } from '../helper/bcryptJs'
//import { PortalUserRepository } from '../repository/PortalUserRepository'
import Error from '../entity/Error'

/**
 * Login to the system with a email and password.
 * @param request
 * @param response
 */

export async function login(request: Request, response: Response) {
  try {
    let errors: Array<Error> = []

    if (isEmpty(request.body.email)) {
      errors.push(new Error('email', 'EMail', 'EMail is required.'))
    } else {
      if (!validator.isEmail(request.body.email)) {
        errors.push(new Error('email', 'EMail', 'Invalid email address'))
      }
    }

    if (isEmpty(request.body.password)) {
      errors.push(new Error('password', 'Password', 'Password is required.'))
    } else {
      if (!validator.isLength(request.body.password, { min: 5, max: 20 })) {
        errors.push(new Error('password', 'Password', 'Invalid required.'))
      }
    }

    if (errors.length > 0) {
      response.status(400).json(errors)
      return
    }

    const userRepository = getManager('PORTAL').getRepository(PortalUser)

    const EMail = request.body.email.trim().toLowerCase()

    const User = await userRepository.findOne({ where: { EMail } }).then(found => {
      //console.log(`IsEmpty(found) ${isEmpty(found)} ${found.Password}`);
      if (isEmpty(found)) {
        errors.push(new Error('email', 'EMail', 'User not found.'))
        response.status(400).json(errors)
        return
      } else {
        bcrypt
          .comparePassword(found.password, request.body.password)
          .then(matched => {
            if (!matched) {
              //console.log(`is matched: ${matched}`);
              errors.push(new Error('password', 'Password', 'Invalid password.'))
              response.status(401).json(errors)
              return
            } else {
              //console.log(`is matched: ${matched} , email: ${found.EMail}`);
              response.status(200).json(GenerateToken(found))
              /* Sample response
                {
                  "authToken": "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTU5NDY1NjAsImlkIjoiMTI4NUI5NDJCMDEyNEFGREEzMEI2QkJEODM3QjMzRjUiLCJuYW1lIjpudWxsLCJpYXQiOjE1NTU5MzkzNjB9.947VAzMp-RhaoOvNHdfh0k5wWR_B3YtExKkA6PQJuQOt9EbB6Mp81BxadvhfZu-L"
                }
              */
              return
            }
          })
          .catch(error => {
            console.log('comparePassword  error: ', error)
          })
      }
    })
  } catch (err) {
    response.status(401).json({ message: 'Invalid credentials', errors: err })
  }
}

/**
 * Register on the system with a email, password and a confirmPassword.
 * @param request
 * @param response
 */
export async function register(request: Request, response: Response) {
  try {
    let errors: Array<Error> = []

    if (isEmpty(request.body.email)) {
      errors.push(new Error('email', 'EMail', 'EMail is required.'))
    } else {
      if (!validator.isEmail(request.body.email)) {
        errors.push(new Error('email', 'EMail', 'EMail address provided is invalid.'))
      }
    }

    if (isEmpty(request.body.password)) {
      errors.push(new Error('password', 'Password', 'Password field is required.'))
    }

    if (isEmpty(request.body.confirmPassword)) {
      errors.push(
        new Error('confirmPassword', 'Confirm Password', 'Confirm password field is required.')
      )
    }

    if (!isEmpty(request.body.confirmPassword) && !isEmpty(request.body.password)) {
      if (!validator.equals(request.body.password, request.body.confirmPassword)) {
        errors.push(new Error('confirmPassword', 'Confirm Password', "Passwords don't match."))
      } else {
        //test password strength
        if (
          !PasswordSchema.validate(request.body.password) &&
          !validator.isEmpty(request.body.password)
        ) {
          errors.push(
            new Error(
              'password',
              'Password',
              'Password is too weak. It must be between 8 and 25 characters and contain UPPER & lower case and digits. No spaces.'
            )
          )
        }
      }
    }

    if (isEmpty(request.body.username)) {
      errors.push(new Error('username', 'User Name', 'User Name is required.'))
    }    


    if (errors.length > 0) {
      response.status(401).json({ message: 'Invalid credentials!', errors })
      return
    }
    const UserRepository = getManager('PORTAL').getRepository(PortalUser)

    const EMail = request.body.email.trim().toLowerCase()
    const UserName = request.body.username.trim().toLowerCase()

    const User = await UserRepository.findOne({ where: { EMail } })

    if (isEmpty(User)) {
      //User does not exist, we can create them.
      //Hash the users password.
      hashPassword(request.body.password)
        .then(hash => {
          let p = new PortalUser(UserName,EMail, hash, 10000, new Date())
          UserRepository.save(p).then(saved => {
            response.status(200).json(saved)
            return
          })
        })
        .catch(error => {
          console.log('PortalUser register new user failed: ', error)
        })
    } else {
      response
        .status(400)
        .json({ message: 'Invalid credentials. EMail address already registered.' })
      return
    }
  } catch (err) {
    response.status(401).json({ message: 'Invalid credentials', errors: err })
    return
  }
}

// export async function findUserByEmail(request: Request, response: Response) {
//   const PortalUserRepo = getConnection('PORTAL').getCustomRepository(PortalUserRepository)
//   const portalUser = await PortalUserRepo.findByEMail(request.user.EMail)
//   response.send(portalUser)
// }

/**
 * Put request to Update a user details. Not fully complete. Needs to be tested.
 */
export async function updateUser(request: Request, response: Response) {
  let errors: Array<Error> = []

  if (isEmpty(request.body.password)) {
    errors.push(new Error('password', 'Password', 'Original password required.'))
  }

  if (!isEmpty(request.body.newPassword) && !isEmpty(request.body.newPassword2)) {
    if (!validator.equals(request.body.newPassword, request.body.newPassword2)) {
      errors.push(new Error('newPassword', 'Confirm Password', "New passwords don't match."))
    } else {
      //test password strength
      if (
        !PasswordSchema.validate(request.body.newPassword) &&
        !validator.isEmpty(request.body.newPassword)
      ) {
        errors.push(
          new Error(
            'password',
            'Password',
            'Password is too weak. It must be between 8 and 25 characters and contain UPPER & lower case and digits. No spaces.'
          )
        )
      }
    }
  } else {
    if (!isEmpty(request.body.newPassword)) {
      errors.push(new Error('newPassword', 'New Password', 'New password is required.'))
    }
    if (!isEmpty(request.body.newPassword2)) {
      errors.push(
        new Error('newPassword2', 'Conformation Password', 'Confirmation password is required.')
      )
    }
  }
  if (errors.length > 0) {
    response.send(errors)
    return
  }

  const userRepository = getManager('PORTAL').getRepository(PortalUser)
  const userName = request.body.username
  const EMail = request.body.email.trim().toLowerCase()
  const newPassword = request.body.newPassword.trim()
  const newPassword2 = request.body.newPassword2.trim()

  const User = await userRepository.findOne({ where: { idUserGuid: request.user.id } })
  if (User) {
    hashPassword(newPassword)
      .then(hash => {
        User.password = hash
        User.userName = userName
        User.eMail = EMail
        userRepository.save(User).then(updated => {
          response.status(200)
          return
        })
      })
      .catch(error => {
        console.log('PortalUser register new user failed: ', error)
        response.status(400).json({ error: 'Failed to update user details.' })
      })
  }
}

/**
 * Allows unauthenticated user to request an email with reset password token used for password reset
 * @param request
 * @param response
 */
export async function forgotPassword(request: Request, response: Response) {
  //ToDo
  response.send({ 'To Do': 'Not yet implemented.' })
}

/**
 * Allows unauthenticated user to reset own password using token received via email
 * @param request
 * @param response
 */
export async function resetPassword(request: Request, response: Response) {
  //ToDo
  response.send({ 'To Do': 'Not yet implemented.' })
}
