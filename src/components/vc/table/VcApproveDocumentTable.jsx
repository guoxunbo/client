import VcDeliveryOrderRequest from "@api/vc/delivery-order-manager/VcDeliveryOrderRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button } from "antd";

export default class VcApproveDocumentTable extends EntityListTable {

    static displayName = 'VcApproveDocumentTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createApproveButton());
        return buttons;
    }

    createApproveButton = () => {
        return  <Button key="approve" type="primary" className="table-button" onClick={this.handledApprove} icon = "import-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnApprove)}
                </Button>
    }

    handledApprove = () => {
        let self = this ;
        let document= self.getSingleSelectedRow();
        if(!document){
            return;
        }
        // self.refresh(this);
        let requestObject = {
            documentId: document.name,
            success: function(responseBody) {
                self.setState({
                    loading: false
                });
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        VcDeliveryOrderRequest.sendApproveRequest(requestObject);
    }

    buildOperationColumn = () => {

    }


}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};