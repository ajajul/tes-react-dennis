import { combineReducers } from "redux";
import userReducer from "./userReducer";
import jobReducer from "./jobReducer";
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer =  combineReducers({
    user: userReducer,
    job: jobReducer
});


const middleware = applyMiddleware(thunk);

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer = composeWithDevTools(
    middleware
);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
