import IncomingMaterialReceiveProperties from "./IncomingMaterialReceiveProperties";
import IncomingMLotReceiveScanProperties from "./IncomingMLotReceiveScanProperties";

/**
 * 来料接收
 * 实际接收数量，必须是导入的数量
 */
export default class IncomingMLotReceiveProperties extends IncomingMaterialReceiveProperties{

    static displayName = 'IncomingMLotReceiveProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, showQueryFormButton: true }
    }

    buildOtherComponent = () => {
      return <IncomingMLotReceiveScanProperties
                      tableRrn = {this.state.parameters.parameter1}  
                      orderTable = {this.orderTable} 
                      resetFlag = {this.state.resetFlag} 
                      ref={(materialOrderScanProperties) => { this.materialOrderScanProperties = materialOrderScanProperties }}
                      onSearch={this.getTableData.bind(this)} />
  }

}