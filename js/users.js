// The current user, if not login is anonymous
current_user = null;

var User = Backbone.Model.extend({
  initialize : function(user) {

    // Online or not
    var connectionsRef = new Firebase(FIREBASE_URL + "/users/" + this.id + "/online");
    connectionsRef.push(true);
    connectionsRef.onDisconnect().remove();
  },
});

var Users = Backbone.Collection.extend({
  model: User,
  firebase: new Backbone.Firebase(FIREBASE_URL + "/users"),
});

var users = new Users;

var UsersView = Backbone.View.extend({
  el: $("#users"),

  initialize: function() {
    // Online count
    var onlineRef = new Firebase(FIREBASE_URL + "/online/");
    var userRef = onlineRef.push();
    userRef.set(current_user.id);
    userRef.onDisconnect().remove();
    onlineRef.on("value", function(snap) {
      $('#users-count').html(snap.numChildren());
    });
  },

});

var chatRef = new Firebase(FIREBASE_URL);
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
  } else if (user) {
    current_user = new User(user);
    users.create(current_user);
    var usersView = new UsersView;
  } else {
    // User is log out
    login('anonymous');
  }
});

function login(provider) {
  auth.login(provider);
};


