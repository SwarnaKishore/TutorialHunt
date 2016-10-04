
   

Meteor.methods({
'insertTutorialData' : function(tutorialNameVar,tutorialUrlVar,tutorialName,profileName,pictureUrl)
{
var currentUserId = Meteor.userId();
var createdAt = Meteor.user().createdAt;
tutorialList.insert({
  name: tutorialNameVar,
  url: tutorialUrlVar,
  score: 0, 
  category: tutorialName,
  createdBy : currentUserId,
  createdAt : createdAt,
  profileName : profileName,
  pictureUrl : pictureUrl
});
},





'addScoreIds' : function(selectedTutorial, userId , scoreValue)
{
    tutorialList.update({_id: selectedTutorial, upvoterIds: {$ne : userId}}, {
      $addToSet: {upvoterIds: userId},
      $inc :{score: scoreValue}
    }); 
 
},
'removeTutorial' : function(selectedTutorial){
tutorialList.remove(selectedTutorial);
}





});



