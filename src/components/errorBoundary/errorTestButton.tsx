import React, { Component } from 'react';
import styles from './errorTestButton.module.css';

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
      <div className={styles.error__button_container}>
        <button onClick={this.handleClick} className={styles.error__button}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default ErrorTestButton;
