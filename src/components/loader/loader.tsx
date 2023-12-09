import React, { PropsWithChildren } from 'react';
import './loader.css';


interface ILoaderProps extends PropsWithChildren {
  isLoading?: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ isLoading, children }) => {
  if (!isLoading && children) {
    return <div>{ children }</div>;
  }

  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};
