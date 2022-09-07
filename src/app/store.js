
import {configureStore} from '@reduxjs/toolkit';
import setAuthDetails from '../signup/authSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'authDetails',
    storage,
  }
  const reducers = combineReducers({ authDetails:setAuthDetails });

  const persistedReducer = persistReducer(persistConfig, reducers);



  export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
