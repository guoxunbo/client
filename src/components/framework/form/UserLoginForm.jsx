
import  React, { Component } from 'react';

import { Form, Input, Row, Col,Button} from 'antd';
import IconUtils from '@api/utils/IconUtils';
import LanguageField from '@components/framework/field/LanguageField';
import OrgField from '@components/framework/field/OrgField';
import I18NUtils from '@api/utils/I18NUtils';
import {i18NCode} from '@api/const/i18n';
import UserManagerRequest from '@api/user-manager/UserManagerRequest';

const FormItem = Form.Item;

class UserLoginForm extends Component {

    static displayName = 'UserLoginForm';

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            language: "Chinese",
            org: "1",
            checkbox: false,
        };
    }

    handleLogin = () => {
        let self = this;
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let object = {
                user: values,
                success: function(responseBody) {
                  self.props.handleOk(responseBody, values.org, values.language)
                }
            }
            UserManagerRequest.sendLoginRequest(object);
        });
    }

    buildLoginForm = () => {
        const {getFieldDecorator} = this.props.form;    
        return (
         <Form onSubmit={this.handleLogin}>
            <div style={styles.formItems}>
              <Row>
                <Col>
                  <FormItem>
                    {getFieldDecorator('username',{
                        initialValue:this.state.username,
                        rules: [{
                            required: true
                        }]
                    })(
                        <Input prefix={IconUtils.buildIcon("icon-renyuan")} maxLength={20} />
                      )}
                  </FormItem>
                </Col>
              </Row>
    
              <Row>
                <Col>
                  <FormItem>
                      {getFieldDecorator('password',{
                            initialValue:this.state.password,
                            rules: [{
                                required: true
                            }]
                        })(
                          <Input prefix={IconUtils.buildIcon("lock")}  type="password" />
                        )}
                  </FormItem>
                </Col>
              </Row>
              <Row >
                <Col>
                  {IconUtils.buildIcon("icon-location", "", styles.selectIcon)}
                  <FormItem>
                      {getFieldDecorator('org',{
                            initialValue:this.state.org,
                            rules: [{
                                required: true
                            }]
                        })(
                          <OrgField initialValue={this.state.org} style={styles.formSelect} />
                        )}
                  </FormItem>
                </Col>
              </Row>
    
              <Row >
                <Col>
                  {IconUtils.buildIcon("icon-language", "", styles.selectIcon)}
                  <FormItem>
                      {getFieldDecorator('language', {
                          initialValue:this.state.language,
                          rules: [{
                            required: true
                          }]
                        })(
                          <LanguageField initialValue={this.state.language} style={styles.formSelect}/>
                        )}
                  </FormItem>
                </Col>
              </Row>           
              <Row >
                <Button type="primary" style={styles.submitBtn} onClick={this.handleLogin}>
                  {I18NUtils.getClientMessage(i18NCode.Login)}
                </Button>
              </Row>
{/*     
              <Row className="tips" style={styles.tips}>
                <a href="/" style={styles.link}>
                    {I18NUtils.getClientMessage(i18NCode.Register)}
                </a>
                <span style={styles.line}>|</span>
                <a href="/" style={styles.link}>
                    {I18NUtils.getClientMessage(i18NCode.ForgetPwd)}
                </a>
              </Row>      */}
            </div>
            
         </Form> 
        )
    }

    render() {
        return (
            <div>
                {this.buildLoginForm()}
            </div>
        )
    }

}
const styles = {
    formSelect: {
      marginLeft: "20px",
      width: "90%"
    },
    selectIcon: {
      position: 'absolute',
      left: '-4px',
      top: '5px',
      color: '#999',
    },
  
    submitBtn: {
      width: '240px',
      background: '#3080fe',
      borderRadius: '28px',
    },
    tips: {
      textAlign: 'center',
    },
    link: {
      color: '#999',
      textDecoration: 'none',
      fontSize: '13px',
    },
    line: {
      color: '#dcd6d6',
      margin: '0 8px',
    },
  };
export default Form.create({ name: 'login-form' })(UserLoginForm);