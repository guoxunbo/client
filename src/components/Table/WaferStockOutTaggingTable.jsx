
import { Button, Input } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { Tag } from 'antd';
import EntityListCheckTable from './EntityListCheckTable';
import StockOutTagMLotForm from './gc/StockOutTagMLotForm';
import WltStockOutManagerRequest from '../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import MessageUtils from '../../api/utils/MessageUtils';

export default class WaferStockOutTaggingTable extends EntityListCheckTable {

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
        return  <StockOutTagMLotForm visible={this.state.formVisible} 
                                     stockTagNote={this.state.stockTagNote} 
                                     materialLots={this.state.materialLots}
                                     width={1440}
                                     vender={this.state.vender} 
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
        this.validationMaterialLot(materialLots);
    }

    validationMaterialLot = (materialLots) => {
        const self = this;
        let stockTagNote = this.input.state.value;
        let vender = materialLots[0].reserved22;
        let requestObject = {
          materialLots: materialLots,
          success: function(responseBody) {
            self.setState({
                formVisible : true,
                materialLots: materialLots,
                stockTagNote: stockTagNote,
                vender: vender
            }); 
          }
        }
        WltStockOutManagerRequest.sendValidateMlotVenderRequest(requestObject);
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
