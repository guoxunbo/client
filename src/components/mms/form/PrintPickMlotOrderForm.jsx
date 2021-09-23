import  React from 'react';
import EntityForm from '@components/framework/form/EntityForm';
import SimpleBarCode from '@components/framework/code/SimpleBarCode';
import { Form } from 'antd';

/**
 * 打印批次领料单
 */
class PrintPickMlotOrderForm extends EntityForm {

    static displayName = 'PrintPickMlotOrderForm';

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
        return  (<tr>
                    <th colspan = "2" style={styles.tdFontSize}>{mLot.materialName}</th> 
                    <th colspan = "2" style={styles.tdFontSize}>{mLot.materialDesc}</th> 
                    <th colspan = "2" style={styles.tdFontSize}>{mLot.pickQty}</th>
                    <th colspan = "2" style={styles.tdFontSize}>{mLot.storeUom}</th> 
                </tr>)
            
    }

    buildBarCode = (value) => {
        return (
            <div id="barcode">
                <SimpleBarCode value={value}></SimpleBarCode>
            </div>)
    }

    buildPrintTable = () => {
        debugger;
        let materialLots = this.props.object;
        let document = this.props.document;
        let trArr = this.forEachBuildTr(materialLots);
        return (<div id="printTable">
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "8"><h3>领料单</h3></th> 
                            </tr>                           
                            <tr>
                                <th colspan = "2" style={styles.tdFontSize}>单号:</th>
                                <th colspan = "2" ></th> 
                                <th colspan = "2" ></th> 
                                <th colspan = "2" style={styles.tdFontSize} aligh= "right"> {this.buildBarCode(document.name)} </th>
                            </tr>

                            <tr>
                                <th colspan = "8">&nbsp;</th> 
                            </tr>   
                        </tbody>
                    </table>

                    <table border="1" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "2" style={styles.tdFontSize}>物料代码</th> 
                                <th colspan = "2" style={styles.tdFontSize}>物料描述</th> 
                                <th colspan = "2" style={styles.tdFontSize}>领料数量</th> 
                                <th colspan = "2" style={styles.tdFontSize}>单位</th> 
                            </tr>
                            {trArr}
                        </tbody>
                    </table>

                    <table border="0" width="100%">
                            <tr><td colspan="2">&nbsp;</td></tr>
                            <tr>
                                <td style={styles.tdFontSize}>制单人:{document.createdBy}</td>
                                <td style={styles.tdFontSize}>审核人:</td>
                                <td style={styles.tdFontSize}>领料人:</td>
                                <td style={styles.tdFontSize}>发料人:</td>
                            </tr>                    
                        </table>
                </div>
        )}
}
const styles = {
    tdFontSize:{fontSize:'12px', height:'30px'}
}
export default Form.create()(PrintPickMlotOrderForm);