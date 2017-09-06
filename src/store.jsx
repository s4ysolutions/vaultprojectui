import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createEpicMiddleware } from 'redux-observable';
import { autoRehydrate } from 'redux-persist';
import reducers from './reducers';
import rootEpic from './epics';

export const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = 
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      // thunkMiddleware
      //	,			createLogger()
    ),
    autoRehydrate()
  )
);
export default store;
