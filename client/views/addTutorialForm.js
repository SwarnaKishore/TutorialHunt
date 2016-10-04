

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
         
          var profileName;


          if (Meteor.user().services.github)
              profileName = Meteor.user().services.github.username;
          else if(Meteor.user().services.facebook)
              profileName = Meteor.user().services.facebook.name;
          else if(Meteor.user().services.twitter)
              profileName = Meteor.user().services.twitter.screenName;
          else if(Meteor.user().services.google.name)
              profileName = Meteor.user().services.google.name;

          var pictureUrl;
          if(Meteor.user().services.facebook)
          {
           
            pictureUrl = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
          }
          else if(Meteor.user().services.twitter)
          {
            pictureUrl= "http://twitter.com/" + Meteor.user().services.twitter.screenName + "/profile_image?size=original";
          }
          else if(Meteor.user().services.github)
            pictureUrl = "https://avatars3.githubusercontent.com/u/" + Meteor.user().services.github.id;
          else if(Meteor.user().services.google)
            pictureUrl = Meteor.user().services.google.picture;

          Meteor.call('insertTutorialData', tutorialNameVar,tutorialUrlVar,tutorialName,profileName,pictureUrl);

          event.target.tutorialName.value="";
          event.target.tutorialUrl.value="";
          

          Meteor.setTimeout(function(){  
          window.scrollTo(0, document.body.scrollHeight);}, 1000);
         
      
        
  },


  'click #remove' : function(event , template) 
  {
    
  var selectedTutorial = Session.get('selectedTutorial');
 
    Meteor.call('removeTutorial', selectedTutorial);

  }

});



Template.addTutorialForm.helpers({
isAdmin : function()
{
  if(Meteor.user().services.google)
  {
  var userId = Meteor.user().services.google.id;
   if(userId == 108452617739825885356)
    return true;
  }


}
});


