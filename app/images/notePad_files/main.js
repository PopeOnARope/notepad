var home;
var complete;
$(document).ready(function(){
	home = new Page("homePage");
	complete = new Page("completePage");
	homePage.init();

	homePage.NewPost();
	completePage.init();
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
	removeTodoData : function(arr, arr2, item) {
      var newArray = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
        var pushThis = arr[i];
          arr.splice(i, 1);
          arr2.push(pushThis);

        }
      }
    },
    showHide: function($target1, $target2){
    	$target1.show();
    	$target2.hide();
    },

    DeletePost: function(){
		var thisIndex = $(this).closest("div").data("index");
		home.removeTodoData(noteArray, completedTasks, noteArray[thisIndex]);
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

var completePage = {
	init: function(){
		$(".complete").hide();
		complete.addTmpl($(".complete"), $("#completeInfo").html(), completedTasks);
		$(".notes").on("click", ".removeNote", function(){
			complete.replaceTmpl($(".complete"), $("#completeInfo").html(), completedTasks);
		});
		complete.togglePages;
	}
},
	togglePages: function(){
	$(".linkToCompletedTasks").on("click", home.showHide($(".complete"), $(".notes")));
	}

