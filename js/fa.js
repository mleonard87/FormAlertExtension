"use strict";

var callout_width = 350;
var callout_height = 100;

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

  if (!is_page_secure) {

    $('form').each(function() {

      $(this).find('input[type="password"]').each(function() {
        addWarningStyle($(this), user_options);

        if (user_options.display_callout) {
          $(this).bind('focus', showCallout);
          $(this).bind('blur', hideCallout);
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

  var x = $(this).offset().left + ($(this).width() / 2) - (callout_width / 2);
  var y = $(this).offset().top - callout_height - 5;

  callout.css('left', x + 'px');
  callout.css('top', y + 'px');
  
}

function hideCallout() {
  callout.remove();
  callout = undefined;
}

$(document).ready(function(){
  chrome.runtime.sendMessage({greeting: 'get_vars'}, function(response) {
    processForms(response);
  });
});