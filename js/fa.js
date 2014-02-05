

var callout_template = $('<div id="sp-callout" class="sp-callout">' + 
  'This webpage has not been loaded with a secure connection. This means that your password could be intercepted by others.' +
  '<br/>' +
  '<b>Please consider this before submitting this form.</b>' +
  '<br/>' +
  'Read more about this on the options page.' +
  '</div>');

var callout;

function processForms(user_options) {

  var is_page_secure = (window.location.protocol === 'https:') ? true : false;

  if (!is_page_secure || is_options_page) {

    $('form').each(function() {

      $(this).find('input[type="password"]').each(function() {
        addWarningStyle($(this), user_options);

        if (user_options.display_callout) {
          $(this).bind('focus', showCallout);
          $(this).bind('blur', hideCallout);
        } else if (is_options_page) {
          $(this).unbind();
        }

      });

    });

  }  
}

function addWarningStyle(elem, user_options) {
  elem.css('border', user_options.border_width + 'px ' + user_options.border_style + ' ' + user_options.border_color);
}

function showCallout() {
  if (!callout) {
    callout = $(callout_template);
    $('body').append(callout);
  }

  var callout_padding = Number(callout.css('padding').replace('px', ''));
  var callout_border = Number(callout.css('border-width').replace('px', ''));
  var callout_width = callout.width();
  var callout_computed_height = callout.height() + (callout_padding * 2) + (callout_border * 2);

  // Horizontal Positioning
  var x = $(this).offset().left + ($(this).width() / 2) - (callout_width / 2);
  var overshoot = (x + callout_width + (callout_padding * 2) + (callout_border * 2)) - $(window).width();

  // Move to the callout left if the callout is going off the page to the right.
  if (overshoot > 0) {
    x = x - overshoot;
  }

  // Move to the callout right if the callout is going off the page to the left.
  if (x < 0) {
    x = 0;
  }

  // Vertical Positioning
  var y = $(this).offset().top - callout_computed_height - 5;

  // If the callout is off the screen at the top move it under the password field instead.
  if (y < 0) {
    y = $(this).offset().top + $(this).height() + 5;
  }

  callout.css('left', x + 'px');
  callout.css('top', y + 'px');
}

function hideCallout() {
  callout.remove();
  callout = undefined;
}

$(document).ready(function(){
  if (window['is_options_page'] === undefined) {
    chrome.runtime.sendMessage({greeting: 'get_vars'}, function(response) {
      processForms(response);
    });
  }
});