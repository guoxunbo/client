import { Form, Row, Col, Button, Icon } from 'antd';
import './QueryForm.scss';
import TableManagerRequest from '../../api/table-manager/TableManagerRequest';
import { DateFormatType, SqlType, DataBaseType } from '../../api/const/ConstDefine';
import Field from '../../api/dto/ui/Field';
import StringBuffer from '../../api/StringBuffer';
import moment from 'moment';
import { Application } from '../../api/Application';
import * as PropTypes from 'prop-types';

/**
 * 不展开的时候最大的查询数目
 */
const unExpendMaxSize = 6;

class QueryForm extends React.Component {
    static displayName = 'QueryForm';

    constructor(props) {
        super(props);
        let tableRrn = this.props.tableRrn;
        this.state = {
            expand: false,
            tableRrn: tableRrn,
            queryFields: []
        };
    }

    componentDidMount() {
        this.getQueryFields(this.state.tableRrn);
    }

    getQueryFields = (tableRrn) => {
        let self = this;
        let requestObject = {
            tableRrn: tableRrn,
            success: function(responseBody) {
                let fields = responseBody.table.fields;
                let queryFields = [];
                for (let field of fields) {
                    let f = new Field(field, self.props.form);
                    if (f.isQueryField()) {
                        queryFields.push(f);
                    }
                }
                self.setState({queryFields: queryFields})
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
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

    getFields(queryFields) {
        const count = this.state.expand ? queryFields.length : unExpendMaxSize;
        const children = [];
        for (let i in queryFields) {
            let field = queryFields[i];
            children.push(
                <Col span={8} key={field.name} style={{ display: i < count ? 'block' : 'none' }}>
                    {field.buildFormItem(undefined, false, true)}
                </Col>,
            );
        }
        return children;
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

    handleSearch = e => {
        e.preventDefault();
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

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const queryFields = this.state.queryFields;
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields(queryFields)}</Row>
                {queryFields.length > 0 ? 
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                            Search
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row> : ""}
            </Form>
        );
    }
}

QueryForm.prototypes = {
    tableRrn: PropTypes.number.isRequired
}

const WrappedAdvancedQueryForm = Form.create()(QueryForm);
export default WrappedAdvancedQueryForm;