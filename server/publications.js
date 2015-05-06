Meteor.publish('theTutorials', function(){
 var currentUserId = this.userId;
 return tutorialList.find();
});

Meteor.publish("userInformation", function() {
return Meteor.users.find();
});
