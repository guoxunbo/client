import EntityScanProperties from "@properties/framework/EntityScanProperties";
import RefList from "@components/framework/list/RefList";
import { Divider } from "antd";
import QualityCheckTable from "@components/mms/table/QualityCheckTable";

/**
 * 质量检验的标准页面
 *  具备显示检查项
 */
export default class QualityCheckProperties extends EntityScanProperties{

    static displayName = 'QualityCheckProperties';
      
    constructor(props) {
      super(props);
      this.state = {...this.state, referenceName: this.props.match.params.parameter1};
    }

    buildTable = () => {
      let checkItemList= [];
      if (this.refList) {
        checkItemList = this.refList.state.dataList;
      }
      return <QualityCheckTable checkItemList={checkItemList}
                                  pagination={false} 
                                  rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}/>
    }

    buildOtherComponent = () => {
      return (<div>
                <Divider/>
                <RefList ref={(refList) => this.refList = refList} owner referenceName={this.state.referenceName}></RefList>
              </div>)
    }
}