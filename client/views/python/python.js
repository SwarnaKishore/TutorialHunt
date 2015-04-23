
Template.Python.helpers({
 Python: function()
 {
  var currentUserId = Meteor.userId();
  return playersList6.find({category:"Python"},{sort:  {score : -1, name: 1}});
}
});
