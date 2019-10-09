import EntityScanProperties from "./entityProperties/EntityScanProperties";
import CheckTable from "../../../components/Table/gc/CheckTable";
import uuid from 'react-native-uuid';

/**
 * GC 盘点
 *  当数据不存在的时候，直接添加一笔数据
 */
export default class GcCheckProperties extends EntityScanProperties {

    static displayName = 'GcOrderProperties';
    
    afterQuery = (responseBody) => {
      let {rowKey,tableData} = this.state;
      let queryDatas = responseBody.dataList;
      if (queryDatas && queryDatas.length > 0) {
        queryDatas.forEach(data => {
          if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
            tableData.push(data);
          }
        });
        this.setState({ 
          tableData: tableData,
          loading: false
        });
        this.form.resetFormFileds();
      } else {
          let record = this.form.props.form.getFieldsValue();
          record[this.state.rowKey] = uuid.v1();
          record.errorFlag = true;
          if (tableData.filter((d) => d.materialLotId === record.materialLotId).length === 0) {
              tableData.push(record);
          }
          this.setState({ 
              tableData: tableData,
              loading: false
          });
          this.form.resetFormFileds();
      }
    }

    buildTable = () => {
        return <CheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}