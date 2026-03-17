'use client';

import { Component, type ReactNode } from 'react';
import { HeroMobileFallback } from './HeroMobileFallback';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Catches WebGL/Three.js errors (e.g. context lost, null .alpha) so the rest of the page keeps working.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <HeroMobileFallback />;
    }
    return this.props.children;
  }
}
