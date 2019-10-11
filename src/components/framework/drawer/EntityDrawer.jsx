import  React, { Component } from 'react';

import { Drawer, Button } from "antd";
import I18NUtils from "@api/utils/I18NUtils";
import { i18NCode } from "@api/const/i18n";
import PropertyUtils from '@api/utils/PropertyUtils';
import { DefaultOrderKey } from '@api/const/ConstDefine';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';
import {WrappedAdvancedEntityForm} from '@components/framework/form/EntityForm';

export default class EntityDrawer extends Component {
    static displayName = 'EntityDrawer';

    componentDidMount = () => {
        const object = this.props.object;
        if (object) {
            let fieldValue = {};
            const formItemNames = Object.keys(this.props.form.getFieldsValue());
            for (let name of formItemNames) {
                fieldValue[name] = object[name];
            }
            this.props.form.setFieldsValue(fieldValue);
        }
    }

    buildForm = () =>  {
        return <WrappedAdvancedEntityForm ref={(form) => this.entityForm = form} object={this.props.object} table={this.props.table}/>
    }

    handleOk = (e) => {
        this.entityForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            let formObject = this.props.object;
            PropertyUtils.copyProperties(values, formObject);
            // 如果当前values具备seqNo栏位并且该栏位没手动给值。则说明需要自动给个seqNo的值
            if (formObject.hasOwnProperty(DefaultOrderKey) && !formObject[DefaultOrderKey]) {
                // 只有对象有seqNo栏位，则tableData必定有seqNo
                if (this.props.tableData && Array.isArray(this.props.tableData)) {
                    if (this.props.tableData.length == 0) {
                        formObject[DefaultOrderKey] = 1;
                    } else {
                        let data = this.props.tableData.sort(function(a,b){
                            if (a[DefaultOrderKey] - b[DefaultOrderKey] < 0) {
                                return -1;
                            } else {
                                return 1;
                            }
                        });
                        formObject[DefaultOrderKey] = data[data.length - 1][DefaultOrderKey] + 1;
                    }
                }
            }
            this.handleSave(formObject);
        });
    }

    handleSave = (formObject) => {
        var self = this;
        // 默认处理的saveEntity
        let object = {
            modelClass: this.props.table.modelClass,
            values: formObject,
            tableRrn: this.props.table.objectRrn,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.data);
                }
            }
        };
        EntityManagerRequest.sendMergeRequest(object);
    }

    render() {
        return <Drawer width={1040} onClose={this.props.onDrawerClose} object={this.props.object}
                    visible={this.props.visible} title={I18NUtils.getClientMessage(i18NCode.Edit)}>
                    {this.buildForm()}
                    <div style={{position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: '100%',
                                    borderTop: '1px solid #e9e9e9',
                                    padding: '10px 16px',
                                    background: '#fff',
                                    textAlign: 'right'}}>
                    <Button onClick={this.handleOk} type="primary" > {I18NUtils.getClientMessage(i18NCode.Ok)} </Button>
                    </div>
                </Drawer>
    }
}

