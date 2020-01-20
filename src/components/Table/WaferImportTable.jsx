import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { Upload } from 'antd';
import MessageUtils from '../../api/utils/MessageUtils';
import { Notification } from '../notice/Notice';
import {Tag} from 'antd';
import WaferImportManagerRequest from '../../api/gc/wafer-import/WaferImportManagerRequest';
import EntityScanViewTable from './EntityScanViewTable';

export default class WaferImportTable extends EntityScanViewTable {

    static displayName = 'WaferImportTable';

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

    constructor(props) {
        super(props); 
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPieceTag());
        buttons.push(this.createNumTag());
        buttons.push(this.createErrorTag());
        buttons.push(this.createShowButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createImportTemplateButton());
        return buttons;
    }

    createPieceTag = () => {
        const waferList = this.state.data;
        return <Tag color="#2db7f5"> {waferList.length} 片 </Tag>
    }

    createNumTag = () => {
        const waferList = this.state.data;
        let count = 0;
        waferList.forEach(data => {
            if (data.currentQty != null) {
                count = count + data.currentQty;
            }     
        });
        return <Tag color="#2db7f5"> {count} 颗 </Tag>
    }

    createErrorTag = () => {
        let errorInfoList = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        return <Tag color="#D2480A">{errorInfoList.length}</Tag>
    }

    createShowButton = () => {
        return (<Upload key="show" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.show(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.BtnPreview)}</Button>
                </Upload>);
    }

    createImportButton = () => {
        return <Button key="import" type="primary" style={styles.tableButton}  onClick={this.import}>
                        {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                    </Button>
    }

    createImportTemplateButton = () => {
        return <Button key="importTemplate" type="primary" style={styles.tableButton}  onClick={this.exportTemplate}>
                        {I18NUtils.getClientMessage(i18NCode.BtnImportTemplate)}
                    </Button>
    }

    buildOperationColumn() {

    }

    show = (option) => {
        const self = this;
        const {table} = this.state;
        let object = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                debugger;
                let waferInfoList = responseBody.materialLotUnits;
                waferInfoList.forEach(record => {
                    if(!record.unitId || !record.materialLotId || !record.materialName || 
                      !record.currentQty || !record.reserved1 || !record.reserved2 || !record.reserved11 ){
                        record.errorFlag = true;
                    }          
                });
                self.setState({
                    data: waferInfoList,
                });  
                MessageUtils.showOperationSuccess();             
            }
        }
        WaferImportManagerRequest.sendShowRequest(object, option.file);
    }

    import = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            return;
        }
        let errorInfoList = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        if(errorInfoList.length){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.AbnormalInfoOnThePage));
            return;
        }
        const {table} = this.state;
        let requestObject = {
            list: data,
            tableRrn: table.objectRrn,
            success: function() {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                self.setState({
                    data: [],
                }); 
                MessageUtils.showOperationSuccess();
            }
        }
        WaferImportManagerRequest.sendImportRequest(requestObject);
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};