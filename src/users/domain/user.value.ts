import { UserEntity } from './user.entity'
import { v4 as uuid } from 'uuid'
export class UserValue implements UserEntity {
  public id: string
  public username: string
  public password: string
  public email: string
  public role: string

  constructor({
    username,
    password,
    email
  }: {
    username: string
    password: string
    email: string
  }) {
    this.id = uuid()
    this.username = username
    this.password = password
    this.email = email
    this.role = 'cenit'
  }
}
