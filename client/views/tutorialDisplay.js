Template.tutorialDisplay.helpers({
  upvotedClass: function() {
    var userId = Meteor.userId();
    var tutorial = tutorialList.findOne(this._id);
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
   },
   "click .url": function (event, template) {
    event.preventDefault();
    var tutorialId = this._id;
    Session.set('selectedTutorial', tutorialId);
     var selectedTutorial = Session.get('selectedTutorial');
     console.log(selectedTutorial);
    
    
  }

 });


