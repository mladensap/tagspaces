/* Copyright (c) 2012 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */
// Activating browser specific IOAPI modul
define(function(require, exports, module) {
"use strict";

console.debug("Loading messaging.mozilla.js..");
document.documentElement.addEventListener("addon-message1", function(event) {
    console.debug("Message received in page script from content script: "+JSON.stringify(event.detail));
    UIAPI.hideLoadingAnimation();
    var message = event.detail;
    switch (message.command) {
      case "loadSettings":
        if(message.success) {
            try {
                console.debug("Loading settings...: "+JSON.stringify(message.content));
                TSSETTINGS.updateSettingMozillaPreferences(message.content);
            } catch (ex) {
                console.debug("Exception while getting setting from firefox failed "+ex)
            }
        } else {
            console.debug("Getting setting from firefox failed") 
        }
        break;
      case "saveSettings":
        if(message.success) {
            console.debug("Saving setting as native mozilla preference successfull!")
        } else {
            console.debug("Saving setting as native mozilla preference failed!")            
        }
        break;        
      case "updateDefaultPath":
        if(message.content.length > 1) {
            UIAPI.setCurrentPath(message.content);
        }
        break;
      case "rename":
        if(message.success){
            UIAPI.updateLogger("Rename success");   
            // message.content contains the name of the file after the rename
            UIAPI.selectedFiles[0] = message.content;
            if(UIAPI.isFileOpened) {
               FileViewer.openFile(UIAPI.selectedFiles[0]);
            }            
        } else {
            UIAPI.updateLogger("Rename failed");        
        }
        break;
      case "saveTextFile":
        if(message.success){
            UIAPI.updateLogger("Save success");             
        } else {
            UIAPI.updateLogger("Save failed");      
        }
        break;
      case "createDirectory":
        if(message.success){
            UIAPI.updateLogger("Create dir success");            
            DirectoriesUI.openFavorite(TSSETTINGS.Settings["tagspacesList"][0].path, TSSETTINGS.Settings["tagspacesList"][0].name);
        } else {
            UIAPI.updateLogger("Create dir failed");        
        }
        break;
      case "loadTextFile":
        if(message.success){
            UIAPI.updateTextEditorContent(message.content);         
        } else {
            UIAPI.updateLogger("File loading failed");      
        }
        break;
      case "listDirectory":
        if(message.success){
            UIAPI.updateFileBrowserData(message.content);       
        } else {
            UIAPI.updateLogger("List directory failed");        
        }
        break;      
      case "getSubdirs":
        if(message.success){
            var dirListing = [];
            for (var i=0; i < message.content.length; i++) {
                dirListing.push(message.content[i]);
            }
            // TODO JSON functions are a workarround for a bug....
            UIAPI.updateTree(JSON.parse( JSON.stringify(dirListing)));
            //if(!extConnected) {
            //    initUI();
            //}
            //extConnected = true;
        } else {
            UIAPI.updateLogger("Getting subdirs failed");       
        }
        break;  
      case "delete":
        if(message.success){
            UIAPI.updateLogger("Delete success");               
        } else {
            UIAPI.updateLogger("Delete failed");        
        }
        break;          
      default:
        break;
    }   
}, false);
});