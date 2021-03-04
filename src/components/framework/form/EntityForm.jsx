import React, { Component } from 'react';
import { Form, Input, Row, Col, Tabs } from 'antd';
import * as PropTypes from 'prop-types';
import Field from '@api/dto/ui/Field';
import Tab from '@api/dto/ui/Tab';
import {TabType} from '@api/dto/ui/Tab';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import { DefaultRowKey } from '@api/const/ConstDefine';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';

export default class EntityForm extends Component {
    static displayName = 'EntityForm';

    constructor(props) {
        super(props);
        let editFlag = false;
        if (this.props.object && this.props.object.objectRrn) {
            editFlag = true;
        }
        this.state = {
            editFlag : editFlag,
            table: this.props.table,
            tableRrn: this.props.tableRrn,
            entityViewFlag: this.props.entityViewFlag
        };
    }  

    componentDidMount = () => {
        const {table, tableRrn} = this.state;
        // 如果没有传递table则根据tableRrn查询。如果都没传递则不查。
        if (!(table && table.fields && table.fields.length > 0)) {
            if (tableRrn) {
                let self = this;
                let requestObject = {
                    tableRrn: tableRrn,
                    success: function(responseBody) {
                        self.setState({table: responseBody.table})
                    }
                }
                TableManagerRequest.sendGetByRrnRequest(requestObject);
            }
        } 
    }
    
    buildBasicSectionField = () => {
        const fields = this.state.table.fields;
        const formObject = this.props.object;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        let children = [];
        let basicFields = fields.filter((field) => {
            if (field.basicFlag && field.displayFlag && field.name != DefaultRowKey) {
                return field;
            }
        });   

        for (let f of basicFields) {
            let field = new Field(f, this.props.form, basicFields);
            children.push(<Col span={12} key={field.objectRrn}>
                {field.buildFormItem(formItemLayout, this.state.editFlag, undefined, formObject ? formObject[field.name] : undefined)}
            </Col>);
        }
        return children;
    }

    buildTabs = () => {
        const {entityViewFlag, table} = this.state;
        const tabs = table.tabs;

        const tabPanels = [];
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        if (Array.isArray(tabs)) {
            tabs.forEach((tab) => {
                let tabPanel = new Tab(tab);
                if (TabType.Table === tab.tabType ) {
                    if (entityViewFlag) {
                        tabPanels.push(tabPanel.buildTableTab(this.props.object, entityViewFlag));
                    }
                } else {
                    tabPanels.push(tabPanel.buildFieldTab(this.props.form, formItemLayout, this.props.object));
                }
            }) 
        }
        return (<Tabs>
           {tabPanels}
        </Tabs>)
    }
    
    buildBasicSection =() => {
        return (
            <div>
                <h2 className="section-title">{I18NUtils.getClientMessage(i18NCode.BasicInfo)}</h2>
                <Row gutter={16}>
                    {this.buildBasicSectionField()}
                </Row>
            </div>
        )
    }

    buildForm = () =>  {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                {getFieldDecorator(DefaultRowKey, {
                    initialValue: this.props.object ? this.props.object[DefaultRowKey] : undefined
                }
                )(<Input type='hidden'/>)}

                {this.buildBasicSection()}
                {this.buildTabs()}
            </Form>)
    }

    render() {
        return (
            <div>
                {this.buildForm()}
            </div>
        );
    }
}

EntityForm.propTypes = {
    object: PropTypes.object,
    table: PropTypes.object,
    tableRrn: PropTypes.string,
    entityViewFlag: PropTypes.bool,
}
const WrappedAdvancedEntityForm = Form.create()(EntityForm);
export {WrappedAdvancedEntityForm};

