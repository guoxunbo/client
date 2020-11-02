
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';
import WeightManagerRequest from '../../../api/gc/weight-manager/WeightManagerRequest';


/**
 * 称重
 */
export default class MaterialLotWeighTable extends EntityScanViewTable {

    static displayName = 'MaterialLotWeighTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createWeighButton());
        return buttons;
    }

    // componentWillReceiveProps = (props) => {
    //     // TODO 此处存在刷新多次问题
    //     let {selectedRowKeys, selectedRows} = this.state;
    //     let columnData = this.buildColumn(props.table);
        
    //     let stateSeletcedRowKeys = selectedRowKeys.merge(props.selectedRowKeys);
    //     let stateSelectedRows = selectedRows.merge(props.selectedRows, this.props.rowKey);
    //     if (props.resetFlag) {
    //         stateSeletcedRowKeys = [];
    //         stateSelectedRows = [];
    //     }
        
    //     this.setState({
    //         data: props.data,
    //         table: props.table,
    //         columns: columnData.columns,
    //         scrollX: columnData.scrollX,
    //         selectedRowKeys: stateSeletcedRowKeys || [],
    //         selectedRows: stateSelectedRows || [],
    //         pagination: props.pagination != undefined ? props.pagination : Application.table.pagination
    //     })
    //     if(props.data.length != 0){
    //         this.weight();
    //     }
    // }

    weight = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        if(this.getNotScanWeightMaterialLots(data).length > 0 ){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.BoxWeightCannotEmpty));
            return;
        }
        let requestObject = {
            materialLots: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WeightManagerRequest.sendWeightRequest(requestObject);
    }

    getNotScanWeightMaterialLots(data){
        let materialLots = [];
        data.forEach((materialLot) => {
            if(!materialLot.weight){
                materialLots.push(materialLot);
            }
        });
        return materialLots;
    }

    createWeighButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.weight}>
                        {I18NUtils.getClientMessage(i18NCode.BtnWeigh)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};