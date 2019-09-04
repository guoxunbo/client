import AddPackMaterialLotTable from "../../../components/Table/AddPackMaterialLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import EntityDoubleScanProperties from "./entityProperties/EntityDoubleScanProperties";

/**
 * 追加包装
 */
export default class AddPackagaMaterialLotProperties extends EntityDoubleScanProperties{

    static displayName = 'AddPackagaMaterialLotProperties';
    
    /**
     * 第二个条件查询之后，检索表格数据中是否含有该数据，如果有则不做任何操作
     *  如果没有则添加数据，并将数据的标志成newFlag
     */
    afterSecondQuery = (queryDatas) => {
        let {rowKey,tableData} = this.state;
        if (queryDatas && queryDatas.length > 0) {
            let queryData = queryDatas[0];
            let dataIndex = -1;
            tableData.map((d, index) => {
                if (d[rowKey] === queryData[rowKey]) {
                    dataIndex = index;
                }
            });
            if (dataIndex > -1) {
                this.setState({ 
                    loading: false
                });
            } else {
                queryData.newFlag = true;
                tableData.push(queryData);
                this.setState({ 
                    tableData: tableData,
                    loading: false
                });
            }
            this.nextQueryNodeFocus();
            this.form.resetFormFileds();
        } else {
          this.showDataNotFound();
        }
    }

    buildTable = () => {
        return <AddPackMaterialLotTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}