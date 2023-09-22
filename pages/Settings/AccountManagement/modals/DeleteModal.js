import accountManagementStyle from '../account-management.module.css';


// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';
import InputWithIcon from '../../../../components/InputWithIcon';

const DeleteModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.delete.status}
      closeModal={() => changeModalStatus('delete', false)}
    >
      <div className="header">
        <div className="title">Delete user</div>
      </div>
      <div className='body'>
        <div className='mb-3 modal-warning-color'>Your account will be removed from Nuclias, and all the related data will be wiped from our cloud server. We will not be able to recover this account again. Please enter your password to proceed.</div>
        <div className="modal-form-group">
          <div className='modal-form-title required me-3'>Password</div>
          <div className='modal-form-field'>
            <InputWithIcon
              type="password"
              placeholder="Password"
              autoComplete="delete-account-password"
              onChange={e => { console.log(e.target.value) }}
              onFocus={() => {}}
              onBlur={() => {}}
              iconTitle="Show password"
              iconClassName="icon-open-eye"
              iconOnClick={() => {console.log("click on icon")}}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="No"
          className="btn-cancel"
          onClick={() => {
            console.log('click Close');
            changeModalStatus('delete', false);
          }}
        />
        <Button
          label="Yes"
          className="btn-delete"
          onClick={() => {
            console.log('click save');
            changeModalStatus('delete', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default DeleteModal;
