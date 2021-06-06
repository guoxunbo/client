import MaterialLotOqcTable from "@components/mms/table/MaterialLotOqcTable";
import EntityProperties from "../framework/EntityProperties";
import MaterialLotOqcManagerScanProperties from "./MaterialLotOqcManagerScanProperties";
import NoticeUtils from "@utils/NoticeUtils";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

export default class MaterialLotOqcManagerProperties extends EntityProperties{

    static displayName = "MaterialLotOqcManagerProperties";

        constructor(props) {
            super(props);  
            this.state= {...this.state}
        }

        resetData = () => {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
                tableData: [],
                loading: false,
                resetFlag: true
            });

            this.mLotQcScanProperties.resetData();
        } 

        afterQuery = (responseBody, whereClause) => {
            this.orderTable.setState({
                data: responseBody.dataList,
                whereClause: whereClause,
                loading: false,
            });
            this.mLotQcScanProperties.mLotOqcProperties.queryData(whereClause);
            let {data} = this.orderTable.state;
            if(data.length > 0){
                this.orderTable.selectRow(data[0]);
            } else {
                NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound))
            }
        }

        buildTable = () => {
            return <MaterialLotOqcTable
                    tableRrn = {this.state.tableRrn}
                    scrollY={200}
                    pagination={true}
                    mLotQcScanProperties = {this.mLotQcScanProperties}
                    ref={(orderTable) => { this.orderTable = orderTable}}/>
        }

        buildOtherComponent = () => {
            return <MaterialLotOqcManagerScanProperties
                    {...this.getDefaultTableProps()} 
                    tableRrn = {this.state.parameters.parameter1}
                    mlotOqcTableRrn = {this.state.parameters.parameter2}
                    materialLotQcActionTable = {this.state.parameters.parameter3}
                    orderTable = {this.orderTable}
                    ref={(mLotQcScanProperties) => { this.mLotQcScanProperties = mLotQcScanProperties}}/>
        }
}

