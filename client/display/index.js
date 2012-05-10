define([
	'./draw',
	'./align',
	'./circle',
	'./group',
	'./image',
	'./imgtext',
	'./rect',
	'./screen',
	'./sprite',
	'./text'
], function(draw, align, circle, group, image, imgtext, rect, screen, sprite, text){
	'use strict';
	
	return function(engine){
		draw(engine);
		align(engine);
		circle(engine);
		group(engine);
		image(engine);
		imgtext(engine);
		rect(engine);
		screen(engine);
		sprite(engine);
		text(engine);
	};
});