import EntityScanProperties from "@properties/framework/EntityScanProperties";
import CheckTable from "@components/gc/table/CheckTable";
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
        return <CheckTable {...this.getDefaultTableProps()} pagination={false} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    resetData={this.resetData.bind(this)}/>
    }

}