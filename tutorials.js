playersList6 = new Meteor.Collection('players');


var count=0;



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
        return playersList6.findOne(this.params._id);

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
    var createdBy = playersList6.findOne({_id : tutorialId},{createdBy:1});
    var currentCreator = createdBy.createdBy;
    console.log(currentCreator);
     return playersList6.find({createdBy : currentCreator},{sort:  {score : -1, name: 1}});
  

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
    return playersList6.find({createdBy : Meteor.userId()},{sort:  {score : -1, name: 1}});
  }
});


Template.tutorialDisplay.events({
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
  return playersList6.find({category:"Wordpress"},{sort:  {score : -1, name: 1}});
}
});



Template.addTutorialForm.events({

'submit form' : function(event,template)
{
event.preventDefault();
/*var playerNameVar = template.find('#playerName').value; */
 
          var playerNameVar= event.target.playerName.value;
          var playerUrlVar= event.target.playerUrl.value;
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

          Meteor.call('insertPlayerData', playerNameVar,playerUrlVar,selectVar,profileName,pictureUrl);

          event.target.playerName.value="";
          event.target.playerUrl.value="";
          

          Meteor.setTimeout(function(){  
          window.scrollTo(0, document.body.scrollHeight);}, 1000);
         
      
        
  }
});



} /*is.client*/

if(Meteor.isServer)
{
   

Meteor.publish('thePlayers', function(){
 var currentUserId = this.userId;
 return playersList6.find();
});

Meteor.publish("userInformation", function() {
return Meteor.users.find();
});

Meteor.methods({
'insertPlayerData' : function(playerNameVar,playerUrlVar,selectVar,profileName,pictureUrl)
{
var currentUserId = Meteor.userId();
playersList6.insert({
  name: playerNameVar,
  url: playerUrlVar,
  score: 0, 
  category: selectVar,
  createdBy : currentUserId,
  profileName : profileName,
  pictureUrl : pictureUrl
});
},





'modifyPlayerScore' : function(selectedPlayer, scoreValue)
{
 playersList6.update({_id: selectedPlayer} , {$inc :{score: scoreValue}});
}



});

}


