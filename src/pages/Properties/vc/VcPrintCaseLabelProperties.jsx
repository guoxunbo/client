import VcPrintParameterRequest from "@api/vc/print-parameter-manager/VcPrintParameterRequest";
import EntityViewProperties from "@properties/framework/EntityViewProperties";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";
import { Button } from "antd";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import PackageMaterialLotRequest from "@api/package-material-lot/PackageMaterialLotRequest";
/**
 * 打印箱标签
 */
export default class VcPrintCaseLabelProperties extends EntityViewProperties{

    static displayName = 'VcPrintCaseLabelProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    queryData = (whereClause) => {
        let self = this;
        let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        if (!materialLotId) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let object = {
            materialLotId: materialLotId,
            success: function(responseBody) {
                let parameterMap = responseBody.parameterMap;
                self.setState({
                    formObject:parameterMap
                });
            }
        }
        VcPrintParameterRequest.sendGetBoxParaRequest(object);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        let self = this;
        let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        if (!materialLotId) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let object = {
            materialLotId: materialLotId,
            success: function(responseBody) {
                self.resetData();
                NoticeUtils.showSuccess();
            }
        }
        PackageMaterialLotRequest.sendPrintPackMLotRequest(object);
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }
}
