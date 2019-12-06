import { Tag } from 'antd';
import EntityListCheckTable from '../EntityListCheckTable';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

/**
 * 备货表格
 */
export default class GcReservedCaseMLotTable extends EntityListCheckTable {

    static displayName = 'GcStockOutMLotTable';
    
    /**
     * 重写此方法。因为当前的Table不是从props传递。
     */
    componentWillReceiveProps = (props) => {
        const {visible, packageLots} = props;
        let self = this;
        if (visible) {
            let requestObj = {
                packageLots : packageLots,
                success: function(responseBody) {
                    self.setState({
                        data: responseBody.materialLotList
                    })
                }
            }
            ReservedManagerRequest.sendGetPackageDetails(requestObj);
        } else {
            self.setState({
                data: [],
                selectedRows: [],
                selectedRowKeys: []
            })
        }
    }   

    getMaterialLots = () => {
        const {visible, packageLots} = this.props;
        let self = this;
        if (visible) {
            let requestObj = {
                packageLots : packageLots,
                success: function(responseBody) {
                    self.setState({
                        data: responseBody.materialLotList
                    })
                }
            }
            ReservedManagerRequest.sendGetPackageDetails(requestObj);
        } else {

        }
    }

    componentDidMount = () => {
        const self = this;
        self.getMaterialLots();
        let requestObject = {
            tableRrn: 9753,
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildColumn(table);
                self.setState({
                    table: table,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    loading: false
                }); 
               
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        return buttons;
    }

    createTotalNumber = () => {
        let materialLots = this.state.selectedRows;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.selectedRows.length}</Tag>
    }
}
