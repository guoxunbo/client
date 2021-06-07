import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";
import { WrappedPackageMLotForm } from "@components/mms/form/mobile/PackageMLotForm";
import MobileTable from "@components/framework/table/MobileTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import PackageMaterialLotRequest from "@api/package-material-lot/PackageMaterialLotRequest";

/**
 * 手持端 包装
 */
export default class PackageMLotProperties extends MobileProperties{

    static displayName = 'PackageMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, packageType: this.state.parameters.parameter1};
    }

    buildMobileForm = () => {
        return (<WrappedPackageMLotForm ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}
                    dataTable ={this.dataTable}
                    packageType = {this.state.packageType}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()}  tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag = {false}/>
    }

    handleSubmit = () => {
        let self = this;
        const {data} = self.dataTable.state;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            packageType: self.state.packageType,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        PackageMaterialLotRequest.sendPackMaterialLotsRequest(requestObject)
    }
}
