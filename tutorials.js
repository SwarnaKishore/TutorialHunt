playersList8 = new Meteor.Collection('players');



Router.route('/', function () {
  this.render('list');
});
Router.route('/Profile');
Router.route('/HTML&CSS');
Router.route('/C&C++');
Router.route('/Java');
Router.route('/Javascript');
Router.route('/Jquery');
Router.route('/PHP');
Router.route('/Meteor');
Router.route('/AngularJs');
Router.route('/Git');
Router.route('/Python');
Router.route('/NodeJs');
Router.route('/RubyOnRails');
Router.route('/Ruby');
Router.route('/AndroidDevelopment');
Router.route('/Wordpress');
Router.route('/Mysql');
Router.route('/Mongodb');
Router.route('/Photoshop');

Router.route('/showProfile', {
  path : '/showProfile/:_id',
  template : 'showProfile',
  data: function(){
        Session.set('tutorialId', this.params._id);
        return playersList8.findOne(this.params._id);

   }
});

if(Meteor.isClient)
{
   

  Meteor.subscribe('thePlayers');
  Meteor.subscribe('userInformation');



Template.showProfile.helpers({
createdBy:function(){
  var tutorialId = Session.get('tutorialId');
  console.log(tutorialId);
    var createdBy = playersList8.findOne({_id : tutorialId},{createdBy:1});
    console.log(createdBy);
    var currentCreator = createdBy.createdBy;
    console.log(currentCreator);
     return playersList8.find({createdBy : currentCreator},{sort:  {score : -1, name: 1}});
  

  }
});






Template.Profile.helpers({

  
  profilename: function() {
    return Meteor.user().username || Meteor.user().profile.name;
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
          

        },


  createdBy:function(){
    return playersList8.find({createdBy : Meteor.userId()},{sort:  {score : -1, name: 1}});
  }
});


Template.tutorialDisplay.events({
  'click #addScore': function (event, template) {
    var userId = Meteor.userId();
    var tutorialId = this._id;
    Session.set('selectedTutorial', tutorialId);
    var selectedPlayer = Session.get('selectedTutorial');

    

        if(userId == null)
        {
         $('#modal1').openModal();

        } 
        else
        {   

            var test = playersList8.findOne({_id:this._id, upvoterIds : userId});

            console.log(test);

            if(test)
            {
              Meteor.call('modifyTutorialScore',selectedTutorial,-1);
              Meteor.call('removeScoreIds',selectedTutorial,userId);
              $("#addScore").removeClass("upvoted");
              
              
            }
            else
              {
              Meteor.call('modifyPlayerScore',selectedTutorial,1);
              Meteor.call('addScoreIds',selectedTutorial,userId);
              $("#addScore").addClass("upvoted");
               var test2 = playersList8.findOne({_id:this._id, upvoterIds : userId});

            console.log(test2);
              }
             

        }
  }
 });


Template.Wordpress.helpers({
 Wordpress: function()
 {
  var currentUserId = Meteor.userId();
  return playersList8.find({category:"Wordpress"},{sort:  {score : -1, name: 1}});
}
});



Template.addTutorialForm.events({

'submit form' : function(event,template)
{
event.preventDefault();
/*var playerNameVar = template.find('#playerName').value; */
 
          var tutorialNameVar= event.target.tutorialName.value;
          var tutorialUrlVar= event.target.tutorialUrl.value;
          var selectVar = "Python";
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

          Meteor.call('insertTutorialData', tutorialNameVar,tutorialUrlVar,selectVar,profileName,pictureUrl);

          event.target.tutorialName.value="";
          event.target.tutorialUrl.value="";
          

          Meteor.setTimeout(function(){  
          window.scrollTo(0, document.body.scrollHeight);}, 1000);
         
      
        
  }
});



} /*is.client*/

if(Meteor.isServer)
{
   

Meteor.publish('thePlayers', function(){
 var currentUserId = this.userId;
 return playersList8.find();
});

Meteor.publish("userInformation", function() {
return Meteor.users.find();
});

Meteor.methods({
'insertTutorialData' : function(tutorialNameVar,tutorialUrlVar,selectVar,profileName,pictureUrl)
{
var currentUserId = Meteor.userId();
var createdAt = Meteor.user().createdAt;
playersList8.insert({
  name: tutorialNameVar,
  url: tutorialUrlVar,
  score: 0, 
  category: selectVar,
  createdBy : currentUserId,
  createdAt : createdAt,
  profileName : profileName,
  pictureUrl : pictureUrl
});
},





'modifyTutorialScore' : function(selectedTutorial, scoreValue)
{
 playersList8.update({_id: selectedTutorial} , {$inc :{score: scoreValue}});
},


'addScoreIds' : function(selectedTutorial,userId)
{
 playersList8.update({_id: selectedTutorial}, {
      $addToSet: {upvoterIds: userId}
    }); 
},


'removeScoreIds' : function(selectedPlayer,userId)
{
  playersList8.update({_id: selectedPlayer}, {
      $pull: {upvoterIds: userId}
    }); 
}


});

}


