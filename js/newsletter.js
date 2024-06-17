let manager = klaro.getManager();
if (manager.getConsent('newsletter')){

  $(document).scroll(function() {

    var y = $(this).scrollTop(),
        news = $('.news');
      
    if (y > 600) {
      news.fadeIn();
    } else {
      news.fadeOut();
    }
   
    // TODO: Missing close button
    
    // TODO: missing reset when changing links
    // TODO: missing fadeout when finish 
  });
}