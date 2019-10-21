import EntityForm from "@components/framework/form/EntityForm";
import Tab from "@api/dto/ui/Tab";
import { Tabs, Row } from "antd";
import EditorColumnTable from "@components/framework/table/EditorColumnTable";

const TabPane = Tabs.TabPane;

/**
 * 显示所有检查项的并进行判等的Form
 */
export default class QualityCheckItemForm extends EntityForm {
    static displayName = 'QualityCheckItemForm';

    buildForm = () => {
        console.log(this.props);
        const tabs = this.props.table.tabs;
        const tabPanels = [];
        if (Array.isArray(tabs)) {
            tabs.forEach((tab) => {
                let tabPanel = new Tab(tab);
                tabPanels.push(<TabPane tab={tabPanel.title} key={tabPanel.name}>
                    <Row gutter={16}>
                        <EditorColumnTable dataSource={this.props.checkItemList} ref={(editorColumnTable) => { this.editorColumnTable = editorColumnTable }} refTableName={tabPanel.refTableName}></EditorColumnTable>
                    </Row>
                </TabPane>);
            }) 
        }
        return (<Tabs>
           {tabPanels}
        </Tabs>)
    }
}


