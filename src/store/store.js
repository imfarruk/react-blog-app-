import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducer/index'

// const persistConfig = {
//     key: 'root',
//     storage,
//   }
//   const persistedReducer = persistReducer(persistConfig,rootReducer)
 

const store = configureStore({
  reducer: rootReducer,
})
const useDispatch = () => useAppDispatch();
// const useSelector = useAppSelector;
// const Persistor = persistStore(store)

export  {store,useDispatch }