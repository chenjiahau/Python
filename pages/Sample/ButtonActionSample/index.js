import ButtonAction from 'components/ButtonAction';

const ButtonActionSample = () => {
  return (
    <div className='mb-5'>
      <h3>Button Actions</h3>
      <h6>可參考 Settings &gt; Certificate management</h6>

      <div className="d-inline-flex gap-3">
        <ButtonAction
          label="VIEW"
          title="VIEW"
          iconClassName="icon-preview"
          onClick={() => console.log('click view')}
          // disabled
        />

        <ButtonAction
          label="UPDATE"
          title="UPDATE"
          iconClassName="icon-edit"
          onClick={() => console.log('click update')}
          // disabled
        />

        <ButtonAction
          label="DELETE"
          title="DELETE"
          iconClassName="icon-trash"
          onClick={() => console.log('click delete')}
          // disabled
        />

        <ButtonAction
          label="DOWNLOAD"
          title="DOWNLOAD"
          iconClassName="icon-download"
          onClick={() => console.log('click download')}
          disabled
        />
      </div>
    </div>
  );
};

export default ButtonActionSample;
