// 1.31で正常に動的変更できへん・・・

//=============================================================================
// FPSLimitSettings.js
//=============================================================================

/*:ja
 * @plugindesc ゲームのフレームレート最大値設定をオプション項目に加えます。variablesには任意の変数の値を入れて下さい。
 * @author econa(ecoddr)　http://ecoddr.blog.jp/
 *
 * @param variables
 * @desc フレームレートの制御用に使用する変数の番号です。
 * @default 123
 *
 *
 * @help
 *
 * ゲームのフレームレート最大値設定をオプション項目に加えます。
 * variablesには任意の変数の値を入れて下さい。
 * 変数を制御することでゲーム内のイベントでも変更できます。
 *
 * 【備考】
 * コメント部分は削除不可。
 * その他、制限はありません。
 *
 */


(function() {

    var parameters = PluginManager.parameters('FPSLimitSettings');	
    
    var v = Number(parameters['variables']);

    if ($gameVariables != null)
    {
        if($gameVariables.value(v) == 0)
        {
        $gameVariables.setValue(v,60);
        }
    
	var _Scene_Base_create = Scene_Base.prototype.create;
	

	Graphics.render = function(stage) {
    	if (this._skipCount === 0) {
        	var startTime = Date.now();
        	if (stage) {
            	this._renderer.render(stage);
        	}
        	var endTime = Date.now();
        	var elapsed = endTime - startTime;
        	//this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip) + $gameVariables.value(v);
            this._skipCount = 2 - ((v/60)*2) + $gameVariables.value(v);
        	this._rendered = true;
    	} else {
        	this._skipCount--;
        	this._rendered = false;
    	}
    	this.frameCount++;        
	};
        alert("Success");
    }
})();