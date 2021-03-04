import React, { Component } from 'react';
import { SessionContext } from "@api/Application";
import { withRouter } from 'react-router-dom';
import { Grid } from 'antd-mobile';
import './MobileHome.scss';
import { DefaultRowKey } from '@const/ConstDefine';
import IconUtils from '@utils/IconUtils';
import Authority from '@api/dto/ui/Authority';

@withRouter
export default class MobileHome extends Component {
  static displayName = 'MobileHome';

  constructor(props) {
    super(props);
  }

  handleClick = (authority) => {
    this.props.history.push(authority.path);
  }

  componentDidMount() {
    
  }

  buildGrid = () => {
    let authorities = SessionContext.getAuthorities();
    let gridData = authorities.map((authority, i) => {
     let subAuthorities = authority.subAuthorities;
     let gridDataList = [];
     if (subAuthorities && Array.isArray(subAuthorities)) {
        subAuthorities.forEach((subAuthority, i) => {
          let authorityDto = new Authority(subAuthority, SessionContext.getLanguage());
          let gridData = {
            icon: IconUtils.buildIcon(authorityDto.icon),
            text: authorityDto.name,
            authority: authorityDto
          }
          gridDataList.push(gridData);
      });
     }
     return (<div key={authority[DefaultRowKey]}>
              <div className="sub-title" > {authority.labelZh} </div>
              <Grid data={gridDataList} columnNum={3} onClick={_el => this.handleClick(_el.authority)}/>

            </div>)
    })

    return gridData;
  }

  render() {

    return (<div className="home-page" >
            {this.buildGrid()}
      </div>);
  }
}

