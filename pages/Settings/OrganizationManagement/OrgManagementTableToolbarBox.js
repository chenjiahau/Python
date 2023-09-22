import { ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import Button from 'components/Button';

const OrgManagementTableToolbarBox = props => {
  const { t } = useTranslation();
  const { modalStatus } = props;

  return (
    <div className='d-flex justify-content-between mb-2'>
      {/* left */}

      {/* Create organization */}
      <ButtonGroup>
        <Button
          label={t(modalStatus.createOrg.label)}
          disabled={modalStatus.createOrg.disabled}
          onClick={() => { }}
        ></Button>
      </ButtonGroup>

    </div>
  )
}

export default OrgManagementTableToolbarBox;
