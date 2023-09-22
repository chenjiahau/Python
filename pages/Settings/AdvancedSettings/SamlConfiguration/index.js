import samlConfigurationStyle from './saml-configuration.module.scss';

import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import TrustedIdentityProvider from './TrustedIdentityProvider';
import SamlRoles from './SamlRoles';

// Components
import Hr from '../../../../components/Hr';
import Breadcrumb from '../../../../components/Breadcrumb';
import RadioButton from '../../../../components/RadioButton';
import InlineTitle from '../../../../components/InlineTitle';
import MessageBoxGroup from '../../../../components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Advanced settings', isLink: false },
  { label: 'SAML configuration', isLink: false },
];

const SamlConfiguration = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [enableMode, setEnableMode] = useState('disable');

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        {/* SAML CONFIGURATION */}
        <div>
          <InlineTitle label="SAML CONFIGURATION" isNonUnderline />
          <Row className={`${samlConfigurationStyle['enable-btn-group']} mt-3`}>
            <Col sm={2} md={2} xl={1} className="form-title">
              SAML SSO
            </Col>
            <Col sm={10} md={10} xl={11} style={{ display: 'flex' }}>
              <div className="me-3">
                <RadioButton
                  id="Enable"
                  name="Enable"
                  label="Enable"
                  checked={enableMode === 'enable'}
                  onChange={() => setEnableMode('enable')}
                />
              </div>
              <div>
                <RadioButton
                  id="Disable"
                  name="Disable"
                  label="Disable"
                  checked={enableMode === 'disable'}
                  onChange={() => setEnableMode('disable')}
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Mask Start */}
        <div className={`${enableMode === 'disable' ? samlConfigurationStyle['mask'] : ''}`}>
          <div className="mb-5">
            <Row className={`${samlConfigurationStyle['enable-btn-group']} mt-3`}>
              <Col sm={2} md={2} xl={1} className="form-title">
                Entity ID
              </Col>
              <Col sm={10} md={10} xl={11}>
                100849.sp.saml.nuclias.com
              </Col>
            </Row>
            <Row className={`${samlConfigurationStyle['enable-btn-group']} mt-3`}>
              <Col sm={2} md={2} xl={1} className="form-title">
                URL
              </Col>
              <Col sm={10} md={10} xl={11}>
                https://nttrd.nuclias.com/oauth/100849/samlLogin
              </Col>
            </Row>
          </div>

          <Hr className="mb-4" />

          {/* TRUSTED IDENTITY PROVIDER ( IDP ) */}
          <TrustedIdentityProvider />

          <Hr className="mb-4" />

          {/* SAML ROLES */}
          <SamlRoles />
        </div>
        {/* Mask End */}
      </div>
    </>
  );
};

export default SamlConfiguration;
