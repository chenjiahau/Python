import locationInfoStyle from '../location-info.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';

// Components
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from 'components/';

// Dummy Data & util
import { sorting } from 'dummy/utils/sorting';

const SiteTable = (props) => {
  const { siteList, setSiteList } = props;

  return (
    <Table responsive hover className='table-sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>
            <LinkerWithA
              label='Recipient'
              className='text-decoration-none'
              onClick={e => sorting(e, siteList, 'title', setSiteList)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {
          siteList.map((site, index) => {
            return (
              <tr key={nanoid()}>
                <td>{index + 1}</td>
                <td>
                  <span>{site.title}</span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

const SiteModal = (props) => {
  const {
    modalStatus,
    changeModalStatus,
    siteList: parentSiteList
  } = props;

  const { t } = useTranslation();

  // State
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    setSiteList(cloneDeep(parentSiteList));
  }, [parentSiteList]);

  if (!siteList) {
    return;
  }

  return (
    <div className=''>
      <ModalContainer
        modalWidthType='modal-550px'
        openModal={modalStatus.moreSite.status}
        closeModal={() => changeModalStatus('moreSite', false)}
      >
        <div className='header'>
          <div className={locationInfoStyle['modal-title']}>
            Current care recipient
          </div>
        </div>
        <div className='body'>
          <SiteTable siteList={siteList} setSiteList={setSiteList} />
          <div className='d-flex justify-content-end'>
            <PaginationContainer
              total={10}
              onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
              onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default SiteModal;
