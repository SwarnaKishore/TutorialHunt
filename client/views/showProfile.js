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