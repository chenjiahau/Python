import Breadcrumbs from 'components/Breadcrumb';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import InputWithIconButton from 'components/InputWithIconButton';

const defaultPathList = [
  { label: 'Setting', isLink: false },
  {
    label: 'Account management',
    isLink: true,
    url: '/cloud/settings/account-management',
  },
];

const BreadcrumbsSample = () => {
  return (
    <div className="mb-5">
      <h3>Breadcrumb</h3>
      <Breadcrumbs pathList={[...defaultPathList]}>
        <div className="right">
          <DropdownWithAdvancedSearch
            value={''}
            dataBsToggleOnInput={false}
            dataBsToggleOnButton={true}
            alignEnd={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li className="mt-2">
              <div className="form-title">Device UID :</div>
              <InputWithIconButton
                type="search"
                placeholder="Search"
                autoComplete="msp-search"
                buttonClassName="icon-search-enter"
                onChange={e => { }}
                onFocus={() => { }}
                onBlur={() => { }}
                buttonOnClick={e => {
                  e.stopPropagation();
                  console.log('Click on icon button');
                }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </div>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsSample;
