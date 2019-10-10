import EntityProperties from "@properties/framework/EntityProperties";
import OrderTable from "@components/Table/gc/OrderTable";
import { ActionType } from "@api/gc/async-manager/AsyncManagerRequestBody";
import GcStockOutOrderMLotProperties from "./GcStockOutOrderMLotProperties";

export default class GcOrderProperties extends EntityProperties{

    static displayName = 'GcOrderProperties';
    
     /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <OrderTable scrollY={200} pagination={false} ref={(orderTable) => { this.orderTable = orderTable }} asyncType={ActionType.AsyncSo} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcStockOutOrderMLotProperties orderTable={this.orderTable} tableRrn={9913} resetFlag={this.state.resetFlag}></GcStockOutOrderMLotProperties>
    }

}