//JavaScriptを呼び出し

/*:ja
 * @plugindesc ツクール以外のJavascriptを呼び出します。
 * @author マネーコイコイさん　https://twitter.com/ren_tacka
 *
 * @param jsSrc
 * @desc JavaScriptのパスとかURL
 * @default js/plugins/jquery-3.1.1.slim.min.js
 *
 * @help
 *
 * 複数のJavascriptを読み込むときはこのプラグインを読み込んだようにエディターに複数読み込ませてください。
 *
 */


(function(){	    
    var parameters = PluginManager.parameters('JavaScriptCall');
    var jsSrc = String(parameters['jsSrc']);
    
    // windowのonload内のみ有効 方法その１
    var script = document.createElement( 'script' );

    script.type = 'text/javascript';
    script.src = jsSrc;

    var firstScript = document.getElementsByTagName( 'script' )[ 0 ];
    firstScript.parentNode.insertBefore( script, firstScript );


    
    // windowのonload内のみ有効 方法その２
    //var req = new XMLHttpRequest();
    //req.open("GET", jsSrc, false);
    //req.send("");

    //window.onload = function(){eval(req.responseText);};  
    //PluginManager.loadOnlineScript = function() {
    //    eval(req.responseText);
    //};

    
    // プラグインコマンドも使えて無敵のコンボ！
    // jqueryファイルを書き換えて実装
    //$.getScript("include.js", function(){
    //    alert(resText);
    //});
    
    
    
}());