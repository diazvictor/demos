/**!
 * @package   MDUI
 * @filename  nav.js
 * @version   1.0
 * @author    Díaz Urbaneja Víctor Eduardo Diex <victor.vector008@gmail.com>
 * @date      10.09.2020 15:30:23 -04
 */

var $$ = mdui.JQ;
var nav = new mdui.Drawer('#drawer');

document.getElementById('menu').addEventListener('click', function() {
    nav.toggle();
});

let searchEvent = document.getElementById('search');
function clearSearch() {
	if ($$('#search').val() !== '') {
		$$('.search-bar').addClass('not-empty');
	} else {
		$$('.search-bar').removeClass('not-empty');
	}			
}
$$('.search-bar .cancel').on('click', function(){
	$$('#search').val('');
	clearSearch();
});
searchEvent.addEventListener('keyup', function(e){
	clearSearch();
});
$$('#btn-search').on('click', function() {
	$$('nav.toolbar').addClass('mobile').find('.search-bar input')[0].focus();
	$$('.back').on('click', function(){
		$$('nav.toolbar').removeClass('mobile');
	});
});