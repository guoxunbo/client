import { i18NCode } from "@const/i18n";
import EntityViewProperties from "@properties/framework/EntityViewProperties";
import I18NUtils from "@utils/I18NUtils";
import { Button, Input } from "antd";
import '@components/framework/table/ListTable.scss';
import MaterialLotQcDialog from "@components/mms/dialog/MaterialLotQcDialog";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import NoticeUtils from "@utils/NoticeUtils";
import { DefaultRowKey } from "@const/ConstDefine";
import EntityManagerRequest from "@api/entity-manager/EntityManagerRequest";


export default class MaterialLotQcProperties extends EntityViewProperties{

    static displayName = 'MaterialLotQcProperties';
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createRemarkInput());
        buttons.push(this.createRemarkButton());
        buttons.push(this.createJudgeButton());
        return buttons;
    }

    handleRemark = () => {
        let materialLotCheckSheet = this.state.formObject;
        if(!materialLotCheckSheet[DefaultRowKey]){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let remark = this.input.state.value;
        if(remark == "" || remark == undefined){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.RemarkIsNull));
            return;
        }
        materialLotCheckSheet.remark1 = remark;
        var self = this;
        let object = {
            modelClass: this.state.table.modelClass,
            values: materialLotCheckSheet,
            tableRrn: this.state.table.objectRrn,
            success: function(responseBody) {
                self.refresh(responseBody.data);
                NoticeUtils.showSuccess();
            }
        };
        EntityManagerRequest.sendMergeRequest(object);
    }

    refresh = (data) => {
        this.setState({
            formObject: data
        });
    }
    createRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="remarkInput" placeholder={I18NUtils.getClientMessage(i18NCode.BtnRemark)} />
        </div>
    }
    
    loadDataInComponentDidMount = () => {
        let materialLotQcDialogTableName = this.state.parameters.parameter1;
        let self = this;
        let requestObject = {
            name: materialLotQcDialogTableName,
            success: function(responseBody) {
                self.setState({
                    materialLotQcActionTable: responseBody.table,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleJudge = () => {
        this.setState({
            formVisible: true
        });
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }

    createRemarkButton = () => {
        return <Button key="remark" type="primary" className="table-button" icon="edit" onClick={this.handleRemark}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRemark)}
                    </Button>
    }

    createJudgeButton = () => {
        return <Button key="judge" type="primary" className="table-button" icon="judge" onClick={this.handleJudge}>
                        {I18NUtils.getClientMessage(i18NCode.BtnJudge)}
                    </Button>
    }

    buildDialog = () => {
        return  <MaterialLotQcDialog key={MaterialLotQcDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.materialLotQcActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

}


const styles = {
    input: {
        width: 300,
    },
};