import StockOutSpareMLotTable from "@components/mms/table/StockOutSpareMLotTable";
import EntityProperties from "@properties/framework/EntityProperties";
/*
 * 备件出库
 */
export default class StockOutSpareMLotProperties extends EntityProperties{

    static displayName = 'StockOutSpareMLotProperties';
    
    buildTable = () => {
        return <StockOutSpareMLotTable {...this.getDefaultTableProps()} queryData={this.queryData.bind(this)}/>
    }
}