//=============================================================================
// MOT_ZoneDrop.js
//=============================================================================
// MOTplugin - ゾーンドロップ
// 作者: 翠 (http://midori.wp.xdomain.jp/)
// Version: 1.0
// 最終更新日: 2016/03/08
//=============================================================================
//■更新履歴
/*
  2016/03/08 - 公開
*/
//=============================================================================
/*■利用規約
 *-クレジットの表記
 *  クレジットの表記は基本的に不要です。
 *  表記する場合はホームページを参照してください。
 *  営利目的での使用する場合は表記してください。
 *
 *  表記例
 *  スクリプト素材 翠 (http://midori.wp.xdomain.jp/)
 *  または
 *  スクリプト素材 HM Project (http://midori.wp.xdomain.jp/)
 *
 *-スクリプトの改変/配布
 *  スクリプトの改変はご自由に行ってください。
 *  改変を行って発生したバグ等には対処しません。
 *
 *-スクリプトの再配布
 *  そのままの再配布は禁止とさせていただきます。
 *  改造した物を配布する場合、オリジナルのクレジットを残してもらえれば
 *  配布することを可能とします。
 *  ※改造の有無に関わらず素材を有料で配布する場合は禁止とさせていただきます。
 *  ※ゲームに含まれる場合のみ再配布可能とします。
 *
 *-使用可能なゲームのジャンル
 *  エログロなんでも使用可能です。
 *
*/
//=============================================================================
/*:
 * @plugindesc ゾーンドロップ
 * 使用法はプラグインのヘルプを参照してください。 
 * @author 翠
 * @help 
 * ■利用規約
 * 本プラグインの中に記述してある物、または配布サイト
 * の利用規約をご確認ください。
 *
 * ■プラグイン概要
 * 戦闘終了時にマップ毎に設定したアイテムを追加ドロップします。
 * ドロップ判定は敵単体でなく、１戦闘毎になります。
 * 
 * ■使用方法
 *  MOT_ZoneDrop.jsのファイルを開いて
 * 【ここにドロップ情報を記述】の箇所に追記してください。
 *  
 *  ◇追記方法
 *  mapid: [['カテゴリー,ID,個数,確立'],['カテゴリー,ID,個数,確立']]
 *  確立は100が最大で1が最低です
 *  0にするとアイテムを得られません。
 *  
 *  例: マップID1 ポーション 1個×2を 50の確立、 マジックポーション 1個×2 95の確立で取得
 *      1: [['item',1,2,50],['item',2,2,95]],
 *  
 * ■プラグインコマンド 
 *  ZoneDrop on   #ゾーンドロップを有効にします。
 *  ZoneDrop off  #ゾーンドロップを無効にします。
 *   
 * @param フラグ
 * @desc ゾーンドロップの有効/無効
 * 1:有効 0:無効
 * @default 1
*/
//=============================================================================
var MOT = MOT || {};
MOT.ZoneDrop = MOT.ZoneDrop || {};
//【ここにドロップ情報を記述】
MOT.ZoneDrop.drops = {
 1: [['item',1,2,50],['item',2,2,95]],     //マップID1
 2: [['weapon',1,2,100],['armor',2,2,100]] //マップID2




};
//=============================================================================
MOT.Parameters = PluginManager.parameters('MOT_ZoneDrop');
MOT.Param = MOT.Param || {};
//=============================================================================
MOT.ZoneDrop.zone_sw   = Number(MOT.Parameters['フラグ']);
//=============================================================================
// Game_Interpreter
//=============================================================================
MOT.ZoneDrop.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    MOT.ZoneDrop.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ZoneDrop') {
        switch (args[0]) {
        case 'on':
            MOT.ZoneDrop.zone_sw = 1;
            break;
        case 'off':
            MOT.ZoneDrop.zone_sw = 0;
            break;
        };
    };
};
//=============================================================================
// Game_Map
//=============================================================================
Game_Map.prototype.makeZoneDrops  = function() {
    var drops = [];
    if (MOT.ZoneDrop.drops[this._mapId]){
        MOT.ZoneDrop.drops[this._mapId].forEach(function(zdrop) {
            var establishmentitem = zdrop[3]
            for (var i=0; i < zdrop[2]; i++) { 
                var rand = Math.floor( Math.random() * 101);
                if (rand <= establishmentitem){
                    var items = 0;
                    switch (zdrop[0]) {
                        case 'item':
                            items = $dataItems[zdrop[1]];
                            break;
                        case 'weapon':
                            items = $dataWeapons[zdrop[1]];
                            break;
                        case 'armor':
                            items = $dataArmors[zdrop[1]];
                            break;
                    };
                    drops.push(items);
                };
            };
        });
    };
    return (!!MOT.ZoneDrop.zone_sw)?  drops : [];
};
//=============================================================================
// BattleManager
//=============================================================================
MOT.ZoneDrop.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    MOT.ZoneDrop.BattleManager_makeRewards.call(this);
    this._rewards.zone_drop = $gameMap.makeZoneDrops();
};
MOT.ZoneDrop.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    MOT.ZoneDrop.BattleManager_displayRewards.call(this);
    this.displayZoneDropItems();
};
BattleManager.displayZoneDropItems = function() {
    if (this._rewards.zone_drop.length > 0) {
        $gameMessage.newPage();
        this._rewards.zone_drop.forEach(function(item) {
            $gameMessage.add(TextManager.obtainItem.format(item.name));
        });
    }
};
MOT.ZoneDrop.BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    MOT.ZoneDrop.BattleManager_gainRewards.call(this);
    this.gainZoneDropItems();
};
BattleManager.gainZoneDropItems = function() {
    this._rewards.zone_drop.forEach(function(item) {
        $gameParty.gainItem(item, 1);
    });
};


