"use_strict";

var default_display_callout = true;
var default_display_icon = true;
var default_border_color = '#f00';
var default_border_width = 2;
var default_border_style = 'solid';

var display_callout = (localStorage['display_callout'] != undefined) ? parseBoolean(localStorage['display_callout']) : default_display_callout;
var display_icon = (localStorage['display_icon'] != undefined) ? parseBoolean(localStorage['display_icon']) : default_display_icon;
var border_color = (localStorage['border_color'] != undefined) ? localStorage['border_color'] : default_border_color;
var border_width = (localStorage['border_width'] != undefined) ? localStorage['border_width'] : default_border_width;
var border_style = (localStorage['border_style'] != undefined) ? localStorage['border_style'] : default_border_style;

function saveOption(option_name, option_value) {
  window[option_name] = option_value;
  localStorage[option_name] = option_value;
}

function parseBoolean(booleanStr) {
  if (booleanStr === "true") {
    return true;
  } else {
    return false;
  }
}

function booleanToChecked(boolean) {
  if (boolean === undefined) {
    return '';
  } else if (boolean === true) {
    return 'checked';
  } else {
    return '';
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == 'get_vars')
      sendResponse({
        'display_callout': display_callout,
        'display_icon': display_icon,
        'border_color': border_color,
        'border_width': border_width,
        'border_style': border_style
      });
  }
);