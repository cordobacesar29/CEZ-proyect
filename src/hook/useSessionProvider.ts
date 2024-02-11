import { useContext } from 'react'

import { SessionContext } from '../context/SessionContext'

export const useAuth = () => {
	return useContext(SessionContext)
}
