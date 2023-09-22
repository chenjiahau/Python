import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  tabChangeTime: 0
};

export const deviceAction = {
  increaseTabChangeTime: 'INCREASE_TAB_CHANGE_TIME'
}

const deviceReducer = (state, action) => {
  switch (action.type) {
    case deviceAction.increaseTabChangeTime:
      return {
        ...state,
        tabChangeTime: state.tabChangeTime + 1
      };
    default:
      return defaultState;
  }
}

export const DeviceContext = createContext();
export const DeviceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, cloneDeep(defaultState));

  return (
    <DeviceContext.Provider value={{ state, dispatch }}>
      {children}
    </DeviceContext.Provider>
  )
}