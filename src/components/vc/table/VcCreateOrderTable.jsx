import EntityListTable from "@components/framework/table/EntityListTable";
import VcCreateOrderDialog from '../dialog/VcCreateOrderDialog';
import {Tabs} from 'antd';
import {SqlType} from '@const/ConstDefine';
import VcCreateOrderLineTable from "./VcCreateOrderLineTable";
import { CreateDocType } from "../dialog/VcCreateOrderDialog";

const TabPane = Tabs.TabPane;

/**
 * 页面创建单据
 */
export default class VcCreateOrderTable extends EntityListTable {

    static displayName = 'VcCreateOrderTable';

    createForm = () => {
        return  <VcCreateOrderDialog key={VcCreateOrderDialog.displayName} ref={this.formRef} object={this.state.editorObject}
                        visible={this.state.formVisible}  table={this.state.table} onOk={this.refresh} 
                        onCancel={this.handleCancel} docType = {CreateDocType.document}/>
    }

    buildTab = (tab, selectedObject) => {
        return this.buildOrderLineTab(tab, selectedObject);
    }

    buildOrderLineTab = (tab, selectedObject) => {
        let whereClause = SqlType.NoResultCondition;
        if (tab.whereClause && selectedObject) {
            whereClause = tab.whereClause.format(selectedObject);
        }
        return <TabPane tab={tab.title} key={tab.name}>
                   <VcCreateOrderLineTable 
                        parentObject={selectedObject} 
                        refTableName={tab.refTableName} 
                        whereClause={whereClause}/>
                  </TabPane>;
    }                
}