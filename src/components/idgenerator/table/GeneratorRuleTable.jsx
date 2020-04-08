import EntityListTable from "@components/framework/table/EntityListTable";

import {Tabs, Row } from "antd";
import GeneratorRuleLineTable from "@components/idgenerator/table/GeneratorRuleLineTable";
import { SqlType } from "@const/ConstDefine";

const TabPane = Tabs.TabPane;
const TAB_RULE_INFO_NAME = "GeneratorRuleInfo";

export default class GeneratorRuleTable extends EntityListTable {

    static displayName = 'GeneratorRuleTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        return buttons;
    }

    buildTab = (tab, selectedObject) => {
        if (tab.name === TAB_RULE_INFO_NAME) {
            return this.buildGeneratorRuleLineTab(tab, selectedObject);
        } else {
            return tab.buildTableTab(selectedObject);
        }
    }

    buildGeneratorRuleLineTab = (tab, selectedObject) => {
        let whereClause = SqlType.NoResultCondition;
        if (tab.whereClause && selectedObject) {
            whereClause = tab.whereClause.format(selectedObject);
        }

        return <TabPane tab={tab.title} key={tab.name}>
                    <Row gutter={16}>
                        <GeneratorRuleLineTable refTableName={tab.refTableName} whereClause={whereClause} parentObject={selectedObject} />
                    </Row>
            </TabPane>
    }
}