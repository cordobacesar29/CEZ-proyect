import { ReactElement, useMemo, useRef, useEffect } from 'react'

import {
	CheckCircleIcon,
	CloseIcon,
	InfoIcon,
	WarningIcon,
} from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'
import { SnackBarType } from '../../../context/SnackBarContext'
import { Colors } from '../../../utils/Colors'
import { Sizes } from '../../../utils/sizes'

interface SnackbarProps {
	icon: SnackBarType
	label: string | undefined
	message: string
	onClose: () => void
}

interface ISnackbarConfig {
	bg: string
	border: string
	color: string
	icon: ReactElement
}

export const Snackbar = ({ icon, label, message, onClose }: SnackbarProps) => {
	const snackBarType = useMemo(() => {
		return snackbarConfig[icon] ?? snackbarConfig['info']
	}, [icon])
	const ref = useRef<HTMLDivElement>(null)

	const hiddenSnackbar = () => {
		ref.current?.setAttribute(
			'style',
			'bottom: -150px; transition: all .5s ease-in; opacity: 0'
		)
		setTimeout(() => {
			onClose()
		}, 500)
	}
	useEffect(() => {
		ref.current?.setAttribute(
			'style',
			'bottom: 25px; transition: all .25s ease-in; opacity: 1'
		)
		const timeout = setTimeout(() => {
			hiddenSnackbar()
		}, 4000)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<Box
			ref={ref}
			position='fixed'
			right={0}
			left={0}
			bottom='-50px'
			opacity={0}
			zIndex={'99999'}
		>
			<Flex justifyContent='center' alignItems='center'>
				<Box
					width='80%'
					maxWidth='480px'
					borderRadius='6px'
					backgroundColor={snackBarType.bg}
					paddingBlock={Sizes.sm}
					paddingStart={Sizes.sm}
					paddingEnd={Sizes.sm}
				>
					<Flex
						alignItems='center'
						gap={Sizes.xs}
						justifyContent='space-between'
					>
						<Flex gap={Sizes.xs} alignItems='center'>
							<Box> {snackBarType.icon}</Box>
							<Box>
								<Text
									color={snackBarType.color}
									fontSize='14px'
									fontWeight={600}
								>
									{message}
								</Text>
							</Box>
						</Flex>
						<Flex
							as='button'
							justifyContent='center'
							alignItems='center'
							onClick={() => onClose()}
						>
							<CloseIcon color={snackBarType.border} width='14px' />
						</Flex>
					</Flex>
					<Text color={snackBarType.color}> {label} </Text>
				</Box>
			</Flex>
		</Box>
	)
}

const snackbarConfig: Record<SnackBarType, ISnackbarConfig> = {
	success: {
		icon: <CheckCircleIcon color={Colors.success_text} />,
		color: Colors.success_text,
		bg: Colors.success_main,
		border: Colors.success_text,
	},
	error: {
		icon: <WarningIcon color={Colors.error_text} />,
		color: Colors.error_text,
		bg: Colors.error_main,
		border: Colors.error_text,
	},
	warning: {
		icon: <WarningIcon color={Colors.warning_dark} />,
		color: Colors.warning_dark,
		bg: Colors.warning_main,
		border: Colors.warning_dark,
	},
	info: {
		icon: <InfoIcon color={Colors.info_dark} />,
		color: Colors.info_dark,
		bg: Colors.info_main,
		border: Colors.info_dark,
	},
}
