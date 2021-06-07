import EntityViewProperties from "@properties/framework/EntityViewProperties";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import { Button } from "antd";
import NoticeUtils from "@utils/NoticeUtils";
import IconUtils from "@utils/IconUtils";
import WeightMLotRequest from "@api/vc/weight-material-lot/WeightMLotRequest";

/**
 * 外箱称重
 */
export default class VcBoxWeightProperties extends EntityViewProperties{

    static displayName =  'VcBoxWeightProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createWeigthButton());
        return buttons;
    }

    createWeigthButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handleWeigth()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnWeigth)}</Button>;

    }

    handleWeigth = () => {
        let self = this;
        let grossWeight = self.entityForm.getFieldValue("grossWeight");
        let cartonSize = self.entityForm.getFieldValue("cartonSize");
        let materialLot = this.state.formObject;
        if (!materialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if (!grossWeight) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.GrossWeightNotNull));
            return;
        }

        let requestObject = {
            materialLotId: materialLot.materialLotId,  
            cartonSize: cartonSize, 
            grossWeight: grossWeight,
            success: function(responseBody) {
                self.setState({
                    formObject:[],
                })
                NoticeUtils.showSuccess();
            }
        }
        WeightMLotRequest.sendWeightMaterialLot(requestObject);
    }

}
