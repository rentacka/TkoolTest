//=============================================================================
// FPSLimitSettings_InitOnly.js
//=============================================================================

/*:ja
 * @plugindesc ゲームのフレームレート最大値設定をオプション項目に加えます。variablesには任意の変数の値を入れて下さい。
 * @author econa(ecoddr)　http://ecoddr.blog.jp/
 *
 * @param fps
 * @desc フレームレート
 * @default 60
 *
 *
 * @help
 *
 * ゲームのフレームレート最大値設定をオプション項目に加えます。
 * variablesには任意の変数の値を入れて下さい。
 * 変数を制御することでゲーム内のイベントでも変更できます。
 *プラグインコマンド：ChangeFPS! 30とかね。
 *
 * 【備考】
 * コメント部分は削除不可。
 * その他、制限はありません。
 *
 */

(function() {

    var parameters = PluginManager.parameters('FPSLimitSettings_InitOnly');	
    
    var v = Number(parameters['fps']);

	Graphics.render = function(stage) {
    	if (this._skipCount == 0) {
        	var startTime = Date.now();
        	if (stage) {
            	this._renderer.render(stage);
        	}
            this._skipCount = 2 - ((v/60)*2);
        	this._rendered = true;
    	} else {
        	this._skipCount--;
        	this._rendered = false;
    	}
    	this.frameCount++;
	};
     
    // 動かない
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if ((command || '').toUpperCase() === 'FPSLimitSettings_InitOnly') {
            //this._skipCount = 2 - ((v/60)*2);
            parameters['fps'] = args[0];
        }
    };
        
})();