
Template.Python.helpers({
 Python: function()
 {
  var currentUserId = Meteor.userId();
  return tutorialList.find({category:"Python"},{sort:  {score : -1}});
}
});
