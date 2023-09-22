import { useState } from "react";

import MessageBoxGroup from "components/MessageBoxGroup";

const defaultMessages = {
  success: 'asjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkaslasjdkalsjdklsafdklsajklsadkasl',
  error: '267bdded37',
  warning: 'd0204603f7'
};

const defaultMessageTypes = {
  success: 'i18n',
  error: 'i18n',
  warning: 'i18n'
};

const MeaageBoxGroupSample = () => {
  const [multiMessages, setMultiMessages] = useState({ ...defaultMessages });
  const [messageTypes, setMessageTypes] = useState({ ...defaultMessageTypes });

  return (
    <div className="mb-5">
      <h3>Multiple Message box</h3>
      <MessageBoxGroup
        messages={multiMessages}
        SuccessMessagesType={messageTypes.success}
        ErrorMessagesType={messageTypes.error}
        WarningMessagesType={messageTypes.warning}
        SuccessMessagesDismissible={false}
        onClose={type => setMultiMessages({...multiMessages, [type]: null})}
      />
    </div>
  )
};

export default MeaageBoxGroupSample;
