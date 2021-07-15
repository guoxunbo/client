import StockOutSpareMLotTable from "@components/mms/table/StockOutSpareMLotTable";
import EntityProperties from "@properties/framework/EntityProperties";
import StockOutSpareMLotScanProperties from "./StockOutSpareMLotScanProperties";
/*
 * 备件出库
 */
export default class StockOutSpareMLotProperties extends EntityProperties{

    static displayName = 'StockOutSpareMLotProperties';
    
    buildTable = () => {
        return <StockOutSpareMLotTable {...this.getDefaultTableProps()}
                ref={(orderTable) => { this.orderTable = orderTable }} 
                scanProperties = {this.scanProperties} />
    }

    // buildOtherComponent = () => {
    //     return <StockOutSpareMLotScanProperties
    //                 tableRrn = {this.state.parameters.parameter1}
    //                 ref={(scanProperties) => { this.scanProperties = scanProperties }}
    //                 orderTable = {this.orderTable}/>
    // }
}