/* Elmasriya Trade — admin field controls (tabs, media, galleries, repeaters). */
jQuery(function ($) {
	'use strict';

	function imgUrl(val, att) {
		if (att) {
			var s = att.sizes || {};
			return (s.medium || s.thumbnail || s.full || att).url;
		}
		return /^\d+$/.test(val) ? '' : emAdmin.imgBase + val;
	}

	/* Tabs */
	$(document).on('click', '.em-tab', function () {
		var $wrap = $(this).closest('.em-fields');
		$wrap.find('.em-tab').removeClass('is-active');
		$wrap.find('.em-panel').removeClass('is-active');
		$(this).addClass('is-active');
		$wrap.find('.em-panel[data-panel="' + $(this).data('tab') + '"]').addClass('is-active');
	});

	/* Single image */
	$(document).on('click', '.em-image-pick', function (e) {
		e.preventDefault();
		var $box = $(this).closest('.em-image');
		var frame = wp.media({ title: 'اختيار صورة', button: { text: 'استخدام الصورة' }, multiple: false, library: { type: 'image' } });
		frame.on('select', function () {
			var att = frame.state().get('selection').first().toJSON();
			$box.find('input').val(att.id).trigger('change');
			$box.find('.em-image-preview').html('<img src="' + imgUrl(att.id, att) + '" alt="">');
		});
		frame.open();
	});
	$(document).on('click', '.em-image-clear', function (e) {
		e.preventDefault();
		var $box = $(this).closest('.em-image');
		$box.find('input').val('').trigger('change');
		$box.find('.em-image-preview').empty();
	});

	/* Gallery */
	function syncGallery($g) {
		var ids = $g.find('.em-gallery-list li').map(function () { return $(this).attr('data-id'); }).get();
		$g.find('input[type=hidden]').val(ids.join(','));
	}
	function initGallerySort($ctx) {
		$ctx.find('.em-gallery-list').sortable({ update: function () { syncGallery($(this).closest('.em-gallery')); } });
	}
	$(document).on('click', '.em-gallery-add', function (e) {
		e.preventDefault();
		var $g = $(this).closest('.em-gallery');
		var frame = wp.media({ title: 'إضافة صور', button: { text: 'إضافة' }, multiple: 'add', library: { type: 'image' } });
		frame.on('select', function () {
			frame.state().get('selection').each(function (m) {
				var att = m.toJSON();
				var thumb = (att.sizes && att.sizes.thumbnail ? att.sizes.thumbnail : att).url;
				$g.find('.em-gallery-list').append('<li data-id="' + att.id + '"><img src="' + thumb + '" alt=""><button type="button" class="em-gallery-remove" aria-label="إزالة">&times;</button></li>');
			});
			syncGallery($g);
		});
		frame.open();
	});
	$(document).on('click', '.em-gallery-remove', function (e) {
		e.preventDefault();
		var $g = $(this).closest('.em-gallery');
		$(this).closest('li').remove();
		syncGallery($g);
	});

	/* Repeater */
	function rowTitle($row) {
		var t = $row.find('.em-row-body input[type=text]').filter(function () { return this.value; }).first().val();
		$row.find('> .em-row-bar .em-row-title').text(t || 'عنصر');
	}
	function initRepeater($ctx) {
		$ctx.find('.em-rows').sortable({ handle: '.em-row-handle', axis: 'y' });
		$ctx.find('.em-row').each(function () { rowTitle($(this)); });
	}
	$(document).on('click', '.em-row-add', function (e) {
		e.preventDefault();
		var $rep = $(this).closest('.em-repeater');
		var html = $rep.children('.em-row-template').html().replace(/__i__/g, 'n' + Date.now());
		var $row = $(html);
		$rep.children('.em-rows').append($row);
		rowTitle($row);
		initGallerySort($row);
	});
	$(document).on('click', '.em-row-remove', function (e) {
		e.preventDefault();
		if (window.confirm('حذف هذا العنصر؟')) $(this).closest('.em-row').remove();
	});
	$(document).on('click', '.em-row-toggle', function (e) {
		e.preventDefault();
		$(this).closest('.em-row').toggleClass('is-collapsed');
	});
	$(document).on('input', '.em-row-body input[type=text]', function () {
		rowTitle($(this).closest('.em-row'));
	});

	initRepeater($(document));
	initGallerySort($(document));
});
