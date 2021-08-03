import MaterialLotAction from "@api/dto/mms/MaterialLotAction";
import PackCheckRequest from "@api/pack-check/PackCheckRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedPackCaseCheckMLotForm } from "@components/mms/form/mobile/PackCaseCheckMLotForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Col, Form } from "antd";
import { Button } from "antd-mobile";

const ActionCode = {
    OK: "OK",
    NG: "NG",
}
export default class PackCaseCheckMaterialLotProperties extends MobileProperties{

    static displayName = 'PackCaseCheckMaterialLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedPackCaseCheckMLotForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()}  tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag = {true}/>
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col key="submitBtn" span={10} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={this.handleOK}>{I18NUtils.getClientMessage("PASS")}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="returnBtn" span={10} className="table-button">
                <Form.Item>
                    <Button type="primary" onClick={this.handleNG}>{I18NUtils.getClientMessage("NG")}</Button>
                </Form.Item>
            </Col>
        );
        return buttons;
    }

    handleOK = () => {
        let self = this;
        let materialLots = this.dataTable.getScanedRows();
        if(materialLots.length == 0 || materialLots.length != this.dataTable.state.data.length){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.PleaseScanAll))
            return;
        }
        let boxMaterialLotId = materialLots[0].boxMaterialLotId;
        let packCheckAction = new MaterialLotAction();
        packCheckAction.setMaterialLotId(boxMaterialLotId);
        packCheckAction.setActionCode(ActionCode.OK);

        let object = {
            packCheckAction : packCheckAction,
            success: function(responseBody) {
                self.handleReset(); 
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        PackCheckRequest.sendPackCheckRequest(object);
    }

    handleNG = () => {
        let self = this;
        let materialLots = this.dataTable.getScanedRows();

        let boxMaterialLotId = materialLots[0].boxMaterialLotId;
        let packCheckAction = new MaterialLotAction();
        packCheckAction.setMaterialLotId(boxMaterialLotId);
        packCheckAction.setActionCode(ActionCode.NG);

        let object = {
            packCheckAction : packCheckAction,
            success: function(responseBody) {
                self.handleReset(); 
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        PackCheckRequest.sendPackCheckRequest(object);
    }

}
