Template.Profile.helpers({

  
  profilename: function() {
    if (Meteor.user().services.github)
      return Meteor.user().services.github.username;
    else if(Meteor.user().services.facebook)
      return Meteor.user().services.facebook.name;
    else if(Meteor.user().services.twitter)
      return Meteor.user().services.twitter.screenName;
    else if(Meteor.user().services.google.name)
      return Meteor.user().services.google.name;

    
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
          else if(Meteor.user().services.google)
            return Meteor.user().services.google.picture;
          

        },


  createdBy:function(){
    return tutorialList.find({createdBy : Meteor.userId()},{sort:  {score : -1}});
  },
    upvotedBy: function(){
   
    return tutorialList.find({ upvoterIds: Meteor.userId()},{sort:  {score : -1}});

  }
});