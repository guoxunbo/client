import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedMLotTransferInvForm } from "@components/mms/form/mobile/MLotTransferInvForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 转库
 */
export default class MLotTransferInvProperties extends MobileProperties{

    static displayName = 'MLotTransferInvProperties';
    
    buildMobileForm = () => {
        return (<WrappedMLotTransferInvForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    handleSubmit = {this.handleSubmit}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()} tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag= {true}/>
    }

    handleSubmit = () => {
        let self = this;
        let {data} = this.dataTable.state;
        let flag = true;
        let transferInvData = [];
        let showData = [];
        data.map((d, index)=>{
            if(d.materialLotId != undefined && d.fromStorageId != undefined && d.targetStorageId != undefined){
                transferInvData.push(d);
                flag = false;
            }else{
                showData.push(d);
            }
        })
        if(flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow))
        }
        let object = {
            data: transferInvData,
            success: function(responseBody) {  
                self.dataTable.setState({
                    data:showData,
                });
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        MobileRequest.sendTransferInvMLotsRequest(object);
    }

}
