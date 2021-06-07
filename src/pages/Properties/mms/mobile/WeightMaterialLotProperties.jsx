import WeightMLotRequest from "@api/vc/weight-material-lot/WeightMLotRequest";
import { WrappedWeightMaterialLotForm } from "@components/mms/form/mobile/WeightMaterialLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class WeightMaterialLotProperties extends MobileProperties{

    static displayName = 'WeightMaterialLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedWeightMaterialLotForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    handleSubmit = () => {
        let self = this;
        let value = this.mobileForm.getFieldsValue();
        let requestObject = {
            materialLotId: value.materialLotId,
            grossWeight: value.grossWeight,
            cartonSize: value.cartonSize,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        WeightMLotRequest.sendWeightMaterialLot(requestObject);
    }

}
