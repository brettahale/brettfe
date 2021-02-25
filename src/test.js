import { experimentViewed } from '@goodrx/segment/plans/core_consumer_prod'
import analytics from "./Analytics";

export default function setup(){

    const props = experimentViewed.build({"all": "of", "the": "properties"})

    analytics.track({
        event: experimentViewed.eventName,
        userId: getUserId(),
        properties: {
            props
        }
    });
}

