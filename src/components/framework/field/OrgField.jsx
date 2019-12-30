import Combox from './Combox';
import RefTableManagerRequest from '@api/ref-table-manager/RefTableManagerRequest';
import { RefTableName } from '@api/const/ConstDefine';

export default class OrgField extends Combox {

    static displayName = 'OrgField';
    
    queryData = () => {
        let self = this;
        let requestObject = {
            refTableName: RefTableName.NBOrg,
            success: function(responseBody) {
                self.refTable = responseBody.referenceTable;
                let data = [];
                responseBody.dataList.map(d => {
                    let refData = {
                        key: d[self.refTable.keyField],
                        value: d[self.refTable.textField]
                    };
                    data.push(refData);
                }); 
                self.setState({
                    data: data,
                });
            }
        }
        RefTableManagerRequest.sendGetOrgRequest(requestObject);
    }

}
