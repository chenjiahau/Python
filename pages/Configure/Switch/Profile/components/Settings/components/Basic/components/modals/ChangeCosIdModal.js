// Component
import { ModalContainer, ButtonList } from 'components/';

const ChangeCosIdModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedCosId,
    callback
  } = props;

  const { index, cosId } = selectedCosId;

  if (!cosId) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.changeCosId.status}
      closeModal={() => changeModalStatus(modalStatus.changeCosId.self, false)}
    >
      <div className="header">
        <div className="title">Queue ID</div>
      </div>
      <div className='body'>
        <ButtonList
          list={cosId.list}
          selected={cosId.selected}
          callback={(_, item) => {
            changeModalStatus(modalStatus.changeCosId.self, false);
            callback(index, item);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ChangeCosIdModal;
