/*:

 * @plugindesc 敵グループの出現数をツクールDS＋風のランダム式にします
 * @author ハーリー


 * @param RockTroop
 * @desc 【グループの固定】指定した倍数のIDの敵グループには出現数のランダム化が適用されません
 * @default 5

 * @param VanishRate
 * @desc 【消滅率】この値が高いほど敵グループ数が減少しやすくなります。max:100
 * @default 37

 * @help
 * 敵グループに設定したエネミー数をツクールDS＋と同様にランダムで減少させます。
 * DS＋とは違い、IDが1のエネミーは固定されます。
 * プラグインパラメータ「RockTroop」に指定した倍数のグループは出現数を固定します。
 *Author ハーリー
 *Version 1.00:2016/7/8 */



(function(){
//プラグインパラメータ
var parameters = PluginManager.parameters('Hurry_RandomTroopDS');
var RockTroop = Number(parameters['RockTroop']);
var VanishRate = Number(parameters['VanishRate']);

//プラグイン
Game_Troop.prototype.setup = function(troopId) {
	var Rock = troopId % RockTroop;
    	this.clear();
    	this._troopId = troopId;
    	this._enemies = [];
    	this.troop().members.forEach(function(member) {
        	if ($dataEnemies[member.enemyId]) {
            		var enemyId = member.enemyId;
            		var x = member.x;
            		var y = member.y;
            		var enemy = new Game_Enemy(enemyId, x, y);
	    		var men = $gameTroop.aliveMembers().length;
            		if (member.hidden) {
                		enemy.hide();
            		}
			if(Rock){
	    			if(men){
	    				var i = Math.floor(Math.random()*100)+1;
					if(i<VanishRate){
	        				enemy.hide();
					}
	    			}
			}
            	this._enemies.push(enemy);
        	}
    	}, this);
    this.makeUniqueNames();
};

})();