import MaterialLotManagerRequest from "@api/material-lot-manager/MaterialLotManagerRequest";
import AuthorityButton from "@components/framework/button/AuthorityButton";
import {WrappedSplitMLotForm} from "@components/mms/form/mobile/SplitMLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";
import { i18NCode } from "@const/i18n";
import { Col, Form } from "antd";
import { Button } from "antd-mobile";
import I18NUtils from "@utils/I18NUtils";
import MaterialLotAction from "@api/dto/mms/MaterialLotAction";

const validationPrintFlag = {
    Y:"true",
    N:"false"
}
export default class PrintMaterialLotProperties extends MobileProperties{

    static displayName = 'PrintMaterialLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedSplitMLotForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    handleSubmit = (validationPrintFlag) => {
        let self = this;
        let value = this.mobileForm.getFieldsValue();
        let materialLotAction = new MaterialLotAction();
        materialLotAction.setMaterialLotId(value.materialLotId);
        let requestObject = {
            materialLotAction: materialLotAction,
            validationPrintFlag: validationPrintFlag,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.showSuccess();
            }
        }
        MaterialLotManagerRequest.sendPrintMaterialLotRequest(requestObject);
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col key="submitBtn" span={10} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={()=>this.handleSubmit(validationPrintFlag.Y)}>{I18NUtils.getClientMessage(i18NCode.Ok)}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="returnBtn" span={10} className="table-button">
                <Form.Item>
                    <Button type="primary" onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="AdvancedMobilePrintMLot" span={20} className="table-button">
                <Form.Item>
                    <AuthorityButton key="AdvancedMobilePrintMLot" name="AdvancedMobilePrintMLot" type="primary" disabled={true} onClick={()=>this.handleSubmit(validationPrintFlag.N)} icon="icon-barcode" className="table-button" i18NCode={I18NUtils.getClientMessage("高级打印")} />
                </Form.Item>
            </Col>
        );
        return buttons;
    }

}
