import licenseHistoryStyle from './license-history.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import Breadcrumb from '../../../../components/Breadcrumb';
import InlineTitle from '../../../../components/InlineTitle';
import LinkerWithA from '../../../../components/LinkerWithA';
import InputWithIcon from '../../../../components/InputWithIcon';
import ModalContainer from '../../../../components/ModalContainer';
import PaginationContainer from '../../../../components/PaginationContainer';
import DropdownWithTimeframe from '../../../../components/DropdownWithTimeframe';

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'License management', isLink: true, path: '/cloud/settings/license-management' },
  { label: 'History', isLink: false },
];

const LicenseHistory = () => {
  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  // modal
  const [isOpenGenerateModal, setOpenGenerateModal] = useState(false);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <InlineTitle isNonUnderline>
          <span className="form-title">Time frame : </span>
          <DropdownWithTimeframe
            customTimeFrameDay={'365'}
            alignEnd={true}
            onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-', selectedTimeframe)}
          />

          <InputWithIcon
            type="search"
            placeholder="License key"
            iconPosition="left"
            iconClassName="icon-search"
            onChange={e => {
              console.log(e.target.value);
            }}
          />

          <Button
            label="Download"
            className="btn-grey"
            onClick={() => {
              console.log('Click on download');
            }}
          />
        </InlineTitle>

        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="License key"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA label="Term" className="text-decoration-none" onClick={sorting} />
              </th>
              <th>
                <LinkerWithA
                  label="Claimed at"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Organization"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Organization ID"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Model name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>12345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>22345678gtdooua</td>
              <td>3 Days</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-10P</td>
            </tr>
            <tr>
              <td>3</td>
              <td>32345678gtdooua</td>
              <td>3 Days</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-10P</td>
            </tr>
            <tr>
              <td>4</td>
              <td>42345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-28P</td>
            </tr>
            <tr>
              <td>5</td>
              <td>52345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-10P</td>
            </tr>
            <tr>
              <td>6</td>
              <td>62345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-10P</td>
            </tr>
            <tr>
              <td>7</td>
              <td>72345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-28P</td>
            </tr>
            <tr>
              <td>8</td>
              <td>82345678gtdooua</td>
              <td>1 Year</td>
              <td>2022/12/12 03:04:26</td>
              <td>Starbucks</td>
              <td>200002</td>
              <td>DBS-2000-28P</td>
            </tr>
          </tbody>
        </Table>

        <PaginationContainer
          total={8}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />

        {/* Generate modal */}
        <ModalContainer
          modalWidthType="modal-500px"
          openModal={isOpenGenerateModal}
          closeModal={() => setOpenGenerateModal(false)}
        >
          <div className="header">
            <div className="title">Generate expired licenses list</div>
          </div>
          <div className="body">
            <div className="mb-1">Do you want to generate the expired licenses list?</div>
            <div className="mb-1">
              You will receive an email to inform you the expired licenses list is ready for
              download after few minutes.
            </div>
          </div>
          <div className="footer">
            <Button
              label="Cancel"
              className="btn-cancel"
              onClick={() => setOpenGenerateModal(false)}
            />
            <Button
              label="Yes"
              className="btn-submit"
              onClick={() => {
                console.log('Click on generate');
                setOpenGenerateModal(false);
              }}
            />
          </div>
        </ModalContainer>
      </div>
    </>
  );
};

export default LicenseHistory;
