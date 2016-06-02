/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	 config.uiColor = '#AADC6E';
	config.extraPlugins = 'base64image,pastebase64,fellstyle';
	config.enterMode = CKEDITOR.ENTER_BR;  
  
    // 当输入：shift+Enter是插入的标签  
   // config.shiftEnterMode = CKEDITOR.ENTERT_;//   
};
