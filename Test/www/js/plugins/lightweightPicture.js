


/*:
 * @plugindesc 1.3.1用。一部画像表示を軽量化します。影響範囲未確認なので使用には注意
 * @author dummy
 */

Sprite.prototype._renderWebGL = function(renderer) {
	

    if (this.bitmap) {
        this.bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        if (this._bitmap) {
            this._bitmap.checkDirty();
        }

	if(this._isPicture){
		this._renderWebGL_PIXI(renderer);
	}else{
        //copy of pixi-v4 internal code
        this.calculateVertices();
            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(this);
	}
    }
};
