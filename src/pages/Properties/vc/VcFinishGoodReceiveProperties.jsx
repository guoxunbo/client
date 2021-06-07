import VcFinishGoodReceiveTable from "@components/vc/table/VcFinishGoodReceiveTable";
import IncomingMaterialReceiveProperties from "../mms/IncomingMaterialReceiveProperties";
import VcFinishGoodReceiveScanProperties from "./VcFinishGoodReceiveScanProperties";

export default class VcFinishGoodReceiveProperties extends IncomingMaterialReceiveProperties{

    static displayName =  'VcFinishGoodReceiveProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }
    
    buildTable = () => {
        return <VcFinishGoodReceiveTable
                        {...this.getDefaultTableProps()}
                        scrollY={200} 
                        pagination={false} 
                        ref={(orderTable) => { this.orderTable = orderTable }} 
                        materialOrderScanProperties = {this.materialOrderScanProperties}
                        resetData = {this.resetData}/>                        
      }
  
      buildOtherComponent = () => {
        return <VcFinishGoodReceiveScanProperties
                        tableRrn = {this.state.parameters.parameter1}  
                        orderTable = {this.orderTable} 
                        resetFlag = {this.state.resetFlag} 
                        ref={(materialOrderScanProperties) => { this.materialOrderScanProperties = materialOrderScanProperties }}
                        onSearch={this.getTableData.bind(this)}/>
    }

}
