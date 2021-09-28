import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedIncomingStockInByOrderForm } from "@components/mms/form/mobile/IncomingStockInByOrderForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Col, Form } from "antd";
import { Button } from "antd-mobile";

/**
 * 来料根据单据入库
 */
export default class IncomingStockInByOrderProperties extends MobileProperties{

    static displayName = 'IncomingStockInByOrderProperties';
    
    buildMobileForm = () => {
        return (<WrappedIncomingStockInByOrderForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()} tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag= {true}/>
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col key="validateBtn" span={6} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={this.handleValidate}>{I18NUtils.getClientMessage("验证")}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="submitBtn" span={6} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={this.handleSubmit}>{I18NUtils.getClientMessage(i18NCode.Ok)}</Button>
                </Form.Item>
            </Col>
        );
        buttons.push(
            <Col key="returnBtn" span={6} className="table-button">
                <Form.Item>
                    <Button type="primary" onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                </Form.Item>
            </Col>
        );
        return buttons;
    }
    handleValidate = () => {
        let self = this;
        let {data} = this.dataTable.state;
        let fieldsValue = this.mobileForm.getFieldsValue();
        let scendData = this.dataTable.getScanedRows();
        if(scendData.length != data.length){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.PleaseScanAll));
            return;
        }
        let requestObject = {
            incomingOrderId: fieldsValue.incomingDocId,
            materialLots: data,
            success: function(responseBody) {
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        MobileRequest.sendValidateStockInByOrderRequest(requestObject);
    }

    handleSubmit = () => {
        let self = this;
        let {data} = this.dataTable.state;
        let fieldsValue = this.mobileForm.getFieldsValue();
        let scendData = this.dataTable.getScanedRows();
        if(scendData.length != data.length){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.PleaseScanAll));
            return;
        }
        let requestObject = {
            incomingOrderId: fieldsValue.incomingDocId,
            materialLots: data,
            success: function(responseBody) {
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
                self.handleReset();
            }
        }
        MobileRequest.sendIncomingStockInByOrderRequest(requestObject);
    }

}
