//
//  タイミング解除ステート ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['TimingRemoveState'] = 1.00;
/*:
 * @plugindesc ver1.00/攻撃命中時、行動後、行動終了時解除されるステートを設定できるようにします。
 * @author Yana
 * 
 * @help------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------ 
 * ステートのメモ欄に
 * <物理時解除:○%>
 * または
 * <PhysicalAttackRemove:○%>
 * と記述すると、物理行動を行った後にステートが○%の確率で解除されます。
 * 
 * <魔法時解除:○%>
 * または
 * <MagicalAttackRemove:○%>
 * と記述すると、魔法行動を行った後にステートが○%の確率で解除されます。
 * 
 * <行動後解除:○%>
 * または
 * <EndActionRemove:○%>
 * と記述すると、行動を行った後にステートが○%の確率で解除されます。
 * 
 * <被弾解除:○%>
 * または
 * <HitRemove:○%>
 * と記述すると、攻撃を受けた時にステートが○%の確率で解除されます。
 * この際、ダメージを受けたかどうかは関係ありません。
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
	
	var parameters = PluginManager.parameters('TimingRemoveState');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.isAtkRemove = function(state,type){
		if (!state) { return false }
		switch(type){
		case 1:
			if (state._pAttackRemove === undefined){
				state._pAttackRemove = 0;
				if (!!state.meta['物理攻撃時解除']){ state._pAttackRemove = state.meta['物理攻撃時解除'].replace(/[%％]/,'') }
				if (!!state.meta['PhysicalAttackRemove']){ state._pAttackRemove = state.meta['PhysicalAttackRemove'].replace(/[%％]/,'') }
			}
			return Number(state._pAttackRemove) > Math.random() * 100;
		case 2:
			if (state._mAttackRemove === undefined){
				state._mAttackRemove = 0;
				if (!!state.meta['魔法攻撃時解除']){ state._mAttackRemove = state.meta['魔法攻撃時解除'].replace(/[%％]/,'') }
				if (!!state.meta['MagicalAttackRemove']){ state._mAttackRemove = state.meta['MagicalAttackRemove'].replace(/[%％]/,'') }
			}
			return Number(state._mAttackRemove) > Math.random() * 100;
		}
		return false;
	};
	
	DataManager.isEndActionRemove = function(state){
		if (!state) { return false }
		if (state._endActionRemove === undefined){
			state._endActionRemove = 0;
			if (!!state.meta['行動後解除']){ state._endActionRemove = state.meta['行動後解除'].replace(/[%％]/,'') }
			if (!!state.meta['EndActionRemove']){ state._endActionRemove = state.meta['EndActionRemove'].replace(/[%％]/,'') }
		}
		return Number(state._endActionRemove) > Math.random() * 100;
	};
	
	DataManager.isHitRemove = function(state){
		if (!state) { return false }
		if (state._hitRemove === undefined){
			state._hitRemove = 0;
			if (!!state.meta['被弾解除']){ state._hitRemove = state.meta['被弾解除'].replace(/[%％]/,'') }
			if (!!state.meta['HitRemove']){ state._hitRemove = state.meta['HitRemove'].replace(/[%％]/,'') }
		}
		return Number(state._hitRemove) > Math.random() * 100;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __BManager_endAction = BattleManager.endAction;
	BattleManager.endAction = function() {
		if (this._subject){
			this._subject.removeEndActionStates(this._action.item());
		}
		__BManager_endAction.call(this);
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
	Game_Action.prototype.applyItemUserEffect = function(target) {
		__GAction_applyItemUserEffect.call(this,target);
		if (this.subject().isActor() !== target.isActor()){ target.removeHitState() }
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Battler.prototype.removeEndActionStates = function(item) {
		var removeStates = [];
		if (!!BattleManager._saepPhase){ return }
		for (var i=0;i<this.states().length;i++){
			var state = this.states()[i];
			if (DataManager.isAtkRemove(state,item.hitType)){
				removeStates.push(state.id);
			}
			if (DataManager.isEndActionRemove(state)){
				removeStates.push(state.id);
			}
		}
		for (var i=0;i<removeStates.length;i++){
			if (this.isStateAffected(removeStates[i])){
				this.removeState(removeStates[i]);
				BattleManager._logWindow.displayRemovedSoloState($dataStates[removeStates[i]],this);
			}
		}
	};
	
	Game_Battler.prototype.removeHitState = function() {
		var removeStates = [];
		if (BattleManager._saepPhase){ return }
		for(var i=0;i<this.states().length;i++){
			var state = this.states()[i];
			if (DataManager.isHitRemove(state)){ removeStates.push(state.id) }
		}
		for (var i=0;i<removeStates.length;i++){
			if (this.isStateAffected(removeStates[i])){
				this.removeState(removeStates[i]);
			}
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Window_BattleLog.prototype.displayRemovedSoloState = function(state,target) {
		if (state.message4) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            this.push('addText', target.name() + state.message4);
        }
	};
}());