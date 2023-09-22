import mainStyle from './external-email-alert-settings.module.scss';

import { useTranslation } from 'react-i18next';
import { ButtonGroup } from 'react-bootstrap';

// Components
import { Button, InputWithIcon } from 'components';

const EmailAlertSettingsMspOrgToolBarBox = props => {
  const { changeModalStatus } = props;
  const { t } = useTranslation();

  return (
    <div className='d-flex justify-content-between mb-1'>
      <ButtonGroup>
        {/* Add user */}
        <Button
          label={t('3846c46b9e')}
          onClick={() => changeModalStatus('addUser', true)}
        ></Button>

        {/* Delete */}
        <Button
          label={t('f2a6c498fb')}
          disabled = {false}
          onClick={() => changeModalStatus('delete', true)}
        ></Button>
      </ButtonGroup>

      {/* Search */}
      <InputWithIcon
        type='Search'
        iconPosition='left'
        placeholder={t('13348442cc')}
        value={''}
        onChange={e => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        iconClassName='icon-search'
        iconOnClick={() => {}}
      />
    </div>
  )
}

export default EmailAlertSettingsMspOrgToolBarBox;
