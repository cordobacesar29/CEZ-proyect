import { Flex, Textarea, TextareaProps } from '@chakra-ui/react'
import {
	useController,
	Control,
	FieldValues,
	Path,
	PathValue,
} from 'react-hook-form'
import { InputErrorMessage } from '../error-message'

interface Props<T extends FieldValues> extends TextareaProps {
	control: Control<T>
	name: Path<T>
	required?: boolean
	defaultValue?: PathValue<T, Path<T>>
	fullWidth?: boolean
	updateAboutMe?: (value: any) => void
}

export const InputTextarea = <T extends FieldValues>({
	control,
	name: nameInput,
	updateAboutMe,
	required,
	defaultValue,
	fullWidth = false,
	...rest
}: Props<T>) => {
	const {
		field: { name, onBlur, onChange, ref },
		fieldState: { error },
	} = useController({
		name: nameInput,
		control,
		defaultValue,
		rules: {
			required,
		},
	})

	return (
		<Flex
			flexDirection="column"
			gap="8px"
			width={fullWidth ? 'full' : 'max-content'}
		>
			<Textarea
				ref={ref}
				name={name}
				isInvalid={Boolean(error?.message)}
				resize="none"
				onBlur={onBlur}
				onChange={onChange}
				{...rest}
				rows={5}
			/>
			<InputErrorMessage message={error?.message} />
		</Flex>
	)
}
