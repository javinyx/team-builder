type PageHeaderProps = {
	title: string;
	description: string;
};

export function PageHeader(props: PageHeaderProps) {
	return (
		<div className="page-header">
			<h1>{props.title}</h1>
			<h3>{props.description}</h3>
		</div>
	);
}
