// import {enums} from "@optimizely/react-sdk";

// const optimizelyClientInstance = createInstance({
//     sdkKey: 'MWedtmTQtsQ5bDKy8r5Gq',
//     logLevel: enums.LOG_LEVEL.DEBUG
// });

import {
    createInstance
} from '@optimizely/react-sdk';
import analytics from "./Analytics";
const optimizely = createInstance({
    sdkKey: process.env.REACT_APP_OPTIMIZELY_SDK_KEY,
});
window.optimizelyClientInstance = optimizely
analytics.load(process.env.REACT_APP_SEGMENT_WK)
export default optimizely
