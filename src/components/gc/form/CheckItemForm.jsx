import EntityDialog from "@components/framework/dialog/EntityDialog";
import Tab from "@api/dto/ui/Tab";
import { Tabs, Row, Modal } from "antd";
import EditorColumnTable from "@components/framework/table/EditorColumnTable";
import StockOutCheckRequest from "@api/gc/stock-out-check/StockOutCheckRequest";
import * as PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;
const { confirm } = Modal;

export default class CheckItemForm extends EntityDialog {
    static displayName = 'CheckItemForm';

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
                        <EditorColumnTable dataSource={this.props.checkItemList} ref={(editorColumnTable) => { this.editorColumnTable = editorColumnTable }} refTableName={tabPanel.refTableName}></EditorColumnTable>
                    </Row>
                </TabPane>);
            }) 
        }
        return (<Tabs>
           {tabPanels}
        </Tabs>)
    }

    showNoNgConfirm = () => {
        let self = this;
        confirm({
            title: '没有选择NG项。是否确定?',
            content: "没有选择NG项，将会判定成为OK",
            onOk() {
                self.judge();
            },
            onCancel() {},
          });
    }

    judge = () => {
        let self = this;
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

    handleSave = () => {
        let checkList = this.editorColumnTable.state.dataSource;
        // 当没有值的时候，要使用showConfirm
        if (checkList.filter((checkItem) => "NG" === checkItem.result).length === 0){
            this.showNoNgConfirm();
        } else {
            this.judge();
        }
    }

}
CheckItemForm.propTypes={
    title: PropTypes.string,
    visible: PropTypes.bool,
    object: PropTypes.array,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    table: PropTypes.object,
    tableData: PropTypes.array
}

