import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  interface: [],
  ipv4StaticRoute: [],
  ipv6StaticRoute: [],
  ipv4PolicyRoute: [],
  ipv6PolicyRoute: [],
  ripConfiguration: [],
  ospfv2Configuration: [],
};

export const routingAction = {
  setInterface: 'SET_INTERFACE',
  setSpv4StaticRoute: 'SET_IPV4_STATIC_ROUTE',
  setIpv6StaticRoute: 'SET_IPV6_STATIC_ROUTE',
  setIpv4PolicyRoute: 'SET_IPV4_POLICY_ROUTE',
  setIpv6PolicyRoute: 'SET_IPV6_POLICY_ROUTE',
  setRipConfiguration: 'SET_RIP_CONFIGURATION',
  setOspfv2Configuration: 'SET_OSPFV2_CONFIGURATION',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case routingAction.setInterface:
      return {
        ...state,
        interface: action.payload
      };
    case routingAction.setIpv4StaticRoute:
      return {
        ...state,
        ipv4StaticRoute: action.payload
      };
    case routingAction.setIpv6StaticRoute:
      return {
        ...state,
        ipv6StaticRoute: action.payload
      };
    case routingAction.setIpv4PolicyRoute:
      return {
        ...state,
        ipv4PolicyRoute: action.payload
      };
    case routingAction.setIpv6PolicyRoute:
      return {
        ...state,
        ipv6PolicyRoute: action.payload
      };
    case routingAction.setRipConfiguration:
      return {
        ...state,
        ripConfiguration: action.payload
      };
    case routingAction.setOspfv2Configuration:
      return {
        ...state,
        ospfv2Configuration: action.payload
      };
    default:
      return defaultState;
  }
}

export const RoutingContext = createContext();
export const RoutingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <RoutingContext.Provider value={{ state, dispatch }}>
      {children}
    </RoutingContext.Provider>
  )
}