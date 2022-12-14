export type CommonProps = {
  settings?: {
    withInternalID: boolean;
  };
  events?: {
    [key: string]: EventListener;
  };
  attr?: {
    [key: string]: string | number | boolean;
  };
  class?: string[];
  [key: string | symbol]: unknown;
};
