import { Button, Select, Input, Upload, Tag } from 'antd';
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
        buttons.push(this.createImportSearchButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createReleaseButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createLocationSelecctAndInputTag());
        tags.push(this.createTotalQty());
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

    importSearch = (option) => {
        const self = this;
        const {table} = this.state;
        let tableData = this.state.data;
        if(tableData.length > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.TableDataMustBeEmpty));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let object = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        MaterialLotUpdateRequest.sendImportSearchRequest(object, option.file);
    }

    createReleaseButton = () => {
        return <Button key="release" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.relaese}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRelease)}
                    </Button>
    }

    createImportSearchButton = () => {
        return (<Upload key="importSearch" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.importSearch(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImportSearch)}</Button>
                </Upload>);
    }

    createTotalQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
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