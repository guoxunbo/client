import  React from 'react';
import EntityForm from '@components/framework/form/EntityForm';
import SimpleBarCode from '@components/framework/code/SimpleBarCode';
import { Form } from 'antd';

/**
 * 打印推荐领料单
 */
class PrintLabMLotRecommendOrderForm extends EntityForm {

    static displayName = 'PrintLabMLotRecommendOrderForm';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildForm = () => {
       return this.buildPrintTable();
    }

    forEachBuildTr = (materialLots) =>{
        let trArr = [];
        materialLots.forEach(mLot => {
            let tr = this.buildTr(mLot);
            trArr.push(tr);
        });
        return trArr;
    }

    buildTr = (mLot) => {
        return(<tr>
            <th colspan = "2" style={styles.tdFontSize}>{mLot.lastStorageId}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.materialLotId}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.materialName}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.currentQty}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.pickQty}</th>
        </tr>)
            
    }

    buildBarCode = (value) => {
        return (
            <div id="barcode">
                <SimpleBarCode value={value}></SimpleBarCode>
            </div>)
    }

    buildPrintTable = () => {
        let materialLots = this.props.object;
        let documentId = this.props.documentId;
        let trArr = this.forEachBuildTr(materialLots);
        return (<div id="printTable">
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "8"><h3>实验室推荐发料单</h3></th> 
                            </tr>                           
                            <tr>
                                <th colspan = "2" style={styles.tdFontSize}>单号:</th>
                                <th colspan = "2" ></th> 
                                <th colspan = "2" ></th> 
                                <th colspan = "2" style={styles.tdFontSize} aligh= "right"> {this.buildBarCode(documentId)} </th>
                            </tr>
                        </tbody>
                    </table>

                    <table border="1" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "2" style={styles.tdFontSize}>库位号</th> 
                                <th colspan = "2" style={styles.tdFontSize}>物料批次号</th> 
                                <th colspan = "2" style={styles.tdFontSize}>物料代码</th> 
                                <th colspan = "2" style={styles.tdFontSize}>数量</th> 
                                <th colspan = "2" style={styles.tdFontSize}>领料数量</th> 
                            </tr>
                            {trArr}
                        </tbody>
                    </table>

                </div>
        )}
}
const styles = {
    tdFontSize:{fontSize:'12px', height:'30px'}
}
export default Form.create()(PrintLabMLotRecommendOrderForm);