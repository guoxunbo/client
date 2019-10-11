import  React from 'react';

import {Tabs, Row, Form } from "antd";
import Tab from '@api/dto/ui/Tab';
import GeneratorRuleLineTable from '@components/idgenerator/table/GeneratorRuleLineTable';
import EntityForm from '@components/framework/form/EntityForm';

const TabPane = Tabs.TabPane;

const TAB_RULE_INFO_NAME = "GeneratorRuleInfo";

class GeneratorRuleForm extends EntityForm {
    static displayName = 'GeneratorRuleForm';

    buildTabs = () => {
        const tabs = this.props.table.tabs;
        const tabPanels = [];
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        if (Array.isArray(tabs)) {
            tabs.forEach((tabObject) => {
                let tabPanel = new Tab(tabObject);
                if (tabPanel.name === TAB_RULE_INFO_NAME) {
                    tabPanels.push(this.buildGeneratorRuleLineTab(tabPanel));
                } else {
                    tabPanels.push(tabPanel.buildTab(this.props.form, formItemLayout, this.props.object));
                }
            }) 
        }
        return (<Tabs>
           {tabPanels}
        </Tabs>)
    }

    buildGeneratorRuleLineTab = (tab) => {
        return <TabPane tab={tab.title} key={tab.name}>
                    <Row gutter={16}>
                        <GeneratorRuleLineTable tab={tab} parentObject={this.props.object} table={this.state.table} data={this.state.tableData}/>
                    </Row>
            </TabPane>
    }

}
export default Form.create()(GeneratorRuleForm);