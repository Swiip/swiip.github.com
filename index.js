$(document).scroll(function(){
  // If has not activated (has no attribute "data-top"
  if (!$('.subnav').attr('data-top')) {
    // If already fixed, then do nothing
    if ($('.subnav').hasClass('subnav-fixed')) return;
    // Remember top position
    var offset = $('.subnav').offset()
    $('.subnav').attr('data-top', offset.top);
  }

  if ($('.subnav').attr('data-top') - $('.subnav').outerHeight() <= $(this).scrollTop())
    $('.subnav').addClass('subnav-fixed');
  else
    $('.subnav').removeClass('subnav-fixed');
});

$(function() {
  /*var twitterApiUrl = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=Swiip&count=5&callback=?";
  $.getJSON(twitterApiUrl, function(data) {
    $(".tweets").html(_.template($("#twitter-template").html(), {data: data}));
  });*/

  var pipesFeedUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=abd597e918e5e37074de88e6a531cbfe&_render=rss";
  $.get(pipesFeedUrl, function(data) {
    var articles = new Array();
    $(data).find("item").each(function() {
      articles.push({
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        pubDate: $(this).find("pubDate").text(),
        description: $(this).find("description").text()
      });
    });
    $(".feed").html(_.template($("#feed-template").html(), {data: articles}));
  }, "xml");
});