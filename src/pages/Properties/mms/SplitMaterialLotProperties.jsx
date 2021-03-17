import { Button } from "@alifd/next";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotSplitDialog from "@components/mms/dialog/MaterialLotSplitDialog";
import SplitMaterialLotTable from "@components/mms/table/SplitMaterialLotTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityViewProperties from "../framework/EntityViewProperties";

/**
 *分批
 */
export default class SplitMaterialLotProperties extends EntityViewProperties{

    static displayName = 'SplitMaterialLotProperties';
    
    // buildTable = () => {
    //     return <SplitMaterialLotTable
    //                                 {...this.getDefaultTableProps()} 
    //                                 pagination={false} />
    // }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSplitButton());
        return buttons;
    }

    createSplitButton =()=>{
        return <Button key="split" type="primary" className="table-button" onClick={this.handleSplit}>
                        {IconUtils.buildIcon("file-excel")} {I18NUtils.getClientMessage(i18NCode.BtnSplit)}
                    </Button>
    }

    loadDataInComponentDidMount = () => {
        let MaterialLotSplitDialogTableName = this.state.parameters.parameter1;
        let self = this;
        let requestObject = {
            name: MaterialLotSplitDialogTableName,
            success: function(responseBody) {
                self.setState({
                    materialLotSplitActionTable: responseBody.table,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }


    buildDialog = () => {
        return  <MaterialLotSplitDialog key={MaterialLotSplitDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.materialLotSplitActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    refresh = (data) => {
        this.setState({
            formObject: [],
            formVisible: false
        });
        NoticeUtils.showSuccess();
    }

    handleSplit = () => {
        let materialLotId = this.state.formObject.materialLotId;
        if(materialLotId == undefined || materialLotId == '' ){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return
        }
        this.setState({
            formVisible: true
        });
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }

}