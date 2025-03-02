type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
};

export function Button(props: ButtonProps) {
	return (
		<button
			className="basis-1/4 bg-red-900 hover:cursor-pointer rounded py-1 px-2"
			type="button"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
