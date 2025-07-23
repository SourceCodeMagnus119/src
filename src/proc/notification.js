const { Notification } = require('electron');
const { app } = require('../index');

function showNotification() {  
  const Notification_Title = 'Test-Notification';
  const Notification_Body = 'Test Notification from the main process.';

  const notification = new Notification({
    title: Notification_Title,
    body: Notification_Body,
    silent: false, // Ensures notification makes a sound
    timeoutType: 'default',
    hasReply: true,
    replyPlaceholder: 'Type your reply here...',
    icon: '/Users/Untoasted_Raisin/Pictures/thumb-test.png',
    sound: '/Windows/Media/Windows Notify Calendar.wav',
    actions: [
      { type: 'button', text: 'OK' },
      { type: 'button', text: 'Cancel' }
    ]
  });
  
  setTimeout(() => {
    notification.show();
  }, 3000);
};

module.exports = showNotification;