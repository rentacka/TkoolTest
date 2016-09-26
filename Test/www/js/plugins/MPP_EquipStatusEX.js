//=============================================================================
// MPP_EquipStatusEX.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【MPP ver.1.0】装備ステータスの拡張
 * @author 木星ペンギン
 *
 * @help 装備ステータスウィンドウの表示内容を変更します。
 * 
 * 武器・防具のメモ:
 *   <mppEqSt:name1[,name2[,name3[,...]]]>   # 装備変更時に name が表示されます。
 * 
 * 
 * ▼ 武器・防具のメモの例
 *  <mppEqSt:炎半減,氷半減> と記述したアイテムを装備した場合、
 *  [炎半減]と[氷半減]が能力値上昇の色で表示されます。
 *  
 * ▼ ステータス (Status) について
 *  [通常ステータス]   : 装備スロット選択中に表示されるステータス
 *  [固定ステータス]   : 変更後のアイテムを選択中、常に表示されるステータス
 *  [装備品ステータス] : 変更後のアイテムを選択中、
 *                       装備品に含まれる場合に表示されるステータス
 *  [変動ステータス]   : 変更後のアイテムを選択中、
 *                       ステータスに変更がある場合に表示されるステータス
 *  
 *  設定する数値は以下の通りです。
 *  
 *  0:最大ＨＰ, 1:最大ＭＰ, 2:攻撃力, 3:防御力,
 *  4:魔法力,   5:魔法防御, 6:敏捷性, 7:運,
 *  
 *   8:命中率,     9:回避率,    10:会心率, 11:会心回避率,
 *  12:魔法回避率, 13:魔法反射率, 14:反撃率, 15:ＨＰ再生率,
 *  16:ＭＰ再生率, 17:ＴＰ再生率,
 *  
 *  18:狙われ率, 19:防御効果率, 20:回復効果率, 21:薬の知識,
 *  22:ＭＰ消費率, 23:ＴＰチャージ率, 24:物理ダメージ, 25:魔法ダメージ,
 *  26:床ダメージ, 27:経験獲得率
 * 
 * ▼ 特徴(Traits)について
 *  反転表示を true とした場合、表示される数値が (1 - 有効度)*100 となります。
 *  (例：有効度80%の場合は20、有効度30%の場合は70)
 *  これは[有効度]ではなく[耐性値]として表示するための機能です。
 *  
 *  表示タイプにて表示する条件を指定します。
 *   0 : 非表示
 *   2 : [装備品ステータス]または[変動ステータス]として表示
 *   3 : [変動ステータス]として表示
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 *
 * @param Status Window Row
 * @desc ステータスウィンドウの行数
 * @default 7
 * 
 * @param Gauge Height
 * @desc ゲージの高さ
 * @default 8
 * 
 * @param === Gauge Max ===
 * 
 * @param param Gauge Max
 * @desc 通常能力値ゲージの最大値
 * (最大ＨＰ,最大ＭＰ,攻撃力,防御力,魔法力,魔法防御,敏捷性,運)
 * @default 10000,2000,200,200,200,200,400,400
 * 
 * @param xparam Gauge Max
 * @desc 追加能力値ゲージの最大値
 * @default 2.0
 * 
 * @param sparam Gauge Max
 * @desc 特殊能力値ゲージの最大値
 * @default 2.0
 * 
 * @param rate Gauge Max
 * @desc 有効度ゲージの最大値
 * @default 2.0
 * 
 * @param === Status ===
 * 
 * @param Default Status
 * @desc 通常ステータスの配列
 * @default 2,3,4,5,6,7
 * 
 * @param Fixing Status
 * @desc 固定ステータスの配列
 * @default 
 * 
 * @param Item Status
 * @desc 装備品ステータスの配列
 * @default 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27
 * 
 * @param Flow Status
 * @desc 変動ステータスの配列
 * @default 
 * 
 * @param === Trait Name ===
 * 
 * @param xparam Name
 * @desc 用語[追加能力値]
 * @default 命中率,回避率,会心率,会心回避率,魔法回避率,魔法反射率,反撃率,ＨＰ再生率,ＭＰ再生率,ＴＰ再生率
 * 
 * @param sparam Name
 * @desc 用語[特殊能力値]
 * @default 狙われ率,防御効果率,回復効果率,薬の知識,ＭＰ消費率,ＴＰチャージ率,物理ダメージ率,魔法ダメージ率,床ダメージ率,経験獲得率
 * 
 * @param === Traits ===
 * 
 * @param Draw Elements
 * @desc 表示する属性ID
 * @default 1,2,3,4,5,6,7,8,9
 * 
 * @param Element Rate Name
 * @desc 用語[属性有効度]
 * (%1が属性名となります)
 * @default %1耐性
 * 
 * @param Element Rate Reverse?
 * @desc 属性有効度の反転表示
 * @default true
 * 
 * @param Element Rate Type
 * @desc 属性有効度の表示タイプ
 * @default 2
 * 
 * @param Debuff Rate Name
 * @desc 用語[弱体有効度]
 * (%1が能力値名となります)
 * @default %1ダウン耐性
 * 
 * @param Debuff Rate Reverse?
 * @desc 弱体有効度の反転表示
 * @default true
 * 
 * @param Debuff Rate Type
 * @desc 弱体有効度の表示タイプ
 * @default 2
 * 
 * @param Draw States
 * @desc 表示するステートID
 * (有効度と無効化共通)
 * @default 1,2,3,4,5,6,7,8,9,10
 * 
 * @param State Rate Name
 * @desc 用語[ステート有効度]
 * (%1がステート名となります)
 * @default %1耐性
 * 
 * @param State Rate Reverse?
 * @desc ステート有効度の反転表示
 * @default true
 * 
 * @param State Rate Type
 * @desc ステート有効度の表示タイプ
 * @default 2
 * 
 * @param State Resist Name
 * @desc 用語[ステート無効化]
 * (%1がステート名となります)
 * @default %1無効化
 * 
 * @param State Resist Type
 * @desc ステート無効化の表示タイプ
 * @default 2
 * 
 * @param Equip Feature Type
 * @desc メモ欄で追加したステートの表示タイプ
 * @default 2
 * 
 */

(function() {

var parameters = PluginManager.parameters('MPP_EquipStatusEX');
var MPPlugin = {
    
    statusWindowRow:Number(parameters['Status Window Row'] || 7),
    gaugeHeight:Number(parameters['Gauge Height'] || 8),
    
    // Gauge Max
    paramGaugeMax:eval('[' + parameters['param Gauge Max'] + ']'),
    xparamGaugeMax:Number(parameters['xparam Gauge Max'] || 3.0),
    sparamGaugeMax:Number(parameters['sparam Gauge Max'] || 3.0),
    rateGaugeMax:Number(parameters['rate Gauge Max'] || 3.0),
    
    // Status
    defaultStatus:eval('[' + parameters['Default Status'] + ']'),
    fixingStatus:eval('[' + parameters['Fixing Status'] + ']'),
    itemStatus:eval('[' + parameters['Item Status'] + ']'),
    flowStatus:eval('[' + parameters['Flow Status'] + ']'),
    
    // Trait Name 1
    xparamName:(parameters['xparam Name'] || '').split(","),
    sparamName:(parameters['sparam Name'] || '').split(","),
    
    // Trait Name 2
    drawElements:eval('[' + parameters['Draw Elements'] + ']'),
    elementRateName:parameters['Element Rate Name'] || '',
    elementRateReverse:parameters['Element Rate Reverse?'] === 'true',
    elementRateType:Number(parameters['Element Rate Type'] || 3),
    debuffRateName:parameters['Debuff Rate Name'] || '',
    debuffRateReverse:parameters['Debuff Rate Reverse?'] === 'true',
    debuffRateType:Number(parameters['Debuff Rate Type'] || 3),
    drawStates:eval('[' + parameters['Draw States'] + ']'),
    stateRateName:parameters['State Rate Name'] || '',
    stateRateReverse:parameters['State Rate Reverse?'] === 'true',
    stateRateType:Number(parameters['State Rate Type'] || 3),
    stateResistName:parameters['State Resist Name'] || '',
    stateResistType:Number(parameters['State Resist Type'] || 2),
    equipFeatureType:Number(parameters['Equip Feature Type'] || 2)
    
};

var Alias = {};

//-----------------------------------------------------------------------------
// Game_BattlerBase

Game_BattlerBase.prototype.allMetadata = function(name) {
    return this.traitObjects().map(function(obj) {
        return obj.meta[name];
    }).filter(Boolean);
};

Game_BattlerBase.prototype.allEquipFeatures = function() {
    var features = [];
    var data = this.allMetadata('mppEqSt');
    for (var n = 0; n < data.length; n++) {
        var names = data[n].split(",");
        for (var m = 0; m < names.length; m++) {
            if (!features.contains(names[m])) features.push(names[m]);
        }
    }
    return features;
};

//-----------------------------------------------------------------------------
// Window_EquipItem

//57
Alias.WiEqIt_updateHelp = Window_EquipItem.prototype.updateHelp;
Window_EquipItem.prototype.updateHelp = function() {
    if (this._actor && this._statusWindow) {
        this._statusWindow.setNewItem(this.item());
    }
    Alias.WiEqIt_updateHelp.call(this);
};

//-----------------------------------------------------------------------------
// Window_EquipStatus

//30
Window_EquipStatus.prototype.numVisibleRows = function() {
    return MPPlugin.statusWindowRow;
};

Window_EquipStatus.prototype.setCurItem = function(item) {
    this._curItem = item;
};

Window_EquipStatus.prototype.setNewItem = function(item) {
    this._newItem = item;
};

//41
Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0);
        this._drawY = this.lineHeight();
        var status = [];
        var elements = [];
        var debuffs = [];
        var states = [];
        var resists = [];
        var features = [];
        if (this._tempActor) {
            status = MPPlugin.fixingStatus;
            status = status.concat(MPPlugin.itemStatus.filter(function(paramId) {
                return !status.contains(paramId) && this.includeParam(paramId);
            }, this));
            status = status.concat(MPPlugin.flowStatus.filter(function(paramId) {
                return (!status.contains(paramId) &&
                        this.getActorParam(this._actor, paramId) !==
                        this.getActorParam(this._tempActor, paramId));
            }, this));
            if (MPPlugin.elementRateName && MPPlugin.elementRateType > 0) {
                elements = MPPlugin.drawElements.filter(function(elementId) {
                    switch (MPPlugin.elementRateType) {
                        case 1:
                            return true;
                        case 2:
                            if (this.includeTrait(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId)) {
                                return true;
                            }
                        case 3:
                            if (this._actor.elementRate(elementId) !==
                                    this._tempActor.elementRate(elementId)) {
                                return true;
                            }
                    }
                    return false;
                }, this);
            }
            if (MPPlugin.debuffRateName && MPPlugin.debuffRateType > 0) {
                debuffs = [0,1,2,3,4,5,6,7].filter(function(paramId) {
                    switch (MPPlugin.debuffRateType) {
                        case 1:
                            return true;
                        case 2:
                            if (this.includeTrait(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId)) {
                                return true;
                            }
                        case 3:
                            if (this._actor.debuffRate(paramId) !==
                                    this._tempActor.debuffRate(paramId)) {
                                return true
                            }
                    }
                    return false;
                }, this);
            }
            if (MPPlugin.stateRateName && MPPlugin.stateRateType > 0) {
                states = MPPlugin.drawStates.filter(function(stateId) {
                    switch (MPPlugin.stateRateType) {
                        case 1:
                            return true;
                        case 2:
                            if (this.includeTrait(Game_BattlerBase.TRAIT_STATE_RATE, stateId)) {
                                return true;
                            }
                        case 3:
                            if (this._actor.stateRate(stateId) !==
                                    this._tempActor.stateRate(stateId)) {
                                return true;
                            }
                    }
                    return false;
                }, this);
            }
            if (MPPlugin.stateResistName && MPPlugin.stateResistType > 0) {
                resists = MPPlugin.drawStates.filter(function(stateId) {
                    switch (MPPlugin.stateResistType) {
                        case 1:
                            return true;
                        case 2:
                            if (this.includeTrait(Game_BattlerBase.TRAIT_STATE_RESIST, stateId)) {
                                return true;
                            }
                        case 3:
                            if (this._actor.isStateResist(stateId) !==
                                    this._tempActor.isStateResist(stateId)) {
                                return true;
                            }
                    }
                    return false;
                }, this);
            }
            if (MPPlugin.equipFeatureType > 0) {
                if (MPPlugin.equipFeatureType === 2) {
                    if (this._curItem && this._curItem.meta['mppEqSt']) {
                        var itemFeatures = this._curItem.meta['mppEqSt'].split(",");
                        features = itemFeatures;
                    }
                    if (this._newItem && this._newItem.meta['mppEqSt']) {
                        var itemFeatures = this._newItem.meta['mppEqSt'].split(",");
                        features = features.concat(itemFeatures.filter(function(feature) {
                            return !features.contains(feature);
                        }));
                    }
                }
                if (MPPlugin.equipFeatureType >= 2) {
                    var curFeatures = this._actor.allEquipFeatures();
                    var newFeatures = this._tempActor.allEquipFeatures();
                    features = features.concat(curFeatures.filter(function(feature) {
                        return !features.contains(feature) &&
                                !newFeatures.contains(feature);
                    }));
                    features = features.concat(newFeatures.filter(function(feature) {
                        return !features.contains(feature) &&
                                !curFeatures.contains(feature);
                    }));
                }
            }
        } else {
            status = MPPlugin.defaultStatus;
        }
        this.drawStatus(status);
        this.drawElements(elements);
        this.drawDebuffs(debuffs);
        this.drawStates(states);
        this.drawResists(resists);
        this.drawFeatures(features);
    }
};

//58
Alias.WiEqSt_drawItem = Window_EquipStatus.prototype.drawItem;
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    var curValue = this.getActorParam(this._actor, paramId);
    var newValue = this.getActorParam(this._tempActor || this._actor, paramId);
    var max = this.getParamMax(paramId);
    this.drawParamGauge(x + 140, y, 130, curValue, newValue, max);
    Alias.WiEqSt_drawItem.call(this, x, y, paramId);
};

Window_EquipStatus.prototype.drawParamGauge = function(x, y, width, curValue, newValue, max, down) {
    var curWidth = Math.floor(width * curValue / max);
    var newWidth = Math.floor(width * newValue / max);
    var gaugeH = MPPlugin.gaugeHeight;
    var gaugeY = y + this.lineHeight() - gaugeH - 2;
    var color = this.normalColor();
    this.contents.paintOpacity = 192;
    this.contents.fillRect(x, gaugeY, curWidth, gaugeH, color);
    var gaugeX = x + Math.min(curWidth, newWidth);
    var gaugeW = Math.abs(curWidth - newWidth);
    color = this.paramchangeTextColor((newValue - curValue) * (down ? -1 : 1));
    this.contents.fillRect(gaugeX, gaugeY, gaugeW, gaugeH, color);
    this.contents.paintOpacity = 255;
    
};

Window_EquipStatus.prototype.drawStatus = function(status) {
    for (var i = 0; i < status.length; i++) {
        this.drawItem(0, this._drawY, status[i]);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

//69
Alias.WiEqSt_drawParamName = Window_EquipStatus.prototype.drawParamName;
Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    if (paramId < 8) {
        Alias.WiEqSt_drawParamName.call(this, x, y, paramId);
        return;
    } else if (paramId < 18) {
        var name = MPPlugin.xparamName[paramId - 8];
    } else {
        var name = MPPlugin.sparamName[paramId - 18];
    }
    this.changeTextColor(this.systemColor());
    this.drawText(name, x, y, 120);
};

//74
Alias.WiEqSt_drawCurrentParam = Window_EquipStatus.prototype.drawCurrentParam;
Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    if (paramId < 8) {
        Alias.WiEqSt_drawCurrentParam.call(this, x, y, paramId);
    } else {
        this.resetTextColor();
        var param = Math.round(this.getActorParam(this._actor, paramId) * 100);
        this.drawText(param, x, y, 48, 'right');
    }
};

//84
Alias.WiEqSt_drawNewParam = Window_EquipStatus.prototype.drawNewParam;
Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    if (paramId < 8) {
        Alias.WiEqSt_drawNewParam.call(this, x, y, paramId);
    } else {
        var newValue = this.getActorParam(this._tempActor, paramId);
        var diffvalue = newValue - this.getActorParam(this._actor, paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(Math.round(newValue * 100), x, y, 48, 'right');
    }
};

Window_EquipStatus.prototype.includeParam = function(paramId) {
    if (paramId < 8) {
        if (this._curItem && this._curItem.params[paramId] !== 0) return true;
        if (this._newItem && this._newItem.params[paramId] !== 0) return true;
        return false;
    } else if (paramId < 18) {
        return this.includeTrait(Game_BattlerBase.TRAIT_XPARAM, paramId - 8);
    } else {
        return this.includeTrait(Game_BattlerBase.TRAIT_SPARAM, paramId - 18);
    }
};

Window_EquipStatus.prototype.includeTrait = function(code, id) {
    var include = function(trait) {
        return trait.code === code && trait.dataId === id;
    };
    if (this._curItem && this._curItem.traits.some(include)) return true;
    if (this._newItem && this._newItem.traits.some(include)) return true;
    return false;
};

Window_EquipStatus.prototype.getActorParam = function(actor, paramId) {
    if (paramId < 8) {
        return actor.param(paramId);
    } else if (paramId < 18) {
        return actor.xparam(paramId - 8);
    } else {
        return actor.sparam(paramId - 18);
    }
};

Window_EquipStatus.prototype.getParamMax = function(paramId) {
    if (paramId < 8) {
        return MPPlugin.paramGaugeMax[paramId];
    } else if (paramId < 18) {
        return MPPlugin.xparamGaugeMax;
    } else {
        return MPPlugin.sparamGaugeMax;
    }
};

Window_EquipStatus.prototype.drawElements = function(elements) {
    for (var i = 0; i < elements.length; i++) {
        var elementId = elements[i];
        var name = MPPlugin.elementRateName.format($dataSystem.elements[elementId]);
        var curValue = this._actor.elementRate(elementId);
        var newValue = this._tempActor.elementRate(elementId);
        var reverse = MPPlugin.elementRateReverse;
        this.drawRate(0, this._drawY, name, curValue, newValue, reverse);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

Window_EquipStatus.prototype.drawDebuffs = function(debuffs) {
    for (var i = 0; i < debuffs.length; i++) {
        var paramId = debuffs[i];
        var name = MPPlugin.debuffRateName.format(TextManager.param(paramId));
        var curValue = this._actor.debuffRate(paramId);
        var newValue = this._tempActor.debuffRate(paramId);
        var reverse = MPPlugin.debuffRateReverse;
        this.drawRate(0, this._drawY, name, curValue, newValue, reverse);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

Window_EquipStatus.prototype.drawStates = function(states) {
    for (var i = 0; i < states.length; i++) {
        var stateId = states[i];
        var name = MPPlugin.stateRateName.format($dataStates[stateId].name);
        var curValue = this._actor.stateRate(stateId);
        var newValue = this._tempActor.stateRate(stateId);
        var reverse = MPPlugin.stateRateReverse;
        this.drawRate(0, this._drawY, name, curValue, newValue, reverse);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

Window_EquipStatus.prototype.drawRate = function(x, y, name, curValue, newValue, reverse) {
    this.changeTextColor(this.systemColor());
    this.drawText(name, x + this.textPadding(), y, 120);
    var curValue2 = reverse ? 1 - curValue : curValue;
    var newValue2 = reverse ? 1 - newValue : newValue;
    var max = MPPlugin.rateGaugeMax;
    this.drawParamGauge(x + 140, y, 130, curValue2, newValue2, max, !reverse);
    this.resetTextColor();
    this.drawText(Math.round(curValue2 * 100), x + 140, y, 48, 'right');
    this.drawRightArrow(x + 188, y);
    this.changeTextColor(this.paramchangeTextColor(curValue - newValue));
    this.drawText(Math.round(newValue2 * 100), x + 222, y, 48, 'right');
};

Window_EquipStatus.prototype.drawResists = function(resists) {
    for (var i = 0; i < resists.length; i++) {
        var stateId = resists[i];
        var name = MPPlugin.stateResistName.format($dataStates[stateId].name);
        var curFlag = this._actor.isStateResist(stateId);
        var newFlag = this._tempActor.isStateResist(stateId);
        this.drawTrait(96, this._drawY, name, curFlag, newFlag);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

Window_EquipStatus.prototype.drawFeatures = function(features) {
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var curFlag = this._actor.allEquipFeatures().contains(feature);
        var newFlag = this._tempActor.allEquipFeatures().contains(feature);
        this.drawTrait(96, this._drawY, feature, curFlag, newFlag);
        this._drawY += this.lineHeight();
        if (this._drawY >= this.contentsHeight()) return;
    }
};

Window_EquipStatus.prototype.drawTrait = function(x, y, name, curFlag, newFlag) {
    var diffvalue = !curFlag ? 1 : !newFlag ? -1 : 0;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    name = !curFlag ? '+' + name : !newFlag ? '-' + name : name;
    this.drawText(name, x, y, 174);
};

//-----------------------------------------------------------------------------
// Scene_Equip

//102
Alias.ScEq_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    this._statusWindow.setCurItem(this._slotWindow.item());
    Alias.ScEq_onSlotOk.call(this);
};


})();
