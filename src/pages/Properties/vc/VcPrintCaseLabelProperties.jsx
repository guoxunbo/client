import VcPrintParameterRequest from "@api/vc/print-parameter-manager/VcPrintParameterRequest";
import EntityViewProperties from "@properties/framework/EntityViewProperties";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";
import { Button } from "antd";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import PackageMaterialLotRequest from "@api/package-material-lot/PackageMaterialLotRequest";
import AuthorityButton from "@components/framework/button/AuthorityButton";

const validationPrintFlag = {
    Y:"true",
    N:"false"
}
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
        buttons.push(this.createAdvancedPrintButton());
        return buttons;
    }

    handlePrint = (validationPrintFlag) => {
        let self = this;
        let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        if (!materialLotId) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let object = {
            materialLotId: materialLotId,
            validationPrintFlag: validationPrintFlag,
            success: function(responseBody) {
                self.setState({
                    formObject:[]
                });
                NoticeUtils.showSuccess();
                self.form.resetFormFileds();
                self.form.state.queryFields[0].node.focus();
            }
        }
        PackageMaterialLotRequest.sendPrintPackMLotRequest(object);
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint(validationPrintFlag.Y)}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }

    createAdvancedPrintButton = () => {
        return <AuthorityButton key="AdvancedPrintBoxMLotBtn" name="AdvancedPrintBoxMLotBtn" 
                disabled="true" type="primary" className="table-button" icon="icon-barcode" 
                i18NCode={I18NUtils.getClientMessage(i18NCode.BtnRePrint)} 
                onClick={() => this.handlePrint(validationPrintFlag.N)}/>
    }
}
