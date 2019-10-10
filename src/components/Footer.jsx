import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import Logo from './logo/components/Logo';
import {Application} from '@api/Application'

import styles from './index.module.scss';
export default class Footer extends PureComponent {
  render() {
    return (
      <Layout.Footer className={styles.footer} type={null}>
       <div className={styles.body}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.copyright}>
            <a
              href={Application.copyright.url}
              target="_blank"
              className={styles.copyrightLink}
              rel="noopener noreferrer"
            >
              {Application.version} {Application.copyright.name} 
            </a>
          </div>
        </div>
      </Layout.Footer>
    );
  }
}
