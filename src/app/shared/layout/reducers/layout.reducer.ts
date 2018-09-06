import {LayoutActions, LayoutActionTypes} from '../actions/layout.actions';

export interface State  {
  showSidebar: boolean;
  navbarCollapsed: boolean;
}

const initialState: State = {
  showSidebar: false,
  navbarCollapsed: true
};

export function reducer(state = initialState, action: LayoutActions): State {

  switch (action.type) {
    case LayoutActionTypes.OpenSidebar: {
      return {
        ...state, showSidebar: true
      };
    }
    case LayoutActionTypes.CloseSidebar: {
      return {
        ...state, showSidebar: false
      };
    }
    case LayoutActionTypes.ToggleNavbar: {

      return {
        ...state, navbarCollapsed: !state.navbarCollapsed
      };
    }

    default:
      return state;
  }
}

export const getShowSidebar = (state: State) => state.showSidebar;

export const getNavbarCollapsed = (state: State) => state.navbarCollapsed;



