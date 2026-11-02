/* Elmasriya Trade — front-end behaviour (no dependencies). */
(function () {
	'use strict';
	var doc = document.documentElement;
	doc.classList.add('js');

	/* Sticky header */
	var header = document.getElementById('site-header');
	var top = document.querySelector('.site-top');
	if (header && top) {
		var overlay = top.classList.contains('is-overlay');
		var threshold = 160;
		var onScroll = function () {
			var stuck = window.scrollY > threshold;
			if (stuck === header.classList.contains('is-stuck')) return;
			if (stuck && !overlay) top.style.minHeight = top.offsetHeight + 'px';
			if (!stuck) top.style.minHeight = '';
			header.classList.toggle('is-stuck', stuck);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	/* Mobile menu */
	var toggle = document.querySelector('.nav-toggle');
	var body = document.body;
	if (toggle) {
		toggle.addEventListener('click', function () {
			var open = body.classList.toggle('nav-open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		document.addEventListener('click', function (e) {
			if (body.classList.contains('nav-open') && !e.target.closest('.main-nav') && !e.target.closest('.nav-toggle')) {
				body.classList.remove('nav-open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
		document.querySelectorAll('.nav-menu .menu-item-has-children > a').forEach(function (a) {
			a.addEventListener('click', function (e) {
				if (window.innerWidth > 960) return;
				var li = a.parentElement;
				if (!li.classList.contains('sub-open')) {
					e.preventDefault();
					li.classList.add('sub-open');
				}
			});
		});
	}

	/* Reveal on scroll */
	var items = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) {
					en.target.classList.add('is-in');
					io.unobserve(en.target);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
		items.forEach(function (el, i) {
			el.style.transitionDelay = (i % 4) * 70 + 'ms';
			io.observe(el);
		});
	} else {
		items.forEach(function (el) { el.classList.add('is-in'); });
	}

	/* Lightbox */
	var lb, lbImg, list = [], index = 0;
	function buildLightbox() {
		lb = document.createElement('div');
		lb.className = 'em-lightbox';
		lb.innerHTML = '<button type="button" class="em-lb-close" aria-label="إغلاق">&times;</button>' +
			'<button type="button" class="em-lb-prev" aria-label="السابق">&#8250;</button>' +
			'<img alt="">' +
			'<button type="button" class="em-lb-next" aria-label="التالي">&#8249;</button>';
		document.body.appendChild(lb);
		lbImg = lb.querySelector('img');
		lb.addEventListener('click', function (e) {
			if (e.target === lb || e.target.classList.contains('em-lb-close')) close();
			if (e.target.classList.contains('em-lb-prev')) show(index - 1);
			if (e.target.classList.contains('em-lb-next')) show(index + 1);
		});
		document.addEventListener('keydown', function (e) {
			if (!lb.classList.contains('is-open')) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') show(index - 1);
			if (e.key === 'ArrowLeft') show(index + 1);
		});
	}
	function show(i) {
		index = (i + list.length) % list.length;
		lbImg.src = list[index];
	}
	function open(urls, i) {
		if (!lb) buildLightbox();
		list = urls;
		show(i);
		lb.classList.add('is-open');
	}
	function close() { lb.classList.remove('is-open'); }

	document.querySelectorAll('[data-lightbox]').forEach(function (grid) {
		var links = Array.prototype.slice.call(grid.querySelectorAll('a'));
		var urls = links.map(function (a) { return a.href; });
		links.forEach(function (a, i) {
			a.addEventListener('click', function (e) { e.preventDefault(); open(urls, i); });
		});
	});

	/* Product gallery */
	document.querySelectorAll('[data-gallery]').forEach(function (g) {
		var main = g.querySelector('.pg-main');
		var thumbs = Array.prototype.slice.call(g.querySelectorAll('.pg-thumb'));
		if (!main) return;
		var urls = thumbs.length ? thumbs.map(function (t) { return t.dataset.full; }) : [main.href];
		var current = 0;
		thumbs.forEach(function (t, i) {
			t.addEventListener('click', function () {
				current = i;
				thumbs.forEach(function (x) { x.classList.remove('is-active'); });
				t.classList.add('is-active');
				var img = main.querySelector('img');
				img.style.opacity = 0;
				setTimeout(function () {
					img.src = t.dataset.large;
					img.removeAttribute('srcset');
					img.style.opacity = 1;
				}, 150);
				main.href = t.dataset.full;
			});
		});
		main.addEventListener('click', function (e) { e.preventDefault(); open(urls, current); });
	});
})();
