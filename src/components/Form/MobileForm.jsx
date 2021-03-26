import React, { Component } from 'react';
import { Form, Input, Row, Col, Tabs } from 'antd';
import * as PropTypes from 'prop-types';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { DefaultRowKey } from '../../api/const/ConstDefine';
import TableManagerRequestBody from '../../api/table-manager/TableManagerRequestBody';
import './MobileForm.scss';

export default class MobileForm extends Component {
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

    onFiledEnter = (e, field) => {
        let self = this;
        const basicFields = this.state.table.fields.filter((field) => {
            if (field.basicFlag && field.displayFlag && field.name != DefaultRowKey) {
                return field;
            }
        });  
        if (basicFields && Array.isArray(basicFields)) {
            let dataIndex = -1;
            basicFields.map((basicField, index) => {
                if (basicField[DefaultRowKey] === field[DefaultRowKey]) {
                    dataIndex = index;
                }
            });
            if (dataIndex == basicFields.length - 1) {
                this.props.form.validateFields((err, values) => {
                    self.onLastFiledEnter(field);
                });
            } else {
                let nextDataIndex = dataIndex + 1;
                let nextFields = basicFields[nextDataIndex];
                document.getElementById(nextFields.name).focus();
            }
        }
    }

    onLastFiledEnter = (field) => {
        this.props.form.validateFields((err, values) => {
            this.handleSubmit();
        });

    } 
    
    handleSubmit = () => {
        this.resetFileds();
    }

    resetFileds = () => {
        this.props.form.resetFields();
        const basicFields = this.state.table.fields.filter((field) => {
            if (field.basicFlag && field.displayFlag && field.name != DefaultRowKey) {
                return field;
            }
        }); 
        document.getElementById(basicFields[0].name).focus();
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
                TableManagerRequestBody.sendGetByRrnRequest(requestObject);
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
                {field.buildFormItem(formItemLayout, this.state.editFlag, 
                            undefined, 
                            formObject ? formObject[field.name] : undefined,
                            this.onFiledEnter)}
            </Col>);
        }

        return children;
    }

    buildTabs = () => {
        let buttons = [];
        buttons.push(
            <Col span={10} className="table-button">
                <Form.Item key="submitBtn" >
                    <Button block type="primary" >{I18NUtils.getClientMessage(i18NCode.Ok)}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col span={10} className="table-button">
                <Form.Item key="returnBtn" >
                    <Button block type="primary" onClick={this.resetFileds}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                </Form.Item>
            </Col>
        );
        return buttons;
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

