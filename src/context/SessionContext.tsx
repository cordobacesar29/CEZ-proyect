import { createContext } from "react";
import { IUser, IUserType } from "../constants/user.type";

interface SessionContextProps {
  user: IUser
  handleSetUser: ({email, password}: {email: string, password: string}) => void
  handleSignOut: () => Promise<void>
  login: ({email, password}: {email: string, password: string}) => void
  setIsAuthenticated: (value: boolean) => void
  isAuthenticated: boolean
}

export const INITIAL_USER: IUser = {
  email: '',
  first_name: '',
  id:'',
  last_name: '',
  user_type: IUserType.OPERATOR,
}

export const SessionContext = createContext<SessionContextProps>({
  user: INITIAL_USER,
  handleSetUser: () => null,
  login: () => null,
  handleSignOut: () => Promise.resolve(),
  isAuthenticated: false,
	setIsAuthenticated: () => null,

})