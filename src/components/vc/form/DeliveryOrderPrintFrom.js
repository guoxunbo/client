import  React from 'react';
import EntityForm from '@components/framework/form/EntityForm';
import { Form } from 'antd';
import SimpleBarCode from '@components/framework/code/SimpleBarCode';

class DeliveryOrderPrintFrom extends EntityForm {

    static displayName = 'DeliveryOrderPrintFrom';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildForm = () => {
       return this.buildPrintTable();
    }

    buildBarCode = (value) => {
        return (
            <div id="barcode">
                <SimpleBarCode value={value}></SimpleBarCode>
            </div>)
    }

    buildPrintTable = () => {
        let recordData = this.props.recordData;
        let lineId = recordData.lineId;
        return (<div id="printTable">
                    <table width="100%" cellSpacing="0" style={styles.tableLayout}>
                            <tr >
                                <th colSpan = "4" rowSpan = "2" style={styles.tdFontSize}><h2>北京唯捷创芯精测科技有限责任公司发货通知单</h2></th> 
                            </tr>                           
                            <tr>
                                <th colspan = "1" style={styles.tdFontSize}>子单号:</th><th colspan = "3" style={styles.tdFontSize}>{this.buildBarCode(lineId)}</th> 
                            </tr>

                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>&nbsp;</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">&nbsp;</th>
                                <th colSpan = "2" style={styles.tdFontSize}>&nbsp;</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">&nbsp;</th>
                            </tr>
                    </table>
                    <table border="1" width="100%" cellSpacing="0">
                        <tbody>
                           
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>客户名称</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved11}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>业务员  </th> <th colSpan = "2" style={styles.tdFontSize} align ="left">无数据源</th>
                            </tr>
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>Ship-to</th>       <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved15}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>Shipping Date</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.shippingDate}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>Ship-Add</th>     <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved16}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>Customer PO</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved20}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>Contact</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved17}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>INV NO:</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved21}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>Tel</th>   <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved18}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>SO No</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved19}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2" style={styles.tdFontSize}>是否保税</th>   <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved10}</th>
                                <th colSpan = "2" style={styles.tdFontSize}>关务手册号</th> <th colSpan = "2" style={styles.tdFontSize} align ="left">{recordData.reserved9}</th>
                            </tr>
                            <tr> <th colSpan = "8" style={styles.tdFontSize}>物流相关信息</th> </tr>
                            <tr> <th colSpan = "2" style={styles.tdFontSize}>PK类型  </th>   <th colSpan = "6" style={styles.tdFontSize} align ="left"></th></tr>
                            <tr> <th colSpan = "2" style={styles.tdFontSize}>承运人  </th>   <th colSpan = "6" style={styles.tdFontSize} align ="left">{recordData.reserved7}</th></tr>
                            <tr> <th colSpan = "2" style={styles.tdFontSize}>物流信息</th>   <th colSpan = "6" style={styles.tdFontSize} align ="left">{recordData.reserved8}</th></tr>
                            <tr> <th colSpan = "8" style={styles.tdFontSize}>具体要求</th> </tr>
                            <tr> <th colSpan = "2" style={styles.tdFontSize}>PID</th> 
                                 <th style={styles.tdFontSize}>客户产品</th> 
                                 <th style={styles.tdFontSize}>版本</th>
                                 <th style={styles.tdFontSize}>bin 别</th>
                                 <th style={styles.tdFontSize}>数量</th> 
                                 <th style={styles.tdFontSize}>MRB</th> 
                                 <th style={styles.tdFontSize}>remark</th>
                            </tr>
                            <tr> <th colSpan = "2" style={styles.tdFontSize} >{recordData.reserved1}</th> 
                                 <th style={styles.tdFontSize}>{recordData.reserved22}</th> 
                                 <th style={styles.tdFontSize}>{recordData.reserved3}</th> 
                                 <th style={styles.tdFontSize}>{recordData.reserved4}</th> 
                                 <th style={styles.tdFontSize}>{recordData.qty}</th> 
                                 <th style={styles.tdFontSize}>{recordData.reserved5}</th> 
                                 <th style={styles.tdFontSize}>{recordData.reserved6}</th>
                            </tr>  
                        </tbody>
                    </table>
                </div>
        )}
}

const styles = {
    tableLayout:{tableLayout: 'fixed'},
    tdFontSize:{fontSize:'16px', height:'30px', fontWeight:'450'}
}
export default Form.create()(DeliveryOrderPrintFrom);