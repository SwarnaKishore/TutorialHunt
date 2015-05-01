



if(Meteor.isClient)
{
   

  Meteor.subscribe('theTutorials');
  Meteor.subscribe('userInformation');



Template.showProfile.helpers({
createdBy:function(){
  var tutorialId = Session.get('tutorialId');
    var createdBy = tutorialList.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    return tutorialList.find({createdBy : currentCreator},{sort:  {score : -1}});


  },

  upvotedBy: function(){
    var tutorialId = Session.get('tutorialId');
    var createdBy = tutorialList.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    return tutorialList.find({ upvoterIds: currentCreator},{sort:  {score : -1}});

  }
});


Template.Profile.helpers({

  
  profilename: function() {
    if (Meteor.user().services.github)
      return Meteor.user().services.github.username;
    else if(Meteor.user().services.facebook)
      return Meteor.user().services.facebook.name;
    else if(Meteor.user().services.twitter)
      return Meteor.user().services.twitter.screenName;
    
  },
  memberSince : function()
  {
    return Meteor.user().createdAt;
    //return moment(this.createdAt).
  },
profilePicture: function(){
        if(Meteor.user().services.facebook)
          {
           
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
          }
          else if(Meteor.user().services.twitter)
          {
            return Meteor.user().services.twitter.profile_image_url;
          }
          else if(Meteor.user().services.github)
            return "https://avatars3.githubusercontent.com/u/" + Meteor.user().services.github.id;
          

        },


  createdBy:function(){
    return tutorialList.find({createdBy : Meteor.userId()},{sort:  {score : -1}});
  },
    upvotedBy: function(){
   
    return tutorialList.find({ upvoterIds: Meteor.userId()},{sort:  {score : -1}});

  }
});

Template.tutorialDisplay.helpers({
  upvotedClass: function() {
    var userId = Meteor.userId();
    var tutorial = tutorialList.findOne(this._id);
    console.log(tutorial);
    if (userId && !_.include(tutorial.upvoterIds, userId)) {
      return 'upvotable';
    } else if(userId)
    {
      return 'upvoted disabled';
    }
  }
});



Template.tutorialDisplay.events({
  'click .upvotable': function (event, template) {
    event.preventDefault();
    var userId = Meteor.userId();
    var tutorialId = this._id;
    Session.set('selectedTutorial', tutorialId);
    var selectedTutorial = Session.get('selectedTutorial');
    Meteor.call('addScoreIds',selectedTutorial,userId,1);
  },
  
  'click #viewProfile': function(event,template){
    window.scrollTo(0,0);

  },

  'click .upvote' : function(event, template)
  {
    event.preventDefault();
    var userId = Meteor.userId();
    if(userId == null)
        {
         $('#modal1').openModal();

        } 
   }

 });


Template.Layout.events({
'click #profileView':function(event, template){
  window.scrollTo(0,0);
}
});





Template.addTutorialForm.events({

'submit form' : function(event,template)
{
event.preventDefault();
/*var playerNameVar = template.find('#playerName').value; */
 
          var tutorialNameVar= event.target.tutorialName.value;
          var tutorialUrlVar= event.target.tutorialUrl.value;
          if (!tutorialNameVar || !tutorialUrlVar)
            return;
          var tutorialName = Session.get('tutorialName');
         
          var profileName = Meteor.user().username || Meteor.user().profile.name;
          var pictureUrl;
          if(Meteor.user().services.facebook)
          {
           
            pictureUrl = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
          }
          else if(Meteor.user().services.twitter)
          {
            pictureUrl= Meteor.user().services.twitter.profile_image_url;
          }
          else if(Meteor.user().services.github)
            pictureUrl = "https://avatars3.githubusercontent.com/u/" + Meteor.user().services.github.id;

          Meteor.call('insertTutorialData', tutorialNameVar,tutorialUrlVar,tutorialName,profileName,pictureUrl);

          event.target.tutorialName.value="";
          event.target.tutorialUrl.value="";
          

          Meteor.setTimeout(function(){  
          window.scrollTo(0, document.body.scrollHeight);}, 1000);
         
      
        
  }
});



} /*is.client*/

if(Meteor.isServer)
{
  Meteor.users.deny({
  update: function() {
    return true;
  }
});

  Meteor.users.deny({
  insert: function() {
    return false;
  }
});
   

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
 
}





});

}


