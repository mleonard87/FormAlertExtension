// The message communication channel between the content scripts and the background 
// scripts can be surpressed by setting this flag to true. This is done here so
// that the content script can also be loaded on the options page to show a 
// preview.
var is_options_page = true;