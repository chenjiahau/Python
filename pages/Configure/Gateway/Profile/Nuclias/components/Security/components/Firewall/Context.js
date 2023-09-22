import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  interfaces: [],
  schedulePolicies: [],
  ipv4FirewallRules: [],
  portForwarding: [],
  portTriggering: [],
  oneCOneNat: [],
  ipv6FirewallRules: [],
};

export const firewallAction = {
  setInterfaces: 'SET_INTERFACES',
  setSchedulePolicies: 'SET_SCHEDULE_POLICIES',
  setIpv4FirewallRules: 'SET_IPV4_FIREWALL_RULES',
  setPortForwarding: 'SET_PORT_FORWARDING',
  setPortTriggering: 'SET_PORT_TRIGGERING',
  setOneCOneNat: 'SET_ONE_C_ONE_NAT',
  setIpv6FirewallRules: 'SET_IPV6_FIREWALL_RULES',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case firewallAction.setInterfaces:
      return {
        ...state,
        interfaces: action.payload
      };
    case firewallAction.setSchedulePolicies:
      return {
        ...state,
        schedulePolicies: action.payload
      };
    case firewallAction.setIpv4FirewallRules:
      return {
        ...state,
        ipv4FirewallRules: action.payload
      };
    case firewallAction.setPortForwarding:
      return {
        ...state,
        portForwarding: action.payload
      };
    case firewallAction.setPortTriggering:
      return {
        ...state,
        portTriggering: action.payload
      };
    case firewallAction.setOneCOneNat:
      return {
        ...state,
        oneCOneNat: action.payload
      };
    case firewallAction.setIpv6FirewallRules:
      return {
        ...state,
        ipv6FirewallRules: action.payload
      };
    default:
      return defaultState;
  }
}

export const FirewallContext = createContext();
export const FirewallContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <FirewallContext.Provider value={{ state, dispatch }}>
      {children}
    </FirewallContext.Provider>
  )
}