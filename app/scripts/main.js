var home;
$(document).ready(function(){
	home = new Page("homePage");
	homePage.init();

	homePage.NewPost();
	homePage.DeletePost();


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
        if (arr[i] !== item) {
          newArray.push(arr[i]);
        }
      }
      return newArray;
    }
	//remove function
	//template to create new html string based on 

};

var homePage = {
	init: function(){
		home.addTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.addCounter($(".counter"), noteArray.length);
		console.log("init is happening yo");
	},
	AppendPost: function(){
		
		home.replaceTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		home.replaceCounter($(".counter"), noteArray.length);
		console.log(" append success");
	},
	DeletePost: function(){
		$(".removeNote").on("click", function(){
		var thisIndex = $(this).closest("div").data("index");
		console.log(
		home.removeTodoData(noteArray, noteArray[thisIndex]));
		// home.replaceTmpl($(".notes"), $("#noteInfo").html(), noteArray);
		// $(this).closest("div").empty();
		// home.replaceCounter($(".counter"), noteArray.length);
		});	
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