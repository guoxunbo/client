import EntityListTable from "../EntityListTable";
import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import IncomingDeleteRequest from "../../../api/gc/incomingDelete-manager/IncomingDeleteRequest";

const TableName = {
    IncomingMLotDelete: "GCIncomingMLotDeleteTable"
}

export default class GCIncomingMLotDeleteTable extends EntityListTable {

    static displayName = 'GCIncomingMLotDeleteTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteRemarkInput());
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createDeleteButton());
        return buttons;
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="deleteNote" placeholder="删除备注" />
        </div>
    }

    deleteData =() => {
        const {data,table} = this.state;
        let self = this;
        let deleteNote = this.input.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            dataList: data,
            deleteNote: deleteNote,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    loading: false
                }); 
                MessageUtils.showOperationSuccess();
            }
        }
        IncomingDeleteRequest.sendDeleteRequest(requestObject);
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">片数：{this.state.data.length}</Tag>
    }

    createDeleteButton = () => {
        return <Button key="delete" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDelete)}
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