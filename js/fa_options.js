"use_strict";

function setUserValues() {
  $('#option-display-callout').prop('checked', booleanToChecked(display_callout));
  $('#option-display-icon').prop('checked', booleanToChecked(display_icon));
  $('#option-border-color').css('background-color', border_color);
  $('#option-border-width').val(border_width)
  $('#option-border-style').val(border_style);
}

function bindChangeEvents() {

  $('#option-display-callout').change(function() {
    saveOption('display_callout', $(this).prop('checked'));
  });

  $('#option-display-icon').change(function() {
    saveOption('display_icon', $(this).prop('checked'));
  });

  $('#option-border-color').colpick({
    colorScheme:'light',
    layout: 'rgbhex',
    color: border_color,
    onSubmit: function(hsb, hex, rgb, el) {
        saveOption('border_color', '#' + hex);
        $(el).css('background-color', '#' + hex);
        $(el).colpickHide();
      }
    });

  $('#option-border-width').change(function() {
    saveOption('border_width', $(this).val());
  });

  $('#option-border-style').change(function() {
    saveOption('border_style', $(this).val());
  });
}

function restoreDefaults() {
  if (confirm("Are you sure you want to restore these settings to the defaults?")) {
    saveOption('display_callout', default_display_callout);
    saveOption('display_icon', default_display_icon);
    saveOption('border_color', default_border_color);
    saveOption('border_width', default_border_width);
    saveOption('border_style', default_border_style);

    setUserValues();
  }

  return false;
}

$(document).ready(function() {
  setUserValues();
  bindChangeEvents();

  $('#restore-defaults').bind('click', restoreDefaults);

  previewOptions();
});