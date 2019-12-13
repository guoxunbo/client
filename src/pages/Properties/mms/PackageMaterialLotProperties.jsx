import EntityScanProperties from "@properties/framework/EntityScanProperties";
import PackMaterialLotTable from "@components/mms/table/PackMaterialLotTable";
import PackageValidationRequest from "@api/package-validation/PackageValidationRequest";

/**
 * 所有包装都需要用的页面。
 * 如果有包装需要，务必继承此页面
 * paramter1值表示PackageType
 */
export default class PackageMaterialLotProperties extends EntityScanProperties{

    static displayName = 'PackageMaterialLotProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, packageType: this.props.match.params.parameter1};
      }

    afterQuery = (responseBody) => {
        let queryDatas = responseBody.dataList;
        if (queryDatas && queryDatas.length > 0) {
            this.validationPackgeRule(queryDatas[0]);
        } else {
            this.showDataNotFound();
        }
    }
    
    validationPackgeRule(materialLot) {
        let self = this;
        let {rowKey,tableData, packageType} = this.state;
        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            tableData.unshift(materialLot);
        }
        if (tableData.length == 0) {
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        } else {
            let requestObject = {
                packageType: packageType,
                materialLots: tableData,
                success: function() {
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.form.resetFormFileds();
                },
                fail: function() { 
                    tableData.shift();
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.allFieldBlur();
                }
            }
            PackageValidationRequest.sendValidationPackRequest(requestObject);
        }
        
    }

    buildTable = () => {
        return <PackMaterialLotTable {...this.getDefaultTableProps()} 
                                    pagination={false} 
                                    packageType={this.state.packageType}/>
    }

}
