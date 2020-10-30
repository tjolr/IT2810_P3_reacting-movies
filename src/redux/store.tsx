import {createStore} from 'redux';
import rootReducer from './reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

/* Creates store from rootReducer */
const store = createStore(rootReducer, composeWithDevTools());
export default store;
