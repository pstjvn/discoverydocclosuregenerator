goog.provide('discovery.view.Main');
goog.provide('discovery.view.MainRenderer');

goog.require('discovery.template');
goog.require('goog.ui.registry');
goog.require('pstj.material.Button');
goog.require('pstj.material.Element');
goog.require('pstj.material.ElementRenderer');
goog.require('pstj.material.Fab');
goog.require('pstj.material.HeaderPanel');
goog.require('pstj.material.Input');
goog.require('pstj.material.template');


goog.scope(function() {
var E = pstj.material.Element;
var ER = pstj.material.ElementRenderer;


/** @extends {E} */
discovery.view.Main = goog.defineClass(E, {
  constructor: function() {
    E.call(this);
  }
});


/** @extends {ER} */
discovery.view.MainRenderer = goog.defineClass(ER, {
  constructor: function() {
    ER.call(this);
  },

  /** @override */
  getTemplate: function() {
    return discovery.template.Application(null);
  },

  /** @override */
  getCssClass: function() {
    return discovery.view.MainRenderer.CSS_CLASS;
  },

  statics: {
    /** @const {string} */
    CSS_CLASS: goog.getCssName('discovery-app')
  }
});
goog.addSingletonGetter(discovery.view.MainRenderer);

// Register for default renderer.
goog.ui.registry.setDefaultRenderer(discovery.view.Main,
    discovery.view.MainRenderer);


// Register decorator factory function.
goog.ui.registry.setDecoratorByClassName(
    discovery.view.MainRenderer.CSS_CLASS, function() {
      return new discovery.view.Main();
    });

});  // goog.scope
