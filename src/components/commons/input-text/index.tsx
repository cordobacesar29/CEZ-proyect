import { useId } from 'react'

import { Flex, Input } from '@chakra-ui/react'
import {
	Control,
	FieldValues,
	Path,
	PathValue,
	useController,
} from 'react-hook-form'

import { InputErrorMessage } from '../error-message'
import { LabelForInput } from '../label'

interface Props<T extends FieldValues> {
	name: Path<T>
	required?: boolean
	defaultValue?: PathValue<T, Path<T>>
	control: Control<T>
	fullWidth?: boolean
	placeholder?: string
	type?: 'text' | 'email' | 'number' | 'password' | 'hidden'
	label?: string
	[key: string]: any
	isInvalid?: boolean
	variant?: 'primary' | 'outline'
}

export const InputText = <T extends FieldValues>({
	control,
	name: nameInput,
	defaultValue,
	placeholder,
	fullWidth = false,
	required,
	type = 'text',
	label,
	isInvalid,
	variant = 'outline',
	...props
}: Props<T>) => {
	const id = useId()

	const {
		field: { onBlur, onChange, value, name, ref },
		fieldState: { error },
	} = useController<T, Path<T>>({
		name: nameInput,
		defaultValue,
		rules: { required },
		control,
	})

	return (
		<Flex
			flexDirection="column"
			gap="8px"
			width={fullWidth ? 'full' : 'max-content'}
		>
			{label && <LabelForInput htmlFor={id}>{label}</LabelForInput>}
			<Input
				id={id}
				ref={ref}
				{...props}
				type={type}
				variant={variant}
				name={name}
				isInvalid={isInvalid || Boolean(error?.message)}
				placeholder={placeholder}
				value={value || ''}
				onBlur={onBlur}
				onChange={onChange}
			/>
			<InputErrorMessage message={error?.message} width={props.width} />
		</Flex>
	)
}
