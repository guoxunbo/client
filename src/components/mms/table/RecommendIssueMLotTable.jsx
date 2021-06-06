import LabMLotManagerRequest from '@api/mms/lab-mlot-manager/LabMLotManagerRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import { Button } from 'antd';
import PrintLabMLotRecommendOrderDialog from '../dialog/PrintLabMLotRecommendOrderDialog';

/**
 * 推荐发料
 */
export default class RecommendIssueMLotTable extends EntityListTable {

    static displayName = 'RecommendIssueMLotTable';

    constructor(props){
        super(props);
        this.state = {...this.state, formPrintObject:{}, documentId:'', formVisible:''};
    }

    createButtonGroup = () => {
        return(<Button key="Print" type="primary" loading={this.state.loading} icon="file-excel" onClick={this.handlePrint}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPrint)}
                </Button>)
    }
    
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        return operations;
    }

    handlePrint = () =>{
        let self = this ;
        let {data} = self.state;
        let documentId = this.state.docId;
        this.setState({
            formPrintObject: data,
            formVisible: true,
            documentId: documentId
        })
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<PrintLabMLotRecommendOrderDialog key={PrintLabMLotRecommendOrderDialog.displayName} ref={this.formRef} object={this.state.formPrintObject} documentId = {this.state.documentId}visible={this.state.formVisible} 
                                                         onOk={this.handleCancel} onCancel={this.handleCancel} />);                               
        return childrens;
    }

    handleCancel = ()=>{
        this.setState({
            formPrintObject: {},
            formVisible: false,
            documentId: []
        })
    }
}