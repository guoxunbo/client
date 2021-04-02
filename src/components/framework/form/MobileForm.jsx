import EntityForm from "@components/framework/form/EntityForm";
import { Col, Form } from "antd";
import './MobileForm.scss';

export default class MobileForm extends EntityForm {
    static displayName = 'MobileForm';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{queryFields:[]}};
    }

    registerFieldEnterEvents = (queryFields) => {
        let fieldEnterEvents = {};
        if (queryFields && Array.isArray(queryFields)) {
            for (let queryField of queryFields) {
                let dataIndex = queryFields.indexOf(queryField);
                if (dataIndex == queryFields.length - 1) {
                    fieldEnterEvents[queryField.name] = this.onLastFieldEnter;
                } else {
                    fieldEnterEvents[queryField.name] = () => this.nextElementFocus(dataIndex, queryFields);
                }
                this.customFieldEnterEvent(queryField, fieldEnterEvents);
            }
        }
        return fieldEnterEvents;
    }

    customFieldEnterEvent = (queryField, fieldEnterEvents) => {

    }

    nextElementFocus = (dataIndex, queryFields) => {
        let nextDataIndex = dataIndex + 1;
        let nextFields = queryFields[nextDataIndex];
        document.getElementById(nextFields.name).focus();
    }

    onLastFieldEnter = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.handleSearch();
        });
    } 
    
    handleSearch = () => {

    }
    
    resetFormFileds() {
        this.props.form.resetFields();
        if (this.state.queryFields.length > 0) {
            document.getElementById(this.state.queryFields[0].name).focus();
        }
    }

    buildTabs = () => {
        
    }

    buildBasicSectionField = () => {
        const fieldEnterEvents = this.state.fieldEnterEvents;
        const queryFields = this.state.queryFields;
        const formObject = this.props.object;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        let children = [];
        for (let field of queryFields) {
            children.push(<Col span={12} key={field.objectRrn}>
                {field.buildFormItem(formItemLayout, this.state.editFlag, 
                            true, 
                            formObject ? formObject[field.name] : undefined,
                            fieldEnterEvents[field.name])}
            </Col>);
        }
        return children;
    }

}

const WrappedAdvancedMobileForm = Form.create()(MobileForm);
export {WrappedAdvancedMobileForm};


 