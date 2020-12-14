import { AnyAction, Dispatch } from 'redux';
import { store } from "../store";

export const useDispatch = (): Dispatch => {
    return store.dispatch;
};