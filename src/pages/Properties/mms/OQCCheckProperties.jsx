import QualityCheckProperties from "@properties/mms/QualityCheckProperties";
import OQCCheckTable from "@components/mms/table/OQCCheckTable";

/**
 * OQC检
 */
export default class OQCCheckProperties extends QualityCheckProperties{

    static displayName = 'OQCCheckProperties';
    
    buildTable = () => {
      let checkItemList= [];
      if (this.refList) {
        checkItemList = this.refList.state.dataList;
      }
      return <OQCCheckTable checkItemList={checkItemList} {...this.getDefaultTableProps()} 
                                  pagination={false} />
    }
    
}