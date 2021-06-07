import VcFinishGoodReservedRequest from "@api/vc/finishGood-manager/reserved/VcFinishGoodReservedRequest";
import RefListField from "@components/framework/field/RefListField";
import EntityListCheckTable from "@components/framework/table/EntityListCheckTable";
import { SystemRefListName } from "@const/ConstDefine";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Col, Row, Tag } from "antd";

/**
 * 备货
 */
export default class VcReservedMLotScanTable extends EntityListCheckTable {

    static displayName = 'VcReservedMLotScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStandardQtyRefList());
        buttons.push(this.createMissZeroQty());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createStatistic());
        buttons.push(this.createAutoSelectedButton());
        buttons.push(this.createStockButton());
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

    createStatistic= () =>{
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.selectedRows.length}</Tag>
    }

    createStandardQtyRefList = () => {
        return(
            <Row>
                <Col span ={2}>
                    <span style={{fontSize:"18px"}}>标准数量: </span>
                </Col>
                <Col span ={4}>
                    <RefListField ref={(standardQtyRefList) => { this.standardQtyRefList = standardQtyRefList }} value= {3000} owner referenceName ={SystemRefListName.ReelStandardQty}/>
                </Col>
            </Row>
        )
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }

    createAutoSelectedButton = () => {
        return <Button key="autoSelected" type="primary" className="table-button" icon="file-excel" onClick={this.autoSelected}>
                        {I18NUtils.getClientMessage(i18NCode.BtnAutoSeleced)}
                    </Button>
    }

    autoSelected =() => {
        let self = this;
        let orderTableSelectedRow = self.props.orderTable.getSingleSelectedRow();
        if(orderTableSelectedRow == undefined){
            return;
        }
        let standardQty = this.standardQtyRefList.state.value;
        if(standardQty == undefined){
            NoticeUtils.showInfo(I18NUtils.getClientMessage("标准数量不能为空"));
            return;
        }
        let object ={
            documentLine: orderTableSelectedRow,
            standardQty: standardQty,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                self.afterAutoSelected(materialLotList);
                
            }
        }
        VcFinishGoodReservedRequest.sendGetReservedMLotByStandardQty(object);
    }

    afterAutoSelected =(materialLotList)=>{
        materialLotList.forEach(mLot => this.selectRow(mLot));
        this.setState({
            loading: false,
        })
        NoticeUtils.showSuccess();
    }
    
    createStockButton = () => {
        return <Button key="reserved" type="primary" className="table-button" icon="file-excel" onClick={this.reserved}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReserved)}
                    </Button>
    }

    reserved =()=>{
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
            documentLine: orderTableSelectedRow,
            materialLotList: selectMlot,
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
        VcFinishGoodReservedRequest.sentReserved(object);
    }

    //无操作列
    buildOperationColumn() {

    }
  
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    },
};