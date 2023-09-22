
import { Row, Col } from 'react-bootstrap';

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const GenerateModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.generate.status}
      closeModal={() => changeModalStatus('Generate ', false)}
    >
      <div className="header">
        <div className="title">Generate device firmware list</div>
      </div>
      <div className="body">
        <div>
          <Row className="mb-2">
            <Col sm={12}>
              Do you want to generate the device firmware list?
              You will receive an email to inform you the device firmware list is ready for download after few minutes.
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => changeModalStatus('add', false)}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => changeModalStatus('add', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default GenerateModal;
