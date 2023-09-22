import mainStyle from './license.module.scss';

import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import { cloneDeep, orderBy } from 'lodash';

// Const
import { timeFormat } from 'const/nuclias/dateFormat';
import { licenseConfig } from 'const/nuclias/license';

// UI
import ConfirmDeleteModal from 'cloudUi/Modals/ConfirmDeleteModal';

// Component
import { InlineTitle, Icon, ButtonAction, Button } from 'components/';
import AddLicenseModal from './AddLicenseModal';

// Dummy data
import { getLicenseDate, generateLicenseList } from 'dummy/data/license';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default value
const defaultModalStatus = {
  deleteLicense: {
    self: 'deleteLicense',
    status: false,
  },
  addLicense: {
    self: 'addLicense',
    status: false,
  }
};

const License = () => {
  // Faker data
  const fakerUsedLicenseList = generateLicenseList();
  const fakerUnusedLicenseList = generateLicenseList(10, false);

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [period, setPeriod] = useState(new Date());
  const [usedLicenseList, setUsedLicenseList] = useState([]);
  const [unusedLicenseList, setUnusedLicenseList] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    const { startDate, endDate, period } = getLicenseDate(new Date(), 365);
    setStartDate(startDate);
    setEndDate(endDate);
    setPeriod(period);

    setUsedLicenseList(fakerUsedLicenseList);
    setUnusedLicenseList(orderBy(fakerUnusedLicenseList, ['days']));
  }, []);

  if (!startDate || !endDate || !period || usedLicenseList.length === 0) {
    return;
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className="row-block big-block-margin">
          <div className="col-block">
            <div className="form-group mb-2">
              <div className="text-title">LICENSE INFORMATION</div>
            </div>

            {/* License status */}
            <div className="form-group">
              <div className='form-title'>License status</div>
              <div className='form-field'>Active</div>
            </div>

            {/* License start date */}
            <div className="form-group">
              <div className='form-title'>License start date</div>
              <div className='form-field'>{dayjs(startDate).format(timeFormat.yDate)}</div>
            </div>

            {/* License expiration date */}
            <div className="form-group">
              <div className='form-title'>License expiration date</div>
              <div className='form-field'>{dayjs(endDate).format(timeFormat.yDate)} ( {period} days from now )</div>
            </div>
          </div>
        </div>

        <InlineTitle isNonUnderline={true} label='LICENSE TABLE' />

        <Table responsive striped hover className="table-container" id="license-table">
          <thead>
            <tr>
              <th className="th-not-sorting">#</th>
              <th className="th-not-sorting">Status</th>
              <th className="th-not-sorting">Key</th>
              <th className="th-not-sorting table-action-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              usedLicenseList.map((license, index) => {
                return (
                  <tr key={`license-${index}`}>
                    <td>{license.id}</td>
                    <td className={mainStyle['status-td']}>
                      {
                        license.status === licenseConfig.statusTypes.active && (
                          <Icon className={"icon-selected"} />
                        )
                      }
                    </td>
                    <td>{license.key}</td>
                    <td className="table-action-td">
                      {
                        license.status !== licenseConfig.statusTypes.active && (
                          <ButtonAction
                            label="DELETE"
                            title="DELETE"
                            iconClassName="icon-trash"
                            onClick={() => {
                              setSelectedLicense(license);
                              changeModalStatus('deleteLicense', true);
                            }}
                          />
                        )
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>

        <div className="small-block-margin"></div>

        <Button
          label="Add license"
          onClick={() => changeModalStatus(modalStatus.addLicense.self, true)}
        />
      </div >

      <ConfirmDeleteModal
        modalKey={modalStatus.deleteLicense.self}
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        title='Delete license'
        description={`Are you sure to delete license : ${selectedLicense?.key} (${selectedLicense?.days} days) ?`}
        execute={() => { console.log('Write down your execution code') }}
        successCallback={() => changeModalStatus('deleteLicense', false)}
      />

      <AddLicenseModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        unusedLicenseList={unusedLicenseList}
      />
    </>
  );
}

export default License;