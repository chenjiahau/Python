import { ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import InputWithIconButton from 'components/InputWithIconButton';
import Button from 'components/Button';
import InlineTitle from 'components/InlineTitle';
import TooltipDialog from 'components/TooltipDialog';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';

const OrgManagementTableToolbarBox = props => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;

  return(
    <div className='d-flex justify-content-between'>
      {/* left */}

      {/* Create organization */}
      <ButtonGroup>
        <Button
          label={t(modalStatus.createOrg.label)}
          disabled={modalStatus.createOrg.disabled}
          onClick={() => changeModalStatus('createOrg', true)}
        ></Button>
      </ButtonGroup>

      {/* right */}
      <InlineTitle isNonUnderline>

        {/* generate */}
        <Button
          label={t(modalStatus.generate.label)}
          disabled={modalStatus.generate.disabled}
          onClick={() => changeModalStatus('generate', true)}
        />

        {/* Download */}
        <Button
          label={t('801ab24683')}
          className='btn-grey'
          onClick={() => {}}
        />

        <TooltipDialog placement='left' title='Click Generate to prepare the file to download. It may take few minutes to generate the file. You will receive an email from the Nuclias Cloud team once the file is ready to download.'></TooltipDialog>

        <DropdownWithAdvancedSearch
          value={''}
          alignEnd={true}
          readOnly
          dataBsToggleOnInput={true}
          dataBsToggleOnButton={true}
          dropdownMenuStyle={{ minWidth: 371 }}
          onChange={e => console.log(e.target.value)}
        >
          <li className="mt-2">
            {/* Organization name */}
            <div className="form-title">{t('05cb2cca01')} :</div>
            <InputWithIconButton
              type="search"
              placeholder={t('13348442cc')}
              buttonClassName="icon-search-enter"
              onChange={e => {}}
              onFocus={e => {}}
              onBlur={e => {}}
              buttonOnClick={e => {}}
            />
          </li>
          <li className="mt-2">
            {/* Site name */}
            <div className="form-title">{t('668445f09d')} :</div>
            <InputWithIconButton
              type="search"
              placeholder={t('13348442cc')}
              buttonClassName="icon-search-enter"
              onChange={e => {}}
              onFocus={e => {}}
              onBlur={e => {}}
              buttonOnClick={e => {}}
            />
          </li>
        </DropdownWithAdvancedSearch>
      </InlineTitle>
    </div>
  )
}

export default OrgManagementTableToolbarBox;
