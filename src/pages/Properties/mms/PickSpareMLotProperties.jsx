import PickSpareMLotTable from "@components/mms/table/PickSpareMLotTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 备件领料
 */
export default class PickSpareMLotProperties extends EntityProperties{

    static displayName = 'PickSpareMLotProperties';
    
    buildTable = () => {
        return <PickSpareMLotTable {...this.getDefaultTableProps()} />
    }

}