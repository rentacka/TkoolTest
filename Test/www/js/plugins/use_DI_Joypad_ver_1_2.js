//=============================================================================
// use_DI_Joypad.js
//=============================================================================
//Copyright (c) 2016 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*:
 * @plugindesc DirectInput方式のジョイパッドが使えるようになります
 * @author Trb
 * @version 1.2   2016/7/9  F5リロード時の挙動を、警告ポップアップを表示させる方式に変更
 *          1.15  2016/3/20 F5が押された時に実行する関数の位置を変更
 *          1.1   2016/3/11 F5でリロードすると動かなくなってしまう問題を修正
 *          1.001 2016/2/26 微修正
 *          1.00  2016/2/26 初版
 * 
 * @help ジョイパッドにはDirect Input方式のものとX Input方式のものがあり、
 * ツクールMVでは通常はX Input方式のジョイパッドしか使えません。
 * それをどうにかDirect Inputのジョイパッドでも使えるようにしたプラグインです。
 * 
 * 
 * 
 * ver1.2変更点
 * F5を押してリロードする際ゲームパッドの接続が途切れてしまう問題があり、
 * それを回避するために前バージョンではリロード処理自体を変更していたのですが、
 * そのやり方だといくつかのプラグインと競合することがあります。
 * 
 * そのため、ver1.2ではリロードの処理には手を加えず、その代わりリロードの前に
 * 警告ポップアップを表示させる方式に変更しました。
 * パッドの接続が切れた場合、一旦コネクタを抜いて再接続すれば繋がるので
 * 警告文でその旨を伝えるようにして下さい。
 * 
 * 
 * 
 * 
 * 
 * 
 * @param alert
 * @desc F5リロード時に表示させる警告文
 * @default リロードを実行します。ゲームパッドを使用している場合、パッドの接続が途切れることがあります。
 * 
 */
(function () {
    var reloadText = PluginManager.parameters('use_DI_Joypad_ver_1_2')['alert'];
console.log(reloadText);

    Input._updateGamepadState = function(gamepad) {
        var lastState = this._gamepadStates[gamepad.index] || [];
        var newState = [];
        var buttons = gamepad.buttons;
        var axes = gamepad.axes;
        var threshold = 0.5;
        newState[12] = false;//追加した部分　ここから
        newState[13] = false;//||
        newState[14] = false;//||
        newState[15] = false;//ここまで
        for (var i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[12] = true;    // up
        } else if (axes[1] > threshold) {
            newState[13] = true;    // down
        }
        if (axes[0] < -threshold) {
            newState[14] = true;    // left
        } else if (axes[0] > threshold) {
            newState[15] = true;    // right
        }
        for (var j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                var buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                }
            }
        }
        this._gamepadStates[gamepad.index] = newState;
    };


    SceneManager.onKeyDown = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
            case 116:   // F5
                if (Utils.isNwjs()) {
                    window.alert(reloadText);//ポップアップの処理を追加
                    location.reload();
                }
                break;
            case 119:   // F8
                if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                    require('nw.gui').Window.get().showDevTools();
                }
                break;
            }
        }
    };




})();