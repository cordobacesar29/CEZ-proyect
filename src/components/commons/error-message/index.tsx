import { Text, Box } from '@chakra-ui/react'

interface Props {
	message?: string
	width?: string
}

export const InputErrorMessage = ({ message, width }: Props) => {
	if (!message) return null

	return (
		<Box width={width}>
			<Text pl="12px" fontSize="12px" color="red.500">
				{message}
			</Text>
		</Box>
	)
}
