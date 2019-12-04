import React, { Component } from 'react';

import { BackTop, Layout, Slider, Menu, Icon, Breadcrumb, Tree } from 'antd';
import { DefaultRowKey } from '@api/const/ConstDefine';
import TreeManagerRequest from '../../../api/framework/tree-manager/TreeManagerRequest';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TreeNode } = Tree;

/**
 *  左右树结构的页面
 */
export default class EntityTreeProperties extends Component {
  
    static displayName = 'EntityTreeProperties';

    constructor(props) {
      super(props);
      this.state = {
        treeData: [],
      };
    }

    /**
     * 加载第一层的树数据
     */
    loadFirstLayer = () => {
        let treeData = this.state.treeData;
        let self = this;
        let group = "EquipmentRecipe";
        let requestObj = {
          group: group,
          success: function(responseBody) {
            let treeNodes = responseBody.treeNodes;
            treeNodes.forEach((treeNode) => {
              treeNode.childrenList.forEach((d) => {
                treeData.push({
                  title: d.value,
                  key: d.key,
                  node: treeNode.node,
                  object: d
                })
              });
            });
            self.setState({treeData: treeData})
          }
        }
        TreeManagerRequest.sendLoadTreeRequest(requestObj);
    }

    componentDidMount =() => {
      this.loadFirstLayer();
    }

    onLoadData = (treeNode) => {
      
      treeNode.props.dataRef.children = [
        { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
        { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
      ];
      this.setState({
        treeData: [...this.state.treeData],
      });
    }

    onLoadData = treeNode =>
      new Promise(resolve => {
        debugger;
        let object = {
          currentObject: treeNode.props.object,
          currentNode: treeNode.props.node,
          success: function(responseBody) {
            console.log(responseBody);
            resolve();
          }
        };
        TreeManagerRequest.sendLoadNextNodeRequest(object);
        // setTimeout(() => {
        //   treeNode.props.dataRef.children = [
        //     { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
        //     { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        //   ];
        //   this.setState({
        //     treeData: [...this.state.treeData],
        //   });
        //   resolve();
        // }, 1000);
    });
    
    renderTreeNodes = data =>
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode icon={<Icon type="smile-o" />} title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
      return <TreeNode icon={<Icon type="smile-o" />} key={item.key} {...item} dataRef={item} />;
    });

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };


    render() {
      return (
        <div className="properties-page">
          <div className="router-body">
          <Layout>
            <Sider theme={"light"} collapsedWidth={0} trigger={null} collapsible collapsed={this.state.collapsed} >
            <Tree loadData={this.onLoadData} >{this.renderTreeNodes(this.state.treeData)}</Tree>
              {/* <Tree showIcon  switcherIcon={<Icon type="down" />} onExpand={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree> */}
            </Sider>
          <Layout>
          <Content style={{ margin: '0 16px' }}>
          <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
        </Layout>
      </Layout>
          </div>
          <BackTop visibilityHeight={300}/>
        </div>
      );
    }
}
