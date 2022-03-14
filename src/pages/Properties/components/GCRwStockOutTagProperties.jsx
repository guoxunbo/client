import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCRwStockOutTaggingTable from "../../../components/Table/gc/GCRwStockOutTaggingTable";

/**
 * RW出货标注
 */
export default class GCRwStockOutTagProperties extends EntityScanProperties{

    static displayName = 'GCRwStockOutTagProperties';
      
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
      this.form.resetFormFileds();
      this.resetComBoxData(null);
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.resetComBoxData(responseBody.dataList);
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    /**
     * 重新赋值下拉框
     */
     resetComBoxData = (data) =>{
      let queryFields = this.form.state.queryFields;
      if (queryFields && Array.isArray(queryFields)) {
       let gradeIndex = -1;
       let subCodeIndex = -1;
       queryFields.map((queryField, index) => {
           if (queryField.name == "grade") {
               gradeIndex = index;
           } else if(queryField.name == "reserved1"){
             subCodeIndex = index;
           }
       });

       let gradeField = this.form.state.queryFields[gradeIndex]
       let gradeNode = gradeField.node;
       
       let secondLevelField = this.form.state.queryFields[subCodeIndex];
       let secondLevelNode = secondLevelField.node;

       if(!data || data.length == 0){
           gradeNode.queryData();
           secondLevelNode.queryData();
           return;
       }

       let gradeList = [];
       let gradeRefData = [];

       let secondLevelList = [];
       let secondLevelRefData = [];

       // 获取相关字段的值
       data.forEach((d,index) => {
           if(gradeList.indexOf(d[gradeField.name]) == -1){
               gradeList.push(d[gradeField.name]);
           }

           if(secondLevelList.indexOf(d[secondLevelField.name]) == -1){
             secondLevelList.push(d[secondLevelField.name]);
           }
       });

       // 组装数据
       gradeList.forEach((d,index) => {
           let gradeObject = {};
           // whereClause 得到的值是 key,显示的值是 value
           gradeObject.key = d;
           gradeObject.value = d;
           gradeRefData.push(gradeObject);
       })

       secondLevelList.forEach(d => {
           let secondLevelObject = {};
           secondLevelObject.key = d;
           secondLevelObject.value = d;
           secondLevelRefData.push(secondLevelObject);
       })

       gradeNode.setState({data:gradeRefData});
       secondLevelNode.setState({data:secondLevelRefData});   
     } 
 }

    buildTable = () => {
        return <GCRwStockOutTaggingTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading}
                                    onSearch={this.queryData.bind(this)} 
                                    resetData={this.resetData.bind(this)}/>
    }

}