import React, { Component, ErrorInfo } from 'react';
import styles from './errorBoundary.module.css';
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error__container}>
          <h1 className={styles.error__text}>SOMETHING WENT WRONG!</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
