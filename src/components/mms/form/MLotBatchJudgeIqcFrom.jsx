import React, { Component } from 'react';
import { Form, Input, Row, Col, Tabs } from 'antd';
import * as PropTypes from 'prop-types';
import Field from '@api/dto/ui/Field';
import Tab from '@api/dto/ui/Tab';
import {TabType} from '@api/dto/ui/Tab';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import { DefaultRowKey, SqlType } from '@api/const/ConstDefine';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import EntityForm from '@components/framework/form/EntityForm';
import EditorTable from '@components/framework/table/EditorTable'

const TabPane = Tabs.TabPane;

export default class MLotBatchJudgeIqcFrom extends EntityForm {

    static displayName = 'MLotBatchJudgeIqcFrom';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTabs = () => {
        const {entityViewFlag, table} = this.state;
        const tabs = table.tabs;
        if(tabs.length == 1){
            return this.buildTab(new Tab(tabs[0]), this.props.materialLotQcObject, entityViewFlag)
        }
    }


    buildTab = (tabPanel, parentObject, entityViewFlag) =>{
        let whereClause = SqlType.NoResultCondition;
        if (tabPanel.whereClause && parentObject) {
            whereClause = tabPanel.whereClause.format(parentObject);
        }
        return <EditorTable ref={(entityFormTable) => this.editorTable = entityFormTable }
                            wrappedComponentRef={(table) => this.wrappedComponentEditorTable  = table}
                            parentObject={parentObject} 
                            editFlag={tabPanel.editFlag} 
                            entityViewFlag={entityViewFlag} 
                            refTableName={tabPanel.refTableName} 
                            whereClause={whereClause} 
                            key={tabPanel.name} />
    }

}
const WrappedMLotBatchJudgeIqcFrom = Form.create()(MLotBatchJudgeIqcFrom);
export {WrappedMLotBatchJudgeIqcFrom};