import EntityScanProperties from "./entityProperties/EntityScanProperties";
import MaterialLotUpdateRequest from "../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest";
import GCMaterialLotHoldTable from "../../../components/Table/gc/GCMaterialLotHoldTable";

export default class GCMaterialLotHoldProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotHoldProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    handleSearch = () => {
      let self = this;
      let {rowKey, tableData} = this.state;
      this.setState({loading: true});
      let data = "";
      let queryFields = this.form.state.queryFields;
      if (queryFields.length > 0) {
          data = this.form.props.form.getFieldValue(queryFields[0].name);
      }
      if(data == "" || data == undefined){
          self.setState({ 
            tableData: tableData,
            loading: false,
          });
          return;
      }
      let requestObject = {
          materialLotId: data,
          success: function(responseBody) {
              let materialLot = responseBody.materialLot;
              if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                  tableData.unshift(materialLot);
              }
              self.setState({ 
                  tableData: tableData,
                  loading: false,
              });
              self.form.resetFormFileds();
          },
          fail: function() {
              self.setState({ 
                  tableData: tableData,
                  loading: false
              });
              self.form.resetFormFileds();
          }
      }
      MaterialLotUpdateRequest.sendQueryRequest(requestObject);
  }

    buildTable = () => {
        return <GCMaterialLotHoldTable    
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      propsFrom = {this.form}
                                      resetData={this.resetData.bind(this)}/>
    }
}