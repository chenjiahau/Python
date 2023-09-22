import changeLogStyle from './network.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Table & Modal
import DeviceUptimeTable from './components/DeviceUptimeTable';
import BandwidthUsabeTable from './components/BandwidthUsabeTable';
import ClientOverviewTable from './components/ClientOverviewTable';
import ChannelOverviewTable from './components/ChannelOverviewTable'

// Components

import Breadcrumb from 'components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Monitor', isLink: false },
  { label: 'Network', isLink: false },
];

const dropdownSiteList = [
  { title: 'All', isActive: true },
  { title: 'Test', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neiwan', isActive: false },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mail', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Songshan', isActive: false },
];


const Network = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <div className="layout-container layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
      </div>

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <DeviceUptimeTable {...{ dropdownSiteList }} />
        <BandwidthUsabeTable {...{ dropdownSiteList }} />
        <ClientOverviewTable {...{ dropdownSiteList }} />
        <ChannelOverviewTable />
      </div>
    </>
  );
};

export default Network;
