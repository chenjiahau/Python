import reportLicensesStyle from '../reports-licenses.module.scss';


// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';

const GenerateModal = props => {
  const { modalStatus, changeModalStatus } = props;
  console.log(props, modalStatus.generate.status);

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.generate.status}
      closeModal={() => changeModalStatus('generate', false)}
    >
      <div className="header">
        <div className="title">Generate license report</div>
      </div>
      <div className='body'>
        <div className='mb-1'>Do you want to generate the license report?</div>
        <div className='mb-1'>You will receive an email to inform you the license report is ready for download after few minutes.</div>
      </div>
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => {
            console.log('click Close');
            changeModalStatus('generate', false);
          }}
        />
        <Button
          label="Yes"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('generate', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default GenerateModal;
