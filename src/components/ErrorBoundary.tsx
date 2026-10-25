import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      localStorage.removeItem('upsc_map_mastery');
      localStorage.removeItem('upsc_map_stats');
      localStorage.removeItem('upsc_map_srs');
      localStorage.removeItem('upsc_map_rewards');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F2EA] flex flex-col items-center justify-center p-6 text-[#1F3A4D] font-sans">
          <div className="max-w-md w-full bg-[#FFFDF9] rounded-2xl border border-[#1F3A4D]/15 shadow-lg p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-[#E07A3F] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="font-serif-title text-2xl font-bold text-[#1F3A4D] mb-2">
              UPSC Map Trainer
            </h1>
            <p className="text-xs text-[#1F3A4D]/75 mb-6 leading-relaxed">
              The application encountered a display glitch while rendering. Don't worry—your UPSC syllabus data is safe.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-5">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto h-11 px-5 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="w-full sm:w-auto h-11 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#8c3e10] font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Cache & Reload</span>
              </button>
            </div>

            {this.state.error && (
              <details className="text-left mt-4 p-3 bg-[#1F3A4D]/5 rounded-lg text-[11px] text-[#1F3A4D]/80 font-mono overflow-auto max-h-36">
                <summary className="cursor-pointer font-bold font-sans text-xs mb-1 text-[#1F3A4D]">
                  Diagnostic Technical Details
                </summary>
                <p className="font-semibold text-rose-700">{this.state.error.toString()}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-1 text-[10px] whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
