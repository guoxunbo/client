import MobileTable from '@components/framework/table/MobileTable';
import EventUtils from '@utils/EventUtils';
import I18NUtils from '@utils/I18NUtils';
import { Input } from 'antd';


export default class SplitAndPrintMLotTable extends MobileTable {

    static displayName = 'SplitAndPrintMLotTable';

    selectRow = (record) => {
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
    }

    // createButtonGroup = () => {
    //     return (<div style={styles.input}>
    //         <Input ref={(input) => { this.input = input }} key="standardQty" placeholder={I18NUtils.getClientMessage("标准数量")} />
    //     </div>);
    // }
}
const styles = {
    input: {
        width: 120,
    },
};
