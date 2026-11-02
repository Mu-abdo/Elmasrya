/* تجربة ديمو: تبويبات صفحة المنتج اللاصقة — تعليم القسم الحالي أثناء التمرير */
(function () {
	'use strict';
	var tabs = document.querySelector('.pd-tabs');
	if (!tabs) return;
	var links = Array.prototype.slice.call(tabs.querySelectorAll('a'));
	var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

	function setActive(id) {
		links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
	}

	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
		}, { rootMargin: '-45% 0px -50% 0px' });
		sections.forEach(function (s) { io.observe(s); });
	}

	// ظل للتبويبات لما تلزق فوق
	var sentinel = document.createElement('div');
	tabs.parentNode.insertBefore(sentinel, tabs);
	if ('IntersectionObserver' in window) {
		new IntersectionObserver(function (e) {
			tabs.classList.toggle('is-stuck', !e[0].isIntersecting);
		}).observe(sentinel);
	}
})();
