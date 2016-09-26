var pictName = 'ピクチャ名';
var bitmap = ImageManager.loadPicture(pictName);
bitmap.addLoadListener(function() {
    $gameScreen.picture(ピクチャ番号)._name = pictName;
});