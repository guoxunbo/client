import EntityScanProperties from "./entityProperties/EntityScanProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import HKWarehouseManagerRequest from "../../../api/gc/hongkong-warehouse-manager/HKWarehouseManagerRequest";
import HKByOrderStockOutMLotScanTable from "../../../components/Table/gc/HKByOrderStockOutMLotScanTable";

export default class HKByOrderStockOutMLotScanProperties extends EntityScanProperties{

    static displayName = 'HKByOrderStockOutMLotScanProperties';
    
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
        let queryFields = this.form.state.queryFields;
        let queryLotId = "";
        if (queryFields.length === 1) {
          queryLotId = this.form.props.form.getFieldValue(queryFields[0].name)
        }
        let requestObject = {
          tableRrn: this.state.tableRrn,
          queryLotId: queryLotId,
          success: function(responseBody) {
            let data = undefined;
            let materialLot = responseBody.materialLot;
            let materialLotId = materialLot.materialLotId;
            if (materialLotId == "" || materialLotId == null || materialLotId == undefined){
              data = new MaterialLot();
              data[rowKey] = queryLotId;
              data.setMaterialLotId(queryLotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            } else {
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
            }
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();  
          }
        }
        HKWarehouseManagerRequest.sendGetMaterialLotByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <HKByOrderStockOutMLotScanTable 
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