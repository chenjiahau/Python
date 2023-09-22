import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon
} from 'components/';
import Func from '../../../../../Func';

import AddModal from './AddModal';
import EditModal from './EditModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { WcfContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addConfig: {
    self: 'addConfig',
    status: false
  },
  editConfig: {
    self: 'editConfig',
    status: false
  },
  deleteConfig: {
    self: 'deleteConfig',
    status: false
  },
};

const customFilteringTypeDefinition = ['URL', 'Category based', 'URL + Category based'];

const CustomGroupList = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: wcfState } = useContext(WcfContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [wcfCategory, setWcfCategory] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    setWcfCategory(wcfState.wcfCategory);

    const updatedList = cloneDeep(wcfState.customGroupList);
    updatedList?.forEach((item, index) => {
      item.urls = item.urls.length === 0 ? '-' : item.urls.join(', ');
      item.categoryFiltering = item.categoryFiltering.length === 0 ? '-' : item.categoryFiltering.join(', ');
    });

    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [wcfState.customGroupList]);

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  let sourceList = null;
  if (isProfilePath) {
    sourceList = list;
  } else {
    sourceList = isNotStandalone ? profileList : list;
  }

  return (
    <>
      <Func title='CUSTOM GROUP LIST'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedConfig(null);
                        changeModalStatus(modalStatus.addConfig.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list)}
                      onClick={() => changeModalStatus(modalStatus.deleteConfig.self, true)}
                    />
                  </>
                )
              }
            </ButtonGroup>
            <InputWithIcon
              type='search'
              iconPosition='left'
              iconClassName='icon-search'
              value={''}
              onChange={e => { }}
              onClick={() => { }}
              onBlur={() => { }}
            />
          </div>
        </div>

        <div className='table-responsive'>
          <Table
            striped
            hover
            className='table-container'
          >
            <thead>
              <tr>
                {
                  !isUseProfileConfig && (
                    <th>
                      <Checkbox
                        id='custom-group-list-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefault))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='Name'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'name', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'name', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='URLs'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'urls', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'urls', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Category filtering'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'categoryFiltering', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'categoryFiltering', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='In Use'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'inUse', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'inUse', setList);
                    }}
                  />
                </th>
                {
                  !isUseProfileConfig && (
                    <th className={'table-action-th'}>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                sourceList.map((item, index) => {
                  return (
                    <tr key={index}>
                      {
                        !isUseProfileConfig && (
                          <td>
                            {
                              !item.isDefault && (
                                <Checkbox
                                  id={`custom-group-list-${index}`}
                                  type='checkbox'
                                  checked={item.checked}
                                  onChange={e => toggleCheckedOne(index, list, setList)}
                                />
                              )
                            }
                          </td>
                        )
                      }
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.urls}</td>
                      <td>{item.categoryFiltering}</td>
                      <td>{item.inUse ? 'Yes' : 'No'}</td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedConfig(item);
                                changeModalStatus(modalStatus.editConfig.self, true)
                              }}
                            />
                            {
                              !item.isDefault && (
                                <>
                                  <ButtonAction
                                    label='DELETE'
                                    title='DELETE'
                                    iconClassName='icon-trash'
                                    onClick={() => {
                                      setSelectedConfig(item);
                                      changeModalStatus(modalStatus.deleteConfig.self, true)
                                    }}
                                  />
                                </>
                              )
                            }
                          </td>
                        )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

        <PaginationContainer
          total={sourceList.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </Func >

      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        customFilteringTypeDefinition={customFilteringTypeDefinition}
        wcfCategory={wcfCategory}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        customFilteringTypeDefinition={customFilteringTypeDefinition}
        wcfCategory={wcfCategory}
      />
    </>
  )
}

export default CustomGroupList;