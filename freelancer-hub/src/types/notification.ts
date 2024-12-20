export interface Notification {
  id: number;
  type: 'payment' | 'ticket' | 'project' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: JSX.Element;
}
