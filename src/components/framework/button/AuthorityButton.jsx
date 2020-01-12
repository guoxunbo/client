import { Button } from "antd";
import I18NUtils from '@utils/I18NUtils';
import IconUtils from '@utils/IconUtils';
import EventUtils from '@utils/EventUtils';

import * as PropTypes from 'prop-types';
import  React, { Component } from 'react';
import './AuthorityButton.scss';

export default class AuthorityButton extends Component {

    type;
    icon;
    i18NCode;
    onClick;
    authorityName;
    className;
    inRow;
    /**
     * 后缀Icon
     */
    backIcon;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            disabled: false,
        }
    }

    getClassName() {
        const {inRow, className} = this.props;
        if (inRow) {
            return "in-row-button"
        }
        return className || "table-button";
    }

    handleClick = () => {
        this.setState({loading: true});
        const {onClick} = this.props;
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        if (onClick) {
            onClick();
        }
    }

    getIcon = () => {
        const {inRow, icon} = this.props;
        if (inRow) {
            return;
        }
        return icon ? IconUtils.buildIcon(icon) : "";
    }

    componentDidMount = () => {
        //TODO 根据authoriytName去验证是否能用

    }

    render() {
        const {type, icon, i18NCode,inRow} = this.props;
        const {loading, disabled} = this.state;
        return <Button 
                type={type || "primary"}
                className={this.getClassName()}
                icon={icon}
                disabled={disabled}
                loading={loading || false}
                onClick={() => this.handleClick()}
            >
            {/* {""} */}
            {I18NUtils.getClientMessage(i18NCode)}
        </Button>
    }

}

AuthorityButton.prototypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    i18NCode: PropTypes.string,
    inRow:PropTypes.bool
}