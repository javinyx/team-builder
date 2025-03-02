type PageHeaderProps = {
	title: string;
	description: string;
};

export function PageHeader(props: PageHeaderProps) {
	return (
		<div className="flex flex-col gap-4 pb-6">
			<h1 className="text-4xl">{props.title}</h1>
			<h3 className="text-xl">{props.description}</h3>
		</div>
	);
}
