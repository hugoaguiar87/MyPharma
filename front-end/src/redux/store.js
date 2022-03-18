import { configureStore } from '@reduxjs/toolkit';

import configStatesReducer from './reducers/configStatesReducer';

export const store = configureStore({
    reducer: {
        configStates: configStatesReducer
    }
})