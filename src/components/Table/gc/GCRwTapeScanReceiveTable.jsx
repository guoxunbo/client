import { Button, Tag} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import RwMaterialManagerRequest from '../../../api/gc/rw-material-manager/RwMaterialManagerRequest';

/**
 * Tape辅料接收
 */
export default class GCRwTapeScanReceiveTable extends EntityScanViewTable {

    static displayName = 'GCRwTapeScanReceiveTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createTapeReceiveButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createBoxQty());
        tags.push(this.createPackageNumber());
        return tags;
    }

    createPackageNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createBoxQty = () => {
        let materialLots = this.state.data;
        let tapeCodeList = [];
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (tapeCodeList.indexOf(data.tapeMaterialCode) == -1) {
                    tapeCodeList.push(data.tapeMaterialCode);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{tapeCodeList.length}</Tag>
    }

    tapeReceive = () => {
        let self = this;
        let materialLotList =  self.state.data;
        if (materialLotList.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let queryFields = this.props.propsFrom.state.queryFields;
        let tapeSize = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(tapeSize == "" || tapeSize == undefined || tapeSize == null){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ChooseTapeSizePlease));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            materialLotList : materialLotList,
            tapeSize: tapeSize,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                self.setState({
                    data: [],
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        };
        RwMaterialManagerRequest.sendReceiveTapeMaterial(object);
    }

    createTapeReceiveButton = () => {
        return <Button key="tapeReceive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="plus"onClick={this.tapeReceive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    refreshDelete = (records) => {
        let datas = this.state.data;
        let recordList = [];
        if (!(records instanceof Array)) {
            let tapeMaterialCode = records.tapeMaterialCode;
            datas.forEach((item) => {
                if(item.tapeMaterialCode == tapeMaterialCode){
                    recordList.push(item);
                }
            });
        } else {
            recordList = records;
        }
        recordList.forEach((record) => {
            let dataIndex = datas.indexOf(record);
            if (dataIndex > -1 ) {
                datas.splice(dataIndex, 1);
            }
        });
        this.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: []
        })
        MessageUtils.showOperationSuccess();
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};