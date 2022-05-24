import { combineReducers } from 'redux';

import ui from './ui';
import user from './user';

const rootReducers = combineReducers({
    user,
    ui,
});

export default rootReducers;
