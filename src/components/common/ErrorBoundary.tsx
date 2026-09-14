import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // In production you might wire this up to an error-reporting service.
    console.error('Birthday Experience crashed:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-midnight-900 px-8 text-center text-blush">
          <p className="font-display text-2xl">Something interrupted the moment.</p>
          <p className="text-sm text-blush/70">Let's pick this back up.</p>
          <button
            onClick={this.handleReload}
            className="rounded-full bg-rose-500 px-6 py-3 font-medium text-white"
          >
            Restart
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
