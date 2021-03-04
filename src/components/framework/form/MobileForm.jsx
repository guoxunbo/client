import Field from "@api/dto/ui/Field";
import EntityForm from "@components/framework/form/EntityForm";
import { DefaultRowKey } from "@const/ConstDefine";
import { Col, Form } from "antd";

export default class MobileForm extends EntityForm {
    static displayName = 'MobileForm';

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
        this.afterSubmit();
    }

    /**
     * 提交成功之后
     * 清空值并且回到第一个的focus上
     */
    afterSubmit = () => {
        this.props.form.resetFields();
        const basicFields = this.state.table.fields.filter((field) => {
            if (field.basicFlag && field.displayFlag && field.name != DefaultRowKey) {
                return field;
            }
        }); 
        document.getElementById(basicFields[0].name).focus();
    }

    buildTabs = () => {
        
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

}

const WrappedAdvancedMobileForm = Form.create()(MobileForm);
export {WrappedAdvancedMobileForm};


 