//=============================================================================
// MPP_Patch.js
//=============================================================================

/*:
 * @plugindesc 【2016/08/19】不具合修正プラグイン
 * @author 木星ペンギン
 *
 * @help 1.ダメージスプライトの更新が２度行われている不具合の修正
 * 2.画面スクロール中、マップとキャラクターの同期がとれていない不具合の修正
 * 3.サイドビュー戦闘でアクターが行動制約によって防御が解除された場合、
 *   グラフィックが変更されない不具合の修正
 * 4.[文章の表示]などで改行時に行の高さの計算が間違っている不具合の修正
 * 5.グラフィックが設定されていないイベントの基準パターンを1番に変更
 * 6.[文章の表示]でウェイト中にもスキップが行える機能の追加と
 *   スキップ中はウェイトをしない機能の追加
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Patch1 enabled?
 * @desc 修正内容1番の有効/無効
 * @default true
 * 
 * @param Patch2 enabled?
 * @desc 修正内容2番の有効/無効
 * @default true
 * 
 * @param Patch3 enabled?
 * @desc 修正内容3番の有効/無効
 * @default true
 * 
 * @param Patch4 enabled?
 * @desc 修正内容4番の有効/無効
 * @default true
 * 
 * @param Patch5 enabled?
 * @desc 修正内容5番の有効/無効
 * @default true
 * 
 * @param Patch6 enabled?
 * @desc 修正内容6番の有効/無効
 * @default true
 */

(function() {

var parameters = PluginManager.parameters('MPP_Patch');
var MPPlugin = {
    patch1enabled:eval(parameters['Patch1 enabled?']) === true,
    patch2enabled:eval(parameters['Patch2 enabled?']) === true,
    patch3enabled:eval(parameters['Patch3 enabled?']) === true,
    patch4enabled:eval(parameters['Patch4 enabled?']) === true,
    patch5enabled:eval(parameters['Patch5 enabled?']) === true,
    patch6enabled:eval(parameters['Patch6 enabled?']) === true,
};

var Alias = {};

// 1.ダメージスプライトの更新が２度行われている不具合の修正
if (MPPlugin.patch1enabled) {
Sprite_Battler.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
//        for (var i = 0; i < this._damages.length; i++) {
//            this._damages[i].update();
//        }
        if (!this._damages[0].isPlaying()) {
            this.parent.removeChild(this._damages[0]);
            this._damages.shift();
        }
    }
};
}

// 2.画面スクロール中、タイルマップとキャラクターの座標が同期できていない不具合の修正
if (MPPlugin.patch2enabled) {
Spriteset_Map.prototype.updateTilemap = function() {
    this._tilemap.origin.x = Math.round($gameMap.displayX() * $gameMap.tileWidth());
    this._tilemap.origin.y = Math.round($gameMap.displayY() * $gameMap.tileHeight());
};
}

// 3.サイドビュー戦闘でアクターが行動制約によって防御が解除された場合、
//   グラフィックが変更されない不具合の修正
if (MPPlugin.patch3enabled) {
Alias.SpAc_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    if (actor) {
        var motionGuard = Sprite_Actor.MOTIONS['guard'];
        var stateMotion = actor.stateMotionIndex();
        if (this._motion === motionGuard && stateMotion > 0 && !actor.isGuard()) {
            this._motion = null;
        }
    }
    Alias.SpAc_refreshMotion.call(this);
};
}

// 4.[文章の表示]などで改行時に行の高さの計算が間違っている不具合の修正
if (MPPlugin.patch4enabled) {
Window_Base.prototype.processNewLine = function(textState) {
    textState.x = textState.left;
    textState.y += textState.height;
    textState.index++;
    textState.height = this.calcTextHeight(textState, false);
};
}

// 5.グラフィックが設定されていないイベントの基準パターンを1番に変更
if (MPPlugin.patch5enabled) {
Alias.GaEv_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    Alias.GaEv_setupPageSettings.call(this);
    if (this._tileId === 0 && !this._characterName) {
        this._originalPattern = 1;
        this.setPattern(1);
    }
};
}

// 6.[文章の表示]でウェイト中にもスキップが行える機能の追加と
//   スキップ中はウェイトをしない機能の追加
if (MPPlugin.patch6enabled) {
//125
Alias.WiMe_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (!Alias.WiMe_updateWait.call(this)) return false;
    this.updateShowFast();
    return !this._showFast;
};

//291
Alias.WiMe_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '.':
        if (!this._showFast) this.startWait(15);
        break;
    case '|':
        if (!this._showFast) this.startWait(60);
        break;
    default:
        Alias.WiMe_processEscapeCharacter.call(this, code, textState);
        break;
    }
};
}

})();
