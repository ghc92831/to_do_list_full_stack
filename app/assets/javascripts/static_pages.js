$(document).on("turbolinks:load", function () {

});

var getAllTasks = function () {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-12 mb-3 p-2 border rounded task active' id='task-content' data-id='" + task.id + "'><input type='checkbox' class='mark-complete' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + "> \
        " + task.content + "<button class='delete fa fa-trash fa-sm' data-id='" + task.id + "'></button>\
        </div>";
    });

    $("#todo-list").html(htmlString);
  });
}

$(".static_pages.index").ready(function(){

  //------------------- To do list ---------------------

  $("#addTask").on("click", function (e) {
    e.preventDefault();
    if (!$("#task-input").val()) { return; }

    postTask($("#task-input").val());
    getAllTasks();
    $("#task-input").val("");
  });

  $(document).on("click", ".delete", function() {
    deleteTask($(this).data("id"));
    $(this).parents(".task").remove();
  });

  $(document).on("change", ".mark-complete", function () {
    var checkboxDataId = $(this).data("id")
    var parentNode = this.parentNode
    if (this.checked) {
      markTaskComplete(checkboxDataId);
      removeClass(parentNode, "active");
      addClass(parentNode, "completed");

    } else {
      markTaskActive($(this).data("id"));
      removeClass(parentNode, "completed");
      addClass(parentNode, "active");
    }
  });

  $(document).on("click", ".filter-button", function() {
    var filterSelection = $(this).attr('id');
    var taskElement =  document.getElementsByClassName("task");
    var completedTaskElement = document.getElementsByClassName("completed");

    if (filterSelection == "all") {
        getAllTasks();
      }

    if (filterSelection == "active") {
      for (var i=0; i<taskElement.length; i++) {
        removeClass(taskElement[i], "hide");
        if (taskElement[i].className.indexOf("completed") > -1) {
          addClass(taskElement[i], "hide");
        }
      }
    }

    if (filterSelection == "completed") {
      for (var i=0; i<taskElement.length; i++) {
        removeClass(taskElement[i], "hide");
          if (taskElement[i].className.indexOf("completed") == -1) {
            addClass(taskElement[i], "hide");
          }
        }
      }

    if (filterSelection == "clear-completed") {
      for (var i=0; i<completedTaskElement.length; i++) {
        var completedTaskDataId = completedTaskElement[i].getAttribute("data-id");
        deleteTask(completedTaskDataId);
      }
      $(".completed").remove();
    }
  });

  var addClass = function (element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  var removeClass = function(element, name) {
    var arr1 = element.className.split(" ");
    var arr2 = name.split(" ");
    for (var i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  getAllTasks();

});
