import EntityScanProperties from "./entityProperties/EntityScanProperties";
import RwMaterialManagerRequest from "../../../api/gc/rw-material-manager/RwMaterialManagerRequest";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import GcRwMaterialIssueScanTable from "../../../components/Table/gc/GcRwMaterialIssueScanTable";
import GcRwWaitIssueMaterialProperties from "./GcRwWaitIssueMaterialProperties";

export default class GcRwMaterialIssueScanProperties extends EntityScanProperties{

    static displayName = 'GcRwMaterialIssueScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    // componentWillReceiveProps = (props) => {
    //   debugger;
    //   const {resetFlag} = props;
    //   if (resetFlag) {
    //     this.form.handleReset();
    //   }
    // }

    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let materialLotCode = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let waitIssueMaterialList = this.waitIssueMaterial.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          materialLotCode: materialLotCode,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            let data = undefined;
            if (materialLot && materialLot.objectRrn != null && materialLot.objectRrn != undefined) {
              let errorData = [];
              let trueData = [];
              tableData.forEach(data => {
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
              });
              tableData = [];
              if (waitIssueMaterialList.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                materialLot.errorFlag = true;
              }
              if(materialLot.errorFlag){
                errorData.unshift(materialLot);
              } else if(trueData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                trueData.unshift(materialLot);
              }
              errorData.forEach(data => {
                tableData.push(data);
              });
              trueData.forEach(data => {
                tableData.push(data);
              });
            } else {
              data = new MaterialLot();
              data[rowKey] = materialLotCode;
              data.setMaterialLotId(materialLotCode);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            }
           
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          }
        }
        RwMaterialManagerRequest.sendGetRWMaterialByRrnAndMaterialCodeRequest(requestObject);
    }

    resetOrderData = (orderTable) => {
      orderTable.setState({
        data: [],
        loading: false,
        resetFlag: true
      });
    }

    buildTable = () => {
        return <GcRwMaterialIssueScanTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcRwWaitIssueMaterialProperties ref={(waitIssueMaterial) => { this.waitIssueMaterial = waitIssueMaterial }} 
                                              tableRrn={this.state.parameters.parameter1}/>
  }
}