import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotOqcScanTable from "@components/mms/table/MaterialLotOqcScanTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityScanProperties from "../framework/EntityScanProperties";
import MaterialLotOqcProperties from "./MaterialLotOqcProperties";

export default class MaterialLotOqcManagerScanProperties extends EntityScanProperties{

      static displayName = "MaterialLotOqcManagerScanProperties";

      constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
      }

      queryData = (whereClause) =>{
          let tableData = this.state.tableData;
          let queryMLotId = this.form.props.form.getFieldValue(this.form.state.queryFields[0].name);
        
          let scandMaterialLot = undefined;
          let showData = [];
          tableData.map((materialLot, index) => {
              if (materialLot.materialLotId == queryMLotId) {
                  materialLot.scaned = true;
                  scandMaterialLot = materialLot;
                  showData.unshift(materialLot);
              }else {
                showData.push(materialLot);
              }
          });
          if (!scandMaterialLot) {
              NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
          } else {
              this.setState({
                tableData: showData,
              });    
          }
          this.setState({
              loading: false
          }); 
          this.form.resetFormFileds();
          this.form.state.queryFields[0].node.focus();
      }

      queryBoxMLotData =(whereClause)=>{
        let self = this;
        let requestObject = {
            tableRrn: self.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
                self.setState({
                    tableData: responseBody.dataList,
                    loading: false,
                });
            }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
      }

      buildTable = () => {
        return <MaterialLotOqcScanTable
                  {...this.getDefaultTableProps()} 
                  scrollY={200}
                  pagination={true}
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable}}/>
      }

      buildOtherComponent = () => {
        return <MaterialLotOqcProperties
                {...this.getDefaultTableProps()} 
                tableRrn = {this.props.mlotOqcTableRrn}
                materialLotQcDialogTableName = {this.props.materialLotQcActionTable}
                orderTable = {this.props.orderTable}
                orderScanTable = {this.orderScanTable}
                ref={(mLotOqcProperties) => { this.mLotOqcProperties = mLotOqcProperties}}/>
    }
     
}