Router.configure({

  layoutTemplate: 'Layout'
});



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

Router.route('/Python', {
  path : '/tutorial/:name',
  template : 'Python',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

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
        return tutorialList.findOne(this.params._id);

   }
});