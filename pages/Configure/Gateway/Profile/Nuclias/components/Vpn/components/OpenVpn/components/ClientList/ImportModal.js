import { useState, useEffect } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Component
import {
  Button,
  ButtonWithIcon,
  Checkbox,
  InputWithIcon,
  ModalContainer
} from 'components/';

const ImportModal = ({
  modalStatus,
  changeModalStatus,
  changeMultipleModalStatus,
  selectedDeviceModelName,
  importClientList
}) => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedLocalAuth, setSelectedLocalAuth] = useState(null);

  // Side effect
  useEffect(() => {
    if (!modalStatus.importClientList.status) {
      return;
    }

    const updatedList = importClientList.map((importClientListItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...importClientListItem,
      }
    });

    setList(updatedList);

  }, [modalStatus.importClientList.status]);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.importClientList.status}
      closeModal={() => changeModalStatus('importClientList', false)}
    >
      <div className='header'>
        <div className='title'>Import users from local authentication list</div>
      </div>
      <div className='body'>
        <div className='mt-4'>
          {/* Tool bar box */}
          <div className='d-flex justify-content-between mb-1'>
            <ButtonGroup>

              {/* Import */}
              <ButtonWithIcon
                label='Add local authentication'
                iconClassName='icon-expand'
                onClick={() => {
                  changeMultipleModalStatus({
                    importClientList: false,
                    addLocalDb: true
                  });
                }}
              ></ButtonWithIcon>

            </ButtonGroup>

            {/* Search */}
            <InputWithIcon
              type='Search'
              iconPosition='left'
              placeholder={t('13348442cc')}
              value={''}
              onChange={e => {}}
              onFocus={() => {}}
              onBlur={() => {}}
              iconClassName='icon-search'
              iconOnClick={() => {}}
            />
          </div>
        </div>

        <Table responsive striped hover className='table-container'>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Local authentication</th>
              <th>Access level</th>
              <th>Entries</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => {
                return (
                  <tr key={'import-client-list-tr-' + index}>
                    <td>
                      <Checkbox
                        id={`import-client-list-${index}`}
                        type='checkbox'
                        checked={item.checked}
                        onChange={e => {}}
                      />
                    </td>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.accessLevel}</td>
                    <td>{item.localEntryClassNameList.length}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('importClientList', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('importClientList', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default ImportModal;
