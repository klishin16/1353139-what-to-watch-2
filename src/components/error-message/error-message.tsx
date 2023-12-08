import './error-message.css';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';

function ErrorMessage(): JSX.Element | null {
  const error = useTypedSelector((state) => state.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
