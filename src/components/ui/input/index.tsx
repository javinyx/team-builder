type InputProps = {
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
};

export function Input(props: InputProps) {
	return (
		<input
			className="border rounded border-neutral-300 basis-1/2 placeholder:text-center text-center"
			type="text"
			maxLength={50}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}
