import {LayoutActions, LayoutActionTypes} from '../actions/layout.actions';

export interface State {
  showSidebar: boolean;
}

const initialState: State = {
  showSidebar: false
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

    default:
      return state;
  }
}

export const getShowSidebar = (state: State) => state.showSidebar;
