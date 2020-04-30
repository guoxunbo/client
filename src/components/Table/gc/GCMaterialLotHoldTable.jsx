import { Button, Select, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';

const { Option} = Select;

export default class GCMaterialLotHoldTable extends EntityScanViewTable {

    static displayName = 'GCMaterialLotHoldTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createHoldButton());
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
            referenceName: "GCHoldReasonList",
            success: function(responseBody) {
              self.setState({
                holdReasonList: responseBody.referenceList
              });
            }
          }
        MaterialLotUpdateRequest.sendGetLocationListRequest(requestObject);
    }

    createLocationSelecctAndInputTag = () => {
        const {holdReasonList} = this.state;
        if(holdReasonList || holdReasonList != undefined){
            const options = holdReasonList.map(d => <Option key={d.key}>{d.value}</Option>);
            return <span style={{display: 'flex'}}>
                <span style={{marginLeft:"10px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.HoldReason)}:</span>
                <span style = {{marginLeft:"10px"}}>
                    <Select
                    showSearch
                    allowClear
                    value={this.state.value}
                    style={{ width: 200}}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    onBlur={this.props.onBlur}
                    placeholder="扣留原因">
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

    hold =() => {
        const {data,table} = this.state;
        let self = this;
        let remarks = this.input.state.value;
        let holdReason = this.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(holdReason == "" || holdReason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseHoldReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            reason: holdReason,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendHoldMaterialLotRequest(requestObject);
    }

    createHoldButton = () => {
        return <Button key="hold" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.hold}>
                        {I18NUtils.getClientMessage(i18NCode.BtnHold)}
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