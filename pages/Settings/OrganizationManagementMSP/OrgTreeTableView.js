import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';

// Components
import ButtonAction from 'components/ButtonAction';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';

const OrgTreeTableView = props => {
  const { t } = useTranslation();
  const {
    changeModalStatus
  } = props;

  return (
    <>
      <Table responsive striped hover className="table-container">
        <thead>
          <tr>
            <th>#</th>
            <th>
              {/* Site tag / Site */}
              <LinkerWithA
                label={t('f8df07b3d1')}
                className="text-decoration-none"
                onClick={() => {}}
              />
            </th>
            <th>
              {/* Previous site tag */}
              <LinkerWithA
                label={t('53d2eaf15a')}
                className="text-decoration-none"
                onClick={() => {}}
              />
            </th>
            <th>
              {/* Type */}
              <LinkerWithA
                label={t('a1fa277792')}
                className="text-decoration-none"
                onClick={() => {}}
              />
            </th>
            <th className='table-action-th'>
              {/* Actions */}
              <LinkerWithA
                label={t('06df33001c')}
                className="text-decoration-none"
                onClick={() => {}}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>SITE-1</td>
            <td>TAG-1</td>
            <td>Site</td>
            <td className='table-action-td'>
              <ButtonAction
                label="EDIT"
                title="EDIT"
                iconClassName="icon-edit"
                onClick={() => changeModalStatus('editSite', true)}
              />
              <ButtonAction
                label="DELETE"
                title="DELETE"
                iconClassName="icon-trash"
                onClick={() => changeModalStatus('deleteSite', true)}
              />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>TAG-1</td>
            <td></td>
            <td>Site tag</td>
            <td className='table-action-td'>
              <ButtonAction
                label="EDIT"
                title="EDIT"
                iconClassName="icon-edit"
                onClick={() => changeModalStatus('editSiteTag', true)}
              />
              <ButtonAction
                label="DELETE"
                title="DELETE"
                iconClassName="icon-trash"
                onClick={() => changeModalStatus('deleteSiteTag', true)}
              />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>SITE-2</td>
            <td>TAG-2</td>
            <td>Site</td>
            <td className='table-action-td'>
              <ButtonAction
                label="EDIT"
                title="EDIT"
                iconClassName="icon-edit"
                onClick={() => changeModalStatus('editSite', true)}
              />
              <ButtonAction
                label="DELETE"
                title="DELETE"
                iconClassName="icon-trash"
                onClick={() => changeModalStatus('deleteSite', true)}
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

export default OrgTreeTableView;
