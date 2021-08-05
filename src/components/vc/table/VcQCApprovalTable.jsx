import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import EntityListCheckTable from "@components/framework/table/EntityListCheckTable";
import QCApprovalDialog from "@components/mms/dialog/QCApprovalDialog";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button } from "antd";

export default class VcQCApprovalTable extends EntityListCheckTable {

    static displayName = 'VcQCApprovalTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, formObjectList:[] };
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createApprovalButton());
        return buttons;
    }

    createApprovalButton = () => {
        return  <Button key="approval" type="primary" className="table-button" onClick={this.handledApproval} icon = "import-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnApprove)}
                </Button>
    }

    createForm = () => {
        return  <QCApprovalDialog key={QCApprovalDialog.displayName} ref={this.formRef} 
                                            object={this.state.formObject} 
                                            visible={this.state.formVisible} 
                                            table={this.state.actionTable} 
                                            onOk={this.handledApprovalOK} 
                                            onCancel={this.handleCancel} 
                                            formObjectList={this.state.formObjectList}/>
    }

    handledApproval = () => {
        let self = this;
        let formObjectList = self.getSelectedRows();
        if(!formObjectList){
            return ;
        }
        let actionTableName = this.props.actionTableName;
        let requestObject = {
            name: actionTableName,
            success: function(responseBody) {
                self.setState({
                    actionTable: responseBody.table,
                    formObject:{},
                    formObjectList: formObjectList,
                    formVisible: true,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handledApprovalOK = () =>{
        this.setState({
            formObject:{},
            formObjectList: [],
            formVisible: false,
        });
        let formObjectList = this.getSelectedRows();
        this.refreshDelete(formObjectList);
        
    }
    
    buildOperationColumn = () => {

    }
}