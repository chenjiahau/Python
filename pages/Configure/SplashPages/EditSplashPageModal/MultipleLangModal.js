import { useState, useEffect } from 'react';
import { Row, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { Button, ModalContainer, DropdownWithItem, Checkbox, ButtonWithIcon } from 'components/';

// Dummy data & util

const allLangs = [
  { title: 'English', value: 'English', isDefault: true, },
  { title: '日文', value: '日文', isDefault: true, },
  { title: 'Deutsch', value: 'Deutsch', isDefault: true, },
  { title: 'Français', value: 'Français', isDefault: true, },
  { title: 'Italiano', value: 'Italiano', isDefault: false, },
  { title: 'Magyar', value: 'Magyar', isDefault: false, },
  { title: 'Nederlands', value: 'Nederlands', isDefault: false, },
  { title: 'Polski', value: 'Polski', isDefault: false, },
  { title: 'Pyccĸий', value: 'Pyccĸий', isDefault: false, },
  { title: 'Svenska', value: 'Svenska', isDefault: false, },
  { title: '中文(简体)', value: '中文(简体)', isDefault: false, },
  { title: '한국어', value: '한국어', isDefault: false, },
  { title: '繁體中文', value: '繁體中文', isDefault: false, },
];

const MultipleLangModal = props => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  // State
  const [supportMultipleLanguages, setSupportMultipleLanguages] = useState(true);
  const [defaultLangs, setDefaultLangs] = useState([]);
  const [restLangs, setRestLangs] = useState([]);

  // Method

  // Side effect
  useEffect(() => {
    const updatedDefaultLangs = [];
    const updatedRestLangs = [];

    allLangs.forEach(lang => {
      if (lang.isDefault) {
        updatedDefaultLangs.push({
          ...lang,
          isActive: false,
        });
      } else {
        updatedRestLangs.push({
          ...lang,
          isActive: false,
        });
      }
    });

    updatedDefaultLangs[0].isActive = true;
    updatedRestLangs[0].isActive = true;

    setDefaultLangs(updatedDefaultLangs);
    setRestLangs(updatedRestLangs);
  }, []);

  return (
    <ModalContainer
      isFirstLayer={false}
      modalWidthType="modal-500px"
      style={{ marginTop: '116px' }}
      openModal={modalStatus.multipleLang.status}
      closeModal={() => changeModalStatus(modalStatus.multipleLang.self, false)}
    >
      <div className="header">
        <div className="title">Multiple languages</div>
      </div>

      <div className="body">
        {/* Support multiple languages */}
        <Row>
          <Checkbox
            id='support-multiple-languages'
            label='Support multiple languages'
            checked={supportMultipleLanguages}
            onChange={() => setSupportMultipleLanguages(!supportMultipleLanguages)}
          />
        </Row>

        {
          supportMultipleLanguages && (
            <>
              {/* Default language */}
              <Row className='mt-2'>
                <div className='modal-form-title'>Default language</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={defaultLangs.find(item => item.isActive)}
                  itemList={defaultLangs}
                  onClick={item => { }}
                />
              </Row>

              {/* Add language support */}
              <Row className='mt-2'>
                <div className='modal-form-title'>Add language support</div>
                <ButtonGroup>
                  <div style={{ width: '83%' }}>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={restLangs.find(item => item.isActive)}
                      itemList={restLangs}
                      onClick={item => { }}
                    />
                  </div>
                  <div>
                    <ButtonWithIcon
                      label='Add'
                      style={{ width: '80px' }}
                      iconClassName='icon-expand'
                      onClick={() => { }}
                    />
                  </div>
                </ButtonGroup>
              </Row>

              {/* Support languages */}
              <Row className='mt-2'>
                <div className='modal-form-title'>Support languages</div>
                <div className='form-field--horizontal'>
                  {
                    defaultLangs.map((lang, index) => {
                      return (
                        <div key={index}>
                          <ButtonWithIcon
                            label={lang.title}
                            style={{ width: '226px' }}
                            disabled={[0, 1].includes(index) ? true : false}
                            iconClassName='icon-collapse'
                            onClick={() => { }}
                          />
                        </div>
                      )
                    })
                  }
                </div>

              </Row>
            </>
          )
        }
      </div>

      <div className="footer">
        <Button
          label="No"
          className="btn-cancel"
          onClick={() => changeModalStatus(modalStatus.multipleLang.self, false)}
        />
        <Button
          label="Yes"
          className="btn-submit"
          onClick={() => changeModalStatus(modalStatus.multipleLang.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default MultipleLangModal;
