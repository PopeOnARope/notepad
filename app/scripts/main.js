var home;
$(document).ready(function(){
	home = new Page("homePage");
	homePage.init();

	NewPost();

$(".removeNote").on("click", function(){
	console.log("test");
	$(this).closest("div").empty();
})



});

function NewPost(){
	$("#newPostform").on("submit", function(e) {
	e.preventDefault();
	var note1 = $(".newPostTitle").val();
	var noteObject = ({note: note1});
	noteArray.unshift(noteObject);
	homePage.AppendPost();
	console.log(noteArray);
	console.log(noteArray.length);
	});
}



function Page(name) {
	this.name=name;
}
Page.prototype = {
	constructor: Page,
	addTmpl: function($target, template, data) {
		var tmpl = _.template(template, data);
			$target.append(tmpl);
	},
	addCounter: function($target, data){
		$target.append(data);
	},
	replaceTmpl: function($target, template, data) {
	var tmpl = _.template(template, data);
		$target.empty();
		$target.append(tmpl);
	},
	replaceCounter: function($target, data){
		$target.empty();
		$target.append(data);

	}





};

var homePage = {
	init: function(){
		home.addTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.addCounter($(".counter"), noteArray.length);
		console.log("init is happening yo");
	},
	AppendPost: function(){
		home.replaceTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.replaceCounter($(".counter"), noteArray.length)
		console.log(" append success");
	}

}