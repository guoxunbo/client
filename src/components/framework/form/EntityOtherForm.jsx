import React, { Component } from 'react';
import { Form, Input, Row, Col, Tabs } from 'antd';
import * as PropTypes from 'prop-types';
import Field from '@api/dto/ui/Field';
import Tab from '@api/dto/ui/Tab';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import { DefaultRowKey } from '@api/const/ConstDefine';

class EntityOtherForm extends Component {
    static displayName = 'EntityForm';

    constructor(props) {
        super(props);
        let editFlag = false;
        if (this.props.object && this.props.object.objectRrn) {
            editFlag = true;
        }
        this.state = {
            editFlag : editFlag
        };
    }  

    buildBasicSectionField = () => {
        const fields = this.props.table.fields;
        const formObject = this.props.object;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        let children = [];
        for (let f of fields) {
            let field = new Field(f, this.props.form);
            if (field.basicFlag && field.displayFlag && field.name != "objectRrn") {
                children.push(<Col span={12} key={field.objectRrn}>
                    {field.buildFormItem(formItemLayout, this.state.editFlag, undefined, formObject[field.name])}
                </Col>);
            }
        }
        return children;
    }

    buildTabs = () => {
        const tabs = this.props.table.tabs;
        const tabPanels = [];
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        if (Array.isArray(tabs)) {
            tabs.forEach((tab) => {
                let tabPanel = new Tab(tab);
                tabPanels.push(tabPanel.buildTab(this.props.form, formItemLayout, this.props.object));
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
                {getFieldDecorator(DefaultRowKey,
                {
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

EntityOtherForm.propTypes={
    object: PropTypes.object,
    table: PropTypes.object,
}
const WrappedAdvancedEntityOtherForm = Form.create()(EntityOtherForm);
export default WrappedAdvancedEntityOtherForm;

