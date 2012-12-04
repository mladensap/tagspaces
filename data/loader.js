/* Copyright (c) 2012 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */
console.debug("Loading Loader...");

require.config({
    map: {
      '*': {
        'css': 'libs/requirecss/css'
      }
    },
    paths: {
        jquery: 'libs/jquery/jquery-1.8.3',
        jquerylayout: 'libs/jquerylayout/jquery.layout-latest.min',
        jquerylayoutcss: 'libs/jquerylayout/layout-default-latest',
        jqueryui: 'libs/jqueryui/jquery-ui-1.9.2.custom',
        jqueryuicss: 'libs/jqueryui/custom-theme/jquery-ui-1.9.2.custom',
        dynatree: 'libs/dynatree/jquery.dynatree.min',
        dynatreecss: 'libs/dynatree/skin-vista/ui.dynatree',        
        datatables: 'libs/datatables/js/jquery.dataTables.min',
        datatablescss: 'libs/datatables/css/jquery.dataTables',
        jsoneditor: 'libs/jsoneditor/jsoneditor',
        jsoneditorcss: 'libs/jsoneditor/jsoneditor',
        less: 'libs/less/less-1.3.1',
    }, 
    shim: {
        'jquerylayout': {
            deps: [
                'jquery'
            ]
        },
        'jqueryui': {
            deps: [
                'jquery'
            ]
        },
        'dynatree': {
            deps: [
                'jquery'
            ]
        },
        'datatables': {
            deps: [
                'jquery'
            ]
        },
/*        less: {
            deps: [
                'css!jquerylayoutcss',
                'css!jqueryuicss',
                'css!dynatreecss',
                'css!datatablescss',
                'css!jsoneditorcss'
                ]
        },*/
    }  
});

// Init Application
require(['js/main'], 
    function(Main) { 
        Main.initializeApp();
    }
);    