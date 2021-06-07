import DocQueryManagerRequest from "@api/mms/doc-query-manager/DocQueryManagerRequest";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import DocQueryManagerTable from "@components/mms/table/DocQueryManagerTable";
import EntityProperties from "@properties/framework/EntityProperties";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import EntityHistoryProperties from "../framework/EntityHistoryProperties";

/**
 * 单据查询管理
 */
export default class DocQueryManagerProperties extends EntityProperties{

    static displayName =  'DocQueryManagerProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }

    queryData = (whereClause) => {
        const self = this;
        let queryFromMLotId = self.form.props.form.getFieldsValue().mLotId;
        let documentCategory = self.form.props.form.getFieldsValue().category; 
        let documentData = [];

        if(queryFromMLotId != '' && queryFromMLotId != undefined){
            let object = {
                materialLotId: queryFromMLotId,
                documentCategory:documentCategory,
                success: function(responseBody) {
                    documentData.unshift(responseBody.document);
                    self.setState({tableData: documentData, loading: false, whereClause: whereClause});
                    self.entityScanProperties.setState({tableData:responseBody.materialLotList, loading: false})
                },
                fail: function() {
                    self.resetData();
                    self.entityScanProperties.setState({tableData:[], loading: false})
                }
            }
            DocQueryManagerRequest.sendQueryOrderByMLotIdRequest(object)
        }else{
            let requestObject = {
                tableRrn: this.state.tableRrn,
                whereClause: whereClause,
                success: function(responseBody) {
                    self.setState({
                        tableData: responseBody.dataList,
                        loading: false,
                        whereClause: whereClause
                    });
                }
            }
            TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        } 
    }

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    } 

    buildTable =()=>{
        return <DocQueryManagerTable
                {...this.getDefaultTableProps()}
                entityScanProperties = {this.entityScanProperties}/>
    }

    buildOtherComponent= () =>{
        return <EntityHistoryProperties {...this.getDefaultTableProps()}
                    tableRrn = {this.state.parameters.parameter1}  
                    ref={(entityScanProperties) => { this.entityScanProperties = entityScanProperties }}/>
    }
}
