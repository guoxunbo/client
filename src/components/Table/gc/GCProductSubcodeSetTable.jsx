import EntityListTable from "../EntityListTable";
import ProductSubcodeForm from "../../Form/ProductSubcodeForm";
import { Form } from "antd";
import { Upload } from 'antd';
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import IconUtils from '../../../api/utils/IconUtils';
import AsyncManagerRequest from "../../../api/gc/async-manager/AsyncManagerRequest";
import MessageUtils from "../../../api/utils/MessageUtils";
import ProductSubcodeManagerRequest from "../../../api/gc/product-subcode-manager/ProductSubcodeManagerRequest";
import EventUtils from "../../../api/utils/EventUtils";

export default class GCProductSubcodeSetTable extends EntityListTable {

    static displayName = 'GCProductSubcodeSetTable';

    constructor(props) {
        super(props);
    }

    createForm = () => {
        const WrappedAdvancedEntityForm = Form.create()(ProductSubcodeForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        // buttons.push(this.createSyncProductSubCodeButton());
        return buttons;
    }

    handlesUpload = (option) => {
        const self = this;
        const {table} = this.state;
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let object = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                self.setState({
                    loading: false
                });
               MessageUtils.showOperationSuccess();
            }
        }
        ProductSubcodeManagerRequest.sendImportRequest(object, option.file);
    }

    /**
     * 创建导入按钮
     */
    createImportButton = () => {
        return (<Upload key="import" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.handlesUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.BtnImp)}</Button>
                </Upload>);
    }

    createSyncProductSubCodeButton = () => {
        return <Button key="sync" type="primary" onClick={() => this.syncProductSubcode()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnSyncProductSubcode)}</Button>;
    }

    syncProductSubcode  =() => {
        let asyncType = "AsyncProductSubcode";
        let object = {
            actionType : asyncType
        }
        AsyncManagerRequest.sendAsyncRequest(object);
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};