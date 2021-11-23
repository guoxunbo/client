import React, { Component } from 'react';
import { Form, Input, Row, Col, Tabs, Button } from 'antd';
import * as PropTypes from 'prop-types';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { DefaultRowKey, DateFormatType, SqlType, DataBaseType } from '../../api/const/ConstDefine';
import './MobileForm.scss';
import TableManagerRequest from '../../api/table-manager/TableManagerRequest';
import Field from '../../api/dto/ui/Field';
import moment from 'moment';
import StringBuffer from '../../api/StringBuffer';
import { Application } from '../../api/Application';

export default class MobileForm extends Component {
    static displayName = 'MobileForm';

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
            entityViewFlag: this.props.entityViewFlag,
            queryFields:[],
        };
    }  

    onFiledEnter = (e, field) => {
        let self = this;
        let queryFields = this.state.queryFields;
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = -1;
            queryFields.map((queryFields, index) => {
                if (queryFields[DefaultRowKey] === field[DefaultRowKey]) {
                    dataIndex = index;
                }
            });
            if (dataIndex == queryFields.length - 1) {
                this.props.form.validateFields((err, values) => {
                    self.onLastFiledEnter(field);
                });
            } else {
                let nextDataIndex = dataIndex + 1;
                let nextFields = queryFields[nextDataIndex];
                document.getElementById(nextFields.name).focus();
            }
        }
    }

      
    onLastFiledEnter = (field) => {
        this.props.form.validateFields((err, values) => {
            this.handleSearch();
        });

    } 

    resetFormFileds() {
        this.props.form.resetFields();
        document.getElementById(this.state.queryFields[0].name).focus();
    }
    
    /**
     * 将时间类型转成语句
     * 针对于oracle和其他数据库的不同，转换语法不一样
     */
    partseSqlDate = (momentObject, dateFormatType) => {
        let value = new StringBuffer();
        if (moment.isMoment(momentObject)) {
            let date = momentObject.format(dateFormatType);
            if (Application.database === DataBaseType.oracle) {

                value.append(SqlType.toDate);
                value.append("(");
                value.append("'");
                value.append(date);
                value.append("'");
                value.append(",");
                value.append("'");
                value.append(this.getOracleDateType(dateFormatType));
                value.append("'");
                value.append(")");
            } else {
                value.append("'" + date + "'");
            }
        }
        return value.toString();
    }

    /**
     * 根据moment不同的dateType获取对应的oracle的dateType
     */
    getOracleDateType = (dateFormatType) => {
        if (DateFormatType.DateTime == dateFormatType) {
            return SqlType.DateTime;
        } 
        return SqlType.Date; 
    }

         getOracleDateType = (dateFormatType) => {
            if (DateFormatType.DateTime == dateFormatType) {
               return SqlType.DateTime;
            } 
            return SqlType.Date; 
        }

    buildWhereClause = (formValues) => {
        const queryFields = this.state.queryFields;
        let whereClause = new StringBuffer();
        let firstFlag = true;
        for (let queryField of queryFields) {
            let fieldName = queryField.name;
            let fieldValue = formValues[fieldName];
            if (fieldValue && fieldValue != "") {
                if (!firstFlag) {
                    whereClause.append(SqlType.And);
                }
                whereClause.append(fieldName);
                // 如果是个数组。则需要用>= 以及<=了 两位数当前肯定是个时间
                if (Array.isArray(fieldValue) && fieldValue.length == 2) {
                    whereClause.append(SqlType.Gt);
                    let gtValue = fieldValue[0];
                    let ltValue = fieldValue[1];

                    let value = "'" + gtValue.toString() + "'";
                    if (moment.isMoment(gtValue)) {
                        value = this.partseSqlDate(gtValue, DateFormatType.DateTime);
                    } 
                    whereClause.append(value);

                    whereClause.append(SqlType.And);
                    whereClause.append(fieldName);
                    whereClause.append(SqlType.Lt);

                    value = "'" + ltValue.toString() + "'";
                    if (moment.isMoment(ltValue)) {
                        value = this.partseSqlDate(ltValue, DateFormatType.DateTime);
                    } 
                    whereClause.append(value);
                } else {
                    fieldValue = fieldValue.toString();
                    if (queryField.queryLikeFlag) {
                        whereClause.append(SqlType.Like);
                        fieldValue = '%' + fieldValue + '%'
                    } else {
                        if (fieldValue.indexOf('*') != -1) {
                            whereClause.append(SqlType.Like);
                            //加/g表示全部替换
                            fieldValue = fieldValue.replace(/\*/g, '%');
                        } else {
                            whereClause.append(SqlType.Eq);
                        }
                    }
                    if (!fieldValue.startsWith(SqlType.toDate)) {
                        whereClause.append("'")
                    } 
                    whereClause.append(fieldValue);
                    if (!fieldValue.startsWith(SqlType.toDate)) {
                        whereClause.append("'")
                    } 
                }
                firstFlag = false;
            }
        }
        return whereClause.toString();
    }

    handleSearch = () => {
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // 处理时间类型的栏位相关 antd的时间栏位类型是Moment，需要自己转换
            for (let property in values) {
                if (values[property]) {
                    // 如果是单独的时间类型，不是个区域时间(dateFromTo)的话
                    if (moment.isMoment(values[property])) {
                        values[property] = this.partseSqlDate(values[property], DateFormatType.Date);
                    }
                    if (Array.isArray(values[property])) {
                        // 如果第一个栏位不是moment的话，则说明不是时间数组，则跳过
                        if (!moment.isMoment(values[property][0])) {
                            continue;
                        }
                        // 当前处理为0点0分0秒到23点59分59秒。即如果from 4号 to 4号。就是4号零点到4号23点59分59秒。
                        let fromDate = values[property][0].hour(0).minute(0).second(0);
                        let toDate = values[property][1].hour(23).minute(59).second(59);
                        values[property] = [fromDate, toDate]
                    }
                }
            }
            let whereClause = self.buildWhereClause(values);
            if (self.props.onSearch) {
                self.props.onSearch(whereClause);
            } 
        });
    };

    componentDidMount = () => {
        const {table, tableRrn} = this.state;
        // 如果没有传递table则根据tableRrn查询。如果都没传递则不查。
        if (!(table && table.fields && table.fields.length > 0)) {
            if (tableRrn) {
                let self = this;
                let queryFields = [];
                let requestObject = {
                    tableRrn: tableRrn,
                    success: function(responseBody) {
                        for (let field of responseBody.table.fields) {
                            let f = new Field(field, self.props.form);
                            if (f.isQueryField()) {
                                queryFields.push(f);
                            }
                        }
                        self.setState({table: responseBody.table,queryFields: queryFields})
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
        let queryFields = [];
        for (let field of fields) {
            let f = new Field(field, this.props.form);
            if (f.isQueryField()) {
                queryFields.push(f);
            }
        }
        for (let field of queryFields) {
            children.push(<Col span={12} key={field.objectRrn}>
                {field.buildFormItem(formItemLayout, this.state.editFlag, 
                            true, 
                            formObject ? formObject[field.name] : undefined,
                            this.onFiledEnter)}
            </Col>);
        }

        return children;
    }


    buildButtons = () => {
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

MobileForm.propTypes = {
    object: PropTypes.object,
    table: PropTypes.object,
    tableRrn: PropTypes.string,
    entityViewFlag: PropTypes.bool,
}
const WrappedAdvancedMobileForm = Form.create()(MobileForm);
export {WrappedAdvancedMobileForm};

