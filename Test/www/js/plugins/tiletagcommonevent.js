//=============================================================================
// TileTagCommonEvent.js
//=============================================================================

/*:
 * @plugindesc 地形タグからコモンイベントを起動します
 * イベントが配置してある場合はイベントが優先されます
 * @author 翠
 * @help タイルに地形タグを設定する
 * タグに使用するコモンイベントのIDを設定する
 * 
 * @param 地形タグ1
 * @desc コモンイベントID
 * @default 5
 * 
 * @param 地形タグ2
 * @desc コモンイベントID
 * @default 6
 * 
 * @param 地形タグ3
 * @desc コモンイベントID
 * @default 7
 * 
 * @param 地形タグ4
 * @desc コモンイベントID
 * @default 8
 * 
 * @param 地形タグ5
 * @desc コモンイベントID
 * @default 9
 * 
 * @param 地形タグ6
 * @desc コモンイベントID
 * @default 10
 * 
 * @param 地形タグ7
 * @desc コモンイベントID
 * @default 11
 * 
 * @param 地形タグ8
 * @desc コモンイベントID
 * @default 12
 * 
 * @param 地形タグ9
 * @desc コモンイベントID
 * @default 13
*/
(function(){
	var parameters = PluginManager.parameters('TileTagCommonEvent');
	var tag_1   = Number(parameters['地形タグ1']);
	var tag_2   = Number(parameters['地形タグ2']);
	var tag_3   = Number(parameters['地形タグ3']);
	var tag_4   = Number(parameters['地形タグ4']);
	var tag_5   = Number(parameters['地形タグ5']);
	var tag_6   = Number(parameters['地形タグ6']);
	var tag_7   = Number(parameters['地形タグ7']);
	var tag_8   = Number(parameters['地形タグ8']);
	var tag_9   = Number(parameters['地形タグ9']);
	var commonid = {
	    1:tag_1,
	    2:tag_2,
	    3:tag_3,
	    4:tag_4,
	    5:tag_5,
	    6:tag_6,
	    7:tag_7,
	    8:tag_8,
	    9:tag_9
	};
	//再定義
	Game_Player.prototype.checkEventTriggerThere = function(triggers) {
	    if (this.canStartLocalEvents()) {
	        var direction = this.direction();
	        var x1 = this.x;
	        var y1 = this.y;
	        var x2 = $gameMap.roundXWithDirection(x1, direction);
	        var y2 = $gameMap.roundYWithDirection(y1, direction);
	        this.startMapEvent(x2, y2, triggers, true);
	        if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
	            var x3 = $gameMap.roundXWithDirection(x2, direction);
	            var y3 = $gameMap.roundYWithDirection(y2, direction);
	            this.startMapEvent(x3, y3, triggers, true);
	        }
	    }
		this.tileTagCommonEvents();
	};
	Game_Player.prototype.tileTagCommonEvents = function() {
		if (!$gameMap.isEventRunning()){
	        var round_x = $gameMap.roundXWithDirection(this.x, this.direction());
	        var round_y = $gameMap.roundYWithDirection(this.y, this.direction());
	        var tag = $gameMap.terrainTag(round_x, round_y)
	        if ($gameMap.eventsXy(round_x, round_y)){
	        	$gameTemp.reserveCommonEvent(commonid[tag]);
	        };
		};
	};
})();