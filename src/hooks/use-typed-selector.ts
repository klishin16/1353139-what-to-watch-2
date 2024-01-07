import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IState } from '../types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<IState> = useSelector;
