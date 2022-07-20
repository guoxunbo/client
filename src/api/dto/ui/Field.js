import { Input, InputNumber, DatePicker, Switch,Form, Tag, Button, Upload } from 'antd';
import {SessionContext} from '../../Application'
import {Language, DateFormatType, FieldKeywords, DefaultRowKey} from "../../const/ConstDefine";
import RefListField from '../../../components/Field/RefListField';
import RefTableField from '../../../components/Field/RefTableField';
import {Icon} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import PropertyUtils from '../../utils/PropertyUtils';
import I18NUtils from '../../utils/I18NUtils';
import { i18NCode } from '../../const/i18n';

import moment from 'moment';
import EntityManagerRequest from '../../entity-manager/EntityManagerRequest';
import EventUtils from '../../utils/EventUtils';

const { RangePicker} = DatePicker;
const FormItem = Form.Item;

const DisplayType = {
    text : "text",
    password : "password",
    int: "int",
    double: "double",
    //日期相关
    calendar : "calendar",
    calendarFromTo : "calendarFromTo",
    datetime : "datetime",
    datetimeFromTo: "datetimeFromTo",
    //选择框
    sysRefList: "sysRefList",
    userRefList: "userRefList",
    referenceTable: "referenceTable",
    //单选
    radio: "radio",
    //文件
    file: "file"
}

const NumberType = [DisplayType.int, DisplayType.double];
const DateType = [DisplayType.calendar, DisplayType.calendarFromTo, DisplayType.datetime, DisplayType.datetimeFromTo]
const DataFromTo = [DisplayType.calendarFromTo,DisplayType.datetimeFromTo];
const DisplaySelectType = [DisplayType.sysRefList, DisplayType.userRefList, DisplayType.referenceTable];
const DefaultFromToDuration = 10;

const Aligin = {
    left : "left",
    right : "right",
    center: "center"
}

const DisplayLength = {
    min: 20,
    max: 400
}
export default class Field {

    displayFlag;
    mainFlag;
    basicFlag;
    fromParent;
    upperFlag;
    negativeFlag;
    
    objectRrn;
    name;
    label;
    labelZh;    
    labelRes;
    displayType;
    refListName;
    refTableName;
    defaultValue;
    tabRrn;
    displayLength;
    referenceRule;

    //验证栏位
    readonlyFlag;
    editable;
    requiredFlag;
    namingRule;

    // 查询栏位
    queryFlag;
    queryRequireFlag;
    queryLikeFlag;

    // 前端栏位
    title;
    placeHolder;
    disabled;
    form;
    width;
    minValue;
    style;
    table;
    // 实际前端组件比如<Input>
    node;

    /**
     * 构造方法
     * @param field 后台NBField类对应的实例化对象
     * @param form form表单 
     */
    constructor(field, form) {
        PropertyUtils.copyProperties(field, this);
        this.form = form;
        this.build();
    }

    build = () => {
        // 处理国际化
        let language = SessionContext.getLanguage();
        if (language == Language.Chinese) {
            this.title = this.labelZh;
        } else if (language == Language.English) {
            this.title = this.label;
        } else {
            this.title = this.labelRes;
        }
        // 处理长度
        this.width = this.displayLength;
        if (this.width < DisplayLength.min) {
            this.width = DisplayLength.min;
        } else if (this.width >= DisplayLength.max) {
            this.width = DisplayLength.max;
        }
        // 处理最小值
        if (this.negativeFlag) {
            this.minValue = undefined;
        } else {
            this.minValue = 0;
        }
    }

    upload = (option) => {
        let record = option.data;
        let refresh = this.table.refresh;
        let object = {
            filePropertyName: this.name,
            modelClass: this.table.modelClass,
            values: record,
            success: function(responseBody) {
                if (refresh) {
                    refresh(responseBody.data);
                }
            }
        }
        EntityManagerRequest.sendUploadFileRequest(object, option.file);
    }

    download = (text, record, index) => {
        let object = {
            filePropertyName: this.name,
            modelClass: this.table.modelClass,
            values: record,
            fileName: text
        }
        EntityManagerRequest.sendDownloadFileRequest(object);
    }

    buildBooleanColumnRender(columnValue) {
        let value = columnValue;
        if (typeof columnValue === "string") {
            value = columnValue.toBoolean();
        }
        return (
            <span>
                <Tag color={value ? 'green' : 'red'} >{value ? I18NUtils.getClientMessage(i18NCode.Yes)
                                                                        : I18NUtils.getClientMessage(i18NCode.No)}</Tag>
            </span>
        );
    }

    buildFileColumnRender(columnValue, record, index) {
        let columnRender = [];
        if (columnValue) {
            columnRender.push(<Button key="download" shape="round" onClick={() => this.download(columnValue, record, index)} size={"small"}>{columnValue}</Button>)
        }
        
        // 当这个table携带了refresh方法时候，就可以直接支持上传
        if (this.table.refresh && Number.isInteger(record[DefaultRowKey])) {
            columnRender.push(<Upload data={record} customRequest={(option) => this.upload(option)} showUploadList={false} >
                                <Button shape="round" icon="upload" size="small" href="javascript:;"></Button>
                            </Upload>);
        }
        return columnRender;
    }

    buildColumn() {
        if (this.displayFlag && this.mainFlag) {
            // 文本靠左 数字靠右
            let aligin = Aligin.left;
            if (NumberType.includes(this.displayType)) {
                aligin = Aligin.right;
            }
            let columnRender;
            // Table对布尔类型的数据会不显示。'true'会显示
            if (DisplayType.radio == this.displayType) {
                aligin = Aligin.center;
                columnRender = (columnValue, record, index) => this.buildBooleanColumnRender(columnValue)
            }
            // 当columnName是fileName的时候，直接就是超链接
            if (DisplayType.file === this.displayType) {
                aligin = Aligin.center;
                columnRender = (columnValue, record, index) => this.buildFileColumnRender(columnValue, record, index);
            }
            let column = {
                key: this.name,
                title: this.title,
                dataIndex: this.name,
                align: aligin,
                width: this.width,
                render: columnRender,
                sorter: (a, b) => {
                    // 因为存在了字符串和数字等等一系列，故不能直接用a[this.name] - b[this.name]
                    if (a[this.name] > b[this.name]) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
            return column;
        }
        return null;
    }

    isQueryField = () => {
        if (this.displayFlag && this.queryFlag) {
            return true;
        }
        return false;
    }

    buildStyle = (query) => {
        
    }

    dateChange = (date, dateStr) => {
        EventUtils.getEventEmitter().emit(EventUtils.getEventNames.ComboxValueChanged, this, dateStr);
    }

    /**
     * 根据不同的DisplayType创建不同的组件
     *  因为refList refTable是对select重新封装。故此处需要自己初始化值
     * @param edit 是否是编辑form 编辑form会处理editable栏位
     * @param query 是否是queryForm 如果是queryForm需要改变combox的宽度。
     * //TODO 处理默认时间今天，以及默认时间为最后一个月
     */
    buildControl(edit, query, initialValue, onBlur, onPressEnter) {
        this.buildDisabled(edit, query);
        if (this.displayType == DisplayType.text || this.displayType == DisplayType.file) {
            return <Input ref={node => (this.node = node)} onBlur={onBlur} onPressEnter={e => onPressEnter ? onPressEnter(e, this) : undefined} placeholder = {this.placeHolder} style={this.upperFlag ? styles.textUppercaseStyle : undefined} disabled={this.disabled}/>;
        } else if (this.displayType == DisplayType.int) {
            return <InputNumber onBlur={onBlur} min={this.minValue} disabled={this.disabled}/>;
        } else if (this.displayType == DisplayType.double) {
            return <InputNumber onBlur={onBlur} min={this.minValue} step={0.01} disabled={this.disabled}/>;
        } else if (this.displayType == DisplayType.password) {
            return <Input onBlur={onBlur} placeholder = {this.placeHolder} type="password" disabled={this.disabled}/>;
        } else if (this.displayType == DisplayType.calendar) {
            return <DatePicker onBlur={onBlur} locale={locale} disabled={this.disabled} onChange={this.dateChange}/>
        } else if (this.displayType == DisplayType.calendarFromTo) {
            return query ? <RangePicker locale={locale} disabled={this.disabled}/> : <DatePicker locale={locale} disabled={this.disabled}/> ;
        } else if (this.displayType == DisplayType.datetime) {
            return <DatePicker locale={locale} showTime format={DateFormatType.DateTime} disabled={this.disabled} />
        } else if (this.displayType == DisplayType.datetimeFromTo) {
            return query ? <RangePicker locale={locale} showTime format={DateFormatType.DateTime} disabled={this.disabled}/> : <DatePicker locale={locale} showTime format={DateFormatType.DateTime} disabled={this.disabled} />
        } else if (this.displayType == DisplayType.sysRefList) {
            return <RefListField initialValue={initialValue} field={this} referenceName={this.refListName}  disabled={this.disabled}/>
        } else if (this.displayType == DisplayType.userRefList) {
            return <RefListField ref={node => (this.node = node)} onBlur={onBlur} initialValue={initialValue} field={this} referenceName={this.refListName} owner  disabled={this.disabled}/>
        } else if (this.displayType == DisplayType.referenceTable) {
            return <RefTableField ref={node => (this.node = node)} onBlur={onBlur} initialValue={initialValue} field={this} form={this.form} disabled={this.disabled}/>
        } else if (this.displayType == DisplayType.radio) {
            return <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} disabled={this.disabled}/>
        }
    }
    
    /**
     * 根据field类型不同创建不同的组件 以及规则
     * @param fieldDecorator form
     * @param formItemProperties form属性比如样式等
     * @param edit 是否是编辑form 编辑form会处理editable栏位
     * @param query 是否是queryForm queryForm的是否必输根据queryRequireFlag决定
     * @param initialValue 初始值
     */
    buildFormItem = (formItemProperties, edit, query, initialValue, onPrecessEnter) => {
        //处理formItemPorperties TODO暂时不支持file上传组件检验
        if (!formItemProperties) {
            formItemProperties = {};
        } 
        const { getFieldDecorator } = this.form;
        let valuePropName = "value";
        if (this.displayType == DisplayType.radio) {
            valuePropName = "checked";
        } 
        let rules = this.buildRule(query);
        initialValue = this.buildInitialValue(initialValue, query);
        return (<FormItem {...formItemProperties} label={this.title}>
            {getFieldDecorator(this.name, {
                rules: rules,
                initialValue: initialValue,
                valuePropName: valuePropName,
            })
            (
            this.buildControl(edit, query, initialValue, undefined, onPrecessEnter)
            )}
        </FormItem>);
    }

    
    /**
     * 对initialValue在不同的displayType上做不同的封装
     */
    buildInitialValue = (initialValue, query) => {
        if (DateType.includes(this.displayType)) {
            let formatCode = DateFormatType.Date;
            if (this.displayType.startsWith(DisplayType.datetime)) {
                formatCode = DateFormatType.DateTime;
            }
            // 如果是fromTo并且是queryForm
            // 不是queryForm的话，fromTo是无效的。会自动变成calender和datetime组件
            if (DataFromTo.includes(this.displayType) && query) {
                let date = new Date();
                let fromTime;
                let endTime = moment(date, formatCode);
                if (initialValue) {
                    fromTime = moment(initialValue, formatCode);
                } else {
                    date.setDate(date.getDate() - DefaultFromToDuration);
                    fromTime = moment(date, formatCode);
                }
                initialValue= [fromTime, endTime];
            } else {
                if (initialValue) {
                    initialValue = moment(initialValue, formatCode);
                } else {
                    initialValue = moment(new Date(), formatCode);
                }
            }
        }
        if (DisplayType.radio === this.displayType) {
            if (typeof initialValue === "string") {
                initialValue = initialValue.toBoolean();
            }
        }
        return initialValue;
    }
    /**
     * 创建table里面的foritem 不具备显示label功能
     * @param record 记录
     * @param 表格
     * @param onBlur 失焦事件
     * @param onPressEnter 回车事件
     */
    buildTableFormItem = (record, form, onBlur, onPressEnter) => {
        let valuePropName = "value";
        if (this.displayType == DisplayType.radio) {
            valuePropName = "checked";
        } 
        let formValue = form ? form : this.form;
        const { getFieldDecorator } = formValue;
        let rules = this.buildRule(false);
        let initialValue = this.buildInitialValue(record[this.name]);
        return (<FormItem>
            {getFieldDecorator(this.name, {
                rules: rules,
                valuePropName: valuePropName,
                initialValue: initialValue
            })
          (
            this.buildControl(true, false, initialValue, onBlur, onPressEnter)
          )}
        </FormItem>);
    }


    buildDisabled = (edit, query) => {
        if (this.readonlyFlag && !query) {
            this.disabled = true;
            this.placeHolder = "";
        }
        // 当进行编辑(修改)对象的时候，判断其栏位是否是可编辑
        if (edit && !this.editable) {
            this.disabled = true;
            this.placeHolder = "";
        }
        // 当是文件类型的时候，只能只读
        if (DisplayType.file === this.displayType) {
            this.disabled = true;
            this.placeHolder = "";
        }
    }
    /**
     * 根据nbfield创建不同的规则rule
     *  只有当displayType为text才去检验规则，其他只处理是否只读
     * @param 是否是查询form生成。如果是则根据queryRequired来生成必输
     */
    buildRule(query) {
        let rules = [];
        let rule = {};
        rule.whitespace = true;
        if (this.requiredFlag) {
            rule.required = true;
        }
        if (query) {
            rule.required = this.queryRequireFlag;
        }
        
        if (DisplayType.text == this.displayType) {
            // 只有当text的时候才支持正则
            if (this.namingRule) {
                rule.pattern = this.namingRule;
            }
        }

        if (DisplaySelectType.includes(this.displayType)) {
            rule.transform = (value) => {
                if (value) {
                    return value.toString();
                }
            }
        }

        if (DisplayType.radio == this.displayType) {
            rule.type = "boolean";
            // 因为会有预留栏位，预留栏位会返回字符串类型的true, boolean故此处需要转换下。
            rule.transform = (value) => {
                if (typeof value === "string") {
                    value = value.toBoolean();
                }
                return value;
            }
        }

         // 数字
        if (NumberType.includes(this.displayType)) {
            rule.type = "number";
            rule.transform = (value) => {
                if(value) {
                    return Number(value);
                }
            }
        }
        
        if (DateType.includes(this.displayType)) {
            rule.type = "object";
            if (this.displayType.endsWith("FromTo") && query) {
                rule.type = "array";
            }
        }
        rules.push(rule);
        return rules;
    }
}

const styles = {
    textUppercaseStyle: {
        textTransform:"uppercase"
    }
};
export {DisplayType}