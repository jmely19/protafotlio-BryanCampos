/*----------------------------------------------------------------

	Template Name: Hayley - Creative Personal Onepage HTML Template

	-------------------------------------------------------------------------------*/

/**************************************************************
	
	Main Js Activation
	01. Preloader
	02. Menu
	03. Header Shadow 
	04. Pagepiling
	05. Carousels
	06. Forms
	__ End Js Activation

***************************************************************/

(function ($) {
	'use strict';

	/*-------------------------------------------------------------------------------
	  Preloader
	-------------------------------------------------------------------------------*/

	$(window).on('load', function() {
		if ( $('.preloader').length ) {
			$('.preloader').fadeOut('slow');
		}
	});



	/*-------------------------------------------------------------------------------
	  Menu
	-------------------------------------------------------------------------------*/

	$('.a-nav-toggle').on('click', function(){
		if ($('html').hasClass('body-menu-opened')) {
			$('html').removeClass('body-menu-opened').addClass('body-menu-close');
		} else {
			$('html').addClass('body-menu-opened').removeClass('body-menu-close');
		}
	});

	// Cerrar menú al hacer clic en un enlace del menú
	$('.menu-main a').on('click', function(){
		if ($('html').hasClass('body-menu-opened')) {
			$('html').removeClass('body-menu-opened').addClass('body-menu-close');
		}
	});



	/*-------------------------------------------------------------------------------
	  Header Shadow
	-------------------------------------------------------------------------------*/

	$('.pp-scrollable').scroll(function() {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('header-shadow');
		} else {
			$('.header').removeClass('header-shadow');
		}
	});



	/*-------------------------------------------------------------------------------
	  Pagepiling
	-------------------------------------------------------------------------------*/

		if ( $('.a-pagepiling').length ) {
		var pagepilingInstance = $('.a-pagepiling');
		var anchorsList = ['Intro', 'Services', 'Projects', 'Awards', 'TribunalElectoral', 'TECHO', 'Emprende', 'Samsung', 'Experience', 'Clients', 'Testimonials', 'Contact'];
		
		pagepilingInstance.pagepiling({
			scrollingSpeed: 280,
			menu: '#menu, #menuMain',
			anchors: anchorsList,
			loopTop: false,
			loopBottom: false,
			navigation: {
				'position': 'right'
			},
			onLeave: function(){
				$('.header').removeClass('header-shadow');
				if ($('.pp-scrollable.active').scrollTop() > 0) {
					$('.header').addClass('header-shadow');
				} else {
					$('.header').removeClass('header-shadow');
				}
				if ($('.slide-dark-footer').hasClass('active')) {
					$('body').addClass('body-copyright-light');
				} else {
					$('body').removeClass('body-copyright-light');
				}
				// No agregar body-bg-dark para las secciones con fondo celeste (slide-dark-bg)
				// para mantener el nav en su color original
				if ($('.slide-dark-bg').hasClass('active')) {
					// No agregar body-bg-dark para mantener el nav en su color original
					$('body').removeClass('body-bg-dark');
				} else {
					// Para otras secciones dark, mantener el comportamiento original
					// (esto se maneja en otro lugar del código si es necesario)
					$('body').removeClass('body-bg-dark');
				}
				$('.a-carousel-projects').trigger('refresh.owl.carousel');
			},
			afterRender: function(){
				setupPagepilingNavigation();
			}
		});
		
		// Función para manejar la navegación con pagepiling
		function setupPagepilingNavigation() {
			// Configurar navegación después de un pequeño delay para asegurar que pagepiling esté listo
			setTimeout(function() {
				$(document).off('click.pagepilingNav', 'a[href^="#"]').on('click.pagepilingNav', 'a[href^="#"]', function(e) {
					var href = $(this).attr('href');
					var $link = $(this);
					
					// Excluir enlaces que abren modales, enlaces vacíos, enlaces sociales, o enlaces de descarga
					if (href === '#' || href === '' || 
					    $link.data('toggle') === 'modal' || 
					    $link.data('target') || 
					    $link.hasClass('menu-lang-item') ||
					    $link.closest('.social').length > 0 ||
					    $link.attr('target') === '_blank' ||
					    $link.attr('download') !== undefined ||
					    href.indexOf('.pdf') !== -1 ||
					    href.indexOf('.doc') !== -1 ||
					    href.indexOf('.docx') !== -1) {
						return;
					}
					
					var target = href.replace('#', '').trim();
					
					// Verificar que el target existe en los anchors configurados
					if (target && anchorsList.indexOf(target) !== -1) {
						e.preventDefault();
						e.stopPropagation();
						
						try {
							// Intentar navegar usando el método moveTo con el nombre del anchor
							pagepilingInstance.pagepiling('moveTo', target);
						} catch(err) {
							console.log('Error navegando a sección:', err);
							// Fallback: buscar la sección por data-anchor o id
							var targetSection = $('[data-anchor="' + target + '"], #' + target);
							if (targetSection.length > 0) {
								// Buscar el índice de la sección
								var allSections = $('.pp-section, .section');
								var sectionIndex = allSections.index(targetSection);
								if (sectionIndex >= 0) {
									try {
										pagepilingInstance.pagepiling('moveTo', sectionIndex + 1);
									} catch(err2) {
										console.log('Error navegando por índice:', err2);
									}
								}
							}
						}
						return false;
					}
				});
			}, 200);
		}
	}



	/*-------------------------------------------------------------------------------
	  Carousels
	-------------------------------------------------------------------------------*/

	if ( $('.a-carousel-projects').length ) {
		$('.a-carousel-projects').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			dots: false,
			nav: true,
			loop: true
		});
	}

	if ( $('.a-carousel-experience').length ) {
		$('.a-carousel-experience').owlCarousel({
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			margin: 30,
			dots: false,
			nav: true,
			navContainer: '.a-carousel-nav',
			loop: true
		});
	}

	if ( $('.a-carousel-testimonial').length ) {
		$('.a-carousel-testimonial').owlCarousel({
			items: 1,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			margin: 30,
			dots: false,
			nav: true
		});
	}

	if ( $('.a-carousel-awards').length ) {
		$('.a-carousel-awards').owlCarousel({
			items: 3,
			navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
			smartSpeed: 750,
			margin: 30,
			dots: true,
			nav: true,
			loop: false,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				}
			}
		});
	}


	/*-------------------------------------------------------------------------------
	  Forms
	-------------------------------------------------------------------------------*/

	// File Input Path
	$(document).on('change', '.a-file input[type="file"]', function () {
		var file_field = $(this).closest('.a-file');
		var path_input = file_field.find('input.file-path');
		var files = $(this)[0].files;
		var file_names = [];
		for (var i = 0; i < files.length; i++) {
		file_names.push(files[i].name);
		}
		path_input.val(file_names.join(", "));
		path_input.trigger('change');
	});


	// Material
	if ( $('.a-form-group').length ) {
		$('.a-form-group .form-control').each(function() {
			if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined) {
				$(this).closest('.a-form-group').addClass('active');
			}
		});
		$('.a-form-group .form-control').focus(function() {
			$(this).closest('.a-form-group').addClass('active');
		});
		$('.a-form-group .form-control').blur(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-form-group').removeClass('active');
			}
		});
		$('.a-form-group .form-control').change(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-form-group').removeClass('active');
			} else {
				$(this).closest('.a-form-group').addClass('active');
			}
		});
	}

	// Send Form
	if ($('.a-ajax-form').length) {
		$('.a-ajax-form').each(function () {
			var thisForm = $(this);
			var succMessage = thisForm.find('.success-message');
			var errMessage = thisForm.find('.error-message');
			thisForm.validate({
				errorClass: 'error',
				submitHandler: function (form) {
					$.ajax({
						type: 'POST',
						url: 'handler.php',
						data: new FormData(form),
						cache: false,
						contentType: false, // Not to set any content header
						processData: false, // Not to process data
						success: function () {
							succMessage.show();
						},
						error: function () {
							errMessage.show();
						}
					});

				}
			});
		});
	}

}($));