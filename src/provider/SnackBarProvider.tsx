import { ReactNode, useState } from 'react'

import { Snackbar } from '../components/commons/snackbar'
import { SnackBarContext, SnackBarType } from '../context/SnackBarContext'

interface SnackbarProviderProps {
	children: ReactNode
}

interface SnackbarProps {
	open: boolean
	label?: string
	message: string
	type: SnackBarType
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
	const [open, setOpen] = useState<SnackbarProps>({
		open: false,
		label: '',
		message: '',
		type: 'success',
	})

	const snackbar = ({
		type,
		label,
		message,
	}: {
		type: SnackBarType
		message: string
		label?: string
	}) => {
		setOpen({
			open: true,
			type: type,
			label: label,
			message: message,
		})
	}

	const handleClose = () => {
		setOpen({
			open: false,
			type: 'success',
			label: '',
			message: '',
		})
	}

	return (
		<SnackBarContext.Provider
			value={{
				snackbar,
			}}
		>
			{children}
			{open.open && (
				<Snackbar
					icon={open.type}
					label={open?.label}
					message={open.message}
					onClose={() => handleClose()}
				/>
			)}
		</SnackBarContext.Provider>
	)
}
