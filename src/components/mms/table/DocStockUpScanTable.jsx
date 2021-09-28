import DocStockUpManagerRequest from "@api/doc-stock-up-manager/DocStockUpManagerRequest";
import DocQueryManagerRequest from "@api/mms/doc-query-manager/DocQueryManagerRequest";
import EntityListCheckTable from "@components/framework/table/EntityListCheckTable";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Col, Row, Tag } from "antd";

/**
 * 备货
 */
export default class DocStockUpScanTable extends EntityListCheckTable {

    static displayName = 'DocStockUpScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMissZeroQty());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createStockUpButton());
        return buttons;
    }

    createMissZeroQty= () =>{    
        let missZeroQty = 0
        if(this.props.orderTable){
            let orderTableSelectedRow = this.props.orderTable.state.selectedRows[0];
            if(orderTableSelectedRow){
                let count = orderTableSelectedRow.unReservedQty;
                let materialLotList = this.state.selectedRows;
                let selectQty = 0;
                if(materialLotList && materialLotList.length > 0){
                    materialLotList.forEach(data => {
                        selectQty = selectQty + data.currentQty;
                    });
                }
                missZeroQty = count - selectQty;
            }   
        }    
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.MissZeroQty)}：{missZeroQty}</Tag>
    }

    createTotalNumber= () =>{
        const {selectedRows} = this.state;
        let totalNumber = 0;
        selectedRows.forEach(d => {
            totalNumber += d.currentQty;
        })
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{totalNumber}</Tag>
    }

    createStockUpButton = () => {
        return <Button key="stockUp" type="primary" className="table-button" icon="file-excel" onClick={this.stockUp}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReserved)}
                    </Button>
    }

    stockUp =()=>{
        let self = this;
        let selectMlot = self.getSelectedRows();
        if(selectMlot.length === 0){
            return;
        }
        let selectMlotQty = 0 ;
        let orderTableSelectedRow = self.props.orderTable.getSingleSelectedRow();
        selectMlot.forEach(mlot => {
            selectMlotQty += mlot.currentQty ;
        });
        if(selectMlotQty > orderTableSelectedRow.unReservedQty){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MissZeroQtyThanTotalQty));
            return;
        }
        let object ={
            docLineId: orderTableSelectedRow.lineId,
            materialLots: selectMlot,
            success: function(responseBody) {
                self.setState({
                    loading: false,
                    tableData : [],
                })
                self.props.resetData();
                self.props.onSearch();
                NoticeUtils.showSuccess();
            }
        }
        DocStockUpManagerRequest.sendStockUpRequest(object);
    }

    buildOperationColumn() {

    }

}