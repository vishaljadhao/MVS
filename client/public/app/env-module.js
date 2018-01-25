/*
* Environment Modules
*
* Description
*/

(function (window) {
  window.__env = window.__env || {};

  // API url  
  // In your application this can be a url like https://api.github.com
  window.__env.apiUrl = 'https://api.myservices.com';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));