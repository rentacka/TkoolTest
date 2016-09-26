//
//  D値 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['DPoint'] = 1.00;
/*:
 * @plugindesc ver1.00/ダメージ計算式に使用できるD値を設定できるようにします。
 * @author Yana
 * 
 * @param DefaultDFormula
 * @desc D値の基本計算式です。
 * @default a.atk / 5
 * 
 * @param DefaultWeaponD
 * @desc 武器やスキルの基本D値です。
 * @default 0
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 武器やエネミー、スキルやステートのメモ欄に
 * <D値:○>
 * または
 * <DPoint:○>
 * と記述すると、武器やエネミー、スキルやステートのD値を○に設定することができます。
 * 
 * ダメージ計算式にa.dpやb.dpと記述することで、値を取得することができます。
 * 基本D値は、D値の基本計算式で算出された値で計算されます。
 * それに、武器やスキル、ステートなどのD値が加算され、合計値が最終的な値となります。
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
	
	var parameters = PluginManager.parameters('DPoint');
	var defaultDFormula = String(parameters['DefaultDFormula'] || 'a.atk / 5');
	var defaultWeaponD = Number(parameters['DefaultWeaponD']);
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.dPoint = function(item) {
		if (item._dPoint === undefined){
			item._dPoint = 0;
			if (this.isWeapon(item)){ item._dPoint += defaultWeaponD }
			if (item.meta['D値']){ item._dPoint = Number(item.meta['D値']) }
			if (item.meta['DPoint']){ item._dPoint = Number(item.meta['DPoint']) }
		}
		return item._dPoint;
	};
	
	////////////////////////////////////////////////////////////////////////////////////

	Object.defineProperties(Game_Battler.prototype, {
    	dp: { get: function() { return this.dpoint(); }, configurable: true }
	});
	
	Game_Battler.prototype.dpoint = function() {
		var a = this;
		var v = $gameVariables._data;
		n = eval(defaultDFormula);
		return n;
	};
	
	////////////////////////////////////////////////////////////////////////////////////

	Game_Actor.prototype.dpoint = function() {
		var n = Game_Battler.prototype.dpoint.call(this);
		if (this.weapons().length > 0){
			var nn = this.weapons().reduce(function(r,w){
				if (w){ r += DataManager.dPoint(w) }
				return r;
			},0);
			n += nn / this.weapons().length;
		}
		if (!!this.currentAction()){
			var action = this.currentAction();
			n += DataManager.dPoint(action.item());
		}
		for (var i=0,max=this.states().length;i<max;i++){
			n += DataManager.dPoint(this.states()[i]);
		}
		return n;
	}

	////////////////////////////////////////////////////////////////////////////////////
}());