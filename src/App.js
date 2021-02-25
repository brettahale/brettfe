import './App.css';
import React, {Fragment} from "react";
import {
    AppBar,
    Button,
    CssBaseline,
    Toolbar,
    Typography
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import optimizely from "./Optimizely";
import analytics from './Analytics'
import {OptimizelyExperiment, OptimizelyProvider, OptimizelyVariation} from "@optimizely/react-sdk";
import {blue, red} from "@material-ui/core/colors";
import { enums } from '@optimizely/react-sdk';
import {identify, page, experimentViewed, orderCompleted} from '@goodrx/segment/plans/core_consumer_prod'

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    blue: {
        backgroundColor: blue
    },
    red: {
        backgroundColor: red
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        };
        // optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.DECISION, this.onDecision);
        optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.ACTIVATE, this.onActivate);
    }

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
    };

    onActivate = (experiment, userId, attributes, variation, event) => {
        console.log(experiment)
        // Send data to analytics provider here
        experimentViewed({
            experimentId: experiment.experiment.id,
            experimentName: experiment.experiment.key,
            variationId: experiment.variation.id,
            variationName: experiment.variation.key,
            campaignId: experiment.experiment.layerId,
        });

        // analytics.track({
        //     event: 'Experiment Viewed',
        //     userId: experiment.userId,
        //     properties: {
        //         experimentId: experiment.experiment.id,
        //         experimentName: experiment.experiment.key,
        //         variationId: experiment.variation.id,
        //         variationName: experiment.variation.key,
        //         campaignId: experiment.experiment.layerId,
        //     }
        // });
    }


    trackOrderComplete = () => {
        orderCompleted({})
        // analytics.track({
        //     event: 'OrderComplete',
        //     userId: localStorage.getItem('userId'),
        //     properties: {
        //         revenue: 39.95,
        //         shippingMethod: '2-day',
        //     }
        // });
    }

    componentDidMount() {

        // identify({userId: localStorage.getItem('userId')});
       identify({})
        page({category: "funnel", name: "step_1"})
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            GoodRx Optimizely Testing
                        </Typography>
                    </Toolbar>
                </AppBar>

                <main className={classes.layout}>
                    <OptimizelyProvider
                    optimizely={optimizely}
                    timeout={500}
                    user={{ id: localStorage.getItem('userId'), attributes: { plan_type: 'bronze' } }}
                >

                    <OptimizelyExperiment experiment="login">
                        <OptimizelyVariation variation="login">
                            <Button onClick={this.trackOrderComplete} className={classes.blue}>blue</Button>
                        </OptimizelyVariation>

                        <OptimizelyVariation variation="form">
                            <Button onClick={this.trackOrderComplete} className={classes.red}>red</Button>
                        </OptimizelyVariation>

                        <OptimizelyVariation default>
                            <Button onClick={this.trackOrderComplete} >default</Button>
                        </OptimizelyVariation>
                    </OptimizelyExperiment>

                </OptimizelyProvider>
                </main>
            </Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
