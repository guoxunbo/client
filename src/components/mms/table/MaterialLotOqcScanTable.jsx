import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import { Tag } from "antd";

export default class MaterialLotOqcScanTable extends EntityListTable{

    static displayName = 'MaterialLotOqcScanTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    
    buildOperationColumn = () => {
        
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createScannedNumber());
        buttons.push(this.createMLotQtyTag());
        buttons.push(this.createTotalMLotQtyTag());
        return buttons;
    }

    createScannedNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.getScanned().length} </Tag>
    }

    getScanned = () => {
        let datas = this.state.data ;
        let scanned = [];
        if(datas){
            datas.forEach(data => {
                if(data.scaned){
                    scanned.push(data) ;
                }
            })
        }
        return scanned ;
    }

    createMLotQtyTag = () => {
        return <Tag color="#2db7f5" style={styles.tableButton}>{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }

    createTotalMLotQtyTag = () => {
        if(this.state.data == undefined){
            return;
        }
        let totalQty = 0;
        let data = this.getScanedRows();
        data.forEach(d => {
            totalQty = totalQty + d.currentQty
        });
        return <Tag color="#2db7f5" style={styles.tableButton}>{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{totalQty}</Tag>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
}


