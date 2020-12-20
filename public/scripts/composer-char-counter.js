$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    $('#tweet-text').empty();
    const charsLeft = 140 - $(this).val().length;
    const counterNode = $(this).closest("form").find(".counter");
    counterNode.val(charsLeft);
    if (charsLeft < 0) {
      counterNode.addClass("negative");
    } else {
      counterNode.removeClass("negative");
    }
  });
});