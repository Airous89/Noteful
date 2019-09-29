import React, {Component} from 'react';

class HandleError extends Component {
  constructor(props){
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(){
    return {hasError: true};
  }

  render(){
    if(this.state.hasError){
      return <h2>Sorry. There was an problem</h2>
    }
    return this.props.children;
  }
}

export default HandleError;