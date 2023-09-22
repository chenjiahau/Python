import Button from 'components/Button';
import ButtonWithIcon from 'components/ButtonWithIcon';

const ButtonSample = () => {
  return (
    <div className='mb-5'>
      <h3>Button </h3>

      <h5>Big buttons </h5>
      <div className='d-flex gap-3 mb-3' style={{width: '150px'}}>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => {console.log('Click on Cancel')}}
        />

        <Button
          label='Sumbit'
          className='btn-submit'
          onClick={() => {}}
        />
      </div>

      <h5>Common buttons </h5>
      <div className='d-flex gap-3 mb-3' style={{width: '350px'}}>
        <Button
          isTruncate
          style={{minWidth: '130px'}}
          label='This is the long buttonnnnnnnnnnnnnn'
          className='btn-grey-blue'
          onClick={() => {}}
        />
        <Button
          label='Co-termination log'
          className='btn-grey-blue'
          onClick={() => {}}
        />

        <Button
          label='Upload Image'
          className='btn-indigo'
          onClick={() => {}}
        />

        <Button
          label='Delete account'
          className='btn-delete'
          onClick={() => {}}
        />

        <Button
          label='Disabled'
          className='btn-delete'
          disabled
          onClick={() => {}}
        />
      </div>

      <h5>Icon buttons </h5>
      <div className='d-flex gap-3 mb-5' style={{width: '250px'}}>
        <ButtonWithIcon
          style={{minWidth: '130px'}}
          isTruncate
          label='Downloadddddddd ksadsakoasopsakdop'
          iconClassName='icon-download'
          onClick={() => {}}
        ></ButtonWithIcon>

        <ButtonWithIcon
          label='Download'
          iconClassName='icon-download'
          disabled
          onClick={() => {}}
        ></ButtonWithIcon>

        <Button
          label=''
          title='Download as CSV'
          className='icon-download'
          style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
          onClick={() => console.log('Download as CSV')}
        />
      </div>

    </div>
  )
};

export default ButtonSample;
