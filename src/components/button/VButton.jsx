import  React, { Component } from 'react';
import { Button } from 'antd';
import EventUtils from '../../api/utils/EventUtils';

export default class VButton extends React.Component {

    static displayName = 'VButton';

    constructor(props) {
        super(props);
        this.state = {
            loading: true, 
        };
      }
    
    buttonLoading =() => {
        let self = this;
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
    }

    componentDidMount() {

    }

    render() {
        return <Button onClick={this.buttonLoading}></Button>
    }
}