import StockOutSpareMLotScanTable from "@components/mms/table/StockOutSpareMLotScanTable";
import { i18NCode } from "@const/i18n";
import EntityProperties from "@properties/framework/EntityProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 备件出库
 */
export default class StockOutSpareMLotScanProperties extends EntityProperties{

    static displayName = 'StockOutSpareMLotScanProperties';
    
    buildTable = () => {
        return <StockOutSpareMLotScanTable {...this.getDefaultTableProps()} 
            orderTable = {this.props.orderTable}/>
    }

    queryData = (whereClause) =>{
        let tableData = this.state.tableData;
        let queryMLotId = this.form.props.form.getFieldValue(this.form.state.queryFields[0].name);
      
        let scandMaterialLot = undefined;
        let showData = [];
        tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == queryMLotId) {
                materialLot.scaned = true;
                scandMaterialLot = materialLot;
                showData.unshift(materialLot);
            }else {
              showData.push(materialLot);
            }
        });
        if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        } else {
            this.setState({
              tableData: showData,
            });    
        }
        this.setState({
            loading: false
        }); 
        this.form.resetFormFileds();
        this.form.state.queryFields[0].node.focus();
    }

}