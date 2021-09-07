import ReturnOrderScanTable from "@components/mms/table/ReturnOrderScanTable";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderScanProperties extends EntityScanProperties{

    static displayName = 'ReturnOrderScanProperties';

    resetOrderData = (orderTable) => {
        orderTable.setState({
          data: [],
          loading: false,
          resetFlag: true
        });
    }

    afterQuery = (responseBody) => {
        let {rowKey,tableData} = this.state;
        let queryDatas = responseBody.dataList;
        if (queryDatas && queryDatas.length > 0) {
            queryDatas.forEach(data => {
                if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                    data.scaned = true;
                    tableData.unshift(data);
                }
            });
            this.setState({ 
                tableData: tableData,
                loading: false
            });
            this.form.resetFormFileds();
        } else {
            this.showDataNotFound();
        }
    }

    buildTable = () => {
        return <ReturnOrderScanTable {...this.getDefaultTableProps()} 
            orderTable={this.props.orderTable} pagination={false} resetData={this.resetData.bind(this)} 
            resetFlag={this.state.resetFlag} />
    }
}