import {Action} from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidebar = '[Layout] Open Sidebar',
  CloseSidebar = '[Layout] Close Sidebar',
  ToggleNavbar = '[Layout] Toggle Navbar'
}

export class OpenSidebar implements Action {
  readonly type = LayoutActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
  readonly type = LayoutActionTypes.CloseSidebar;
}
export class ToggleNavbar implements Action {
  readonly type = LayoutActionTypes.ToggleNavbar;
}


export type LayoutActions = OpenSidebar | CloseSidebar | ToggleNavbar;


