export interface IPopupContext {
  active: boolean;
  position: string;
  setPopupState?: (state: IPopupContext) => void;
  triggerClientRect?: null | ClientRect;
  onClose: () => void;
  onTrigger: () => void;
}

export interface IPopupTriggerProps {
  children: React.ReactElement<any>;
}

export interface IPopupContentProps {
  children: React.ReactElement<any>;
}

export interface IPopupContentCoords {
  left: number;
  top: number;
}

export interface IPopupBasicProps {
  position: string;
  active: boolean;
  onClose: () => void;
  onTrigger: () => void;
}

export interface IChildrenValues extends IPopupBasicProps {
  close: () => void;
}

export interface IPopupProps {
  children: (popupData: IChildrenValues) => React.ReactNode;
  position?: string;
  active?: boolean;
  onClose?: () => void;
  onTrigger?: () => void;
}
