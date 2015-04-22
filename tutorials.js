playersList3 = new Meteor.Collection('players');
Avatar.options = {
  fallbackType: 'initials',
  gravatarDefault: 'identicon'
  //defaultImageUrl: 'img/avatar.jpg'
};

var count=0;



Router.route('/', function () {
  this.render('list');
});
Router.route('Profile');
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

if(Meteor.isClient)
{


  Meteor.subscribe('thePlayers');
  Meteor.subscribe('userInformation');









Template.Profile.helpers({
  profileName: function() {
    return Meteor.user().username || Meteor.user().profile.name;
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
    return playersList3.find({createdBy : Meteor.userId()},{sort:  {score : -1, name: 1}});
  }
});



Template.Python.helpers({
 Python: function()
 {
  var currentUserId = Meteor.userId();
  return playersList3.find({category:"Python"},{sort:  {score : -1, name: 1}});
}
});
Template.Python.events({
  'click #addScore': function (event, template) {
    var userId = Meteor.userId();
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');

    

        if(userId == null)
        {
         $('#modal1').openModal();

        } 
        else
        {

        if(count==0)
        {
          Meteor.call('modifyPlayerScore',selectedPlayer,1);
          $("#addScore").addClass("upvoted");

          count=1;
         
        }


        else
          {
        Meteor.call('modifyPlayerScore',selectedPlayer,-1);
        $("#addScore").removeClass("upvoted");

          
          count = 0;
          }
        }
  }
 });

Template.Wordpress.helpers({
 Wordpress: function()
 {
  var currentUserId = Meteor.userId();
  return playersList3.find({category:"Wordpress"},{sort:  {score : -1, name: 1}});
}
});
Template.Wordpress.events({
  'click #addScore': function (event, template) {
    var userId = Meteor.userId();
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');

    

        if(userId == null)
        {
       $('#modal1').openModal();

        }
        else
        {

        if(count==0)
        {
          Meteor.call('modifyPlayerScore',selectedPlayer,1);
          count=1;
        }


        else
          {
        Meteor.call('modifyPlayerScore',selectedPlayer,-1);
        
          count = 0;
          }
        }
  }
 });


Template.addTutorialForm.events({

'submit form' : function(event,template)
{
event.preventDefault();
/*var playerNameVar = template.find('#playerName').value; */
 
          var playerNameVar= event.target.playerName.value;
          var playerUrlVar= event.target.playerUrl.value;
          var selectVar = event.target.selectId.value;

          Meteor.call('insertPlayerData', playerNameVar,playerUrlVar,selectVar);

          event.target.playerName.value="";
          event.target.playerUrl.value="";
          event.target.selectId.value="";

          Meteor.setTimeout(function(){  
          window.scrollTo(0, document.body.scrollHeight);}, 1000);
         
      
        
  }
});



} /*is.client*/

if(Meteor.isServer)
{
   Meteor.startup(function () {
    console.log('startup...');
    console.log('options:', Avatar.options);
    console.log('url:', Avatar.getUrl());
  });

Meteor.publish('thePlayers', function(){
 var currentUserId = this.userId;
 return playersList3.find();
});

Meteor.publish("userInformation", function() {
return Meteor.users.find();
});

Meteor.methods({
'insertPlayerData' : function(playerNameVar,playerUrlVar,selectVar)
{
var currentUserId = Meteor.userId();
playersList3.insert({
  name: playerNameVar,
  url: playerUrlVar,
  score: 0, 
  category: selectVar,
  createdBy : currentUserId
});
},





'modifyPlayerScore' : function(selectedPlayer, scoreValue)
{
 playersList3.update({_id: selectedPlayer} , {$inc :{score: scoreValue}});
}



});

}


















