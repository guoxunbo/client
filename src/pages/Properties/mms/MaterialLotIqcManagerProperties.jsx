
import MaterialLotIqcRequest from "@api/mms/material-lot-iqc/MaterialLotIqcRequest";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotIqcManagerTable from "@components/mms/table/MaterialLotIqcManagerTable";
import { DefaultRowKey } from "@const/ConstDefine";
import { i18NCode } from "@const/i18n";
import EntityProperties from "@properties/framework/EntityProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import MaterialLotQcProperties from "./MaterialLotQcProperties";

export default class MaterialLotIqcManagerProperties extends EntityProperties{

    static displayName = "MaterialLotIqcManagerProperties";

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    afterQuery = (body, whereClause) => {
      let self = this ;
      let materialLots = body.dataList
      let {tableData} = self.state;
      let showData = [];
      let flag = true;
      let requestObject = {
          materialLots: materialLots,
          success:function(responseBody){
              let dataList = responseBody.dataList;
              if(whereClause == ''){
                self.setState({loading: false, tableData:dataList, pagination:false}); 
                return;
              }
              if(dataList.length == 0){
                NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                self.setState({loading: false, pagination:false}); 
                return;
              } else if (dataList.length == 1){                 
                let materialLot = dataList[0];
                if(tableData.length != 0){
                  tableData.map((mLot, index)=>{
                    if(mLot[DefaultRowKey] == materialLot[DefaultRowKey]){  
                        flag = false;
                        showData.unshift(mLot);
                    }else{
                        showData.push(mLot);
                    }
                  });
                }
                if(flag){
                  flag = true;
                  showData.unshift(materialLot);
                }
                self.orderTable.selectRow(materialLot, true);
              }              
              self.setState({
                  tableData: showData,
                  whereClause: whereClause,
                  loading: false,
                  pagination:false
              }); 
              self.form.resetFormFileds();
          }
      }
      MaterialLotIqcRequest.sendValidationAndGetWaitIQCMLotRequest(requestObject);
  }

    getTableData = () => {
        this.orderTable.setState({ selectedRowKeys: [],selectedRows: []});
        const self = this;
        self.form.resetFormFileds();
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
                tableData: responseBody.dataList,
                table: responseBody.table,
                loading: false,
                pagination:false , 
            }); 
            self.form.handleSearch();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    loadDataInComponentDidMount = () => {
      let actionTableName = this.state.parameters.parameter3;
      let self = this;
      let requestObject = {
          name: actionTableName,
          success: function(responseBody) {
              self.setState({
                  actionTable: responseBody.table,
              });
          }
      }
      TableManagerRequest.sendGetByNameRequest(requestObject);
  }

    buildTable = () => {
        return <MaterialLotIqcManagerTable
                    {...this.getDefaultTableProps()} 
                    tableRrn = {this.state.tableRrn}
                    scrollY={300}
                    pagination={false}
                    actionTable = {this.state.actionTable}
                    ref ={(orderTable)=>{this.orderTable = orderTable}} 
                    materialLotQc = {this.materialLotQc}                    
                />
    }

    buildOtherComponent = () => {
        return <MaterialLotQcProperties
                    tableRrn = {this.state.parameters.parameter2}
                    materialLotQcDialogTableName = {this.state.parameters.parameter1}
                    ref={(materialLotQc) => { this.materialLotQc = materialLotQc }} 
                    onSearch={this.getTableData.bind(this)} 
                />
    }
}