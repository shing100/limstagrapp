import {  applyMiddleware, createStore } from "redux"
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";

const middlewares = [thunk]

// persistence 설정
const persistConfig = {
    key: "root",
    storage
}

const reducer = persistCombineReducers(persistConfig, {
    user
})

const configureStore = () => {
    let store = createStore(reducer, applyMiddleware(...middlewares))
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore;