// Component
import { ModalContainer, ButtonList } from 'components/';

const ChangeQueueIdModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedQueueId,
    callback
  } = props;

  const { index, queueId } = selectedQueueId;

  if (!queueId) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.changeQueueId.status}
      closeModal={() => changeModalStatus(modalStatus.changeQueueId.self, false)}
    >
      <div className="header">
        <div className="title">Queue ID</div>
      </div>
      <div className='body'>
        <ButtonList
          list={queueId.list}
          selected={queueId.selected}
          callback={(_, item) => {
            changeModalStatus(modalStatus.changeQueueId.self, false);
            callback(index, item);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ChangeQueueIdModal;
