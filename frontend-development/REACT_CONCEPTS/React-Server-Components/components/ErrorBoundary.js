"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);// triggers the constructor function of the parent component in this case {ErrorBoundary}. it required to use "this" and "props"
    this.state = { hasError: false }; // states the initial state of the component
  }

  // executes when error occurs in the component wrapped by the ErrorBoundary component and thus update the this.state value
  //with value it returne. 
  static getDerivedStateFromError(error) { 
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>An error occurred!</h2>
          <p>{this.state.message}</p>
          <p>{this.props.fallback}</p>
        </div>
      );
    }

    return this.props.children;// this.props targets that particular react component to access its props and children
  }
}

//getDerivedStateFromError is a reserved function used in ErrorBoundary class component.
