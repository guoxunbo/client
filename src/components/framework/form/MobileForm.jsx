import Field from "@api/dto/ui/Field";
import EntityForm from "@components/framework/form/EntityForm";
import { DefaultRowKey } from "@const/ConstDefine";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import { Button, Col, Form, Row } from "antd";
import './MobileForm.scss';

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


 