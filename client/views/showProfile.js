Template.showProfile.helpers({
createdBy:function(){
  var tutorialId = Session.get('tutorialId');
    var createdBy = tutorialList.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    return tutorialList.find({createdBy : currentCreator},{sort:  {score : -1}});


  },

  picture: function(){
    var tutorialId = Session.get('tutorialId');
    var createdBy = tutorialList.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    var ProfileUserId = Meteor.users.findOne({_id: currentCreator});
    if(ProfileUserId.services.twitter)
      return "http://twitter.com/" + ProfileUserId.services.twitter.screenName + "/profile_image?size=original";
    else
      return null;
  },


  upvotedBy: function(){
    var tutorialId = Session.get('tutorialId');
    var createdBy = tutorialList.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    return tutorialList.find({ upvoterIds: currentCreator},{sort:  {score : -1}});

  },
formatCreatedAt: function(createdAt){
  return moment(createdAt).format('MMMM Do YYYY');
}

});