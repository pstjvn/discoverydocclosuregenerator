goog.provide('discovery.controller.Main');

goog.require('discovery.view.Main');
goog.require('goog.dom.safe');
goog.require('goog.html.SafeHtml');
goog.require('goog.labs.net.xhr');
goog.require('goog.ui.Component.EventType');
goog.require('pstj.control.Control');
goog.require('pstj.ds.discovery.Document');
goog.require('pstj.sourcegen.ClosureGenerator');

goog.scope(function() {
var C = pstj.control.Control;


/** @extends {C} */
discovery.controller.Main = goog.defineClass(C, {
  constructor: function() {
    C.call(this);
    /**
     * Current content.
     * @type {string}
     * @protected
     */
    this.content = '';
    this.init();
  },

  /** @override */
  init: function() {
    goog.base(this, 'init');
    var view = new discovery.view.Main();
    view.render(document.body);
    this.getHandler().listen(
        view,
        goog.ui.Component.EventType.ACTION,
        this.handleButtonAction);
  },

  /**
   * Handles the action coming from the main view.
   * @param  {goog.events.Event} e
   * @protected
   */
  handleButtonAction: function(e) {
    var action = e.target.getAction();
    switch (action) {
      case 'go':
        this.generate(e);
        break;
      case 'download':
        this.download();
        break;
      default: throw new Error('Unknown action: ' + action);
    }
  },

  /**
   * Generates the content.
   * @param  {goog.events.Event} e
   * @protected
   */
  generate: function(e) {
    var url = e.target.getParent().getChildAt(0).getValue();
    goog.labs.net.xhr.getJson(url).then(function(res) {
      goog.asserts.assertObject(res);
      var doc = new pstj.ds.discovery.Document(res);
      var generator = new pstj.sourcegen.ClosureGenerator(doc);
      this.content = generator.generate();
      var str = goog.html.SafeHtml.htmlEscape(this.content);
      goog.dom.safe.setInnerHtml(
          goog.asserts.assertElement(document.getElementById('result')), str);
    }, null, this);
  },

  download: function() {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/javascript;charset=utf-8,' +
        this.content);
    a.setAttribute('download', 'rpc.js');

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      a.dispatchEvent(event);
    }
    else {
      a.click();
    }
  }
});

});  // goog.scope
