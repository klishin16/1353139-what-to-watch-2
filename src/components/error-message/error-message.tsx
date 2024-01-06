import './error-message.css';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { getError } from '../../store/errors/errors.selectors.ts';

export const ErrorMessage = () => {
  const error = useTypedSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
};
