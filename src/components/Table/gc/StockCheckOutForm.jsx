import EntityForm from "../../Form/EntityForm";
import Tab from "../../../api/dto/ui/Tab";
import { Tabs, Row } from "antd";
import EditorColumnTable from "./EditorColumnTable";
import StockOutCheckRequest from "../../../api/gc/stock-out-check/StockOutCheckRequest";

const TabPane = Tabs.TabPane;

export default class StockCheckOutForm extends EntityForm {
    static displayName = 'StockCheckOutForm';

    buildBasicSection = () => {
        
    }
    
    buildTabs = () => {
        const tabs = this.props.table.tabs;
        const tabPanels = [];
        if (Array.isArray(tabs)) {
            tabs.forEach((tab) => {
                let tabPanel = new Tab(tab);
                tabPanels.push(<TabPane tab={tabPanel.title} key={tabPanel.name}>
                    <Row gutter={16}>
                        <EditorColumnTable ref={(editorColumnTable) => { this.editorColumnTable = editorColumnTable }}refTableName={tabPanel.refTableName}></EditorColumnTable>
                    </Row>
                </TabPane>);
            }) 
        }
        return (<Tabs>
           {tabPanels}
        </Tabs>)
    }

    handleSave = () => {
        let self = this;
        let checkList = this.editorColumnTable.state.dataSource;
        if (checkList.filter((checkItem) => "NG" === checkItem.result).length === 0){
            //TODO 当初不知道是否要提示一下没有NG的话是否不让点确定
        }
        
        let object = {
            materialLots : this.props.object,
            checkList: this.editorColumnTable.state.dataSource,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }

}


