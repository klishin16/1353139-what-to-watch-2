import React from 'react';
import './loader.css';


interface ILoaderProps {
  isLoading: boolean;
  children: React.ReactElement;
}

const Loader: React.FC<ILoaderProps> = ({ isLoading, children }) => (
  isLoading
    ? <div className="spinner-container"><div className="loading-spinner"></div></div>
    : children
);

export default Loader;
