export enum Notification {
  INFO = 1,
  SUCCESS = 2,
  ERROR = 3,
}

export const showNotification = (message: string, type: Notification) => {
  window.alert(message);
};