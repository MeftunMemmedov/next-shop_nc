import { useDispatch, useSelector, useStore } from 'react-redux';

import type { Rootstate, AppDispatch, AppStore } from './';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<Rootstate>();
export const useAppStore = useStore.withTypes<AppStore>();
