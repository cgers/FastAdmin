/*
 * The interface for the Base Entity. 
   Every business entity in the application will
   have a Created on and a Created by field.
 */

interface IBaseEntity {
  createdBy: number
  createdOn: Date
}

export default IBaseEntity
