$(document).ready(function() {
	var $carousel = $('#mainCarousel');
	var $thumbs = $('.thumb');
	/* Click su thumbnail */
	$thumbs.on('click', function() {
		var index = $(this).data('bs-slide-to');
		$carousel.carousel(index);
	});
	/* Cambio slide --  aggiorna thumbnail attiva */
	$carousel.on('slid.bs.carousel', function(e) {
		$thumbs.removeClass('active');
		$thumbs.eq(e.to).addClass('active');
	});
	/* Cambio valori ai colori + aggiungo active*/
	$('.circle').on('click', function(e) {
		if ($(this).hasClass('active')) {
			return;
		}
		if ($(this).hasClass('pink')) {
			$('#color-name').html('PINK')
		}
		if ($(this).hasClass('grey')) {
			$('#color-name').html('GREY')
		}
		if ($(this).hasClass('black')) {
			$('#color-name').html('BLACK')
		}
		$('.circle.active').removeClass('active')
		$(this).addClass('active')
	})
	/* Cambio active alla sezione delle taglie*/
	$('.circle-size').on('click', function(e) {
		if ($(this).hasClass('active')) {
			return;
		}
		if ($(this).hasClass('small')) {
			$('#size-name').html('S')
		}
		if ($(this).hasClass('medium')) {
			$('#size-name').html('M')
		}
		if ($(this).hasClass('large')) {
			$('#size-name').html('L')
		}
		$('.circle-size.active').removeClass('active')
		$(this).addClass('active')
	})
	/* Gestione quatita' con incremento numero */
	$('.quantity-minus').on('click', function() {
		let qty = parseInt($('.quantity-number').html(), 10);
		if (qty === 1) {
			return;
		}
		$('.quantity-number').html(qty - 1);
	});
	$('.quantity-plus').on('click', function() {
		let qty = parseInt($('.quantity-number').html(), 10);
		$('.quantity-number').html(qty + 1);
	});
	/* Gestione pulsante di wishlist */
	$('.wishlist-btn').on('click', function() {
		const $count = $('#wishlist-count');
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$count.addClass('d-none');
		} else {
			$('.wishlist-btn.active').removeClass('active');
			$(this).addClass('active');
			$count.removeClass('d-none');
		}
	});
	/* Gestione pulsante di inserimento al carrello */
	$('.checkout-btn').on('click', function() {
		const $cart = $('#cart-count');
		if ($cart.hasClass('d-none')) {
			$cart.removeClass('d-none');
		} else {
			$cart.addClass('d-none');
		}
	});
	/* Gestione colori nella sezione "You may also like" */
	$('.circle-static').on('click', function() {
		// trova il gruppo di pallini più vicino
		const parentGroup = $(this).closest('.card_info');
		// rimuove active solo nel gruppo corrente
		parentGroup.find('.circle-static.active').removeClass('active');
		// aggiunge active solo al pallino cliccato
		$(this).addClass('active');
	});
});