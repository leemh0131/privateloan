$(document).ready(function(){
	$('#header').length && gnbMenu(); //pc GNB 메뉴
	$('.user_slide').length && userSlide();
	$('.main_user_slide').length && mainUserSlide();
	$('.loc_tab').length && mapTab();
});

function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}
function gnbMenu() { //GNB 메뉴
	var head_btn = $('.m_util_menu')
	$('.btn_close').on('click', function(){ //MO GNB 닫기 / 검색 닫기
		head_btn.removeClass('active')
		$('.m_gnb_wrap').removeClass('active')
		$('body').removeClass('gnb_active')
		$('.site_srch_wrap').removeClass('active')
		dimHide()
	});
	$('.btn_search').on('click', function(){ //MO 검색 열기
		head_btn.addClass('active')
		$('.site_srch_wrap').addClass('active')
		$('body').addClass('gnb_active')
		dimShow()
	});
	$('.btn_site_menu').on('click', function(){ //MO GNB 열기
		head_btn.addClass('active')
		$('.m_gnb_wrap').addClass('active')
		$('body').addClass('gnb_active')
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var searchArea = $('.site_srch_wrap');
		if(searchArea.has(e.target).length === 0 && $('body').hasClass('dim') && $('#header').has(e.target).length === 0){
			head_btn.removeClass('active')
			$('.site_srch_wrap').removeClass('active')
			$('body').removeClass('gnb_active')
			dimHide()
		}
	});
}

function userSlide() {
	var ww = $(window).outerWidth();
	var userSlide = undefined;

	function userSwiper() {
		if(ww < 1025 && userSlide == undefined) {
			userSlide = new Swiper('.user_slide', {
				slidesPerView : 'auto',
				spaceBetween : 32,
				loop:true,
				loopAdditionalSlides : 1,
				speed:1500,
				observer: true, // display:none 오류
				observeParents: true,
			});
		}else if(ww >= 1024 && userSlide != undefined){
			userSlide.destroy();
			userSlide = undefined;
		}
	}

	userSwiper();

	$(window).on('resize', function () {
		ww = $(window).outerWidth();
		userSwiper();
	});
}

function mainUserSlide() {
	var ww = $(window).outerWidth();
	var userSlide = undefined;

	function userSwiper() {
		if(ww < 1025 && userSlide == undefined) {
			userSlide = new Swiper('.main_user_slide', {
				slidesPerView : 'auto',
				spaceBetween : 32,
				loop:true,
				loopAdditionalSlides : 1,
				speed:1500,
				observer: true, // display:none 오류
				observeParents: true,
			});
		}else if(ww >= 1024 && userSlide != undefined){
			userSlide.destroy();
			userSlide = undefined;
		}
	}

	userSwiper();

	$(window).on('resize', function () {
		ww = $(window).outerWidth();
		userSwiper();
	});
}

function mapTab(){ //지도 탭
	$('.loc_tab ul li button').on('click', function(e){
		e.preventDefault();
		$('.loc_tab li').removeClass('on')
		$(this).parent().addClass('on')
	})

	$('.more_tab').on('click', function(e){
		e.preventDefault();
		$('.loc_tab ul').toggleClass('active')
	})
}
