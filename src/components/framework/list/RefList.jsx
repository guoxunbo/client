import React, { Component } from 'react';
import { List } from "antd";
import * as PropTypes from 'prop-types';
import RefListManagerRequest from '@api/ref-list-manager/RefListManagerRequest';

/**
 * 用一个列表显示参考值
 *  效果可以参考各种检查页面，
 */
export default class RefList extends Component {

    static displayName = 'RefList';

    constructor(props) {
        super(props);
        this.state= {...this.state, dataList:[]}
    }   

    componentDidMount = () => {
        this.queryData();
    }

    queryData = () => {
        let self = this;
        let object = {
            owner: this.props.owner,
            referenceName: this.props.referenceName,
            success: function(responseBody) {
                self.setState({
                    dataList: responseBody.dataList,
                });
            }
        }
        RefListManagerRequest.sendGetDataRequest(object);
    }

    render() {
        return <List bordered header={<div>{this.props.referenceName}</div>}
                    dataSource={this.state.dataList}
                    renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.key}
                            description={item.value}
                          />
                        </List.Item>
                      )}></List>
    }

}
RefList.prototypes = {
    owner: PropTypes.bool,
    referenceName: PropTypes.string.isRequired
}