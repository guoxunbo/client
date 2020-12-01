import EntityScanProperties from "./entityProperties/EntityScanProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import WltStockOutManagerRequest from "../../../api/gc/wlt-stock-out/WltStockOutManagerRequest";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import GcFTStockOutMLotScanTable from "../../../components/Table/gc/GcFTStockOutMLotScanTable";
import FtMLotManagerRequest from "../../../api/gc/ft-materialLot-manager/FtMLotManagerRequest";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

export default class GcFTStockOutMLotScanProperties extends EntityScanProperties{

    static displayName = 'GcFTStockOutMLotScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
          this.form.handleReset();
      }
    }

    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let orders = this.props.orderTable.state.data;
        if (orders.length == 0) {
          Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          return;
        }
        let queryFields = this.form.state.queryFields;
        let materialLotId = "";
        if (queryFields.length === 1) {
          materialLotId = this.form.props.form.getFieldValue(queryFields[0].name)
        }
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              let materialLot = queryDatas[0];
              let trueData = [];
              tableData.forEach(data => {
                if(!data.errorFlag){
                  trueData.push(data);
                }
            });
              //验证箱中的产品、等级等信息是否一致
              self.validationWltMLot(materialLot, trueData);
            } else {
                let data = new MaterialLot();
                data[rowKey] = materialLotId;
                data.setMaterialLotId(materialLotId);
                data.errorFlag = true;
                if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  tableData.unshift(data);
                }
                self.setState({ 
                  tableData: tableData,
                  loading: false
                });
                self.form.resetFormFileds();
            }
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    validationWltMLot = (materialLot, materialLots) => {
      let self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        queryMaterialLot : materialLot,
        materialLots: materialLots,
        success: function(responseBody) {
            if(responseBody.falg){
              let errorData = [];
              let trueData = [];
              tableData.forEach(data => {
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
            });
            if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
              trueData.unshift(materialLot);
            }
            tableData = [];
            errorData.forEach(data => {
              tableData.push(data);
            });
            trueData.forEach(data => {
              tableData.push(data);
            });
          } else {
            if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
              materialLot.errorFlag = true;
              tableData.unshift(materialLot);
            }
          }
          
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        }
      }
      FtMLotManagerRequest.sendValidationRequest(requestObject);
    }

    buildTable = () => {
        return <GcFTStockOutMLotScanTable 
                            orderTable={this.props.orderTable} 
                            pagination={false} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            onSearch={this.props.onSearch}
                            />
    }

}