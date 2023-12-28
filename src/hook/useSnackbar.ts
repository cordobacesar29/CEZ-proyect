import { useContext } from 'react'

import {
	SnackBarContext,
	SnackBarContextProps,
} from '../context/SnackBarContext'

export const useSnackbar = (): SnackBarContextProps => {
	return useContext(SnackBarContext)
}
