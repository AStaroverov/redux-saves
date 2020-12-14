import { useEffect, useState } from 'uland';
import { store, TState } from "../store";


export const useSelector = <R>(selector: (state: TState) => R): R => {
    const [value, setValue] = useState(selector(store.getState())); 
   
    useEffect(() => {
        function callback () {
            const newValue = selector(store.getState()); 
            
            if (newValue !== value) {
                setValue(newValue);
            }
        }
        return store.subscribe(callback);
    }, [store]);

    return value;
};