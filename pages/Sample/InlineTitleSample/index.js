import { Col, Row } from 'react-bootstrap';

import Button from 'components/Button';
import InlineTitle from 'components/InlineTitle';
import DropdownWithTimeframe from 'components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import DropdownWithItem from 'components/DropdownWithItem';
import InputWithIconButton from 'components/InputWithIconButton';
import TooltipDialog from 'components/TooltipDialog';
import LinkerWithA from 'components/LinkerWithA';

const dropdownStatusList = [
  { title: 'All', isActive: true },
  { title: 'Online', isActive: false },
  { title: 'Offline', isActive: false },
  { title: 'Dormant', isActive: false },
];

const fakeOrgList = [
  { title: 'org-1' },
  { title: 'org-2' },
  { title: 'org-3' },
  { title: 'org-4' },
  { title: 'org-5' },
];

const dropdownModelNameList = [
  { title: 'All', isActive: true },
  { title: 'DBA-1210P', isActive: false },
  { title: 'DBA-1510P', isActive: false },
  { title: 'DBA-1520P', isActive: false },
  { title: 'DBA-2520P', isActive: false },
  { title: 'DBA-2720P', isActive: false },
  { title: 'DBA-2820P', isActive: false },
  { title: 'DBA-3621P', isActive: false },
  { title: 'DBA-X1230P', isActive: false },
  { title: 'DBS-2000', isActive: false },
  { title: 'DBG-2000', isActive: false },
  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },
];

const InlineTitleSample = () => {
  return (
    <div className='mb-5'>
      <h3>InlineTitle</h3>

      <div className='mb-5'>
        <h5>Underline</h5>
        <InlineTitle label='MY PROFILE'/>
      </div>

      <div className='mb-5'>
        <h5>No underline</h5>
        <InlineTitle label='MY PROFILE' isNonUnderline/>
      </div>

      <div className='mb-5'>
        <h5>Blue short underline</h5>
        <InlineTitle label='MY PROFILE' isShortUnderline/>
      </div>

      <div className='mb-5'>
        <h5>Inline Children</h5>
        <InlineTitle label='MY PROFILE'>
          <span className='form-title'>Time frame : </span>
          <DropdownWithTimeframe
            customTimeFrameDay={'365'}
            alignEnd={true}
            onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-', selectedTimeframe)}
          />

          <DropdownWithAdvancedSearch
            value={''}
            dataBsToggleOnInput={true}
            dataBsToggleOnButton={true}
            readOnly
            alignEnd={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li className='mt-2'>
              <div className='form-title'>Status :</div>
              <DropdownWithItem
                id='status-dropdown'
                type='normal'
                selectedItem={dropdownStatusList[0]}
                itemList={dropdownStatusList}
                onClick={() => {}}
              />
            </li>
            <li className='mt-2'>
              <div className='form-title'>Organization :</div>
              <div className='advanced-select-org-container'>
                <DropdownWithAdvancedSearch
                  value={''}
                  buttonIcon={'enter'}
                  dataBsToggleOnInput={true}
                  dataBsToggleOnButton={true}
                  dataBsAutoClose={true} // outside, inside, true false.
                  onChange={e => console.log(e.target.value)}
                >
                  <div className='more-org'>
                    <div className='show-more-info'>
                      Showing first 10 of total 116 organizations.
                    </div>
                    <LinkerWithA
                      label='more'
                      href='#'
                      className='linker-blue show-more text-decoration-underline'
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Click on more');
                      }}
                    ></LinkerWithA>
                  </div>
                  {fakeOrgList.map((org, index) => {
                    return (
                      <li
                        key={index}
                        className='search-org-item'
                        onClick={() => console.log('org', org)}
                      >
                        {org.title}
                      </li>
                    );
                  })}
                </DropdownWithAdvancedSearch>
              </div>
            </li>
            <li className='mt-2'>
              <div className='form-title'>Model name :</div>
              <DropdownWithItem
                id='model-name-dropdown'
                type='normal'
                selectedItem={dropdownModelNameList[0]}
                itemList={dropdownModelNameList}
                onClick={() => {}}
              />
            </li>
            <li className='mt-2'>
              <div className='form-title'>Device UID :</div>
              <InputWithIconButton
                type='search'
                placeholder='Search'
                autoComplete='msp-search'
                buttonClassName='icon-search-enter'
                onChange={e => {}}
                onFocus={() => {}}
                onBlur={() => {}}
                buttonOnClick={e => {
                  e.stopPropagation();
                  console.log('Click on icon button');
                }}
              />
            </li>
          </DropdownWithAdvancedSearch>

          <Button
            label='Generate'
            className='btn-grey'
            onClick={() => {}}
          />

          <Button
            label='Download'
            className='btn-grey'
            onClick={() => {}}
          />

          <TooltipDialog
            placement='left'
            title='Click Generate to prepare the file to download. It may take few minutes to generate the file. You will receive an email from the Nuclias Cloud team once the file is ready to download.'
          ></TooltipDialog>

        </InlineTitle>
      </div>
    </div>
  )
};

export default InlineTitleSample;
