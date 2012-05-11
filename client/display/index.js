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
	
	return function(Σ){
		draw(Σ);
		align(Σ);
		circle(Σ);
		group(Σ);
		image(Σ);
		imgtext(Σ);
		rect(Σ);
		screen(Σ);
		sprite(Σ);
		text(Σ);
	};
});