
import MaterialLotOQcDialog from "@components/mms/dialog/MaterialLotOQcDialog";
import MaterialLotQcProperties from "./MaterialLotQcProperties";


export default class MaterialLotOQcProperties extends MaterialLotQcProperties{

    static displayName = "MaterialLotOQcProperties";

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildDialog = () => {
        return  <MaterialLotOQcDialog key={MaterialLotOQcDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.materialLotQcActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }
}