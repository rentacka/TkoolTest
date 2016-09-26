//JavaScriptを呼び出し

/*:ja
 * @plugindesc JavascriptTest
 * @author マネーコイコイさん　https://twitter.com/ren_tacka
 *
 *
 * @help
 *
 *
 */

(function(){	
      
    $(function(){
        var str = "    foo     ";
        var src = jQuery.trim(str); // "foo" を返す
        alert("'" + src + "' - no longer");
    });

    
    $(function(){
        alert('Hello World!');
    });
    
    //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "hello world.txt");
    
}());