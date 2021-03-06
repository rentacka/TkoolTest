//
//  クリティカル即死特徴 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['CriticalDeathTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/クリティカル時即死する特徴やスキルやアイテムを設定できるようにします。
 * @author Yana
 * 
 * @param Critical Death Text
 * @desc クリティカル即死が発動した時に表示されるテキストです。
 * @default _nameの息の根を止めた！
 * 
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトまたは、スキル、アイテムなどのメモ欄に
 * <クリティカル即死:○%>
 * または、
 * <CriticalDeath:○%>
 * と記述することで、○%の確率でクリティカル発生時に対象を即死させます。
 * 
 * また、
 * 同じように特徴を持ったオブジェクトのメモ欄に
 * <クリティカル即死耐性:○%>
 * または、
 * <AntiCriticalDeath:○%>
 * と記述することで、○%の確率でクリティカル即死が発動した際に、これを無効化します。
 * 
 * これらはすべての特徴やスキル、アイテムで個別に判定が行われます。
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
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('CriticalDeathTrait');
	var criticalDeathText = String(parameters['Critical Death Text']);
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.isCriticalDeath = function(item) {
		if (!item){ return false }
		if (item._criticalDeath === undefined){
			item._criticalDeath = 0;
			if (!!item.meta['クリティカル即死']){ item._criticalDeath = item.meta['クリティカル即死'].replace(/[%％]/,'') }
			if (!!item.meta['CriticalDeath']){ item._criticalDeath = item.meta['CriticalDeath'].replace(/[%％]/,'') }
		}
		return Number(item._criticalDeath) > Math.random() * 100;
	};
	
	DataManager.isAntiCriticalDeath = function(item) {
		if (!item){ return false }
		if (item._antiCriticalDeath === undefined){
			item._antiCriticalDeath = 0;
			if (!!item.meta['クリティカル即死耐性']){ item._antiCriticalDeath = item.meta['クリティカル即死耐性'].replace(/[%％]/,'') }
			if (!!item.meta['AntiCriticalDeath']){ item._antiCriticalDeath = item.meta['AntiCriticalDeath'].replace(/[%％]/,'') }
		}
		return Number(item._criticalDeath) > Math.random() * 100;	
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical){
		target.result()._criticalDeath = false;
		var value = 0;
		if (critical && this.isCriticalDeath(target)){
			value = target.hp;
			target.result()._criticalDeath = true;
			this.makeSuccess(target);
		}
		if (!target.result()._criticalDeath){
			return __GAction_makeDamageValue.call(this, target, critical);
		} else {
			return value;
		}
	};
	
	Game_Action.prototype.isCriticalDeath = function(target) {
		var result = DataManager.isCriticalDeath(this.item());
		if (!result){
			for (var i=0;i<this.subject().traitObjects().length;i++){
				var trait = this.subject().traitObjects()[i];
				result = DataManager.isCriticalDeath(trait);
				if(result){ break }
			}
			if (!result){ return false }
		}
		for (var i=0;i < target.traitObjects().length;i++){
			var trait = target.traitObjects()[i];
			if (DataManager.isAntiCriticalDeath(trait)){
				return false;
			}
		}
		return true;
	};
	
	////////////////////////////////////////////////////////////////////////////////////

	Window_BattleLog.prototype.displayCriticalDeath = function(target) {
		if (criticalDeathText) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            var text = criticalDeathText;
            text = text.replace(/_name/,target.name());
            this.push('addText', text);
            target.result()._criticalDeath = false;
        }
	};
	
	var __WBattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
	Window_BattleLog.prototype.displayDamage = function(target){
		if (target.result()._criticalDeath){
			this.displayCriticalDeath(target);
		} else {
			__WBattleLog_displayDamage.call(this,target);
		}
	}
}());