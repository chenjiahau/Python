import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';
import MessageBoxGroup from 'components/MessageBoxGroup';
import Icon from 'components/Icon';

// img
import orgDefaultImg from '../../../../assets/img/v2/icon/icon_org_default.png';

const defaultMessages = {
  success: '',
  error: '',
  warning: ''
};

const OrgTreePreviewOrg = props => {
  const { modalStatus, changeModalStatus } = props;
  const [multiMessages, setMultiMessages] = useState( cloneDeep(defaultMessages));
  const { t } = useTranslation();

  return (
    <ModalContainer
      modalWidthType='modal-400px'
      openModal={modalStatus.previewOrg.status}
      hideClose={true}
    >
      <div className='header d-flex justify-content-between'>
        <div className='title'>{t(modalStatus.previewOrg.label) + '-' + 'ORG-1'}</div>
        <div className='d-flex' style={{gap: '5px'}}>
          <Icon
            style={{width: '19px', height: '19px'}}
            className="icon-site"
            onClick={() => {
              changeModalStatus('previewOrg', false);
              changeModalStatus('createSite', true);
            }}
          />
          <Icon
            style={{width: '19px', height: '19px'}}
            className="icon-tag"
            onClick={() => {
              changeModalStatus('previewOrg', false);
              changeModalStatus('createSiteTag', true);
            }}
          />
          <Icon
            style={{width: '19px', height: '19px'}}
            className="icon-edit"
            onClick={() => {
              changeModalStatus('previewOrg', false);
              changeModalStatus('editOrg', true);
            }}
          />
          <Icon
            style={{width: '19px', height: '19px'}}
            className="icon-trash"
            onClick={() => {
              changeModalStatus('previewOrg', false);
              changeModalStatus('deleteOrg', true);
            }}
          />
        </div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({...multiMessages, [type]: null})}
        />
        <div>
          <div className='mb-3'>
            <img
              style={{maxWidth: '100px', maxHeight: '60px', cursor: 'pointer'}}
              src={orgDefaultImg}
              alt=''
            />
          </div>
          <table>
            <tbody>
              <tr>
                <td colSpan="3"><br/><strong>Contact information</strong></td>
              </tr>
              <tr>
                <td style={{minWidth: '50px'}}>Name</td>
                <td>:</td>
                <td className='ps-2'>Wesley-ORG1</td>
              </tr>
              <tr>
                <td style={{minWidth: '50px'}}>Phone</td>
                <td>:</td>
                <td className='ps-2'></td>
              </tr>
              <tr>
                <td style={{minWidth: '50px'}}>Email</td>
                <td>:</td>
                <td className='ps-2'></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='footer non-border-top-footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus('previewOrg', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default OrgTreePreviewOrg;
