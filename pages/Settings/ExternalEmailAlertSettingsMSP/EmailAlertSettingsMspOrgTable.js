import mainStyle from './external-email-alert-settings.module.scss';

// Packages
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import {
  LinkerWithA,
  Checkbox,
  PaginationContainer,
  TooltipDialogFixed
} from 'components';

const EmailAlertSettingsMspOrgTable = props => {
  const { changeModalStatus } = props;
  const { t } = useTranslation();

  return (
    <div className={mainStyle['table-container-group']}>
      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>
              <Checkbox
                id='rl-th-cb1'
                type='checkbox'
                checked={false}
                onChange={() => {}}
              />
            </th>
            <th>#</th>
            <th>
              <LinkerWithA
                label='Name'
                className='text-decoration-none'
                onClick={() => {}}
              />
            </th>
            <th>
              <LinkerWithA
                label='Email'
                className='text-decoration-none'
                onClick={() => {}}
              />
            </th>
            <th>
              <LinkerWithA
                label='Managed site'
                className='text-decoration-none'
                onClick={() => {}}
              />
            </th>
            <th>
              <LinkerWithA
                label='Status'
                className='text-decoration-none'
                onClick={() => {}}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox
                id='rl-cb1'
                type='checkbox'
                checked={false}
                onChange={() => {}}
              />
            </td>
            <td>1</td>
            <td>D-Link</td>
            <td>dlink@dlinkcorp.com</td>
            <td>
                <TooltipDialogFixed
                  hideIcon={true}
                  placement="right"
                  tooltipsTitle="3"
                  title={
                    ReactDOMServer.renderToString(
                      <>
                        <div className='pb-1'>Site 1</div>
                        <div className='pb-1'>Site 2</div>
                        <div className='pb-1'>Site 3</div>
                      </>
                    )
                  }
                />
            </td>
            <td>{t('3f68e67dc6')}</td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id='rl-cb3'
                checked={false}
                onChange={() => {}}
              />
            </td>
            <td>2</td>
            <td>Bizcloud</td>
            <td>bizcloud@dlinkcorp.com</td>
            <td><span>-</span></td>
            <td>
              {/* Unverified */}
              <span className='table-unverified-link' onClick={() => changeModalStatus('resend', true)}>{t('d5ca088299')}</span>
            </td>
          </tr>
        </tbody>
      </Table>

      <PaginationContainer
        total={7}
        onPageChange={currentPageNum => console.log('onPageChange', currentPageNum) }
        onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum) }
      />
    </div>
  )
}

export default EmailAlertSettingsMspOrgTable;
