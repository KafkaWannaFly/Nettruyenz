import mostView from "./mostView";

class mostFollow extends mostView {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			homes: new Array(),
			filter: true,
		};
	}

	componentDidMount() {
		fetch("http://localhost:3000/most-followed?period=all")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						homes: result,
					});
				},
				// error handler
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}
	render() {
		const { error, isLoaded, homes, filter } = this.state;
		console.log(homes);

		if (error) {
			return <div className="col">Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="col">Loading...</div>;
		} else {
			return (
				<div className="col">
					{this.homeDiv(homes, "Most Followed >", filter)}
				</div>
			);
		}
	}
}
export default mostFollow;
