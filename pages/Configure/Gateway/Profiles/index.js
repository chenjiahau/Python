import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import {
  Breadcrumb, Button, InlineTitle, Checkbox, LinkerWithA, Icon, PaginationContainer,
  DropdownWithAdvancedSearch, DropdownWithItem, MessageBoxGroup, ButtonAction,
  EditableNameBox
} from 'components/';

// Dummy Data
import 'dummy/data/gateway/feature';

import Nuclias from './Nuclias';

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Profiles', isLink: false },
];

const Profiles = () => {
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');


  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <Nuclias />

    </>
  );
}

export default Profiles;