import React from 'react';
import LabMaterialDialog from '@components/mms/dialog/LabMaterialDialog';
import EntityListTable from '@components/framework/table/EntityListTable';
import LabMaterialManagerRequest from '@api/mms/lab-material-manager/LabMaterialManagerRequest';
import { Button, Upload } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';


export default class LabMaterialTable extends EntityListTable {

    static displayName = 'LabMaterialTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<LabMaterialDialog key={LabMaterialDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                             
        return childrens;

    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddAuthorityButton("AddLabMaterial"));
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                </Upload>;
    }

    handleUpload = (option) => {
        const {table} = this.state;
        let object = {
            tableRrn: table.objectRrn,
        }
        LabMaterialManagerRequest.sendImportRequest(object, option.file);
    }

}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
}