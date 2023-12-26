import { ReactNode } from 'react'

import { Text } from '@chakra-ui/react'

interface Props {
	children: ReactNode
	htmlFor?: string
	color?: string
}

export const LabelForInput = ({ children, htmlFor, color }: Props) => {
	return (
		<Text htmlFor={htmlFor} as="label" fontSize="16px" color={color}>
			{children}
		</Text>
	)
}
