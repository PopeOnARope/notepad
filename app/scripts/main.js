var home;
$(document).ready(function(){
	home = new Page("homePage");
	homePage.init();

	homePage.NewPost();
	


});


function Page(name) {
	this.name=name;
}



Page.prototype = {
	// constructor: Page,
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

		$(this).data("index"); // return index of array item
	},
	replaceCounter: function($target, data){
		$target.empty();
		$target.append(data);
	},
	removeTodoData : function(arr, item) {
      var newArray = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
          arr.splice(i, 1);
        }
      }
    },
    DeletePost: function(){
		var thisIndex = $(this).closest("div").data("index");
		home.removeTodoData(noteArray, noteArray[thisIndex]);
		home.replaceTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.replaceCounter($(".counter"), noteArray.length);	
	}


};

var homePage = {
	init: function(){
		home.addTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.addCounter($(".counter"), noteArray.length);
		console.log("init is happening yo");
		$(".notes").on("click", ".removeNote", home.DeletePost);
	},
	AppendPost: function(){
		
		home.replaceTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.replaceCounter($(".counter"), noteArray.length);
		console.log("append success");
	},
	NewPost: function(){
		$("#newPostform").on("submit", function(e) {
		e.preventDefault();
		var note1 = $(".newPostTitle").val();
		$(".newPostTitle").val("");
		var noteObject = ({note: note1});
		noteArray.unshift(noteObject);
		homePage.AppendPost();
		console.log(noteArray);
		console.log(noteArray.length);
		});
}

}