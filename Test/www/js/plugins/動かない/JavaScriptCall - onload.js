//JavaScriptを呼び出し

/*:ja
 * @plugindesc ツクール以外のJavascriptを呼び出します。
 * @author マネーコイコイさん　https://twitter.com/ren_tacka
 *
 *
 * @help
 *
 * 複数のJavascriptを読み込むときはこのプラグインを読み込んだようにエディターに複数読み込ませてください。
 *
 */


(function(){	    
    var parameters = PluginManager.parameters('JavaScriptCall');
    var jsSrc = String(parameters['jsSrc']);
    
    var script = document.createElement( 'script' );

    script.type = 'text/javascript';
    script.src = jsSrc;

    // あ、動かんかったｗ
    var firstScript = document.getElementsByTagName( 'script' )[ 0 ];
    firstScript.parentNode.insertBefore( script, firstScript );

    /*
    // これで動くっと思ったら動かない・・・
    var name_ext = jsSrc.substring(jsSrc.lastIndexOf("/")+1, jsSrc.length);
    var name = name_ext.substring(0, name_ext.indexOf("."));
    
    var plugin;
    plugin.name = jsSrc;
    plugin.status = true;
    plugin.description = "";
    plugin.parameters= "";
    */
    
    //this.setParameters(name, plugin.parameters);
    //this.loadScript(name + ".js");
    //this._scripts.push(name);

    /*
    PluginManager.loadOnlineScript = function(name, callBackFunction) {
        var url        = name;
        var script     = document.createElement('script');
        script.type    = 'text/javascript';
        script.src     = url;
        script.async   = false;
        script.onerror = this.onError.bind(this);
        script.onload  = callBackFunction;
        script._url    = url;
        document.body.appendChild(script);
    };
    */

    /*
    (function appendScript() {        
        var firstScript = document.getElementsByTagName( 'script' )[ 0 ];
        
        //firstScript.parentNode.insertBefore( script, firstScript );        
        document.body.appendChild(firstScript);

        firstScript.onload = appendScript;
    })();
    
    function SyncManager() {
        throw new Error('This is a static class');
    }

    SyncManager.initialize = function() {
    };
    
    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize      = function() {
        PluginManager.loadOnlineScript(plugin.name, SyncManager.initialize.bind(SyncManager));
        _SceneManager_initialize.apply(this, arguments);
    };

    var _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain      = function() {
        _SceneManager_updateMain.apply(this, arguments);
        SyncManager.update();
    };

    var _SceneManager_onError = SceneManager.onError;
    SceneManager.onError      = function(e) {
        if (SyncManager.suppressOnError) return;
        _SceneManager_onError.apply(this, arguments);
    };
    */
    
}());