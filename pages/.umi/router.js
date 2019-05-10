import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/exclude",
        "exact": true,
        "component": require('../exclude.js').default
      },
      {
        "path": "/animated-transitions",
        "exact": false,
        "component": require('../animated-transitions/_layout.js').default,
        "routes": [
          {
            "path": "/animated-transitions/blue",
            "exact": true,
            "component": require('../animated-transitions/blue.js').default
          },
          {
            "path": "/animated-transitions/green",
            "exact": true,
            "component": require('../animated-transitions/green.js').default
          },
          {
            "path": "/animated-transitions/red",
            "exact": true,
            "component": require('../animated-transitions/red.js').default
          },
          {
            "component": () => React.createElement(require('/Users/moken/Desktop/web_openpose/myapp/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "path": "/list",
        "exact": true,
        "component": require('../list/index.js').default,
        "Routes": [require('../../routes/PrivateRoute.js').default]
      },
      {
        "path": "/prompt",
        "exact": true,
        "component": require('../prompt.js').default
      },
      {
        "path": "/scroll-to-top",
        "exact": false,
        "component": require('../scroll-to-top/_layout.js').default,
        "routes": [
          {
            "path": "/scroll-to-top/a",
            "exact": true,
            "component": require('../scroll-to-top/a.js').default
          },
          {
            "path": "/scroll-to-top/b",
            "exact": true,
            "component": require('../scroll-to-top/b.js').default
          },
          {
            "component": () => React.createElement(require('/Users/moken/Desktop/web_openpose/myapp/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "path": "/users/posts/:post",
        "exact": false,
        "component": require('../users/posts/$post/_layout.js').default,
        "routes": [
          {
            "path": "/users/posts/:post/comments",
            "exact": true,
            "component": require('../users/posts/$post/comments.js').default
          },
          {
            "component": () => React.createElement(require('/Users/moken/Desktop/web_openpose/myapp/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "path": "/users/:id?",
        "exact": true,
        "component": require('../users/$id$.js').default
      },
      {
        "component": () => React.createElement(require('/Users/moken/Desktop/web_openpose/myapp/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/moken/Desktop/web_openpose/myapp/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
