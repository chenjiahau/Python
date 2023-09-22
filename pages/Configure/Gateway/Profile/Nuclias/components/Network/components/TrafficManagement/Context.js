import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  wan: [],
  vlan: [],
  schedulePolicy: [],
  ipv4TrafficShaping: [],
  ipv6TrafficShaping: [],
  ipv4SessionLimiting: [],
  ipv6SessionLimiting: [],
};

export const trafficManagementAction = {
  setWan: 'SET_WAN',
  setVlan: 'SET_VLAN',
  setSchedulePolicy: 'SET_SCHEDULE_POLICY',
  setIpv4TrafficShaping: 'SET_IPV4_TRAFFIC_SHAPING',
  setIpv6TrafficShaping: 'SET_IPV6_TRAFFIC_SHAPING',
  setIpv4SessionLimiting: 'SET_IPV4_SESSION_LIMITING',
  setIpv6SessionLimiting: 'SET_IPV6_SESSION_LIMITING',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case trafficManagementAction.setWan:
      return {
        ...state,
        wan: action.payload,
      };
    case trafficManagementAction.setVlan:
      return {
        ...state,
        vlan: action.payload,
      };
    case trafficManagementAction.setSchedulePolicy:
      return {
        ...state,
        schedulePolicy: action.payload,
      };
    case trafficManagementAction.setIpv4TrafficShaping:
      return {
        ...state,
        ipv4TrafficShaping: action.payload,
      };
    case trafficManagementAction.setIpv6TrafficShaping:
      return {
        ...state,
        ipv6TrafficShaping: action.payload,
      };
    case trafficManagementAction.setIpv4SessionLimiting:
      return {
        ...state,
        ipv4SessionLimiting: action.payload,
      };
    case trafficManagementAction.setIpv6SessionLimiting:
      return {
        ...state,
        ipv6SessionLimiting: action.payload,
      };
    default:
      return defaultState;
  }
}

export const TrafficManagementContext = createContext();
export const TrafficManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <TrafficManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficManagementContext.Provider>
  )
}