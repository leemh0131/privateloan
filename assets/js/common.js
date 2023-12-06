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

//******* Fetch sync POST 요청 *******
async function postData(url, param) {

	//헤더 정보가 필요한 경우에만 추가
	const headers = {
		"Content-Type": "application/json;charset=UTF-8",
		"x-requested-with": "XMLHttpRequest",
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(param),
		});
		return await response.json(); // 서버로부터 받은 데이터를 JSON 형태로 변환
		//console.log(data); // 변환된 데이터를 출력
	} catch (error) {
		alert("네트워크 오류가 발생!!.");
		console.error("Error fetching data:", error);  // 오류 발생 시 메시지 출력	}
	}

}

var nvl = function (A, B) {
	var type;
	var temp;
	if( typeof A == 'string'){
		temp = A.trim();
		type = 'string';
	}else if (typeof A == 'number'){
		temp = A.toString();
		type = 'number';
	}else{
		temp = A;
	}
	if (!isNull(temp) && !isUndefined(temp) && !isEmpty(temp)) {

		if (type == 'number'){
			A = Number(A);
		}
		return A;
	} else {
		if (isUndefined(B)) {
			B = "";
		}
		return B;
	}
};

var isNull = function (value) {
	var _chkStr = value + "";
	if (_chkStr == "" || _chkStr == null || _chkStr == "null") {
		return true;
	}
	return false;
};

var isUndefined = function (value) {
	if (typeof (value) == "undefined" || typeof (value) == undefined || value == "undefined" || value == undefined) {
		return true;
	}
	return false;
};

var isEmpty = function (obj) {
	if(typeof obj === 'object' && obj !== null){ //객체 여부를 확인
		return Object.keys(obj).length === 0;
	}else{
		return false;
	}
};

function commonRegWrite(dm_type){

	let company_cd = "1000";
	let dm_kind = nvl($("#ES_Q0140").val());				//피해종류
	let comp_nm = nvl($("#comp_nm").val());				//업체명
	let borw_site = nvl($("#borw_site").val()); 		//차용사이트
	let debtor_tel = nvl($("#debtor_tel").val()); 		//연락처
	let debtor_kakao = nvl($("#debtor_kakao").val()); 	//카톡
	let debtor_tele = nvl($("#debtor_tele").val()); 	//텔레
	let debtor_sns = nvl($("#debtor_sns").val()); 		//기타sns
	let compl_police = nvl($("#compl_police").val()); 	//고소한경찰서명
	let dm_contents = nvl($("#dm_contents").val()); 	//피해종류
	let use_yn = "Y";

	//let dm_kind = "; //계좌
	//let dm_kind = "; //스마트출금위치
	//let apiUrl = "http://localhost:8080/api/web/v1/regWrite";
	let apiUrl = "http://117.52.84.88:8080/api/web/v1/getCommonCode";
	let param = {
		COMPANY_CD : company_cd,
		DM_TYPE : dm_type,
		DM_KIND : dm_kind,
		COMP_NM : comp_nm,
		BORW_SITE : borw_site,
		DEBTOR_TEL : debtor_tel,
		DEBTOR_KAKAO : debtor_kakao,
		DEBTOR_TELE : debtor_tele,
		DEBTOR_SNS : debtor_sns,
		COMPL_POLICE : compl_police,
		DM_CONTENTS : dm_contents,
		USE_YN : use_yn,
	}

	postData(apiUrl, param)
		.then((res) => {
			// 서버로부터 받은 데이터를 사용하여 원하는 작업을 수행
			console.log('Received data:', res);
			res = res.map;
			if(res.response == 'ok'){
				alert("등록이 완료되었습니다.");
				location.href = '/view_list.html';
			}


		})
		.catch((err) => {
			alert("네트워크 오류가 발생!!.");
			console.error('Error sending/receiving data:', err); // 데이터 전송 또는 수신 중 오류 발생 시 메시지 출력
		});





}