import { useParams } from 'react-router-dom';

// Sub compoent
import OrgManagement from './OrgManagement';
import OrgTree from './OrgTree';

const OrganizationManagementMSP = () => {
  const { orgId } = useParams();

  return (
    <>
      { !orgId && <OrgManagement/> }
      { orgId && <OrgTree orgId={orgId}/> }
    </>
  );
};

export default OrganizationManagementMSP;
