// Component
import { ModalContainer, ButtonList } from 'components/';

const ChangeBridgePriorityModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedPriority,
    callback
  } = props;

  const { index, priority } = selectedPriority;

  if (!priority) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.changePriority.status}
      closeModal={() => changeModalStatus(modalStatus.changePriority.self, false)}
    >
      <div className="header">
        <div className="title">Bridge Priority</div>
      </div>
      <div className='body'>
        <ButtonList
          list={priority.bridgePriority.list}
          selected={priority.bridgePriority.selected}
          callback={(_, item) => {
            changeModalStatus(modalStatus.changePriority.self, false);
            callback(index, item);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ChangeBridgePriorityModal;
