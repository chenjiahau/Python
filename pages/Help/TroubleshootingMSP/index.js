import mainStyle from './troubleshooting.module.scss';

import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from 'components/Breadcrumb';
import InlineTitle from 'components/InlineTitle';
import RadioButton from 'components/RadioButton'
import TooltipDialog from 'components/TooltipDialog'

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Help', isLink: false }, // Help
  { label: 'Troubleshooting', isLink: false } // Bulk import devices
];

const TroubleshootingMSP = () => {
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [enableMode, setEnableMode] = useState('disable');

  useEffect(() => {

  }, [])

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['bulk-import-devices-container']}`}>

        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <Card>
          <Card.Body>
            {/* CONTACT US */}
            <InlineTitle label={t('231cf4c70d')} isShortUnderline />

            <Container style={{ margin: 0, padding: 0 }} className='mb-5'>
              <Row lg={12}>
                <Col xl={12} lg={12}>
                  <div>
                    <div className='form-group'>
                      <div className='form-title'>Allow Nuclias support
                        <TooltipDialog
                          className="ms-2"
                          placement="right"
                          title="When enabled, the Nuclias support team will be able to access this organization and its sites. You will need to enable this setting in order to receive assistance."
                        ></TooltipDialog>
                      </div>
                      <div className='form-field' style={{ display: 'flex' }}>
                        <div className="me-4">
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
                      </div>
                    </div>
                    {enableMode === 'enable' &&
                      <div className='form-group'>
                        <div className='form-field'>
                          <div className={mainStyle['pin-Code']}>
                            PIN code : tjjneagdirlp
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default TroubleshootingMSP;

