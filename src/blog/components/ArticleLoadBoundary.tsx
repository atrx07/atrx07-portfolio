import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  resetKey: string;
};

type State = {
  failed: boolean;
};

export class ArticleLoadBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The public recovery state intentionally omits raw loader and stack details.
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="article-load-state" role="alert">
          <h2>Article body unavailable.</h2>
          <p>The note could not be loaded. Return to Field Notes and try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
