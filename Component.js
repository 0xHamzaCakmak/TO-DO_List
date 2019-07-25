'use strict'
jQuery.sap.require('SapUI5Tutorial.Router')
sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel'
  ],
  function (UIComponent, JSONModel) {
    return UIComponent.extend('SapUI5Tutorial.Component', {
      metadata: {
        routing: {
          config: {
            routerClass: SapUI5Tutorial.Router,
            viewType: 'XML',
            targetAggregation: 'pages',
            clearTarget: false
          },
          routes: [{
            pattern: '',
            viewPath: 'SapUI5Tutorial.Application.Login.view',
            view: 'Login',
            name: 'Login',
            targetControl: 'masterAppView'
          },
          {
            pattern: 'Second',
            viewPath: 'SapUI5Tutorial.Application.Login.view',
            view: 'Second',
            name: 'Second',
            targetControl: 'masterAppView'
          },
          {
            pattern: 'Third',
            viewPath: 'SapUI5Tutorial.Application.Login.view',
            view: 'Third',
            name: 'Third',
            targetControl: 'masterAppView'
          },
        ]
        }
      },
      init: function () {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        var mConfig = this.getMetadata().getConfig();
        this.getRouter().initialize();
      },
      createContent: function () {
        var oViewData = {
          component: this
        }
        return sap.ui.view({
          viewName: 'SapUI5Tutorial.RootApp',
          type: sap.ui.core.mvc.ViewType.XML,
          id: 'app',
          viewData: oViewData
        })
      }
    })
  }
)