import React, { Component } from 'react';
import '../../properties.scss'

import EntityListTable from '../../../../components/Table/EntityListTable';
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import { BackTop, Divider } from 'antd';
import WrappedAdvancedQueryForm from '../../../../components/Form/QueryForm';
import { DefaultRowKey } from '../../../../api/const/ConstDefine';

/**
 * 系统最基层的页面表单。
 */
export default class EntityProperties extends Component {
  
    static displayName = 'EntityProperties';

    constructor(props) {
      super(props);
      let tableRrn = this.props.tableRrn;
      if (!tableRrn) {
        tableRrn = this.props.match.params.tableRrn;
      }
      this.state = {
        tableRrn : tableRrn,
        tableData: [],
        table: {fields: []},
        loading: true,
        selectedRowKeys:[],
        selectedRows:[],
        rowKey: DefaultRowKey,
          // 不是从菜单上指定properties此处会没值。
        parameters: this.props.match ? this.props.match.params : {}
      };
    }

    componentDidMount =() => {
      this.getTableData();
    }

    getTableData = () => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            table: responseBody.table,
            loading: false
          }); 
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    getWareHouseId = (dataList) => {
        dataList.forEach(data => {
            let warehouseRrn = data.reserved13;
            if(warehouseRrn){
              if(warehouseRrn == "8142"){
                data.reserved13 = "上海仓库";
              } else if(warehouseRrn == "8143"){
                data.reserved13 = "浙江仓库";
              } else if(warehouseRrn == "8150"){
                data.reserved13 = "香港仓库";
              } else if(warehouseRrn == "8151"){
                data.reserved13 = "保税仓库";
              } else if(warehouseRrn == "8152"){
                data.reserved13 = "湖南仓库";
              } else if(warehouseRrn == "8153"){
                data.reserved13 = "格科微电子仓库";
              } else if(warehouseRrn == "8247"){
                data.reserved13 = "备件仓库";
              }
            }
        });
    }
    afterQuery = (responseBody, whereClause) => {
        this.setState({
          tableData: responseBody.dataList,
          loading: false,
          whereClause: whereClause
        });
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.afterQuery(responseBody, whereClause);
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    handleSearch = (whereClause) => {
      this.setState({
        loading: true,
        resetFlag: false
      });
      this.queryData(whereClause);
    }

    resetReferenceData = (data, fileName) =>{
      debugger;
      if(!data || data.length == 0 || fileName == null){
        return;
      }
      let queryFields = this.form.state.queryFields;
      if (queryFields && Array.isArray(queryFields)) {
       let targetIndex = -1;
       queryFields.map((queryField, index) => {
           if (queryField.name == fileName) {
            targetIndex = index;
           }
       });
       if(targetIndex == -1){
        return;
       }

       let referenceField = this.form.state.queryFields[targetIndex];
       let referenceNode = referenceField.node;
       if((!data || data.length == 0) && referenceNode != undefined){
          referenceNode.queryData();
          return;
       }

       let referenceList = [];
       let referenceData = [];
       data.forEach((d,index) => {
        let value = d[referenceField.name];
        if(value == undefined || value == null || value == ""){
        } else {
          if(referenceList.indexOf(value) == -1){
            referenceList.push(value);
          }
        }
       });

       referenceList.forEach((d,index) => {
           let refObject = {};
           refObject.key = d;
           refObject.value = d;
           referenceData.push(refObject);
       })
       referenceNode.setState({data:referenceData});
     } 
 }

    resetData = () => {
      
    }
    
    buildTable = () => {
      return  <EntityListTable rowKey={this.state.rowKey} 
                                selectedRowKeys={this.state.selectedRowKeys} 
                                selectedRows={this.state.selectedRows} 
                                table={this.state.table} 
                                data={this.state.tableData} 
                                loading={this.state.loading}
                                whereClause= {this.state.whereClause}
                                />
  }

    /**
     * 当页面不止是表格和queryForm的时候，可以继承该方法继续实现
     */
    buildOtherComponent = () => {

    }

    render() {
      let showQueryFormButton = this.state.showQueryFormButton;
      if (showQueryFormButton === undefined) {
          showQueryFormButton = true;
      }
      return (
        <div className="properties-page">
          <div className="router-body">
            <WrappedAdvancedQueryForm showButton={showQueryFormButton} 
                                      searchTxt={this.state.searchTxt} handleReset={this.resetData.bind(this)} 
                                      wrappedComponentRef={(form) => this.form = form} 
                                      tableRrn={this.state.tableRrn} onSearch={this.handleSearch.bind(this)} />
            {showQueryFormButton ? <Divider/> : ""}                      
            {this.buildTable()}
            {this.buildOtherComponent()}
          </div>
          <BackTop visibilityHeight={300}/>
        </div>
      );
    }
}
