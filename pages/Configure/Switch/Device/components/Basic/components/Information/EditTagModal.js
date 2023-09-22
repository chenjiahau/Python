import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

// Component
import { ButtonAction, Button, ModalContainer, Input, ButtonWithIcon } from 'components/';

const EditTagModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    tags
  } = props;

  // State
  const [list, setList] = useState([]);

  // Side effect
  useEffect(() => {
    let updatedList = [{ value: '' }];

    if (tags.length > 0) {
      updatedList.length = 0;
      for (let i = 0; i < tags.length; i++) {
        updatedList.push({
          value: tags[i]
        });
      }
    }

    setList(updatedList);
  }, [tags]);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editTag.status}
      closeModal={() => changeModalStatus(modalStatus.editTag.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit tag</div>
      </div>
      <div className='body'>
        <Table
          striped
          hover
          className='table-container table-container--disable-sort'
        >
          <thead>
            <tr>
              <th width='5%'>#</th>
              <th width='75%'>Tag</th>
              <th width='20%' className={'table-action-th'}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Input
                        type='text'
                        value={item.value}
                        onChange={e => { }}
                        onFocus={() => { }}
                        onBlur={() => { }}
                      />
                    </td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label=''
                        title='DELETE'
                        iconClassName='icon-trash'
                        onClick={() => { }}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <div className='mt-2'>
          <ButtonWithIcon
            label='Add tag'
            className='d-flex justify-content-center'
            iconClassName='icon-expand'
            onClick={() => { }}
          />
        </div>
      </div>
      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editTag.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editTag.self, false)}
        />
      </div>
    </ModalContainer>
  );
};

export default EditTagModal;
