import {atom, selector} from 'recoil';

export const pageTransitionState = atom({
    key:'pageTransitionState',
    default:{
        isLoading: false,
        isFinished: true
    }
})

export const pageTransitionSelector = selector({
    key:'pageTransitionSelector',
    get: ({get}) => {
        const transitionState = get(pageTransitionState);

        return transitionState;
    }
})

