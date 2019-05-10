import { Component } from 'react';


class App extends Component {
  componentDidMount() {
    console.log('mount');
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        {
          children
        }
      </div>
    );
  }
}

export default App;
