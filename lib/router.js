Router.configure({

  layoutTemplate: 'Layout'
});


Router.route('/', function () {
  this.render('list');
});
Router.route('/Profile');


/*Router.route('/iOSAndSwift',{
  path : '30/:name',
  template : 'iOSAndSwift',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});*/





Router.route('30/:name', function () {
  this.render('iOSAndSwift', {
    data: function () {
      Session.set('tutorialName', this.params.name);
    }
  });
});




Router.route('/MaterialDesign',{
  path : '31/:name',
  template : 'MaterialDesign',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});




Router.route('/MEAN',{
  path : '32/:name',
  template : 'MEAN',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Sketch',{
  path : '33/:name',
  template : 'Sketch',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Polymer',{
  path : '34/:name',
  template : 'Polymer',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/EmberJs',{
  path : '29/:name',
  template : 'EmberJs',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});


Router.route('/HTMLandCSS',{
  path : '12/:name',
  template : 'HTMLandCSS',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/CAndCPlusPlus',{
  path : '5/:name',
  template : 'CAndCPlusPlus',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Java',{
  path : '13/:name',
  template : 'Java',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Javascript',{
  path : '14/:name',
  template : 'Javascript',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Jquery',{
  path : '15/:name',
  template : 'Jquery',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/PHP',{
  path : '21/:name',
  template : 'PHP',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Meteor',{
  path : '16/:name',
  template : 'Meteor',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/AngularJs',{
  path : '2/:name',
  template : 'AngularJs',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Git',{
    path : '9/:name',
  template : 'Git',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Python', {
  path : '23/:name',
  template : 'Python',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/NodeJs',{
  path : '19/:name',
  template : 'NodeJs',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }

});

Router.route('/RubyOnRails',{
  path : '25/:name',
  template : 'RubyOnRails',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Ruby',{
  path : '26/:name',
  template : 'Ruby',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }

});

Router.route('/AndroidDevelopment',{
  path : '1/:name',
  template : 'AndroidDevelopment',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Wordpress',{
  path : '28/:name',
  template : 'Wordpress',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Mysql',{
  path : '18/:name',
  template : 'Mysql',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Mongodb',{
  path : '17/:name',
  template : 'Mongodb',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Photoshop',{
    path : '22/:name',
  template : 'Photoshop',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Perl',{
    path : '20/:name',
  template : 'Perl',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/SQL',{
    path : '27/:name',
  template : 'SQL',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/ReactAndReactNative',{
    path : '24/:name',
  template : 'ReactAndReactNative',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Hadoop',{
    path : '11/:name',
  template : 'Hadoop',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/GO',{
    path : '10/:name',
  template : 'Go',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Express',{
    path : '8/:name',
  template : 'Express',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Django',{
    path : '7/:name',
  template : 'Django',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/CSharp',{
    path : '6/:name',
  template : 'CSharp',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Bootstrap',{
    path : '4/:name',
  template : 'Bootstrap',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/Backbone',{
    path : '3/:name',
  template : 'Backbone',
  data : function(){
    Session.set('tutorialName', this.params.name);
  }
});

Router.route('/showProfile', {
  path : '/showProfile/:_id',
  template : 'showProfile',
  data: function(){
        Session.set('tutorialId', this.params._id);
        return tutorialList.findOne(this.params._id);

   }
});