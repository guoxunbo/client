import  React from 'react';
import EntityForm from '@components/framework/form/EntityForm';
import { Form } from 'antd';

class DeliveryOrderPrintFrom extends EntityForm {

    static displayName = 'DeliveryOrderPrintFrom';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildForm = () => {
       return this.buildPrintTable();
    }

    buildPrintTable = () => {
        let recordData = this.props.recordData;
        return (<div id="printTable">
                    <table border="1" width="100%" cellSpacing="0">
                        <tbody>
                            <tr>
                                <th colSpan = "8">京测工厂发货通知单</th> 
                            </tr>                           
                            <tr>
                                <th colSpan = "8">xxx</th> 
                            </tr>
                            <tr>
                                <th colSpan = "2">客户名称</th> <th colSpan = "2">{recordData.reserved11}</th>
                                <th colSpan = "2">业务员  </th> <th colSpan = "2">暂无数据</th>
                            </tr>
                            <tr>
                                <th colSpan = "2">Ship-to</th>       <th colSpan = "2">{recordData.reserved15}</th>
                                <th colSpan = "2">Shipping Date</th> <th colSpan = "2">{recordData.shippingDate}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2">Ship-Add</th>     <th colSpan = "2">{recordData.reserved16}</th>
                                <th colSpan = "2">Customer PO</th> <th colSpan = "2">{recordData.reserved20}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2">Contact</th> <th colSpan = "2">{recordData.reserved17}</th>
                                <th colSpan = "2">INV NO:</th> <th colSpan = "2">{recordData.reserved21}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2">Tel</th>   <th colSpan = "2">{recordData.reserved18}</th>
                                <th colSpan = "2">SO No</th> <th colSpan = "2">{recordData.reserved19}</th>
                            </tr>
                            <tr>
                                <th colSpan = "2">是否保税</th>   <th colSpan = "2">{recordData.reserved10}</th>
                                <th colSpan = "2">关务手册号</th> <th colSpan = "2">{recordData.reserved9}</th>
                            </tr>
                            <tr> <th colSpan = "8">物流相关信息</th> </tr>
                            <tr> <th colSpan = "2" >承运人  </th>   <th colSpan = "6">{recordData.reserved7}</th></tr>
                            <tr> <th colSpan = "2" >物流信息</th>   <th colSpan = "6">{recordData.reserved8}</th></tr>
                            <tr> <th colSpan = "8">具体要求</th> </tr>
                            <tr> <th colSpan = "2">PID</th> 
                                 <th>客户产品</th> 
                                 <th>版本</th>
                                 <th>bin 别</th>
                                 <th>数量</th> 
                                 <th>MRB</th> 
                                 <th>remark</th>
                            </tr>
                            <tr> <th colSpan = "2">{recordData.reserved1}</th> 
                                 <th>{recordData.reserved2}</th> 
                                 <th>{recordData.reserved2}</th> 
                                 <th>{recordData.reserved4}</th> 
                                 <th>{recordData.qty}</th> 
                                 <th>{recordData.reserved5}</th> 
                                 <th>{recordData.reserved6}</th>
                            </tr>  
                        </tbody>
                    </table>
                </div>
        )}
}
export default Form.create()(DeliveryOrderPrintFrom);