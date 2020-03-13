import { createBrowserHistory } from 'history';
import createStore from './createStore';

const baseUrl = '/';
export const history = createBrowserHistory({ basename: baseUrl });
const store = createStore(history, {});

export default store;
