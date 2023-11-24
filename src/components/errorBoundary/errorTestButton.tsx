import React, { Component } from 'react';
// import './errorTestButton.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorTestButton extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Intentional error thrown from button click');
    }
    return (
      <div className="error__button-container">
        <button onClick={this.handleClick} className="error__button">
          Throw Error
        </button>
      </div>
    );
  }
}

export default ErrorTestButton;
