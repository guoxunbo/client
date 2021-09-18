import EntityListCheckTable from '../EntityListCheckTable';
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import { Notification } from '../../notice/Notice';
import WaferUnpackMLotRequest from '../../../api/gc/wafer-unpack/WaferUnpackMLotRequest';

export default class GcWaferUnpackMLotTable extends EntityListCheckTable {

    static displayName = 'GcWaferUnpackMLotTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteAllButton());
        buttons.push(this.waferUnpackMLotButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    waferUnpackMLotConfirm = () => {
        let self = this;
        
        if (self.state.selectedRows.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if (self.state.data.length === self.state.selectedRows.length) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AllWafersCannotBeUnpack));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

        let requestObj = {
            materialLotUnits : self.state.selectedRows,
            success: function(responseBody) {
                if (self.props.resetFlag) {
                    self.props.resetData();
                }
                self.setState({
                    loading: false
                }); 
                MessageUtils.showOperationSuccess();
            }
        }
        WaferUnpackMLotRequest.sendWaferUnpackRequest(requestObj);
    }

    setSelectMLot = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex < 0) {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    deleteAllMaterialLot = () => {
        let self = this;
        if( self.props.data.length == 0){
            return;
        } else {
            self.props.resetData();
            MessageUtils.showOperationSuccess();
        }
    }

    createDeleteAllButton = () => {
        return <Button key="deleteAll" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteAllMaterialLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDeleteAll)}
                </Button>
    }

    waferUnpackMLotButton = () => {
        return <Button key="waferUnpackMLot" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.waferUnpackMLotConfirm}>
                   {I18NUtils.getClientMessage(i18NCode.BtnUnpackMLot)}
                </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
