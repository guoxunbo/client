import VcCreateOrderTable from "@components/vc/table/VcCreateOrderTable";
import EntityProperties from "../framework/EntityProperties";

/**
 * 页面创建单据
 */
export default class VcCreateOrderProperties extends EntityProperties{

      static display = 'VcCreateOrderProperties';

      buildTable = () => {
            return <VcCreateOrderTable 
            {...this.getDefaultTableProps()}
            ref={(orderTable) => {this.orderTable = orderTable}}
            pagination={false} 
            scrollY={200} />
      }
}