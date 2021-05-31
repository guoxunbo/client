import EntityListTable from "../EntityListTable";
import { Button, Tag, Select } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import PrintUtils from '../../../api/utils/PrintUtils';
import { Notification } from '../../notice/Notice';
import GetMLotCodePrintParameterRequest from "../../../api/gc/get-print-mlot-parameter/GetMLotCodePrintParameterRequest";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';

const { Option} = Select;

export default class GCMaterialLotCodePrintTable extends EntityListTable {

    static displayName = 'GCMaterialLotCodePrintTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createLableTypeTag());
        tags.push(this.createMLotNumber());
        tags.push(this.createWaferCount());
        tags.push(this.createCurrentQty());
        return tags;
    }

    componentWillMount = () => {
        let self = this;
        let requestObject = {
            referenceName: "GCMLotCodePrintList",
            success: function(responseBody) {
              self.setState({
                mLotPrintTypeList: responseBody.referenceList
              });
            }
          }
        MaterialLotUpdateRequest.sendGetReferenceListRequest(requestObject);
    }

    createLableTypeTag = () => {
        const {mLotPrintTypeList} = this.state;
        if(mLotPrintTypeList || mLotPrintTypeList != undefined){
            const options = mLotPrintTypeList.map(d => <Option key={d.key}>{d.value}</Option>);
            return <span style={{display: 'flex'}}>
                <span style={{marginLeft:"10px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.PrintLableType)}:</span>
                <span style = {{marginLeft:"10px"}}>
                    <Select
                    showSearch
                    allowClear
                    value={this.state.value}
                    style={{ width: 300}}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    onBlur={this.props.onBlur}
                    placeholder="标签类型">
                    {options} 
                 </Select>
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

    printLable = () => { 
        const {data} = this.state;
        let self = this;
        let printType = this.state.value;

        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(printType == "" || printType == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectPrintType));
            return;
        }

        if (data && data.length > 0) {
            self.setState({
                loading: true
            });
            EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

            let requestObject = {
                printType: printType,
                materialLot : data[0],
                success: function(responseBody) {
                    responseBody.parameterMapList.forEach((parameter) => {
                        let printCount = parameter.printCount;
                        let portId = parseInt(parameter.portId);
                        delete parameter.portId;
                        let url = "http://127.0.0.1:"+portId+"/Integration/wms-print-MLotCode/Execute";
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, parseInt(printCount));
                    });
                    MessageUtils.showOperationSuccess();
                }
            }
            GetMLotCodePrintParameterRequest.sendGetPrintParameterRequest(requestObject);
        }
    }

    createMLotNumber = () => {
        let materialLotList = this.state.data;
        let materialLotLists = [];
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                if (materialLotList.indexOf(data.materialLotId) == -1) {
                    materialLotLists.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotLists.length}</Tag>
    }

    createCurrentQty = () => {
        let materialLotList = this.state.data;
        let count = 0;
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createWaferCount = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" style={styles.tableButton} loading={this.state.loading} icon="print" onClick={this.printLable}>
                        {I18NUtils.getClientMessage(i18NCode.PrintLable)}
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