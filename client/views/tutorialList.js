Template.list.events({
 'click .collection-item': function(event,template){
    window.scrollTo(0,0);

  }
});

Template.tabs.helpers({
	Count : function(tutorialCategory)
	{
	 	return tutorialList.find({category : tutorialCategory}).count();
	},
	topVoted : function(){

		return tutorialList.find({},{sort:  {score : -1} , limit : 8});
	}
});

Template.tabs.rendered = function(){
	$('ul.tabs').tabs();
};
