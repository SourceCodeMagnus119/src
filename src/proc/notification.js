const { Notification } = require('electron');
const { app } = require('../index');

const Notification_Title = 'Test-Notification';
const Notification_Body = 'Test Notification from the main process.';

function showNotification() {  
  const notification = new Notification({
    title: Notification_Title,
    body: Notification_Body,
    silent: false, // Ensures notification makes a sound
    timeoutType: 'default',
    replyPlaceholder: true,
    hasReply: true,
  });
  
  setTimeout(() => {
    notification.show();
    // notification.sound();
  }, 2000);
};

module.exports = showNotification;