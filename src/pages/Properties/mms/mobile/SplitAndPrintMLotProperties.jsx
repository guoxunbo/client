import MaterialLotManagerRequest from "@api/material-lot-manager/MaterialLotManagerRequest";
import StandardSplitMLotRequest from "@api/mms/standard-split/StandardSplitMLotRequest";
import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import { WrappedSplitAndPrintMLotForm } from "@components/mms/form/mobile/SplitAndPrintMLotForm";
import SplitAndPrintMLotTable from "@components/mms/table/mobile/SplitAndPrintMLotTable";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Col, Form } from "antd";
import { Button } from "antd-mobile";

export default class SplitAndPrintMLotProperties extends MobileProperties{
    
    static displayName = 'SplitAndPrintMLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedSplitAndPrintMLotForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <SplitAndPrintMLotTable key={SplitAndPrintMLotTable.displayName} ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()}  tableRrn={this.state.tableRrn} pagination={false} />
    }

    buildButtons = () => {
        let buttons = [];
        buttons.push(
            <Col key="splitMLot" span={10} className="table-button">
                <Form.Item >
                    <Button type="primary" onClick={this.handleSplitMLot}>{I18NUtils.getClientMessage(i18NCode.BtnSplit)}</Button>
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
        return buttons;
    }

    handleSplitMLot = () => {
        let self = this;
        let selectedRow = self.dataTable.getSingleSelectedRow();
        let value = this.mobileForm.getFieldsValue();
        let requestObject = {
            materialLotId: selectedRow.materialLotId,
            standardQty: value.standardQty,
            success: function(responseBody) {
                self.form.handleSearch();
            }
        }
        StandardSplitMLotRequest.sendStandardSplitReuqest(requestObject);
    }

}
