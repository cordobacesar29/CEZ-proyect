export interface IUser {
  first_name: string
  last_name: string
  email: string
  id: string
  user_type: IUserType
}

export enum IUserType {
  ADMIN = 'admin',
  OPERATOR = 'operator'
}