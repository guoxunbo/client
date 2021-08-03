
import MaterialLotOQcDialog from "@components/mms/dialog/MaterialLotOQcDialog";
import NoticeUtils from "@utils/NoticeUtils";
import MaterialLotQcProperties from "./MaterialLotQcProperties";


export default class MaterialLotOqcProperties extends MaterialLotQcProperties{

    static displayName = "MaterialLotOqcProperties";

    buildDialog = () => {
        return  <MaterialLotOQcDialog key={MaterialLotOQcDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                           table={this.state.materialLotQcActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    refresh = (data) => {
        let self = this;
        self.props.orderScanTable.setState({
            data:[]
        });
        self.props.orderTable.setState({
            data:[]
        });

        self.setState({
            formObject: data,
            formVisible: false,
        });
        NoticeUtils.showSuccess();
    }

}
