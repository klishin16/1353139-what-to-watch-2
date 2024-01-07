import { PropsWithChildren } from 'react';
import './loader.css';


interface LoaderProps extends PropsWithChildren {
  isLoading?: boolean;
}

export const Loader = ({ isLoading, children }: LoaderProps) => {
  if (!isLoading && children) {
    return <div>{ children }</div>;
  }

  return (
    <div className="spinner-container">
      <div className="loading-spinner" data-testid={'loading-spinner'}></div>
    </div>
  );
};
