import { Flex, Select } from '@chakra-ui/react'
import {
	Control,
	FieldValues,
	Path,
	PathValue,
	useController,
} from 'react-hook-form'
import { InputErrorMessage } from '../error-message'

interface Props<T extends FieldValues> {
	name: Path<T>
	required?: boolean
	defaultValue?: PathValue<T, Path<T>>
	control: Control<T>
	fullWidth?: boolean
	placeholder?: string
	options: Array<{ label: string; value: string }>
}

export const InputSelect = <T extends FieldValues>({
	control,
	name: nameInput,
	defaultValue,
	fullWidth,
	placeholder,
	required,
	options,
}: Props<T>) => {
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
			<Select
				ref={ref}
				name={name}
				isInvalid={Boolean(error?.message)}
				value={value || ''}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
			>
				{options.map((el) => (
					<option key={el.value} value={el.value}>
						{el.label}
					</option>
				))}
			</Select>
			<InputErrorMessage message={error?.message} />
		</Flex>
	)
}
