import { v4 as uuidv4 } from 'uuid';

if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', uuidv4())
}

// const Analytics = require('analytics-node');

// const analytics = new Analytics(process.env.REACT_APP_SEGMENT_WK, {flush: 1});
let analytics = window.analytics
analytics.load(process.env.REACT_APP_SEGMENT_WK)
export default analytics
