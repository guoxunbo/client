import React, { Component } from 'react';
import { Modal} from 'antd';
import * as PropTypes from 'prop-types';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import PropertyUtils from '@api/utils/PropertyUtils';
import { DefaultOrderKey, DateFormatType } from '@api/const/ConstDefine';
import moment from 'moment';
import {WrappedAdvancedEntityForm} from '@components/framework/form/EntityForm';
import EventUtils from '@utils/EventUtils';

export default class EntityDialog extends Component {
    static displayName = 'EntityDialog';

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
                        let data = this.props.tableData.sort(function(a,b) {
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
            for (let property in formObject) {
                if (formObject[property] && moment.isMoment(formObject[property])) {
                    // 如果是单独的时间类型，不是个区域时间(dateFromTo)的话
                    formObject[property] = formObject[property].format(DateFormatType.DateTime)
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

    handleCancel = () => {
        EventUtils.sendButtonLoaded();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    buildForm = () =>  {
       return <WrappedAdvancedEntityForm ref={(form) => this.entityForm = form} object={this.props.object} table={this.props.table}/>
    }

    render() {
        const width = this.props.width || 1040;
        const title = this.props.title || I18NUtils.getClientMessage(i18NCode.Edit);
        const okText = this.props.okText || I18NUtils.getClientMessage(i18NCode.Ok);
        return (
            <div>
                <Modal centered 
                    width={width}
                    title={title} 
                    object={this.props.object} 
                    visible={this.props.visible} 
                    maskClosable={false} 
                    onOk={this.handleOk}
                    onCancel={this.handleCancel} 
                    okText={okText}
                    destroyOnClose={true}>
                    {this.buildForm()}
                </Modal>
            </div>
        );
    }
}

EntityDialog.propTypes={
    title: PropTypes.string,
    visible: PropTypes.bool,
    object: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    table: PropTypes.object,
    tableData: PropTypes.array
}

