import Field from './Field';
import { Row, Col, Tabs} from 'antd';
import {SessionContext} from '@api/Application';
import {Language, DefaultOrderKey, SqlType} from '@const/ConstDefine';
import EditorTable from '@components/framework/table/EditorTable'

const TabPane = Tabs.TabPane;

/**
 * Table的类型 栏位展示还是表格展示 表格展示需要制定refTableRrn
 */
const TabType = {
    Field: "Field",
    Table: "Table"
}

export default class Tab {
    name;
    description;
    tableRrn;
    seqNo;
    tabType;
    fields;
    
    labelZh;
    label;
    labelRes;

    //tabType是Table的时候
    refTableName;
    editFlag;
    whereClause;
    
    //前端栏位
    title;

    constructor(tab) {
        this.name = tab.name;
        this.description = tab.description;
        this.tableRrn = tab.tableRrn;
        this.seqNo = tab.seqNo;
        this.tabType = tab.tabType;
        this.fields = tab.fields;

        this.refTableName = tab.refTableName;
        this.editFlag = tab.editFlag;
        this.whereClause = tab.whereClause;
        this.title = this.buildTitle(tab);
    }

    buildTitle = (tab) => {
        let title;
        let language = SessionContext.getLanguage();
        if (language == Language.Chinese) {
            title = tab.labelZh;
        } else if (language == Language.English) {
            title = tab.label;
        } else {
            title = tab.labelRes;
        }
        return title;
    }

    buildFieldTab = (form, formLayout, formObject) => {
        let children = [];
        const fields = this.fields;
        for (let f of fields) {
            let field = new Field(f, form);
            if(formObject == undefined){
                return;
            }
            if (!field.basicFlag && field.displayFlag && field.name != DefaultOrderKey) {
                children.push(<Col span={12} key={field.objectRrn}>
                    {field.buildFormItem(formLayout, false, undefined, formObject[field.name])}
                </Col>);
            }
        }
        return <TabPane tab={this.title} key={this.name}>
                    <Row gutter={16}>
                        {children}
                    </Row>
                </TabPane>
    }  

    buildTableTab = (parentObject, entityViewFlag) => {
        let whereClause = SqlType.NoResultCondition;
        if (this.whereClause && parentObject) {
            whereClause = this.whereClause.format(parentObject);
        }
        return <TabPane tab={this.title} key={this.name}>
                    <EditorTable parentObject={parentObject} editFlag={this.editFlag} entityViewFlag={entityViewFlag} refTableName={this.refTableName} whereClause={whereClause} key={this.name} />
                </TabPane>;
    }   

}
export {TabType}