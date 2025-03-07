export type Option = {
    text: string;
    next: string;
  };
  
export type ChatStep = {
    bot: string;
    options: Option[];
  };
  
export type ChatData = {
    [key: string]: ChatStep;
  };

