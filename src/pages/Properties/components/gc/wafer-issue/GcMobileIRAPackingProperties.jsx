import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import IraPackageRequest from "../../../../../api/gc/ira-package-manager/IraPackageRequest";
import MobileIRAPackingTable from "../../../../../components/Table/gc/MobileIRAPackingTable";
import PackageValidationRequest from "../../../../../api/package-validation/PackageValidationRequest";
import EventUtils from "../../../../../api/utils/EventUtils";

const PackageType = "IRAPackCase";

export default class GcMobileIRAPackingProperties extends MobileProperties{

    static displayName = 'GcMobileIRAPackingProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              self.validationPackgeRule(queryDatas[0]);
            } else {
              self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    validationPackgeRule(materialLot) {
        let self = this;
        let {rowKey,tableData} = this.state;
        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            tableData.unshift(materialLot);
        }
        if (tableData.length == 0) {
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        } else {
            let requestObject = {
                packageType: PackageType,
                materialLots: tableData,
                success: function() {
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.form.resetFormFileds();
                },
                fail: function() { 
                    tableData.shift();
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.allFieldBlur();
                }
            }
            PackageValidationRequest.sendValidationPackRequest(requestObject);
        }
    }

    handleSubmit = () => {
        let self = this;
        const {tableData} = self.state;
        if (!tableData || tableData.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            materialLots: tableData,
            packageType: "IRAPackCase",
            success: function(responseBody) {
                let materialLotId = responseBody.materialLotId;
                let message = I18NUtils.getClientMessage(i18NCode.OperationSucceed) + `:${materialLotId}`;
                MessageUtils.showOperationSuccess(message);
                self.resetData();
                self.scanTable.IRABoxLabelPrint(tableData);
            }
        }
        IraPackageRequest.sendPackMaterialLotsRequest(requestObject)
    }

    buildTable = () => {
        return <MobileIRAPackingTable
                                  pagination={false} 
                                  ref={(scanTable) => { this.scanTable = scanTable }}
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetFlag={this.state.resetFlag}
                                  />
    }

}