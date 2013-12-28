// The current user, if not login is anonymous
current_user = null;

$(function() {

});

var chatRef = new Firebase('https://requirements.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    console.log(error);
  } else if (user) {
    current_user = user;
  } else {
    // User is log out
    login('anonymous');
  }
});
function login(provider) {
  auth.login(provider);
};