import { useState } from "react";
import { useTranslation } from 'react-i18next';

import MessageBox from "components/MessageBox";

const defaultMessages = {
  success: '263c0d8725',
  error: 'asjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkasl',
  warning: 'd0204603f7'
};

const MeaageBoxSample = () => {
  const [singleMessages, setSingleMessages] = useState({ ...defaultMessages });
  const { t } = useTranslation();

  return (
    <div className="mb-5">
      <h3>Single Message box</h3>
      <MessageBox
        show={!!singleMessages.success}
        label={t(singleMessages.success)}
        variant="success"
        dismissible={false}
        onClose={() => setSingleMessages({...singleMessages, success: null})}
      />
      <MessageBox
        show={!!singleMessages.error}
        label={t(singleMessages.error)}
        variant="danger"
        onClose={() => setSingleMessages({...singleMessages, error: null})}
      />
      <MessageBox
        show={!!singleMessages.warning}
        label={t(singleMessages.warning)}
        variant="warning"
        onClose={() => setSingleMessages({...singleMessages, warning: null})}
      />
    </div>
  )
};

export default MeaageBoxSample;
