$(document).ready(function() {

  var toggleAffix = function(affixElement, scrollElement, wrapper) {
  
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }
    else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
      
  };
  

  $('[data-toggle="affix"]').each(function() {
    var ele = $(this),
        wrapper = $('<div></div>');
    
    ele.before(wrapper);
    $(window).on('scroll resize', function() {
        toggleAffix(ele, $(this), wrapper);
    });
    
    // init
    toggleAffix(ele, $(window), wrapper);
  });
  
});

$('.carousel').carousel({
  interval: 2000
});

// $(function(){
//   $(".dropdown").hover(            
//     function() {
//         $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
//         $(this).toggleClass('show');
//     },
//     function() {
//         $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
//         $(this).toggleClass('show');
//     });
//   });