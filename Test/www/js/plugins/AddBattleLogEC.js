//
//  バトルログ表示制御文字 ver1.02
//
// author yana
//

var Imported = Imported || {};
Imported['AddBattleLogEC'] = 1.02;
/*:
 * @plugindesc ver1.02/メッセージをバトルログに表示する制御文字を追加します。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * バトルログにテキストを追加する制御文字を追加します。
 * 
 * 追加制御文字:
 * _ABL
 * これをメッセージの最初に記述すると、メッセージは通常のウィンドウではなく、
 * バトルログに表示されます。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------ 
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.02:
 * 一括表示が>だけで反応していたバグを修正。
 * ver1.01:
 * 複数行の文章が一括で表示されるバグを修正。
 * 文章内に\>が使用されていた場合、一括で表示する設定を追加。
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('AddBattleLogEC');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GInterpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(){
		var nextCommand = this._list[this._index+1];
		if (this.nextEventCode() === 401){
			var text = nextCommand.parameters[0];
			var texts = [];
            var showFast = false;
			if (text.match(/_ABL/gi)){
				while (this.nextEventCode() === 401){
					this._index++;
					text = this.currentCommand().parameters[0].replace(/_ABL/gi,'');
                    if (text.search(/\\>/) >= 0){ showFast = true }
					texts.push(text);
				}
                if (showFast){
                    for (var i=0,max=texts.length;i<max;i++){ BattleManager._logWindow.addText(texts[i]) }
                } else {
                    for (var i=0,max=texts.length;i<max;i++){ BattleManager._logWindow.push('addText',texts[i]) }
                }
				return false;
			}
		}
		return __GInterpreter_command101.call(this);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());