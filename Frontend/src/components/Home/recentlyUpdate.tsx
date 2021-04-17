import mostView from './mostView';

class Recently extends mostView {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      homes: new Array(),
      filter: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/most-view?period=all')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            homes: result
          });
        },
        // error handler
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, homes, filter } = this.state;
    console.log(homes);

    if (error) {
      return (
        <div className="col">
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="col">
          Loading...
        </div>
      );
    } else {
      return (
        <div className="col">
          {this.homeDiv(homes, "Recently Updated >", filter)}
        </div>
      );
    }
  }
}
export default Recently
