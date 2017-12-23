import $ from 'jquery';

import store from '../javascripts/react_app/redux';

import * as ToastActions from './react_app/redux/actions/toasts';

const notificationTypeToAlertType = (type) => {
  switch (type) {
    case 'notice':
      return 'success';
    default:
      return type;
  }
};

const isSticky = type => ['notice', 'success', 'info'].indexOf(type) === -1;

export function notify({
  message, type, link, sticky = isSticky(type),
}) {
  store.dispatch(ToastActions.addToast({
    type: notificationTypeToAlertType(type),
    message,
    sticky,
    link,
  }));
}

export const clear = () => {
  store.dispatch(ToastActions.clearToasts());
};

const importFlashMessagesFromRails = () => {
  const notifications = $('#notifications');

  if (notifications.length === 0 || !notifications.data('flash')) {
    return;
  }

  notifications.data('flash').forEach(([type, message]) => {
    notify({ message, type });
  });
  // remove both jquery cache and dom entry to avoid ajax ContentLoad events
  // reloading our notifications
  notifications.attr('data-flash', '').removeData();
};

// load notifications from Rails on ContentLoad
// to accommodate rails flash syntax
document.addEventListener('ContentLoad', () => {
  clear();
  importFlashMessagesFromRails();
});
