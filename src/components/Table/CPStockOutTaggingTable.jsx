import { Button, Input } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { Tag } from 'antd';
import EntityListCheckTable from './EntityListCheckTable';
import MessageUtils from '../../api/utils/MessageUtils';
import CPStockOutTagMLotForm from './gc/CPStockOutTagMLotForm';
import WltStockOutManagerRequest from '../../api/gc/wlt-stock-out/WltStockOutManagerRequest';


export default class CPStockOutTaggingTable extends EntityListCheckTable {

    static displayName = 'PackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createWaferNumber());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createPackageButton());
        buttons.push(this.createInput());
        return buttons;
    }

    createInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="stockTagNote" placeholder="出货标注备注"/>
        </div>
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
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
    }

    createForm = () => {
        return  <CPStockOutTagMLotForm visible={this.state.formVisible} 
                                     stockTagNote={this.state.stockTagNote} 
                                     materialLots={this.state.materialLots}
                                     materialName={this.state.materialName}
                                     width={1440}
                                     onOk={this.handleTagSuccess} 
                                     onCancel={this.handleCancel}/>
    }
    
    handleTagSuccess = () => {
        this.materialLots = [],
        this.setState({
            selectedRows: [],
            selectedRowKeys: [],
            formVisible : false,
        });
        if (this.props.resetData) {
            this.props.resetData();
            this.props.onSearch();
        }
        MessageUtils.showOperationSuccess();
    }

    handleCancel = (e) => {
        this.setState({
            formVisible: false,
        })
    }

    stockOutTag = () => {
        const {data} = this.state;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }
        this.validationMLotMaterialName(materialLots);
    }

    validationMLotMaterialName = (materialLots) => {
        const self = this;
        let stockTagNote = this.input.state.value;
        let requestObject = {
          materialLots: materialLots,
          success: function(responseBody) {
              let materialName = materialLots[0].materialName;
            self.setState({
                formVisible : true,
                materialLots: materialLots,
                stockTagNote: stockTagNote,
                materialName: materialName,
            }); 
          }
        }
        WltStockOutManagerRequest.sendValidateMlotMaterialNameRequest(requestObject);
    }  

    createPackageButton = () => {
        return <Button key="stockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.stockOutTag}>
                        {I18NUtils.getClientMessage(i18NCode.BtnTagging)}
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
