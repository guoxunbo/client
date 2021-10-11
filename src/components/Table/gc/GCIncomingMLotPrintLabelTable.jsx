import EntityListTable from "../EntityListTable";
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import GetPrintWltVboxParameterRequest from "../../../api/gc/get-print-wltbox-parameter/GetPrintWltBoxParameterRequest";

const TableName = {
    IncomingMLotPrintLabel: "GCIncomingMLotPrintLabelTable"
}

export default class GCIncomingMLotPrintLabelTable extends EntityListTable {

    static displayName = 'GCIncomingMLotPrintLabelTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createCogDetialNumber());
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    printLable = () => { 
        const {data} = this.state;
        let self = this;
       
        if (data && data.length > 0) {
            self.setState({
                loading: true
            });
            EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

            let requestObject = {
                materialLotUnitList : data,
                success: function(responseBody) {
                    MessageUtils.showOperationSuccess();
                }
            }
            GetPrintWltVboxParameterRequest.sendQueryRequest(requestObject);
        }

    }

    createCogDetialNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotUnitList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (materialLotUnitList.indexOf(data.materialLotId) == -1) {
                    materialLotUnitList.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotUnitList.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }


    createPrintButton = () => {
        return <Button key="print" type="primary" style={styles.tableButton} loading={this.state.loading} icon="print" onClick={this.printLable}>
                    {I18NUtils.getClientMessage(i18NCode.PrintLable)}
                </Button>
    }

    buildOperationColumn = () => {
        
    }
    
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};