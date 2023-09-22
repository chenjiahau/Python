import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';
import mainStyle from './org-management.module.scss';

// Components
import ButtonAction from 'components/ButtonAction';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';
import TooltipDialogFixed from 'components/TooltipDialogFixed';
import Icon from 'components/Icon';
import LinkerWithRoute from 'components/LinkerWithRoute';

const getSiteContent = () => {
  const siteData = [
    {
      id: 0,
      status: true,
      siteName: 'Site 111111111111',
      device: { ap: 1, sw: 1, gw: 0 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 1, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 0 }
    },
    {
      id: 1,
      status: true,
      siteName: 'Site 2',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 }
    },
  ];
  return (
    <Table hover className={mainStyle['site-table-tooltips-container']}>
      <thead>
        <tr>
          <th className='px-2'>#</th>
          <th className='px-2'>Status</th>
          <th className='px-2'>Site</th>
          <th className='px-2'>Device</th>
          <th className='px-2'>Access point</th>
          <th className='px-2'>Switch</th>
          <th className='px-2'>Gateway</th>
        </tr>
      </thead>
      <tbody>
        {siteData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td><Icon className='icon-selected-red' /></td>
            <td>
              <div>{item.siteName}</div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{item.device.ap}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{item.device.sw}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{item.device.gw}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{item.ap.online}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{item.ap.offline}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{item.ap.dormant}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{item.sw.online}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{item.sw.offline}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{item.sw.dormant}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{item.gw.online}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{item.gw.offline}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{item.gw.dormant}</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const OrgManagementTable = props => {
  const { t } = useTranslation();
  const { changeModalStatus } = props;

  return (
    <>
      <Table responsive striped hover className={`table-container ${mainStyle['org-table-container']}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>
              {/* Organization */}
              <LinkerWithA
                label={t('c1ca926603')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Type */}
              <LinkerWithA
                label={t('a1fa277792')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Site */}
              <LinkerWithA
                label={t('a7d6475ec8')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Site tag */}
              <LinkerWithA
                label={t('3039a00fca')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Device */}
              <LinkerWithA
                label={t('e0ac20adce')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Access points */}
              <LinkerWithA
                label={t('49757fe172')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Switches */}
              <LinkerWithA
                label={t('0052efad5d')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Gateways */}
              <LinkerWithA
                label={t('a0ea006dc2')}
                className="text-decoration-none"
                onClick={() => { }}
              />
            </th>
            <th>
              {/* Actions */}
              <LinkerWithA
                label={t('06df33001c')}
                className="text-decoration-none table-action-th"
                onClick={() => { }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <LinkerWithRoute
                label="ORG-1"
                to={'111111'}
                onClick={() => { }}
              />
            </td>
            <td>ORG</td>
            <td>
              <TooltipDialogFixed
                placement="top"
                title={ReactDOMServer.renderToString(getSiteContent())}
                hideIcon={true}
                tooltipsTitle={'1'}
              />
            </td>
            <td>3</td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{1}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{0}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{1}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{1}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{1}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{0}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{0}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{1}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{2}</div>
              </div>
            </td>
            <td>
              <div className={mainStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={mainStyle['device-count']}>{2}</div>
                <Icon className={'icon-round offline'} />
                <div className={mainStyle['device-count']}>{0}</div>
                <Icon className={'icon-round dormant'} />
                <div className={mainStyle['device-count']}>{1}</div>
              </div>
            </td>
            <td className='table-action-td'>
              <ButtonAction
                label="EDIT"
                title="EDIT"
                iconClassName="icon-edit"
                onClick={() => changeModalStatus('editOrg', true)}
              />
              <ButtonAction
                label="CREATE SITE"
                title="CREATE SITE"
                iconClassName="icon-site"
                onClick={() => changeModalStatus('createSite', true)}
              />
              <ButtonAction
                label="CREATE SITE TAG"
                title="CREATE SITE TAG"
                iconClassName="icon-tag"
                onClick={() => changeModalStatus('createSiteTag', true)}
              />
              <ButtonAction
                label="INVITE USER"
                title="INVITE USER"
                iconClassName="icon-user"
                onClick={() => changeModalStatus('inviteUserORG', true)}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <PaginationContainer
        total={8}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />
    </>
  );
};

export default OrgManagementTable;
