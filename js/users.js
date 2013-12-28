// The current user, if not login is anonymous
current_user = null;

var Users = Backbone.Collection.extend({
  firebase: new Backbone.Firebase("https://requirements.firebaseio.com/users"),
});

var UsersView = Backbone.View.extend({

});

var users = new Users;

var chatRef = new Firebase('https://requirements.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
  } else if (user) {
    current_user = user;
    users.create(current_user);
  } else {
    // User is log out
    login('anonymous');
  }
});
function login(provider) {
  auth.login(provider);
};


