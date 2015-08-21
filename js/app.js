/**
 * @fileoverview Utility app to test closure compatible code generation
 * from a discovery document.
 *
 * @author regardingscot@gmail.com (Peter StJ)
 */

goog.provide('app');

goog.require('discovery.controller.Main');

// goog.require('goog.html.SafeHtml');
// goog.require('goog.labs.net.xhr');
// goog.require('pstj.ds.discovery.Document');
// goog.require('pstj.sourcegen.ClosureGenerator');


(function() {
  (new discovery.controller.Main());
})();
