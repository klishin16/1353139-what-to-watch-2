import './error-message.css';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';

export const ErrorMessage = () => {
  const error = useTypedSelector((state) => state.errors.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
};
