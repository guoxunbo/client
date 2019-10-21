import EntityDialog from "@components/framework/dialog/EntityDialog";
import { Modal } from "antd";
import * as PropTypes from 'prop-types';
import QualityCheckItemForm from "@components/mms/form/QualityCheckItemForm";

const { confirm } = Modal;

/**
 * 显示所有检查项的并进行判等的dialog
 * 
 */
export default class QualityCheckItemDialog extends EntityDialog {
    static displayName = 'QualityCheckItemDialog';

    buildForm = () => {
        return <QualityCheckItemForm ref={(form) => this.entityForm = form} 
                                object={this.props.object} 
                                table={this.props.table}
                                checkItemList={this.props.checkItemList}/>
    }
    
    showNoNgConfirm = () => {
        let self = this;
        confirm({
            title: '没有选择NG项。是否确定?',
            content: "没有选择NG项，将会判定成为OK",
            onOk: function() {
                self.judge();
            },
            onCancel() {},
          });
    }

    /**
     * 各自的判定调用不同的接口 需要各自业务实现
     */
    judge = () => {
        //表格数据
        let tableData = this.props.object;
        let checkList =  this.entityForm.editorColumnTable.state.dataSource;
        //各自的判定调用不同的接口 需要各自业务实现
    }

    handleOk = () => {
        let checkList = this.entityForm.editorColumnTable.state.dataSource;
        console.log(checkList);
        // 当没有选择NG的时候，进行提示
        if (checkList.filter((checkItem) => "NG" === checkItem.result).length === 0){
            this.showNoNgConfirm();
        } else {
            this.judge();
        }
    }

}
QualityCheckItemDialog.propTypes={
    title: PropTypes.string,
    visible: PropTypes.bool,
    object: PropTypes.array,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    table: PropTypes.object,
    tableData: PropTypes.array
}

