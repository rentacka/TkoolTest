//
//  ドロップ率操作特徴 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['AddDropRateTrait'] = 1.00;
/*:
 * @plugindesc ver1.00/ドロップ率を操作する特徴を設定できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトやスキル、アイテムのメモ欄に
 * <ドロップ率:x+y%>
 * または、
 * <AddDropRate:x+y%>
 * と記述すると、xのアイテムのドロップ率をy%増加します。
 * xの指定方法は、アイテムならI,武器ならW,防具ならAにアイテムIDを追加して、
 * I4,W3,A20などにします。
 * 
 * アイテムIDに0を指定した場合、そのカテゴリのすべてのアイテムが対象になります。
 * カテゴリを書かずに、0とだけ記述した場合、すべてのアイテムが対象になります。
 * 
 * また、xには好きな文字列も指定することができます。
 * この場合、その文字列をメモに含むアイテムが対象になります。
 * <ドロップ率:テスト+30%>とした場合、アイテムのメモに<テスト>と記述されている
 * アイテムが対象になります。
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
	
	var parameters = PluginManager.parameters('AddDropRateTrait');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	DataManager.addDropRate = function(item) {
		if (!item){ return {} }
		if (item._addDropRate === undefined){
			item._addDropRate = {};
			var texts = item.note.split('\n');
			for (var i=0,max=texts.length;i<max;i++){
				var text = texts[i];
				if (text.match(/<(?:ドロップ率|AddDropRate):(.+)([+-]\d+)[%％]>/)){
					item._addDropRate[RegExp.$1] = Number(RegExp.$2);
				}
			}
		}
		return item._addDropRate;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Party.prototype.extendDropRate = function() {
		var result = {}
		this.battleMembers().forEach(function(m){
			m.traitObjects().forEach(function(to){
				var addRate = DataManager.addDropRate(to);
				for (key in addRate){
					if (!result[key]){ result[key] = 0 }
					result[key] += addRate[key]; 
				}
			}.bind(this));
		}.bind(this));
		return result;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
	// 再定義
	Game_Enemy.prototype.makeDropItems = function() {
		this._exRate = $gameParty.extendDropRate();
    	return this.enemy().dropItems.reduce(function(r, di) {
        	if (di.kind > 0 && Math.random() * di.denominator < (this.dropItemRate() * this.extendRate(di))) {
            	return r.concat(this.itemObject(di.kind, di.dataId));
        	} else {
            	return r;
        	}
    	}.bind(this), []);
	};
	
	Game_Enemy.prototype.extendRate = function(dropItem) {
		var key = '';
		switch(dropItem.kind){
		case 1:key = 'I'+dropItem.dataId;break;
		case 2:key = 'W'+dropItem.dataId;break;
		case 3:key = 'A'+dropItem.dataId;break;
		}
		var item = this.itemObject(dropItem.kind, dropItem.dataId);
		var exRate = this._exRate;
		var r = 0;
		if (exRate['0']){ r += exRate['0'] }
		if (exRate['I0'] && DataManager.isItem(item))  { r += exRate['I0'] }
		if (exRate['W0'] && DataManager.isWeapon(item)){ r += exRate['W0'] }
		if (exRate['A0'] && DataManager.isArmor(item)) { r += exRate['A0'] }
		if (exRate[key]){ r += exRate[key] }
		for (key2 in exRate){
			var text = RegExp('<'+key2+'>');
			if (item.note.match(text)){ r += exRate[key2] }
		}
		return r;
	};
	
	////////////////////////////////////////////////////////////////////////////////////
	
}());