import { Button } from "@alifd/next";
import StorageManagerRequest from "@api/vc/storage-manager/StorageManagerRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import TableUtils from "@components/framework/utils/TableUtils";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { object } from "prop-types";
import StorageDialog from "../dialog/StorageDialog";

/**
 * 库位管理
 */
export default class VcStorageTable extends EntityListTable {

    static displayName = 'VcStorageTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

    handleUpload = (option) => {
        const {table} = this.state;
        let object = {
            tableRrn: table.objectRrn,
        }
        StorageManagerRequest.sendImportRequest(object, option.file);
    }

    createForm = () => {
        return  <StorageDialog key = {StorageDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    handleAdd = ()=>{
        this.setState({
            editorObject: {},
            formVisible: true
        });
    }

    handleUpdata =(record)=>{
        this.setState({
            formVisible: true,
            editorObject: record
        });
    }

    refresh = (data) => {
        this.setState({
            formVisible: false,
        });
        TableUtils.refreshEdit(this, data);
    }

    handleCancel = () => {
        this.setState({
            editorObject: {},
            formVisible: false
        });
    }
}