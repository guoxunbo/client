import { Button, Select, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';

const { Option} = Select;

export default class GCMaterialLotReleaseTable extends EntityScanViewTable {

    static displayName = 'GCMaterialLotReleaseTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReleaseButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createLocationSelecctAndInputTag());
        return tags;
    }

    componentWillMount = () => {
        let self = this;
        let requestObject = {
            referenceName: "GCReleaseReasonList",
            success: function(responseBody) {
              self.setState({
                releaseReasonList: responseBody.referenceList
              });
            }
          }
        MaterialLotUpdateRequest.sendGetReferenceListRequest(requestObject);
    }

    createLocationSelecctAndInputTag = () => {
        const {releaseReasonList} = this.state;
        if(releaseReasonList || releaseReasonList != undefined){
            const options = releaseReasonList.map(d => <Option key={d.key}>{d.value}</Option>);
            return <span style={{display: 'flex'}}>
                <span style={{marginLeft:"10px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.ReleaseReason)}:</span>
                <span style = {{marginLeft:"10px"}}>
                    <Select
                    showSearch
                    allowClear
                    value={this.state.value}
                    style={{ width: 200}}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    onBlur={this.props.onBlur}
                    placeholder="释放原因">
                    {options} 
                 </Select>
              </span>

              <span style={{marginLeft:"30px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.remarks)}:</span>
              <span style = {{marginLeft:"10px"}}>
                <Input ref={(input) => { this.input = input }} style={{ width: 300}} key="remarks" placeholder="备注" />
              </span>
            </span>
        }
    }

    handleChange = (currentValue) => {
        if (this.state.value === currentValue) {
            return;
        }
        this.setState({ 
            value: currentValue
        });
    }

    relaese =() => {
        const {data,table} = this.state;
        let self = this;
        let remarks = this.input.state.value;
        let reason = this.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(reason == "" || reason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseReleaseReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            reason: reason,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendReleaseMaterialLotRequest(requestObject);
    }

    createReleaseButton = () => {
        return <Button key="release" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.relaese}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRelease)}
                    </Button>
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