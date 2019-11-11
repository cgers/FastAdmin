import { Column } from 'typeorm'
import IBaseEntity from '../interfaces/IBaseEntity'

abstract class BaseEntity implements IBaseEntity {
  @Column('number') public createdBy: number
  @Column('timestamp') public createdOn: Date

  constructor(CreatedBy: number, CreatedOn: Date) {
    this.createdBy = CreatedBy
    this.createdOn = CreatedOn
  }
}

export default BaseEntity
