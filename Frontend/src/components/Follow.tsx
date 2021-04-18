
import React from 'react';
interface AbcState {
  error: any,
  isLoaded: boolean,
  homes: any[]
}
class Follow extends React.Component<{}, AbcState> {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      homes: new Array()
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/most-view?period=weekly')
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
    const { error, isLoaded, homes } = this.state;
    console.log(homes);
    for (let i of homes) {
      console.log(i._id);
    }
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
          <h1>Mi Casa</h1>
          <p>This is my house y'all!</p>
        </div>
      );
    }
  }
}
export default Follow
