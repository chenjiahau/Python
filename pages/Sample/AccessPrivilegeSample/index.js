import { Row, Col } from 'react-bootstrap';

// Components
import AccessPrivilege, { accessLevelType } from 'components/AccessPrivilege';

const dropdownSiteTagList = [
  { id: 1100, title: 'Hsinchu', isActive: false, accessLevel: accessLevelType.tag },
  { id: 1101, title: 'Kaohsiung', isActive: false, accessLevel: accessLevelType.tag },
  { id: 1102, title: 'Taipei', isActive: true, accessLevel: accessLevelType.tag },
  { id: 1103, title: 'Taichung', isActive: false, accessLevel: accessLevelType.tag }
];

const dropdownSiteList = [
  { id: 110000, title: 'Daliao', isActive: true, accessLevel: accessLevelType.store },
  { id: 110001, title: 'Dream Mail', isActive: false, accessLevel: accessLevelType.store },
  { id: 110002, title: 'HQ', isActive: false, accessLevel: accessLevelType.store },
  { id: 110003, title: 'Neihu', isActive: false, accessLevel: accessLevelType.store },
  { id: 110004, title: 'Songshan', isActive: false, accessLevel: accessLevelType.store }
];

const AccessPrivilegeSample = () => {
  return (
    <div className='mb-5'>
      <h3>Access privilege</h3>
      <h6 className="mb-3">可參考 Settings &gt; Advanced settings &gt; SAML configuration &gt; SAML roles &gt; Add modal</h6>

      <Row className="mb-5">
        <Col md="4">
          <h5>Example: Org user</h5>
          <AccessPrivilege
            id="org-user-access-privilege-dropdown"
            onChangeSelectedLevelItem={levelItem => console.log(levelItem)}
            onChangeSelectedItem={item => console.log(item)}
            siteTagList={dropdownSiteTagList}
            siteList={dropdownSiteList}
            seletedAccessLevel={'STORETAG'} // default selected access level.
          />
        </Col>
        <Col md="4">
          <h5>Example: Site tag user</h5>
          <AccessPrivilege
            id="tag-user-access-privilege-dropdown"
            onChangeSelectedLevelItem={levelItem => console.log(levelItem)}
            onChangeSelectedItem={item => console.log(item)}
            siteTagList={dropdownSiteTagList}
            siteList={dropdownSiteList}
            accessLevel={'STORETAG'} // default user level.
            seletedAccessLevel={'STORE'} // default selected access level.
          />
        </Col>
        <Col md="4">
          <h5>Example: Site user</h5>
          <AccessPrivilege
            id="site-user-access-privilege-dropdown"
            onChangeSelectedLevelItem={levelItem => console.log(levelItem)}
            onChangeSelectedItem={item => console.log(item)}
            accessLevel={'STORE'} // default user level.
            seletedAccessLevel={'STORE'} // default selected access level.
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccessPrivilegeSample;
