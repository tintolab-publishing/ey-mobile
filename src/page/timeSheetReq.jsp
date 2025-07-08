<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<%@ include file="../common/header.jsp" %>    
<title>eyPortal</title>
<link rel="stylesheet" href="<c:out value='${pageContext.request.contextPath}'/>/resources/css/table-fixed-header.css"> 
<script type="text/javascript" src="<c:out value='${pageContext.request.contextPath}'/>/resources/inc_js/overTime/table-fixed-header.js"></script>
 
<!-- include alertify.css -->
<link rel="stylesheet" href="<c:out value='${pageContext.request.contextPath}'/>/resources/alertifyjs/css/alertify.css">
<link rel="stylesheet" href="<c:out value='${pageContext.request.contextPath}'/>/resources/alertifyjs/css/themes/bootstrap.css">
<!-- include alertify script -->
<script src="<c:out value='${pageContext.request.contextPath}'/>/resources/alertifyjs/alertify.js"></script>

<style type="text/css">

.row-highlight{
	height:50px;
}
.pnt { cursor: pointer; }
.std {
	background-color: #B0BED9;
}
.stdred {
 	background-color: #95091C;
}
.stdgree {
 	background-color: #4d9e00;
}

.fa-search {
	align:left;
	margin-right:5px;
}

.upArrowIcon {
	align : center;
}

#delegationBtn {
	margin-bottom:2px;
}

#epSelect {
	margin-bottom:2px;
}

#delegationLabel {
	margin-bottom:9px; 
	margin-right:10px; 
	display:block; 
	text-align:right
}

#wfhDescription + div > .tooltip-inner .th {
	max-width: 470px;
	width: 470px;
	text-align:left;
}

.tooltip-inner {
    max-width: 470px;
    width: 470px;
    text-align:left;
}

.table-fixed {
	table-layout: fixed;
}

td:not(.copytd) {
	white-space: nowrap;
	max-width: 100%;
}
th { 
	white-space: nowrap; 
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 940px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 940px;
  }
}
/* [2024.08][박유란] 매뉴얼 버튼 강조를 위해서 추가 */
.emphasize {
	display: inline-block;
	margin-left: 3px;
	padding: 4px 6px;
	min-width: 33px;
	background-color: #FED254;
	color: #3a3b53;
	border-radius: 10px;
	font-weight: bold;
	font-size: 14px;
}
/* [2024.08][박유란] 타임시트 대리 접속 버튼을 위해서 추가  */
#oepnInActiveUserPageModal {
	margin-bottom:2px;
}

</style>
<script type="text/javascript">
var lastRequestDatas = new Object(); // 최종 승인 요청 데이터
var finalReqType = ""; // 독립성 확인 후 저장, 승인요청 구분 필요(EP이상 직급의 경우 승인요청이 아니라 저장하면 바로 승인됨)

// [24.02] 20시간 이상 입력 시 사유 작성
var over20hReason = null;

var dataTable;
var startDate;
var selectEng;
var selectDate;
var loc1List;	//페이지 이동과 동시에 LOC1 정보들을 모두 저장
var totalReqHour = 0;
var totalPlenHour = 0;
var engRowIndex = 0;	//eng row index
var workingType = '';	//근무제 타입
var workingTypeInfo;	//근무제에 대한 정보

var totalPlanHours = 0;
var totalChargeableHours = 0;
var totalAuthorizedHours = 0;
var totalNonChargeableHours = 0;
var totalOverTimeHours = 0;  // 이번 주 일한 시간에서 40 시간을 뺀 시간
var accumulatedOverTimeHours = 0;  // 매일 8시간 초과한 시간을 합친 시간

var totalPlanChargeableHours = 0;
var totalPlanAuthorizedHours = 0;
var totalPlanNonChargeableHours = 0;

//요일별 actual hours
var satAc = 0;
var sunAc = 0;
var monAc = 0;
var tueAc = 0;
var wedAc = 0;
var thrAc = 0;
var friAc = 0;
var totalAc = 0; // [2024.08][박유란] 일제출/승인

//요일별 non-chargeable actual hours
var satNonChargeableAc = 0;
var sunNonChargeableAc = 0;
var monNonChargeableAc = 0;
var tueNonChargeableAc = 0;
var wedNonChargeableAc = 0;
var thrNonChargeableAc = 0;
var friNonChargeableAc = 0;

//요일별 초과 근무 시간
var satOverTimeHours = 0;
var sunOverTimeHours = 0;
var monOverTimeHours = 0;
var tueOverTimeHours = 0;
var wedOverTimeHours = 0;
var thrOverTimeHours = 0;
var friOverTimeHours = 0;

//근무제에 따른 일반 근무로 간주하는 하루 최대 working time
var maximumGeneralAcPerDay = 0;

//timeSheet 제출 상태
var timeSheetStatus = '';

//my info
var GPN;
var EY_RANK;
var KOREAN_NAME;
var HIRE_DATE;
var RETIRE_DATE;
var SERVICE_LINE; //재택여부 표시 결정

//active gpn info (delegator)
var ACTIVE_GPN;
var ACTIVE_EY_RANK;
var ACTIVE_KOR_NAME;
var ACTIVE_SERVICE_LINE;
var apprExceptionList = [];	//직급이 EP 이상인 사원의 EY_RANK list

// Retain vs Actual의 값이 다른 경우 사유서를 받는 것의 switch (true 이면 사유서 받음)
var TIME_DIFF_REASON_SWITCH = false;

// 선택, 탄력의 경우 일시적으로 52시간 초과할 수 있는데, 이에 대해 전체 재승인을 받도록 하는 것의 switch (true 이면 경고 및 전체 재승인요청)
var OVER_52HOURS_SWITCH = false;

// 35번 감사코드에 한 해 확정된 Eng인지 판단
var fixedEngList = [];
// 35번 감사코드 독립성 확인 체크
var independenceChkEngList = [];
var clientList = [];

//Mercury Code Options
var OPEN_ENG_STAT = [];
var EDU_ENG_TYPE = [];
var AUDIT_GLOB_SVC_CD = [];

//url 뒤의 parameter 값을 추출함 - 현재 사용하지 않습니다
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

//머큐리 변환 날짜
var GFIS_CLOSING_DATE;

// AIC 독립성 확인서 미제출 내역 존재 유무
var AIC_NON_FLAG;

//4주 이전 타임시트 수정 가능 인원
var reqExceptionList = new Array();

// [2024.08][박유란] 기존에 타임시트 개수만큼 selectCpaType API 연동하던 것을 한번만 하도록 변경 
// CPA Type 목록
let cpaTypeList = [];

$(document).ready(function() {
	//var versionNumber = getBrowserVersion();
	$('#manual').attr('href', TMS_Manual_Path);
	//my info
	GPN = '${myInfo.GPN}';
	EY_RANK = '${myInfo.EY_RANK}';
	KOREAN_NAME = '${myInfo.KOR_NAME}';
	KOREAN_NAME_INACTIVE = '${myInfo.KOREAN_NAME}'; // selectEmployeeInME(FROM MonthlyEmplyoee 테이블)에서 조회 = INACTIVE(퇴사자라고 생각)
	ACTIVE_GPN = GPN;	//초기에 로그인 GPN으로 setting
	ACTIVE_EY_RANK = EY_RANK;	//초기에 로그인 GPN의 RANK로 setting
	ACTIVE_SERVICE_LINE = '${myInfo.SERVICE_LINE}';	//초기에 로그인 GPN의 SERVICE_LINE으로 setting
	HIRE_DATE = '${employmentPeriod.HIRE_DATE}';
	RETIRE_DATE = '${employmentPeriod.RETIRE_DATE}';
	SESSION_GPN = '${myInfo.GPN}';
	SERVICE_LINE = '${myInfo.SERVICE_LINE}'; //재택여부 표시 결정 
	AIC_NON_FLAG = '${aicNonFlag}'; // AIC 독립성 확인서 미제출 내역 존재 유무
	CTR_OPEN_FLAG = '${ctrOpenFlag}'; // [22/12/29] 계약 관리 시스템 오픈 여부
	AUTHORITY = '${authority}';
	
	// 11.15 추가 // 윤정
	<c:forEach items="${apprExceptionRanks}" var="item">
		apprExceptionList.push("${item.VALUE}");
	</c:forEach>
	
	<c:forEach items="${openEngStat}" var="item">
		OPEN_ENG_STAT.push("${item.VALUE}");
	</c:forEach>
	
	<c:forEach items="${eduEngType}" var="item">
		EDU_ENG_TYPE.push("${item.VALUE}");
	</c:forEach>
	
	<c:forEach items="${auditGlobSvcCd}" var="item">
		AUDIT_GLOB_SVC_CD.push("${item.VALUE}");
	</c:forEach>
	
	<c:forEach items="${closingDate}" var="item">
		GFIS_CLOSING_DATE = "${item.VALUE}";
	</c:forEach>

// 	if (versionNumber == -1) {
// 		var wrongBrowserHtml = "";
// 		wrongBrowserHtml += "<div>";
// 		wrongBrowserHtml += "<br /><br /><br /><br /><br />";
// 		wrongBrowserHtml += "<center>";
// 		wrongBrowserHtml += "<h2>TimeSheet 제출/승인은 Internet Explorer, Microsoft Edge 에서만 가능합니다.</h2>";
// 		wrongBrowserHtml += "</center>";
// 		wrongBrowserHtml += "</div>";

// 		$('#page-wrapper').html(wrongBrowserHtml);
		
// 		return;
// 	}
	
	
	//타임시트 횡 스크롤 화살표 고정
	$(window).scroll(function(){
		$('#scrollbarLayer').css('top',$(window).scrollTop()+300);
	});

	//타임시트 횡 스크롤 화살표 클릭 이벤트
	$(document).on('click', '#leftScroll', function(){
		$('.tbl-fix-right').scrollLeft( $('.tbl-fix-right').scrollLeft() - 50);
	});
	$(document).on('click', '#rightScroll', function(){
		$('.tbl-fix-right').scrollLeft( $('.tbl-fix-right').scrollLeft() + 50);
	});

	
	//타임시트 횡스크롤 키보드 이벤트 -> 방향키로만 움직이면 input값 수정할 때 함께 움직이므로 ctrl키와 함께 이동하도록 수정(gaeun)
	var isCtrl = false;  
	$(document).keyup(function(event) {
	    if(event.which == 17) isCtrl=false;  
	});
	$(document).keydown(function(event) {
		if(event.which == 17) isCtrl=true;  
	    if (event.keyCode == '37' && isCtrl == true) {
			$('.tbl-fix-right').scrollLeft($('.tbl-fix-right').scrollLeft() - 50);
	    }
	    else if (event.keyCode == '39' && isCtrl == true) {
	        $('.tbl-fix-right').scrollLeft($('.tbl-fix-right').scrollLeft() + 50);
	    }
	});

	//게이지바 tooltip 초기화 및 마우스 오버 문구 setting
	$('[data-toggle="tooltip"]').tooltip();
	$('#progressBar_P').attr("data-original-title", "40시간 이하: Green<br/>40시간 초과 - 52시간 이하: Yellow<br/>52시간 초과: Red");
	$('#progressBar_A').attr("data-original-title", "40시간 이하: Green<br/>40시간 초과 - 52시간 이하: Yellow<br/>52시간 초과: Red");
	
	//재택근무 설명
// 	$('#wfhDescription').attr("data-original-title", "동일한 Engagement에서 요일 별로 재택 여부가 다를 경우, <br/>우측 하단에 있는 [행추가] 메뉴로 행을 추가 후 요일별로 작성해 주세요.<br/>(ex. 월~수요일은 필드에서 업무를 수행하고 목~금요일은 재택근무를 한 경우,<br/>월~수요일 한 줄 작성, 목~금요일은 같은 Engagement로 행을 추가하여 재택에 체크)");
	
	//delegation
	selectGpnRelevantDelegation();
	
	// DATE PICKER
	$("[name^='datepicker']").datepicker({
        showOn: "both", 
        buttonImage: "../resources/img/common/ico_calendar.png", 
        buttonImageOnly: true,        
		dateFormat: "yy-mm-dd",
		beforeShowDay: function(date){
			var day = date.getDay();
			return [(day != 0 && day != 1 && day != 2 && day != 3 && day != 4 && day != 6)];
		}
	});
	
	$('img.ui-datepicker-trigger').css({
		'cursor' : 'pointer',
		'width' : '31px',
		'margin-top' : '-1px'
	});

	$('#selectedWeekEnding').on('change', function() {
		setWsDate();
	});

	if($('#selectEndDate').val() == "") {
		$('#selectedWeekEnding').val(findThisFriday());
	} else {
		$('#selectedWeekEnding').val($('#selectEndDate').val());
	}
	// [2024.08][박유란] selectCpaType 한번만 하도록 수정
	selectCpaType();
	
	//timeSheet table 조회
	retrieveTimeReport(true);
	
	
	//페이지 이동과 동시에 LOC1 정보들을 모두 저장 - 페이지 이동시 단 한 번 조회
	retrieveLocList();
	
	$(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');   

	//타임시트 테이블의 시간 값이 변경된다면 근무 시간 재계산  //TODO : input이 아니라 조건 줘야함. description 고치다가도 호출할듯
	$('#timeReportList_R').on('propertychange change keyup paste input', function() {
		calculateWorkingHours();
	});
	
	dataTable = $('#dataTables-example').DataTable({
	    responsive: true,
	    lengthChange: false,
	    "searching": true,
	    "paging": false,
	    "ordering":false
	});
	
	$(document).on('click', '#searchEngList tr', function(){
		var selectTd = $(this).children();
		if($(this).hasClass('std')){
			$(this).removeClass('std');
		}else{
			$('#searchEngList .std').removeClass('std');
			$(this).addClass('std');
		}
	});

	$(document).on('click', '#nonChargeablePtag', function(){
		$("#searchEngWord").val('Non-Chargeable Code');
    	searchEng();
	});
	
	
	$(document).on('click', '#delegatorInfoList tr', function(){
		var selectTd = $(this).children();
		if($(this).hasClass('std')){
			$(this).removeClass('std');
		}else{
			$('#delegatorInfoList .std').removeClass('std');
			$(this).addClass('std');
		}
	});
	
	$(document).on('click', '#apprList tr', function(){
		var selectTd = $(this).children();
		if($(this).hasClass('std')){
			$(this).removeClass('std');
		}else{
			$('#apprList .std').removeClass('std');
			$(this).addClass('std');
		}
	});
	
	// Mercury Location	
	$(document).on('click', '#searchLocList tr', function(){
		var selectTd = $(this).children();
		if($(this).hasClass('std')){
			$(this).removeClass('std');
		}else{
			$('#searchLocList .std').removeClass('std');
			$(this).addClass('std');
		}
	});
	
	$('.dataTables_filter').hide();
	
	$(document).on('click', '#retainList td',  function(){	
		var nowDate = new Date(startDate);
		var selectRow = $(this).closest('tr').children();
		var cellIndex;
		var engIndex;
		
		if($(this).closest('tr').index() == 0){
			cellIndex = $(this).index()-2;
			engIndex = 1;
		}else{
			cellIndex = $(this).index()-1;
			engIndex = 0;
		}
		
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			selectDate = '';
			selectEng = '';
		}else{
			nowDate.setDate(nowDate.getDate()+cellIndex)
			if(cellIndex < 7 && cellIndex >= 0){
				$('#retainList .selected').removeClass('selected');
				$(this).addClass("selected");
				selectDate = nowDate.format('yyyy-MM-dd');				
				selectEng = selectRow.eq(engIndex).text(); 
			}
		}
	});
		
	$('#openEngModal').on('click', function(){
		$('#searchEngWord').val('');
		$('#searchEngList').html('');
		$('#searchEng').modal();
	});
	
	$("#searchEngWord").keyup(function(e){
		if(e.keyCode == 13)  
			searchEng(); 
	});
	
	$('#searchApprWord').keyup(function(e){
		if(e.keyCode == 13){
			searchApprList();
		}
	});
	
	// Mercury Location
	$('#openLocModal').on('click', function(){
		$('#searchLocWord').val('');
		$('#searchLocList').html('');
		$('#searchLoc').modal();
	});
	
	$('#searchLocWord').keyup(function(e){
		if(e.keyCode == 13){
			searchLoc();
		}
	});
	
	$(document).on('keyup', '#Sa_A, #Su_A, #Mo_A, #Tu_A, #We_A, #Th_A, #Fr_A, #Sa_D, #Su_D, #Mo_D, #Tu_D, #We_D, #Th_D, #Fr_D', function(evt) {

		//숫자 이외의 문자 입력시 자동으로 지워짐
		$(this).val($(this).val().replace(/[^\.0-9]/g, ''));	
        
	});
	
	$(document).on('blur', '#Sa_A, #Su_A, #Mo_A, #Tu_A, #We_A, #Th_A, #Fr_A, #Sa_D, #Su_D, #Mo_D, #Tu_D, #We_D, #Th_D, #Fr_D', function() {
		
		//필드에 값이 없을시 입력 유도
		if($(this).val() === '' || $(this).val() === null) {
			$(this).css("border", "2px solid red");
			$(this).focus();
			return false;
		}else {
			$(this).removeAttr("style");
			
			//소수점 두자리까지만 보여주기 (반올림)
			var _pattern2 = /^\d*[.]\d{2}$/;
			if($(this).val().search(_pattern2) == -1) {
				var fixedNum = Number($(this).val());
				$(this).val(fixedNum.toFixed(2));
			}
		}
		
		//숫자 이외 문자 입력시 처리
		$(this).val($(this).val().replace(/[^\.0-9]/g, ''));	
		
	});
	
	$(document).on('click', '#Sa_A, #Su_A, #Mo_A, #Tu_A, #We_A, #Th_A, #Fr_A, #Sa_D, #Su_D, #Mo_D, #Tu_D, #We_D, #Th_D, #Fr_D', function(evt) {
		$(this).select();
	});
	
	/* delegation */
	$("#delegationBtn").on('click',function(e){ 
		$('#setDelegatorModal').modal();
		selectGpnRelevantDelegation(GPN);
	});
	
	/* copy TimeSheet */
	$("#copyBtn").on('click',function(e){ 
		selectCopyDateList(findThisFriday());
	});
	
	$("#copyAll").click(function() {
		if ($(this).is(":checked")) { 
			$("input[name=copyCheck]").not(":disabled").attr("checked", "checked"); 			
		} else { 
			$("input[name=copyCheck]").removeAttr("checked"); 
		} 
	});
	
	$('#independenceChkModal').on('hidden.bs.modal', function () {
		doubleSubmitFlag = false;
		independenceChkEngList = [];
		clientList = [];
	});
	
	$('#transferTimeSheetModal').on('hidden.bs.modal', function () {
		doubleSubmitFlag = false;
	});
	
	// AIC 독립성 확인서 미제출 내역 존재 팝업 생성
	if(AIC_NON_FLAG == "Y") {
		$('#aicModal').modal();
	}
	
	// [24.02] Delegation 기능 제거
	// 감사본부에만 적용
	if(ACTIVE_SERVICE_LINE == '01') {
		$("#delegationBtn").prop("disabled", true);
		$("#delegationLabel").prop("disabled", true);
		$('#epSelect').prop("disabled", true);
	}
	
	retireEmpTsSubmit(AUTHORITY);	
});

function getBrowserVersion() { 

	 var word; 

	 var agent = navigator.userAgent.toLowerCase(); 

	 // IE old version ( IE 10 or Lower ) 
	 if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 

	 // IE 11 
	 else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 

	 // Microsoft Edge  => TMS는 아직 Edge도 지원하지 않음
	 else if ( agent.search( "edge/" ) > -1 ) word = "edge/"; 

	 // 그외, IE가 아니라면 ( If it's not IE or Edge )  
	 else return -1; 

	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	 if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 

	 return -1; 
} 

$(document).ajaxStart(function () {
	$('.wrap-loading').removeClass('display-none');
 });

$(document).ajaxStop(function () {
	$('.wrap-loading').addClass('display-none');
 });

function getRootCause($element){
	var msg = $element.find(".error_sub").html();
	var textMsg = (msg === undefined || msg == null || msg == '') ? '':  msg;
	var splited = "";
	
	if(textMsg.indexOf("TimeSheetSystemException") != -1){
		splited = textMsg.split("TimeSheetSystemException: ");
		if (splited.length == 2) {
			if(splited[1].indexOf('TooManyResultsException') != -1){
				return "법인 이동 등의 이유로 직원 정보가 중복되어 있어서 처리가 불가능합니다.";
			}
			return "시스템 예외가 발생했습니다." + splited[1];
		}
	}else {
		splited = textMsg.split("TimeSheetException: ");
		if (splited.length == 2) {
			return "" + splited[1].replaceAll('\n', '<br>') + " 담당 RPM팀에게 문의해주세요.";
		}
	}
	
	return " (" + textMsg + ")";
}

function removeTimeReport() {

	var dataList = new Array();
	var datas = new Object();
	
	var rowNumArr = new Array();
	
	var isRetainEng = false;
	$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
		

		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		var $target = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		
		rowNumArr.push(targetRowNum);
		
		//Plan이 존재하는 engagement(Retain)는 삭제할 수 없음
		//삭제하고자 하는 engagement 중 Retain이 하나라도 있으면 일괄로 체크박스를 해제하지 않고, Plan이 입력된 engagement만 해제하기 위해 flag 사용
		//체크한 항목 중 retain에 없는 engagement들은 삭제가 진행됨
		if($target.find("[id='retain_connection']").val() === '1') {
			
			if(!isRetainEng) {
				isRetainEng = true;
			}
			
			//check box 선택 해제
			$(this).prop("checked",false);
			
			//해제 후 체크된 row의 개수 확인. 더 이상 row가 없다면 일괄 선택 체크박스 / 기능 버튼들 초기화 처리하고 종료
			if($("#timeReportList_L input[type=checkbox]:checked").length == 0) {
				$(".check-all").prop("checked",false);
				$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
				$(".reqTimesheetEnable").prop("disabled",true);
				
				alertify.alert("알림","Plan이 입력된 engagement는 삭제할 수 없습니다.");
				return false;
			}else {
				return true;
			}
		}
		
		var dataRow = new Object();
		var requestNo =  $target.find("[id='request_no']").val();
		var keyEngCode = ''
		if($("#timeReportList_L").find("[id='multipleRow" + targetRowNum + "']").length > 0) {
			keyEngCode = $target.find("[id='eng_code_D" + targetRowNum + "']").text();
		}else {
			keyEngCode = $target.find("[id='eng_code" + targetRowNum + "']").text();
		}
		
		if(requestNo !== 'undefined' && typeof requestNo !== "undefined" && requestNo !== null && requestNo !== '') {	//저장상태인 경우 delete row from TIME_SHEET
			
			dataRow["requestNo"] = requestNo;
			dataRow["keyEngagementCode"] = keyEngCode;
			if(GPN !== ACTIVE_GPN) {
				dataRow["delegatorGpn"] = GPN;
			}
			dataRow["gpn"] = ACTIVE_GPN;
			dataList.push(dataRow);
			
		}else {
			delTr(targetRowNum);
			$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
			calculateWorkingHours();
		}
	});
	
	// timeSheet 삭제
	datas["timeReportList"] = dataList;

	if(dataList.length !== 0) {
		if(isRetainEng) {
			function cancel() {
				$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);  //재택근무 제외
				$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
				$(".reqTimesheetEnable").prop("disabled",true);
			}
			
			function confirm() {
				deleteTimeReport(datas);
			}
			alertify.confirm("알림","Plan이 입력된 engagement를 제외하고 삭제 처리됩니다. 진행하시겠습니까?",confirm,cancel);
		}else {
			deleteTimeReport(datas);
		}
	} else {
		// [2024.10][박유란] 타임시트 작성하고 저장 전에 삭제하는 경우에 전체 선택 checkbox uncheck 처리 추가  
		$("input:checkbox[name='all']").prop("checked", false);	
	}
}

function deleteTimeReport(datas) {
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/removeTimeReport.do",
		contentType : "application/json; charset=UTF-8", 
		dataType : "json",
		data : JSON.stringify(datas),
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	 
	    },
		success : function(data) {
			
			alertify.alert("알림",data.description);
			
			retrieveTimeReport();
			deselectAll();
			
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	 var message = getRootCause($(xhr.responseText));
	        	 doubleSubmitFlag = false;
				 alertify.alert("알림",message);
	         }
	     }
	});
}

function retrieveWorkingHours() {
	
	//초기화
	$('#workingType').html("");
	$('#workingPeriod').find('[id="workingPeriodByWeek"]').html("");
	$('#workingPeriod').find('[id="workingPeriodByDate"]').text(' - ');
	
	var parsedCurrEow = $('#selectedWeekEnding').val().split("-");
	
	var currEow = new Date(parsedCurrEow[0], parsedCurrEow[1] - 1, parsedCurrEow[2]);
	var dueDate = new Date(currEow.getTime() - (7 * 24 * 60 * 60 * 1000));
	currEow = $.datepicker.formatDate('yy-mm-dd', currEow);
	dueDate = $.datepicker.formatDate('yy-mm-dd', dueDate);
	
	var datas = {
			"actualDate" : dueDate,	//지난 주 eow
			"workingTypeDate" : currEow,
			"gpn" : ACTIVE_GPN
	};

	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveWorkingHours.do",
		dataType : "json",
		data : datas,
		async: false,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
		success : function(data) {
			
			if(data.description === 'Success') {
				workingTypeInfo = data.message;
			}
			
			//////////
			//set 로그인된 GPN의 근무제 및 기간
			workingType = workingTypeInfo[0].WORKING_TYPE.trim();
			if(workingType === 'standard') { 
				if($.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1) workingType = '-';     //근무제가 준수인 PPED
				else workingType = '준수';
			}else if(workingType === 'selection') {
				workingType = '선택';
			}else if(workingType === 'flexibility') {
				workingType = '탄력';
			}else if(workingType === 'flexibility2') { // 2주 탄력근무제 도입 2020.12.16
				workingType = '탄력(2주)';
			}else if(workingType === 'discretion') {
				workingType = '재량';
			}
			
			//하루에 최대로 일할 수 있는 일반 working time 
			if(workingType === '탄력' || workingType === '탄력(2주)') { // 2주 탄력근무제 도입 2020.12.16
				maximumGeneralAcPerDay = 12;
			}else {
				maximumGeneralAcPerDay = 8;
			}

			//근무제
			$('#workingType').html(workingType);
			
			
			if(workingType === '선택' || workingType === '탄력' || workingType === '탄력(2주)') {

				//기간
				var startDate = workingTypeInfo[0].START_DATE.trim();
				var endDate = workingTypeInfo[0].END_DATE.trim();
				
				$('#workingPeriod').find('[id="workingPeriodByDate"]').text(startDate + ' ~ ' + endDate);
				
				//주차
				$('#workingPeriod').find('[id="workingPeriodByWeek"]').html('<STRONG> (' + (Number(workingTypeInfo[0].WEEK_IN_PERIOD)+1) + '/' + workingTypeInfo[0].TOTAL_WEEKS + ' 주차' + ')</STRONG>');
				
			}else {
				$('#workingPeriod').find('[id="workingPeriodByDate"]').text(' - ');
			}
			
			//////////
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	var message = getRootCause($(xhr.responseText));
	        	doubleSubmitFlag = false;
				alertify.alert("알림",message);
	         }
	     }
	});
	
}

//중복 승인 방지 (더블클릭 방지)
var doubleSubmitFlag = false;
function doubleSubmitCheck(){
    if(doubleSubmitFlag){
        return doubleSubmitFlag;
    }else{
        doubleSubmitFlag = true;
        return false;
    }
}

function submitCancel() {
	 doubleSubmitFlag = false;
}


function processTimeReport(ProcessingType) {
	fixedEngList = [];
	if(doubleSubmitCheck()) return; // 중복 승인 요청이면 return함(더블클릭 방지)

	//Retain Ep 퇴사자 flag
	var epStatusFlag = false;
	
	//var dataList = new Array(); 
	var ProcessingTypeText = "";
	var isFirstRequest = false;		//timeSheet 최초 요청인지 판단 (저장일 경우 언제나 false)	
	
	// all - alert 문구 판별 (저장 or 승인요청)
	if(ProcessingType == "request") {
		ProcessingTypeText = "승인요청"
	}else if(ProcessingType == "save") {
		ProcessingTypeText = "저장"
	}
	
	// request - 요청 CASE 판별
	var transferFlag = false;
	var reRequestFlag = false;	//재요청 허가 여부
	if(ProcessingType == "request") {
		
		//최초 요청시 일괄 승인요청만 가능
		var reqFlag = false;	//승인요청 허가 여부
		var requireWholeEngRequest = false;	//일괄 요청 경고가 필요한지 여부 (true : 일괄 요청 필요)
		var totalRowNum = $("#timeReportList_L input[type=checkbox]").length;		
		$("#timeReportList_L input[type=checkbox]").each(function(i){
	
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
			var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
			
			// C,P Type 코드 중 ep name -일 경우
			if($target_L.find("[id='eng_type']").text().trim() != 'N' && ( $target_L.find('[id="eng_pn' + targetRowNum + '"]').text().trim().length == 0 || $target_L.find('[id="eng_pn' + targetRowNum + '"]').text().trim() == '-' ) ) {
				epStatusFlag = true;
				return false;	
			}
			
			if($target_L.find("[id='appr_status']").val().trim().toLowerCase() !== 'unsubmitted') {
				doubleSubmitFlag = false;
				return false;	
			}
			
			if(i === totalRowNum-1) {
				//최초 요청
				var checkedRowNum = $("#timeReportList_L input[type=checkbox]:checked").length;
				isFirstRequest = true;
				
				//최초 요청인데 engagement를 일괄 선택하지 않았을 경우
				if(totalRowNum !== checkedRowNum) {
					requireWholeEngRequest = true;
					doubleSubmitFlag = false;
					return false;
				}
			}
		});
		
		if(epStatusFlag){
			alertify.alert("EP는 필수 입력사항입니다.");
			doubleSubmitFlag = false;
			return false;
		}
		
		if(requireWholeEngRequest) {
			alertify.alert("알림","모든 Engagement의 상태가 Draft일 경우 일괄 승인요청만 가능합니다.");
			$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);      //재택여부 체크해제 제외
			$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);     //재택여부 제외
			doubleSubmitFlag = false;
			return false;
		}
		
		//재요청시 개별 승인요청만 가능
		$("input[type=checkbox]:checked").not('[class="check-all"]','[class="agree"]').each(function(i){
			
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
			var c = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
			
			var appr_status = $target.find('[id="appr_status"]').val();
			var approved = $target.find('[id="approved"]').val();
			
			var isReRequest = (appr_status === "submitted" && approved === "true") || (appr_status === "requested" && approved === "true") ? true : false;
			var isNonChargeable = $target.find('[id="eng_type"]').text() === "N" || $.inArray($target.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1 ? true : false;
			
			if(isReRequest && !isNonChargeable) {
				reqFlag = true;
				reRequestFlag = true;
				/* if($("input[type=checkbox]:checked").not('[class="check-all"]').length > 1) {
					alert("이미 승인된 engagement를 재요청하는 경우 각 engagement마다 별개로 요청해주세요.");
					return false;
				}else if($("input[type=checkbox]:checked").not('[class="check-all"]').length == 1) {
					reqFlag = true;
					reRequestFlag = true;
				} */
			}else {
				reqFlag = true;
				//return false;
			}
		});
		
		if(!reqFlag) {	//재요청인데 여러 개의 engagement를 동시 제출하려고 하는 경우를 막음
			//return false;
		}
		
	}
	
	/* 
	[22.05] 감사본부 4주 이내 타임 수정 리뷰
	1) EOW_DATE < 현재날짜
	*/
	var overdue = false;
	var today = new Date();
	var eowDate = $('#selectedWeekEnding').val().split('-');
	var dueDate = new Date(eowDate[0], eowDate[1] - 1, eowDate[2], 0, 0, 0);
	dueDate.setDate(dueDate.getDate() + 1); // End of Date + 1day
	
	if (dueDate < today) {
		overdue = true;
	}
	
	//Activity Code 유효한 값인지 체크 
	var isActivitycheck = true;
	var isSubActivitycheck = true; //[24.03][정혜원] sub activity 유효성 체크
	var auditEng = false;
	var errorType = ""; // Select box, Input 구분
	$("#timeReportList_L input[type=checkbox]:checked").each(function(i){

		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		var $target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_L_D = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
		var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_R_D = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
		var activityVal = $target_R.find("[id='activity_code']").val();
		var activityVal_D = $target_R_D.find("[id='activity_code_D']").val();
		var subActivityVal = $target_R.find("[id='sub_activity_code']").val(); //[24.03][정혜원] sub activity code 생성
		var subActivityVal_D = $target_R_D.find("[id='sub_activity_code_D']").val(); //[24.03][정혜원] sub activity code 생성
		var inputType = /^[A-Z0-9&+@]{3,4}$/; 
		
		// 감사보고서 확정된 Eng인지 판별 후 리스트에 추가
		// [24.02][박유란] 차단 알림 형식을 confirm에서 alert으로 변경하여 "\n" -> "<br>" 로 변경함 
		//               연결 감사보고서일이 확정된 경우에 alert 처리하도록 조건 추가            
		if($target_L.find("[id='fixed_eng']").val() == "Y" && activityVal != "NPHR"
		&& $target_L.find("[id='cr_fixed_eng']").val() != "N") {
			fixedEngList.push($target_L.find('[id="eng_name' + targetRowNum + '"]').text() +" - " + $target_L.find('[id="merc_eng_code' + targetRowNum + '"]').text() + "<br>");
		}
		//if($target_L_D.find('[id="fixed_eng_D' + targetRowNum + '"]').val() == "Y" && $target_R_D.find('[id="activity_code_D' + targetRowNum + '"]').val() != "NPHR"
		if($target_L_D.find('[id="fixed_eng_D' + targetRowNum + '"]').val() == "Y" && activityVal_D != "NPHR"
		&& $target_L_D.find('[id="cr_fixed_eng_D' + targetRowNum + '"]').val() != "N") {
			fixedEngList.push($target_L_D.find('[id="eng_name_D' + targetRowNum + '"]').text() +" - " + $target_L_D.find('[id="merc_eng_code_D' + targetRowNum + '"]').text() + "<br>");
		}
		
		//select box 선택 안한 경우
		if(Number(activityVal == "----") > 0) {
			errorType = "S";
			isActivitycheck = false;
			doubleSubmitFlag = false;
			return false;
		}
		
		//sub activity code select box 선택 안 한 경우 //[24.03][정혜원]
		if(Number(subActivityVal == "none") > 0 || Number(subActivityVal_D == "none") > 0) {
			errorType = "S";
			isSubActivitycheck = false;
			doubleSubmitFlag = false; //중복 승인 방지
			return false;
		}
		
		//input 값 유효하지 않은 경우
		if ((activityVal == "" && activityVal == null) || (activityVal_D == "" && activityVal_D == null)) { 
			errorType = "I";
			isActivitycheck = false; 
			doubleSubmitFlag = false;
			return false;
	    } else { 
	     	if (!inputType.test(activityVal)) { //영문, 숫자 '&' 만 입력 가능
	    		errorType = "I";
	        	isActivitycheck = false; 
	        	doubleSubmitFlag = false;
	        	return false;
	        }
	    	
	    	if(activityVal_D != undefined) {
		    	if (!inputType.test(activityVal_D)) { //영문, 숫자 '&' 만 입력 가능
		    		errorType = "I";
		        	isActivitycheck = false; 
		        	doubleSubmitFlag = false;
		        	return false;
		        }
	    	} 
	    }
		
		/* 
		[22.05] 감사본부 4주 이내 타임 수정 리뷰
		2) 승인요청 (ProcessingType == requested)
		3) 감사본부(ACTIVE_SERVICE_LINE == '01') or 감사코드(globSvcCd in AUDIT_GLOB_SVC_CD)
		4) reRequestFlag(사유 팝업 유무) & transferFlag(모니터링 필요 여부) true 설정
		[22.12] Non-ch, edu 코드에 대해서는 4주 이내 수정 리뷰 대상에서 제외
		*/
		var engType = '';
		//var auditEng = false;
		var eduEng = false;
		
		if($target_R_D.length == 1) { // multipleRow인 경우			
			engType = $target_L_D.find("[id='eng_type_D']").text().trim();
			auditEng = ($.inArray($target_R_D.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			eduEng = ($.inArray($target_L_D.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) ? true : false;

			let preEngType = $target_L.find("[id='eng_type']").text().trim(); // ex. C, P, N
			let preAuditEng = ($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			
			// 감사본부 이전 제출 Eng.가 C, P인 경우 or 비감사본부 이전 제출 Eng.가 감사코드인 경우 eduEng를 false로 처리
			if((ACTIVE_SERVICE_LINE == '01' && (preEngType == 'C' || preEngType == 'P'))
					|| (ACTIVE_SERVICE_LINE != '01' && preAuditEng)) {
				eduEng = false;
			}
			
		} else {
			engType = $target_L.find("[id='eng_type']").text().trim();
			auditEng = ($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			eduEng = ($.inArray($target_L.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) ? true : false;
		}
		
		if(engType != 'N' && !eduEng
				&& overdue && (ACTIVE_SERVICE_LINE == '01' || auditEng)) {
			transferFlag = true; // 사유 팝업 유무
		}
	});
	
	//error 메세지
 	if(!isActivitycheck) {
		if (errorType == "S") { alertify.alert("알림","Activity Code를 선택해 주세요."); }
		else if (errorType == "I") { alertify.alert("알림","Activity Code는 3자리 혹은 4자리의 영문과 숫자로 입력해주세요. <br>*특수문자는 '&'만 가능"); }
														
		doubleSubmitFlag = false;
		return false;
	} 
	//sub activity code error 메세지 //[24.03][정혜원]
 	if(!isSubActivitycheck) {
		if (errorType == "S") { alertify.alert("알림","Sub Activity Code를 선택해 주세요."); }
		//input 작성 시에 error 메세지 추가 필요												
		doubleSubmitFlag = false;
		return false;
	} 
	if(fixedEngList.length != 0) {
		// [2024.02][박유란] confirm창에서 "확인"을 클릭하면 이후 계속 진행을 해서 alert 으로 변경함	
		//if(!confirm("하기 Engagement는 이미 공시시간이 확정되었습니다.\n감사보고서일 이후 타임제출은 NPHR(비공시시간) activity만 사용 가능합니다.\n\n" + fixedEngList + '더 궁금하신 사항은 담당 RPM팀에 문의해주세요')) {		
		alertify.alert("알림", "하기 Engagement는 이미 공시시간이 확정되었습니다.<br>감사보고서일 이후 타임제출은 NPHR(비공시시간) activity만 사용 가능합니다.<br><br>" 
				       + fixedEngList.toString().replaceAll(",", "") + "<br>더 궁금하신 사항은 담당 RPM팀에 문의해주세요"); 	
		doubleSubmitFlag = false;
		return false;		
	}
	
	// [22.05] TMS 제출 및 승인 시 일당 20시간 이상 입력 건 안내 팝업 추가		
	if(ProcessingType == "request") {
		// 일별 총 시간 계산 변수
		var totalActualTimeSat = 0, totalActualTimeSun = 0, totalActualTimeMon = 0, totalActualTimeTue = 0,
			totalActualTimeWed = 0, totalActualTimeThu = 0, totalActualTimeFri = 0;
		
		$("#timeReportList_L input[type=checkbox]").each(function(i) {
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
			var $target_L_D = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
			var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
			var $target_R_D = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
			
			// 일별 총 시간 계산 (N코드 제외)
			if($target_L_D.length == 1) { // multipleRow인 경우
				if($target_L_D.find("[id='eng_type_D']").text().trim() != 'N') {
					totalActualTimeSat += Number($target_R_D.find("[id='Sa_D']").val());
					totalActualTimeSun += Number($target_R_D.find("[id='Su_D']").val());
					totalActualTimeMon += Number($target_R_D.find("[id='Mo_D']").val());
					totalActualTimeTue += Number($target_R_D.find("[id='Tu_D']").val());
					totalActualTimeWed += Number($target_R_D.find("[id='We_D']").val());
					totalActualTimeThu += Number($target_R_D.find("[id='Th_D']").val());
					totalActualTimeFri += Number($target_R_D.find("[id='Fr_D']").val());
				}
			} else {
				if($target_L.find("[id='eng_type']").text().trim() != 'N') {
					totalActualTimeSat += Number($target_R.find("[id='Sa_A']").val());
					totalActualTimeSun += Number($target_R.find("[id='Su_A']").val());
					totalActualTimeMon += Number($target_R.find("[id='Mo_A']").val());
					totalActualTimeTue += Number($target_R.find("[id='Tu_A']").val());
					totalActualTimeWed += Number($target_R.find("[id='We_A']").val());
					totalActualTimeThu += Number($target_R.find("[id='Th_A']").val());
					totalActualTimeFri += Number($target_R.find("[id='Fr_A']").val());
				}
			}
		});
	
		// 1) Number($target_R.find("[id='Sa_A']").val()로 가져온 Actual 시간이 20 시간 이상 입력되었는지 검사
		// 2) confirm alert 처리
		if(totalActualTimeSat >= 20 || totalActualTimeSun >= 20 || totalActualTimeMon >= 20 || totalActualTimeTue >= 20 ||
				totalActualTimeWed >= 20 ||  totalActualTimeThu >= 20 || totalActualTimeFri >= 20) {	
			// [24.02] 20시간 이상 입력 시 사유 작성		
			over20hReason = prompt("일당 20시간 이상의 업무시간이 입력되었습니다.\n사유를 입력해주세요.");
			if(over20hReason !== null && over20hReason.length < 5) {
				alert("10자리 이상으로 사유를 입력해 주세요");
				doubleSubmitFlag = false;
				return false;
			} else if(over20hReason == null) {
				doubleSubmitFlag = false;
				return false;
			}
		}
	}
	
	//all - 근무제 별 시간 검증
	/* 입사,퇴사일 비교해서 40시간 미만 제출 가능하도록 수정*/
	var selectedDay = $('#selectedWeekEnding').val();
	var selectedDayArr = selectedDay.split('-');
	var diffOfRetireDate = -1;var diffOfHireDate = 0;
	
	var selectedDayDate = new Date(selectedDayArr[0], parseInt(selectedDayArr[1])-1, selectedDayArr[2]);
	if(HIRE_DATE != null && HIRE_DATE != "") {
		var HireDateArr = HIRE_DATE.split('-');
		var HireDate = new Date(HireDateArr[0], parseInt(HireDateArr[1])-1, HireDateArr[2]);
		diffOfHireDate = (selectedDayDate.getTime() - HireDate.getTime()) / 1000 / 60 / 60 / 24; //입사일과 선택한 주차의 차이
	}
	
	if(RETIRE_DATE != null && RETIRE_DATE != "") {
		var RetireDate = new Date(RETIRE_DATE.substring(0,4), parseInt(RETIRE_DATE.substring(4,6))-1, RETIRE_DATE.substring(6,8));
		diffOfRetireDate = (selectedDayDate.getTime() - RetireDate.getTime()) / 1000 / 60 / 60 / 24; //퇴사일과 선택한 주차의 차이
	}
	
	/*입력 시간 공통 계산 */
	/*EP 포함 Time 검증 => 경영자문위원은 검증 대상에서 제외*/
	if ($.inArray(ACTIVE_EY_RANK, ['04', '05']) <= -1 && (diffOfHireDate > 6 && diffOfRetireDate < 0)) {
		// [2024.08][박유란] START of 일제출/승인 
		// - 일제출/승인 기능을 위해서 월~금 체크에서 오늘까지 8시간 미만인 요일이 있는지 체크하도록 수정함
		// - 이번주는 ActualTotal 값이 40미만이어도 계속 진행하도록 수정함 
	
		// 일별 8시간 이하인지 체크  (계산 대상 : C, P, N)
// 		if(Number($("#totalMoHours_a").text()) < 8 || Number($("#totalTuHours_a").text()) < 8 || Number($("#totalWeHours_a").text()) < 8 ||
// 					Number($("#totalThHours_a").text()) < 8 || Number($("#totalFrHours_a").text()) < 8) {		
// 			alertify.alert("알림","평일은 각 8시간 이상 입력해주세요.");
// 			doubleSubmitFlag = false;
// 			return false;
// 		}
				
		// 오늘 날짜와 요일 구하기 
		let actualTotalArr = []; // 요일별 Actual Total 시간 Array
		let today = new Date();  // 현재 날짜 구하기 
		let todayStr = today.getFullYear() + "-" + (today.getMonth()+1).toString().padStart(2, '0') 
						+ "-" + today.getDate().toString().padStart(2, '0'); // YYYY-MM-DD 형식으로 오늘 날짜 String 구성
		let dayOfWeek = (today.getDay() + 1) % 6; // getDay() 결과 0(Sun) ~ 6(Sat)를  0(Sat) ~ 6(Fri)로 변환

		let eowDate = $('#selectedWeekEnding').val();
		let thisFridayStr = getNextFriday('today');
		actualTotalArr.push(Number($("#totalMoHours_a").text()));
		actualTotalArr.push(Number($("#totalTuHours_a").text()));
		actualTotalArr.push(Number($("#totalWeHours_a").text()));
		actualTotalArr.push(Number($("#totalThHours_a").text()));
		actualTotalArr.push(Number($("#totalFrHours_a").text()));
		// eowDate가 이전 주차이면 월~금 체크 
		let lastCheckDay = 4;

		if (eowDate > todayStr) {
			if (thisFridayStr == eowDate && dayOfWeek > 1) 				
				// 오늘이 화요일이고 EOW_DATE가 이번 주 금요일이면 월,화요일만 8시간 이상이면 됨 			
				lastCheckDay = dayOfWeek - 2; // dayOfWeek는 월요일이 2이고 actualTotalArr은 월요일 Index가 0이므로 2를 빼준다. 	
			else
				lastCheckDay = -1; // 오늘이 주말이거나  eowDate가 미래 주차이면 체크 안함
		} 	
		for (let i = 0; i <= lastCheckDay ; i++) {
			if (actualTotalArr[i] < 8) {
				alertify.alert("알림", "평일은 각 8시간 이상 입력해주세요.");
				doubleSubmitFlag = false;
				return false;
			}
		}
		// END of 일제출/승인	
		
		// 요일 별 24시간 초과인지 체크  : 계산 대상은 C, P, N
		if(Number($("#totalSaHours_a").text()) > 24 || Number($("#totalSuHours_a").text()) > 24 || Number($("#totalMoHours_a").text()) > 24 || Number($("#totalTuHours_a").text()) > 24 || 
				Number($("#totalWeHours_a").text()) > 24 || Number($("#totalThHours_a").text()) > 24 || Number($("#totalFrHours_a").text()) > 24) {
			alertify.alert("알림", "하루에 24시간을 초과하여 입력할 수 없습니다.");
			doubleSubmitFlag = false;
			return false;
		}
		
		// 총 40시간 이하인지 체크 : 계산 대상은  C, P, N (평일만 계산해야 하지만 위에서 평일마다 각 8시간을 검증하므로 total로 검증)
		// [2024.08][박유란] EOW_DATE가 오늘이거나 과거인 경우에만 40시간 체크하도록 조건 추가함 
		if (eowDate <= todayStr) {
			if (Number($("#totalAcHours").html()) < 40) {
				alertify.alert("알림", "총 40시간 이상 입력해주세요.");
				doubleSubmitFlag = false;
				return false;
			}
		}
		
	} else {
		// [2024.10][박유란] 경영자문위원도 일 24시간 초과되면 에러 처리하도록 추가
		if (   Number($("#totalSaHours_a").text()) > 24 || Number($("#totalSuHours_a").text()) > 24 
			|| Number($("#totalMoHours_a").text()) > 24 || Number($("#totalTuHours_a").text()) > 24 
			|| Number($("#totalWeHours_a").text()) > 24 || Number($("#totalThHours_a").text()) > 24 
			|| Number($("#totalFrHours_a").text()) > 24) {
			alertify.alert("알림", "하루에 24시간을 초과하여 입력할 수 없습니다.");
			doubleSubmitFlag = false;
			return false;
		}
	}
		
	/* 근무제 CASE 별 시간 계산 */
	/* EP는 모든 Time 검증 제외 */
	
	var warnningMessage = "";
	
	// RANK = 13의 경우 승인절차는 생략하되 근무제 시간은 준하도록 수정 2021.06(by박수아 대리 요청)
	var exceptRankIndex = apprExceptionList.indexOf('13');
	if(exceptRankIndex > -1) {
		apprExceptionList.splice(exceptRankIndex,1)
	}
	
	if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {
	
		//일 누적 연장근무 12시간 초과 (탄력 13주만 해당, 탄력2주는 해당 사항 없음)2020.12.
		//(계산 대상 : C, P)
		//탄력, 준수 : 승인 요청 불가능
		if(workingTypeInfo[0].WORKING_TYPE === 'standard' || workingTypeInfo[0].WORKING_TYPE === 'flexibility') {
			if(parseFloat(satOverTimeHours).toFixed(2)+ parseFloat(sunOverTimeHours).toFixed(2) + parseFloat(monOverTimeHours).toFixed(2) + 
					parseFloat(tueOverTimeHours).toFixed(2) +parseFloat(wedOverTimeHours).toFixed(2) + parseFloat(thrOverTimeHours).toFixed(2) + parseFloat(friOverTimeHours).toFixed(2) > 12.00) {
				
				warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-일 누적 연장근무 총 시간이 12시간을 초과";
			}
		}
		
		//정산기간 내 평균 계산은 Controller에서 합니다.
		
		//근무제 기간동안 일 누적 연장근무 시간이 평균 12시간을 초과
		//(계산 대상 : C, P)
		//선택 : 승인 요청 불가능
		/*
		if(workingTypeInfo[0].WORKING_TYPE === 'selection') {
			
			var totalOverTimePerDay = satOverTimeHours + sunOverTimeHours + monOverTimeHours + tueOverTimeHours + wedOverTimeHours + thrOverTimeHours + friOverTimeHours;
			if((workingTypeInfo[0].ACTUAL_OVERTIME + totalOverTimePerDay)/Number(workingTypeInfo[0].TOTAL_WEEKS) > 12) {
				warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-현 근무제의 정산기간 일 누적 연장근무 시간 평균이 주 12시간을 초과";
			}
		}
		
		//근무제 평균 52시간 초과 체크
		//(계산 대상 : C, P)
		//선택,탄력 : 근무제 기간 시작부터 현재 주차까지 평균 52시간을 초과한다면 승인 요청 불가능
		if(typeof workingTypeInfo !== 'undefined') {
			if(workingTypeInfo[0].WORKING_TYPE === 'selection' || workingTypeInfo[0].WORKING_TYPE === 'flexibility') {
				
				var avgOfWorkingHours = (workingTypeInfo[0].ACTUAL_HOURS + Number($("#totalAcHours").html())) / Number(workingTypeInfo[0].TOTAL_WEEKS);
				
				if(avgOfWorkingHours > 52) {
					warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-현 근무제의 정산기간 내 근무시간 평균이 주 52시간을 초과";
				}
			}
		}
		*/
		
		//0시간 저장 및 승인요청 컨펌
		var isZeroValue = false;
		$("#timeReportList_L input[type=checkbox]:checked").each(function(i){

			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
			
			if(Number($target_R.find("[id='weekActualHours']").text()) == 0) {
				isZeroValue = true;
				doubleSubmitFlag = false;
				return false;
			}
			
		});
		
		if(isZeroValue) {	
			function zeroConfirm() {
				//총 52시간 초과 체크 & 탄력 총 64,60시간 체크 (2주 탄력근무제 도입)
				//(계산 대상 : C, P)
				//탄력, 선택 : 총 52시간이 넘었을 경우 승인 요청 가능.  (workingType이 없는 사람은 준수로 간주)
				//준수, 재량 : 승인 요청 불가능
				//근무제:탄력의 경우, 총 64시간을 초과했다면 승인 요청 불가
				if((totalChargeableHours + totalAuthorizedHours) > 52) {
					//2020-02-12  재량 근로제 time checking 정책 바뀜 (7일 24시간 입력 가능)
					//if(workingTypeInfo[0].WORKING_TYPE === 'standard' || (workingTypeInfo[0].WORKING_TYPE === 'discretion' && !isExceptionPeriod)) {
					if(workingTypeInfo[0].WORKING_TYPE === 'standard'){
						warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 52시간 초과(준수)";
					}else{
						//탄력 근무제는 64시간 초과 별도 체크
						//2020-02-12  재량 근로제 time checking 정책 바뀜 (7일 24시간 입력 가능)
						if( (workingTypeInfo[0].WORKING_TYPE === 'flexibility' && (totalChargeableHours + totalAuthorizedHours) > 64  )) {
							//warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-주 64시간 초과(탄력 13주, 재량 - 특정 기간)";
							warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 64시간 초과(탄력13주)";
						}else if( (workingTypeInfo[0].WORKING_TYPE === 'flexibility2' && (totalChargeableHours + totalAuthorizedHours) > 60  )) {// 2주 탄력근무제 도입 2020.12
							//warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-주 60시간 초과(탄력 2주)";
							warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 60시간 초과(탄력2주)";
						
						}else if( (workingTypeInfo[0].WORKING_TYPE === 'discretion') && (totalChargeableHours + totalAuthorizedHours) > 168  ){
							warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 168시간 초과(재량)";
						}else {
							if (OVER_52HOURS_SWITCH === true) {
								if(!confirm("주 52시간을 초과하여 입력하였습니다. " + ProcessingTypeText + "을 진행하시겠습니까?")) {
									doubleSubmitFlag = false;
									return false;
								}
								
								function overtimeConfirm() {
									//승인 요청을 계속했을 경우
									//최초 승인요청이 아니라면, status에 상관없이 모든 engagement가 다시 승인요청 된다는 안내 띄우기
									if(!isFirstRequest && ProcessingType == "request") {
										function lastConfirm() {
											//checkbox 일괄 선택 (requestTimeReport 에 전체 engagement 를 던져줌. status별 요청 처리들은 서비스 단에서 처리)
											if(warnningMessage.length <= 0) {
												$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",true);
												reRequestFlag = false;	//최초 요청 처리
											}
											
											allConfirm();
										}
										alertify.confirm("알림","이전에 작성한 모든 Engagement가 지정 EP에게 다시 승인 요청됩니다. 진행하시겠습니까?",lastConfirm,submitCancel);
									}
								}
								alertify.confirm("알림","주 52시간을 초과하여 입력하였습니다. " + ProcessingTypeText + "을 진행하시겠습니까?",overtimeConfirm,submitCancel);
							}
						}
					}
				}
				allConfirm();
			}
			alertify.confirm("알림","제출한 Engagement 중 Actual이 0시간인 " + ProcessingTypeText + " 건이 있습니다. 진행하시겠습니까?",zeroConfirm,submitCancel);
		}else {
			//총 52시간 초과 체크 & 탄력 총 64,60시간 체크 (2주 탄력근무제 도입)
			//(계산 대상 : C, P)
			//탄력, 선택 : 총 52시간이 넘었을 경우 승인 요청 가능.  (workingType이 없는 사람은 준수로 간주)
			//준수, 재량 : 승인 요청 불가능
			//근무제:탄력의 경우, 총 64시간을 초과했다면 승인 요청 불가
			if((totalChargeableHours + totalAuthorizedHours) > 52) {
				//2020-02-12  재량 근로제 time checking 정책 바뀜 (7일 24시간 입력 가능)
				//if(workingTypeInfo[0].WORKING_TYPE === 'standard' || (workingTypeInfo[0].WORKING_TYPE === 'discretion' && !isExceptionPeriod)) {
				if(workingTypeInfo[0].WORKING_TYPE === 'standard'){
					warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 52시간 초과(준수)";
				}else{
					//탄력 근무제는 64시간 초과 별도 체크
					//2020-02-12  재량 근로제 time checking 정책 바뀜 (7일 24시간 입력 가능)
					if( (workingTypeInfo[0].WORKING_TYPE === 'flexibility' && (totalChargeableHours + totalAuthorizedHours) > 64  )) {
						//warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-주 64시간 초과(탄력 13주, 재량 - 특정 기간)";
						warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 64시간 초과(탄력13주)";
					}else if( (workingTypeInfo[0].WORKING_TYPE === 'flexibility2' && (totalChargeableHours + totalAuthorizedHours) > 60  )) {// 2주 탄력근무제 도입 2020.12
						//warnningMessage += (warnningMessage.length > 0 ? "\n" : "") + "-주 60시간 초과(탄력 2주)";
						warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 60시간 초과(탄력2주)";
					
					}else if( (workingTypeInfo[0].WORKING_TYPE === 'discretion') && (totalChargeableHours + totalAuthorizedHours) > 168  ){
						warnningMessage += (warnningMessage.length > 0 ? "<br>" : "") + "-주 168시간 초과(재량)";
					}else {
						if (OVER_52HOURS_SWITCH === true) {
							if(!confirm("주 52시간을 초과하여 입력하였습니다. " + ProcessingTypeText + "을 진행하시겠습니까?")) {
								doubleSubmitFlag = false;
								return false;
							}
							
							function overtimeConfirm() {
								//승인 요청을 계속했을 경우
								//최초 승인요청이 아니라면, status에 상관없이 모든 engagement가 다시 승인요청 된다는 안내 띄우기
								if(!isFirstRequest && ProcessingType == "request") {
									function lastConfirm() {
										//checkbox 일괄 선택 (requestTimeReport 에 전체 engagement 를 던져줌. status별 요청 처리들은 서비스 단에서 처리)
										if(warnningMessage.length <= 0) {
											$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",true);
											reRequestFlag = false;	//최초 요청 처리
										}
										
										allConfirm();
									}
									alertify.confirm("알림","이전에 작성한 모든 Engagement가 지정 EP에게 다시 승인 요청됩니다. 진행하시겠습니까?",lastConfirm,submitCancel);
								}
							}
							alertify.confirm("알림","주 52시간을 초과하여 입력하였습니다. " + ProcessingTypeText + "을 진행하시겠습니까?",overtimeConfirm,submitCancel);
						}
					}
				}
			}
			allConfirm();
		}
	}else {
		allConfirm();
	}
	
	function allConfirm() {
		// RANK = 13의 경우 승인절차는 생략하되 근무제 시간은 준하도록 수정 2021.06(by박수아 대리 요청)
		exceptRankIndex = apprExceptionList.indexOf('13');
		if(exceptRankIndex <= -1) {
			apprExceptionList.push('13');
		}
		
		// all - 최종 처리
		if(warnningMessage.length > 0) {
			warnningMessage += "<br><br>위와 같은 사유로 " + ProcessingTypeText + " 할 수 없습니다. 관련하여 RPM팀에 연락 바랍니다.";
			alertify.alert("알림",warnningMessage);
			doubleSubmitFlag = false;
			return;
		}
		
		// 해당 작업이 승인 요청인지 저장인지 판별
		if(ProcessingType == "request") {
			if(transferFlag) {
				fillTransferReason(overdue);
			} else if(reRequestFlag) {	//재요청은 재요청 사유 Modal open (재요청 사유 작성 후, compareActualWithPlan() 실행)
				//$('#transferDesc').val("");	
				//$('#transferTimeSheetModal').modal();
				fillTransferReason();
			}else {
				compareActualWithPlan(null);	//재요청이 아니라면, Retain과 비교해 Time이 변경되었는지 체크
			}
		}else if(ProcessingType == "save") {
			saveTimeReport();
		}
	}
} // END of function processTimeReport(ProcessingType) 

function compareActualWithPlan(tsDesc) {
	
	//Transfer 사유
	var descIsEmpty = 1;
	if($('#transferTimeSheetModal').is(':visible')) {
		
		$("#transferList tr").each(function(i) {
			if($('[id=transferReasonDesc'+i+']').val().length < 10) {
				descIsEmpty = 0;
			}
		});
		
		if(descIsEmpty == 0) {
			alertify.alert("알림","10자리 이상으로 사유를 입력해 주세요.");
			doubleSubmitFlag = false;
			return ;
		}else{
			$('#transferTimeSheetModal').modal('hide');
		}
	}

	//EY_RANK 비교 - EP 이상이라면 비교 없이 request 해야함
	if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {
		
		var timeDiffArr = new Array();
		var innerHtml = "";
		var dataList = new Array();
		
		$("input[type=checkbox]:checked").not('[class="check-all"]').each(function(i){
			
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target_L;
			var $target_R;
			var $PreviousInfoOfTarget;
			var ActualTimeIdPattern;
			if($("#timeReportList_L").find("[id='multipleRow" + targetRowNum + "']").length > 0) {
				$target_L = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
				$target_R = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
				ActualTimeIdPattern = "D";
			}else {
				$target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
				$target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
				ActualTimeIdPattern = "A";
			}
			
			$PreviousInfoOfTarget = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');	//재요청 row가 아니더라도 무조건 저장
			
			if($target_L.find('[id="eng_type"]').text() !== "N" && $.inArray($target_L.find("[id='e_type']").val(), EDU_ENG_TYPE) <= -1) {	//Non-chargeable code & EDU code 제외
				
				var dataRow = new Object();
				
				dataRow["rowNum"] = targetRowNum;
				dataRow["requestNo"] = $PreviousInfoOfTarget.find('[id="request_no"]').val();
				dataRow["retEngCode"] = $PreviousInfoOfTarget.find('[id^="ret_eng_code"]').val();
				dataRow["keyEngCode"] = $target_L.find('[id^="eng_code"]').text();
				dataRow["engName"] = $target_L.find('[id^="eng_name"]').text();
				dataRow["epName"] = $target_L.find('[id^="eng_pn"]').text();	
				dataRow["totalActualHours"] = $target_R.find('[id="weekActualHours"]').text();
				dataRow["totalPlanHours"] = $target_R.find('[id="weekPlanHours"]').text();

				if(Number(dataRow["totalActualHours"]) - Number(dataRow["totalPlanHours"]) != 0) {	
					dataList.push(dataRow);
				}
			}
			
		});
		
		if(TIME_DIFF_REASON_SWITCH === true && dataList.length > 0) {
			retrieveTimeDiffReasonList(dataList, tsDesc);
			$("#timeDiffReasonModal").modal();
		}else {
			requestTimeReport(tsDesc);
		}
		
	}else {
		requestTimeReport(tsDesc);
	}
}

// //예외 기간동안 overtime 조건이 달라짐
// function checkExceptionPeriod() {
// 	var exceptionPeriodStartDay = workingTypeInfo[0].TMS_DISCRETION_EXCEPTION_PERIOD_START;
// 	var exceptionPeriodStartDayArr = exceptionPeriodStartDay.split('-');
	
// 	var exceptionPeriodEndDay = workingTypeInfo[0].TMS_DISCRETION_EXCEPTION_PERIOD_END;
// 	var exceptionPeriodEndDayArr = exceptionPeriodEndDay.split('-');
	
// 	var exceptionPeriodStartDate = new Date(exceptionPeriodStartDayArr[0], parseInt(exceptionPeriodStartDayArr[1])-1, exceptionPeriodStartDayArr[2]);
// 	var exceptionPeriodEndDate = new Date(exceptionPeriodEndDayArr[0], parseInt(exceptionPeriodEndDayArr[1])-1, exceptionPeriodEndDayArr[2]);

// 	var selectedDay = $('#selectedWeekEnding').val();
// 	var selectedDayArr = selectedDay.split('-');
// 	var selectedDayDate = new Date(selectedDayArr[0], parseInt(selectedDayArr[1])-1, selectedDayArr[2]);
	
// 	var diffOfStartDate = (selectedDayDate.getTime() - exceptionPeriodStartDate.getTime()) / 1000 / 60 / 60 / 24;
// 	var diffOfEndDate = (selectedDayDate.getTime() - exceptionPeriodEndDate.getTime()) / 1000 / 60 / 60 / 24; 
	
// 	//2020-02-12 조건 바뀜 
//  	//return (diffOfStartDate >= 0 && diffOfEndDate <= 0) ? true : false;
// 	return true;
// } 

function fillTransferReason(overdue) {
	var innerHtml = "" ; 
	var transferListRow = 0;
	
	$("input[class^=eng_checkbox]:checked").each(function(i) {
		// Mercury 변환 로직 적용 : $(this).parent().parent().find('td').eq('4').text() : MERC_EID
		var engCodeForTsModal = $(this).parent().parent().find('td').eq('3').text();
		var mercEngCodeForTsModal = $(this).parent().parent().find('td').eq('4').text(); // 사용 X
		var engNameForTsModal = $(this).parent().parent().find('td').eq('6').text();
		var epNameForTsModal = $(this).parent().parent().find('td').eq('5').text();
		var reqNoForTsModal = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#request_no').val();
		var approvedForTsModal = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#approved').val();
		var eTypeForTsModal = $(this).parent().parent().find('td').eq('2').text();
		var rowNumForTsModal = $(this).attr('class').split('eng_checkbox')[1];
		
		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		var $target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_L_D = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
		var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_R_D = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
		
		/* 
		[22.05] 감사본부 4주 이내 타임 수정 리뷰
		5) 사유 팝업 생성
		[22.12] Non-ch, edu 코드에 대해서는 4주 이내 수정 리뷰 대상에서 제외
		*/			
		var auditEng = false;
		var eduEng = false;
		
		if($target_R_D.length == 1) { // multipleRow인 경우
			auditEng = ($.inArray($target_R_D.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			eduEng = ($.inArray($target_L_D.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) ? true : false;

			let preEngType = $target_L.find("[id='eng_type']").text(); // ex. C, P, N
			let preAuditEng = ($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			
			// 감사본부 이전 제출 Eng.가 C, P인 경우 or 비감사본부 이전 제출 Eng.가 감사코드인 경우 eduEng를 false로 처리
			if((ACTIVE_SERVICE_LINE == '01' && (preEngType == 'C' || preEngType == 'P'))
					|| (ACTIVE_SERVICE_LINE != '01' && preAuditEng)) {
				eduEng = false;
			}
			
		} else {
			auditEng = ($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
			eduEng = ($.inArray($target_L.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) ? true : false;
		}
		
// 		var preStatus = $target_L.find("[id='appr_status']").val();
// 		switch(preStatus) {
// 			case 'unsubmitted':
// 				preStatus = 'Draft';
// 				break;
// 			case 'submitted':
// 				preStatus = 'Approved';
// 				break;
// 			case 'requested':
// 				preStatus = 'Requested';
// 				break;
// 			case 'rejected':
// 				preStatus = 'Rejected';
// 				break;
// 			defalut:
// 				preStatus = '';
// 		}
		
		// [22.05] 감사본부 4주 이내 타임 수정 리뷰
		// [22.12] Non-ch, edu 코드에 대해서는 4주 이내 수정 리뷰 대상에서 제외
		if(eTypeForTsModal != 'N' && !eduEng
				&& overdue && (ACTIVE_SERVICE_LINE == '01' || auditEng)) {
			innerHtml += '<tr>';
		    innerHtml += '<td class="rowNumberForTsModal" style="display:none;">'+ rowNumForTsModal +'</td>';
	    	innerHtml += '<td class="requestNoForTsModal" style="display:none;">'+ reqNoForTsModal +'</td>';
	    	innerHtml += '<td class="engNameForTsModal">' + engNameForTsModal + '</td>';
			innerHtml += '<td class="epNameForTsModal">' + epNameForTsModal + '</td>';
			innerHtml += '<td class="transferReasonDesc"><textarea type="text" id="transferReasonDesc' + transferListRow + '" class="form-control"></textarea></td>';
			innerHtml += '<td class="transferYn" style="display:none;" id="transferYn' + transferListRow + '">Y</td>';
// 			innerHtml += '<td class="preStatus" style="display:none;" id="preStatus' + transferListRow + '">' + preStatus + '</td>'; 
			innerHtml += '</tr>';
	    	transferListRow++;
	    	
		} else if(eTypeForTsModal != 'N' && approvedForTsModal == 'true') {
			innerHtml += '<tr>';
		    innerHtml += '<td class="rowNumberForTsModal" style="display:none;">'+ rowNumForTsModal +'</td>';
	    	innerHtml += '<td class="requestNoForTsModal" style="display:none;">'+ reqNoForTsModal +'</td>';
	    	innerHtml += '<td class="engNameForTsModal">' + engNameForTsModal + '</td>';
			innerHtml += '<td class="epNameForTsModal">' + epNameForTsModal + '</td>';
			innerHtml += '<td class="transferReasonDesc"><textarea type="text" id="transferReasonDesc' + transferListRow + '" class="form-control"></textarea></td>';
			innerHtml += '</tr>';
	    	transferListRow++;
		}
	});
	
	$("#transferList").html(innerHtml);
	$("#transferTimeSheetModal").modal();
}

function retrieveTimeDiffReasonList(dataList, tsDesc) {
	
	var datas = {
			"eowDate" : $('#selectedWeekEnding').val(),
			"gpn" : ACTIVE_GPN
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveRetainTimeDiffReasonList.do",
		dataType : "json",
		data : datas,
	    complete:function(data){
	    	// 실패해도 사유 없이 tr 생성
	    	
	    	var innerHtml = "";
	    	$.each(dataList, function(index, requestItem) {
	    		
	    		var matchedItem;
	    		
	    		if(typeof requestItem.requestNo !== "undefined" && requestItem.requestNo !== "") {
		    		$.each(data.responseJSON.message, function(index, resultItem) {
		    			if(requestItem.requestNo == resultItem.REQUEST_NO && requestItem.dayOfWeek == resultItem.DAY_OF_WEEK) {
		    				matchedItem = resultItem;
		    				return false;
		    			}
		    		});
	    		}
	    		
	    		innerHtml += '<tr>';
	    		innerHtml += '<td class="rowNumber" style="display:none;">'+ requestItem.rowNum +'</td>';
    			innerHtml += '<td class="requestNo" style="display:none;">'+ requestItem.requestNo +'</td>';
    			innerHtml += '<td class="retEngCode" style="display:none;">'+ requestItem.retEngCode +'</td>';
    			innerHtml += '<td class="keyEngCode" style="display:none;">' + requestItem.keyEngCode + '</td>';
    			innerHtml += '<td class="engName">' + requestItem.engName + '</td>';
    			innerHtml += '<td class="epName">' + requestItem.epName + '</td>';
    			innerHtml += '<td class="planningTime">' + requestItem.totalPlanHours + '</td>';
    			innerHtml += '<td class="actualTime">' + requestItem.totalActualHours + '</td>';
    			innerHtml += '<td class="RetainTimeTsDescription"><input type="text" id="RetainTimeTsDescription" class="form-control" value="' + (typeof matchedItem === "undefined" ? '' : matchedItem.TS_DESCRIPTION) + '"></td>';
    			innerHtml += '</tr>';

	    	});
	    	
	    	$("#tsDesc").val(tsDesc);
			$("#timeDiffReasonList").html(innerHtml);
	    	
	    },
		success : function(data) {
			
		},
		error: function(xhr, status, err) {
			doubleSubmitFlag = false;
	    }
	});
	
}


function requestTimeReport(desc) {
	//Retain engagement의 time trasfer 사유서를 받을 경우, 사유 null 값 검증
	
	if(TIME_DIFF_REASON_SWITCH === true && $("#timeDiffReasonModal").is(':visible')) {
		var nullFlag = false;
		$(".RetainTimeTsDescription").each(function(i){
			if($(this).find("input").val() === '' || typeof $(this).find("input").val() === "undefined") {
				nullFlag = true;
				alertify.alert("알림","사유를 모두 입력해주세요.");
				doubleSubmitFlag = false;
				return false;
			}
		});
		
		if(nullFlag) {
			doubleSubmitFlag = false;
			return;
		}	
	}
	
	//////승인요청
	
	var dataList = new Array();	//승인요청 할 모든 engagement row들의 list
	var rowNumArr = new Array();
	var varInadequateFlag = false;
	
	$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		//var $timeSheetRow = $("#timeSheetRow" + targetRowNum);
		
		var $timeSheetRow_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $timeSheetRow_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
		
		//data 생성
		var dataRow = new Object();
		
		//eng code & ep 값 검증 위한 변수들
		var retEngCode = '';
		
		// Mercury 변환 로직 적용
		var keyEngCode = '';
		var mercKeyEngCode = '';
		var engName = '';
		
		var epGpn = '';
		
		var engType = '';
		var eType = '';
		
		//target이 timeSheetRow가 될 것인지 multipleRow가 될 것인지 결정
		if($("#timeReportList_L").find("[id='multipleRow" + targetRowNum + "']").length > 0) {

			var $target_L = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
			var $target_R = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
			
			retEngCode = $target_L.find("[id='ret_eng_code_D" + targetRowNum + "']").val();
			
			// Mercury 변환 로직 적용 :
			keyEngCode = $target_L.find("[id='eng_code_D" + targetRowNum + "']").text();
			mercKeyEngCode = $target_L.find("[id='merc_eng_code_D" + targetRowNum + "']").text();
			engName = $target_L.find("[id='eng_name_D" + targetRowNum + "']").text();			
			
			epGpn = $target_L.find("[id='ep_gpn_D']").val();
			
			engType = $target_L.find("[id='eng_type_D']").text();
			
			dataRow["epGpn"] = epGpn;
			dataRow["actualTimeSat"] = $target_R.find("[id='Sa_D']").val();
			dataRow["actualTimeSun"] = $target_R.find("[id='Su_D']").val();
			dataRow["actualTimeMon"] = $target_R.find("[id='Mo_D']").val();
			dataRow["actualTimeTue"] = $target_R.find("[id='Tu_D']").val();
			dataRow["actualTimeWed"] = $target_R.find("[id='We_D']").val();
			dataRow["actualTimeThu"] = $target_R.find("[id='Th_D']").val();
			dataRow["actualTimeFri"] = $target_R.find("[id='Fr_D']").val();
			dataRow["description"] = $target_R.find("[id='description_D']").val();
			
			dataRow["loc1"] = $target_R.find("[id='loc1_D_CD" + targetRowNum + "']").text();
			dataRow["loc2"] = $target_R.find("[id='loc2_D_CD" + targetRowNum + "']").text();
		
			if($target_R.find("[id='activity_code_D']").prop('tagName').toLowerCase() === 'select') {
				dataRow["activityCode"] = $target_R.find("[id='activity_code_D']").find("option:selected").val();
			}else {
				dataRow["activityCode"] = $target_R.find("[id='activity_code_D']").val();
			}
			//sub activity code 값 추출 //[24.03][정혜원]
			if($target_R.find("[id='sub_activity_code_D']").prop('tagName').toLowerCase() === 'select') {
				dataRow["subActivityCode"] = $target_R.find("[id='sub_activity_code_D']").find("option:selected").val();
			}else {
				dataRow["subActivityCode"] = $target_R.find("[id='sub_activity_code_D']").val();
			}
			
			//재택여부 
// 			if($target_R.find("[id='wfh_yn']").is(":checked") === true) {
// 				dataRow["wfhYn"] = 'Y';
// 			}else {
// 				dataRow["wfhYn"] = 'N';
// 			}
			
			dataRow["engagementType"] = engType;
			
			// Mercury 변환 로직 적용
			dataRow["keyEngagementCode"] = keyEngCode;
			dataRow["mercKeyEngagementCode"] = mercKeyEngCode;
			dataRow["engagementName"] = engName;
			
			dataRow["retEngCode"] = retEngCode;
			
		}else {
			// Mercury 변환 로직 적용
			keyEngCode = $timeSheetRow_L.find("[id='eng_code" + targetRowNum + "']").text();
			mercKeyEngCode = $timeSheetRow_L.find("[id='merc_eng_code" + targetRowNum + "']").text();
			engName = $timeSheetRow_L.find("[id='eng_name" + targetRowNum + "']").text();			
			
			retEngCode = $timeSheetRow_L.find("[id='ret_eng_code" + targetRowNum + "']").val();
			epGpn = $timeSheetRow_L.find("[id='ep_gpn']").val();
			
			engType = $timeSheetRow_L.find("[id='eng_type']").text();
			eType = $timeSheetRow_L.find("[id='e_type']").val();
			
			dataRow["epGpn"] = epGpn;
			dataRow["actualTimeSat"] = $timeSheetRow_R.find("[id='Sa_A']").val();
			dataRow["actualTimeSun"] = $timeSheetRow_R.find("[id='Su_A']").val();
			dataRow["actualTimeMon"] = $timeSheetRow_R.find("[id='Mo_A']").val();
			dataRow["actualTimeTue"] = $timeSheetRow_R.find("[id='Tu_A']").val();
			dataRow["actualTimeWed"] = $timeSheetRow_R.find("[id='We_A']").val();
			dataRow["actualTimeThu"] = $timeSheetRow_R.find("[id='Th_A']").val();
			dataRow["actualTimeFri"] = $timeSheetRow_R.find("[id='Fr_A']").val();
			dataRow["description"] = $timeSheetRow_R.find("[id='description']").val();
			
			dataRow["loc1"] = $timeSheetRow_R.find("[id='loc1_CD" + targetRowNum + "']").text();
			dataRow["loc2"] = $timeSheetRow_R.find("[id='loc2_CD" + targetRowNum + "']").text();

			if($timeSheetRow_R.find("[id='activity_code']").prop('tagName').toLowerCase() === 'select') {
				dataRow["activityCode"] = $timeSheetRow_R.find("[id='activity_code']").find("option:selected").val();
			}else {
				dataRow["activityCode"] = $timeSheetRow_R.find("[id='activity_code']").val();
			}
			
			//sub activity code 값 추출 //[24.03][정혜원]
			if($timeSheetRow_R.find("[id='sub_activity_code']").prop('tagName').toLowerCase() === 'select') {
				dataRow["subActivityCode"] = $timeSheetRow_R.find("[id='sub_activity_code']").find("option:selected").val();
			}else {
				dataRow["subActivityCode"] = $timeSheetRow_R.find("[id='sub_activity_code']").val();
			}
			
			//재택여부 
// 			if($timeSheetRow_R.find("[id='wfh_yn']").is(":checked") === true) {
// 				dataRow["wfhYn"] = 'Y';
// 			}else {
// 				dataRow["wfhYn"] = 'N';
// 			}
			
			dataRow["engagementType"] = engType;
			
			// Mercury 변환 로직 적용
			dataRow["keyEngagementCode"] = keyEngCode;
			dataRow["mercKeyEngagementCode"] = mercKeyEngCode;
			dataRow["engagementName"] = engName;
			
			if(retEngCode === "" || retEngCode === null){
				dataRow["retEngCode"] = keyEngCode;
			}else {
				dataRow["retEngCode"] = retEngCode;
			}
		}

		dataRow["trDescription"] = desc;
		dataRow["requestNo"] = $timeSheetRow_L.find("[id='request_no']").val();
		dataRow["eowDate"] = selectedDate;
		dataRow["apprStatus"] = $timeSheetRow_L.find("[id='appr_status']").val();
		dataRow["approved"] = $timeSheetRow_L.find("[id='approved']").val();
		dataRow["retainConnection"] = $timeSheetRow_L.find("[id='retain_connection']").val();
		dataRow["eType"] = eType;
		
		//delegator
		if(GPN !== ACTIVE_GPN) {
			dataRow["delegatorGpn"] = GPN;
		}	
		dataRow["gpn"] = ACTIVE_GPN;	//timeSheet owner
		dataRow["updateUser"] = GPN;	//update user
		
		//Retain 변경 사유 저장
		$("#timeDiffReasonList tr").each(function(i){
		
			if($(this).find('[class="rowNumber"]').text() == targetRowNum) {
				dataRow["planningTime"] = $(this).find('[class="planningTime"]').text();
				dataRow["timeTsDescription"] = $(this).find('[id="RetainTimeTsDescription"]').val();
				doubleSubmitFlag = false;
				return false;
			}
			
		});
		
		//재요청 사유 저장
		$("#transferList tr").each(function(i){
			if($(this).find('[class="rowNumberForTsModal"]').text() == targetRowNum) {
				dataRow["trDescription"] = $(this).find('[id=transferReasonDesc'+i+']').val();
				
				// [22.05] 감사본부 4주 이내 타임 수정 리뷰 
				if($(this).find('[id=transferYn'+i+']').text() == 'Y') {
					dataRow["transferYn"] = $(this).find('[id=transferYn'+i+']').text();
// 					dataRow["preStatus"] = $(this).find('[id=preStatus'+i+']').text();			
				}
				
				doubleSubmitFlag = false;
				return false;
			}
		});
		dataList.push(dataRow);
		
		//저장 없이 승인 요청을 신청한 건에 대해 requestNo를 넣어주기 위해 row number를 저장
		if($timeSheetRow_L.find("[id='request_no']").val() === null || $timeSheetRow_L.find("[id='request_no']").val() === "") {
			rowNumArr.push(targetRowNum);
		}
		
		//engagement code이 빈 값일 시 버튼 선택 불가
		if(keyEngCode === "" || typeof keyEngCode === "undefined") {
			alertify.alert("알림","Engagement code는 필수 입력사항입니다.");
			varInadequateFlag = true;
			doubleSubmitFlag = false;
			return false;
		}
		
		/*
		C : EP 필수
		P : 교육코드는 EP 빈 값 허용 / 그 외 코드는 EP 필수
		N : EP 빈 값 허용
		*/
		if(engType.indexOf("CHARGEABLE ") != -1 || engType === 'C' || (engType === 'P' && eType !== '' && typeof eType !== 'undefined' && $.inArray(eType, EDU_ENG_TYPE) <= -1)) {
			//ep name 이 빈 값일 시 버튼 선택 불가
			if(epGpn === "-" || epGpn === "" || typeof epGpn === "undefined") {
				alertify.alert("알림","EP는 필수 입력사항입니다.");
				varInadequateFlag = true;
				doubleSubmitFlag = false;
				return false;
			}
		}
		
	});
	
	if(varInadequateFlag) {
		$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);
		$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
		doubleSubmitFlag = false;
		return false;
	}

	//최종 parameter
	lastRequestDatas["timeReportList"] = dataList;
	
	// [24.02] 20시간 이상 입력 시 사유 작성 
	lastRequestDatas["over20hReason"] = over20hReason;
	over20hReason = null; // 초기화
	
	// 독립성 확인 체크 후 제출 가능
	independenceCheck(lastRequestDatas, rowNumArr,'req');
}

//독립성 확인 관련 
function independenceCheck(datas, rowNumArr, type) {
	var engList = [];
	var mercEngList = [];
	finalReqType = type;
	independenceChkEngList = [];
	clientList = [];
	
	$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		var $target_L = '';
		var $target_R = '';
		var engCode = '';	
		var mercEngCode = '';
		var engName = '';	
		
		//target이 timeSheetRow가 될 것인지 multipleRow가 될 것인지 결정
		if($("#timeReportList_L").find("[id='multipleRow" + targetRowNum + "']").length > 0) {
			$target_L = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
			$target_R = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
		}else {
			$target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
			$target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
		}
		
		// 35번 감사코드 중 0시간 이상 제출하며 독립성 체크가 안된 코드만
		if($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1 && $target_R.find("[id='independenceChk']").val() == "0" && Number($target_R.find("[id='weekActualHours']").text()) != 0) {
			
			if($("#timeReportList_L").find("[id='multipleRow" + targetRowNum + "']").length > 0) {
				engCode = $target_L.find("[id='eng_code_D" + targetRowNum + "']").text();
				mercEngCode = $target_L.find("[id='merc_eng_code_D" + targetRowNum + "']").text();
				engName = $target_L.find("[id='eng_name_D" + targetRowNum + "']").text();
			}else {
				engCode = $target_L.find("[id='eng_code" + targetRowNum + "']").text();
				mercEngCode = $target_L.find("[id='merc_eng_code" + targetRowNum + "']").text();
				engName = $target_L.find("[id='eng_name" + targetRowNum + "']").text();
			}
			engList.push(engCode+' - '+ engName + '<br>');
			mercEngList.push(mercEngCode+' - '+ engName + '<br>');
			
			// 독립성확인서 제출할 Eng List
			independenceChkEngList.push({
				"eid": engCode, 
				"gpn": ACTIVE_GPN,
				"eowDate": selectedDate // [23/12/22] eowDate 추가
				});
			
			var clientName = engName.split("/");
			// 독립성 확인서 modal에 표기 할 피감사회사 명 리스트
			clientList.push("[" + clientName[clientName.length - 1] + "] ");
			
		}
	});
	
	if(independenceChkEngList.length > 0) { // 독립성 확인할 eng가 존재 할 경우 체크필요
		// openIndependenceChkModal(engList, rowNumArr);
		openIndependenceChkModal(mercEngList, rowNumArr);
		
	} else { // 없을 경우 바로 승인 요청  (EP 이상은 바로 저장)
		
		if(finalReqType == 'req') {
			finalRequest()
			
		}else if(finalReqType == 'save'){
			finalSave();
		}
	}
}

function openIndependenceChkModal(mercEngList, rowNumArr) {
	doubleSubmitFlag = false; //다시 요청 가능하도록 flag값 변경
    $("input:checkbox[name='agree']").prop("checked", false); // 독립성 확인 체크 해제
	$('#activeUserName').html(ACTIVE_KOR_NAME);
	$('#engagementInfo').html(mercEngList);
	$('#clientList').html(clientList);
	$('#rowNumArr').val(rowNumArr);
	
	$('#independenceChkModal').modal({backdrop: 'static'});
}

function submitIndependenceChk() {
	if($("#agree").is(":checked") == true) {
		
		if(finalReqType == 'req') {
			$.ajax({
				type : "post",
				url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/requestTimeReport.do",
				contentType : "application/json; charset=UTF-8", 
				dataType : "json",
				data : JSON.stringify(lastRequestDatas),
				beforeSend:function(xhr){
			        //이미지 보여주기 처리
			        xhr.setRequestHeader("AJAX", true);
			        $('.wrap-loading').removeClass('display-none');
			        
			        if(false) {
			        	xhr.abort();
			        }
			    },
			    complete:function(){
			    },
				success : function(data) {
					doubleSubmitFlag = false; //다시 요청 가능하도록 flag값 변경
					
					//request_no 가 없는 row에 request no 넣기
			        if(data.result) {	
			        	for(var i = 0; i < rowNumArr.length; i++){
			        		var $resultTarget = $('#timeSheetRow' + rowNumArr[i])
			        		
			        		//미제출 저장일 경우만 request no 와 승인 여부(APPROVED)를 set & 변경일 경우 APPROVED 가 변경되는 일은 없으므로 아무 작업도 x
			        		if($resultTarget.find("[id='request_no']").val() === null || $resultTarget.find("[id='request_no']").val() === "") {
				        		$resultTarget.find("[id='request_no']").val(data.message[i].requestNo);

			        		}
			        	}
			        	
			        	//사유서 모달창 닫기 
			        	if(TIME_DIFF_REASON_SWITCH === true && $('#timeDiffReasonModal').is(':visible')) {
			        		$('#timeDiffReasonList').empty();
							$('#timeDiffReasonModal').modal('hide');
			        	}
			        	
			        	// 독립성 체크
			        	var datas = {
			        		"manualSubmitList": independenceChkEngList
			        	}
			        	datas = JSON.stringify(datas);
			    		
			        	$.ajax({
			        		type : "post",
			        		url : "<c:out value='${pageContext.request.contextPath}'/>/aic/manualSubmit.do",
			        		contentType: 'application/json; charset=UTF-8',
			        		dataType : "json",
			        		data : datas,
			        		beforeSend:function(xhr){
			    		    },
			    		    complete:function(){
			    		        //이미지 감추기 처리
			    		        $('.wrap-loading').addClass('display-none');
			    		 
			    		    },
			    			success : function(result) {
			    				$('#independenceChkModal').modal('hide');
			    				alertify.alert("알림","감사(검토)참여자 독립성 확인서가 제출되었으며  타임시트 " + data.description);
			    				
					        	deselectAll();
					        	retrieveTimeReport();
						        
						        // [23/12/29] 계약서 오픈 여부에 따라 계약서 진행 확인 팝업 발생
						        if(CTR_OPEN_FLAG == 'Y') {
							        openCtrModal();
						        }
			    			}
			        	});
			        }

				},
				error: function(xhr, status, err) {
			        if (xhr.status == 401) {
			            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
			             $(".b-close").click();
			             location.href = koreaPortal_context_path + "/logout.do"
			         } else if (xhr.status == 403) {
			            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
			            $(".b-close").click();
			            location.href = koreaPortal_context_path + "/logout.do"
			         } else {
			        	var message = getRootCause($(xhr.responseText));
			        	doubleSubmitFlag = false;
						alertify.alert("알림",message);
			         }
			     }
			});
			
		}else if(finalReqType == 'save'){
			$.ajax({
				type : "post",
				url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/saveTimeReport.do",
				contentType : "application/json; charset=UTF-8", 
				dataType : "json",
				data : JSON.stringify(lastRequestDatas),
				beforeSend:function(xhr){
			        //이미지 보여주기 처리
			        xhr.setRequestHeader("AJAX", true);
			        $('.wrap-loading').removeClass('display-none');
			        
			        if(false) {
			        	xhr.abort();
			        }
			        
			    },
			    complete:function(){
			        //이미지 감추기 처리
			        $('.wrap-loading').addClass('display-none');
			 
			    },
				success : function(data) {
					doubleSubmitFlag = false;

			        //저장 혹은 승인요청이 이루어졌다면, request no. 값 넣기
			        if(data.result) {	
			        	//rowNumArr
			        	for(var i = 0; i < rowNumArr.length; i++){
			        		
			        		var $resultTarget = $('#timeSheetRow' + rowNumArr[i])
			        		
			        		//미제출 저장일 경우만 request no 와 승인 여부(APPROVED)를 set & 변경일 경우 APPROVED 가 변경되는 일은 없으므로 아무 작업도 x
			        		if($resultTarget.find("[id='request_no']").val() === null || $resultTarget.find("[id='request_no']").val() === "") {
				        		$resultTarget.find("[id='request_no']").val(data.message[i].requestNo);
			        		}
			        	}
			        	
			        	// 독립성 체크
			        	var datas = {
			        		"manualSubmitList": independenceChkEngList
			        	}
			        	datas = JSON.stringify(datas);
			    		
			        	$.ajax({
			        		type : "post",
			        		url : "<c:out value='${pageContext.request.contextPath}'/>/aic/manualSubmit.do",
			        		contentType: 'application/json; charset=UTF-8',
			        		dataType : "json",
			        		data : datas,
			        		beforeSend:function(xhr){
			    		    },
			    		    complete:function(){
			    		        //이미지 감추기 처리
			    		        $('.wrap-loading').addClass('display-none');
			    		 
			    		    },
			    			success : function(result) {
			    				$('#independenceChkModal').modal('hide');
			    				alertify.alert("알림","감사(검토)참여자 독립성 확인서가 제출되었으며  타임시트 " + data.description);
			    				
					        	deselectAll();
					        	retrieveTimeReport();
						        
						        // [23/12/29] 계약서 오픈 여부에 따라 계약서 진행 확인 팝업 발생
						        if(CTR_OPEN_FLAG == 'Y') {
							        openCtrModal();
						        }					        	
			    			}
			        	});
			        }

				},
				error: function(xhr, status, err) {
			        if (xhr.status == 401) {
			            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
			             $(".b-close").click();
			             location.href = koreaPortal_context_path + "/logout.do"
			         } else if (xhr.status == 403) {
			            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
			            $(".b-close").click();
			            location.href = koreaPortal_context_path + "/logout.do"
			         } else {
			        	var message = getRootCause($(xhr.responseText));
			        	doubleSubmitFlag = false;
						alertify.alert("알림",message);
			         }
			     }
			});
		}
		
	}else {
		alert("감사 업무에 참여한 경우, 반드시 독립성 확인서를 제출해야 해당 Code에 시간 입력이 가능합니다.\n감사 업무에 참여하지 않은 경우, 올바른 Engagement Code로 수정하여 제출하시기 바랍니다.");
		return false;
	}
	
}

function independenceAgree(chk) {
	var obj = document.getElementsByName("agree");

	 for(var i=0; i<obj.length; i++){
	        if(obj[i] != chk){
	            obj[i].checked = false;
	        }
	 }
}

function finalRequest() {
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/requestTimeReport.do",
		contentType : "application/json; charset=UTF-8", 
		dataType : "json",
		data : JSON.stringify(lastRequestDatas),
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	        
	        if(false) {
	        	xhr.abort();
	        }
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	 
	    },
		success : function(data) {
			doubleSubmitFlag = false; //다시 요청 가능하도록 flag값 변경
			
			//request_no 가 없는 row에 request no 넣기
	        if(data.result) {	
	        	for(var i = 0; i < rowNumArr.length; i++){
	        		var $resultTarget = $('#timeSheetRow' + rowNumArr[i])
	        		
	        		//미제출 저장일 경우만 request no 와 승인 여부(APPROVED)를 set & 변경일 경우 APPROVED 가 변경되는 일은 없으므로 아무 작업도 x
	        		if($resultTarget.find("[id='request_no']").val() === null || $resultTarget.find("[id='request_no']").val() === "") {
		        		$resultTarget.find("[id='request_no']").val(data.message[i].requestNo);

	        		}
	        	}
	        	
	        	//사유서 모달창 닫기 
	        	if(TIME_DIFF_REASON_SWITCH === true && $('#timeDiffReasonModal').is(':visible')) {
	        		$('#timeDiffReasonList').empty();
					$('#timeDiffReasonModal').modal('hide');
	        	}

	        	alertify.alert("알림",data.description);
	        	deselectAll();
	        	retrieveTimeReport();
		        
		        // [23/12/29] 계약서 오픈 여부에 따라 계약서 진행 확인 팝업 발생
		        if(CTR_OPEN_FLAG == 'Y') {
			        openCtrModal();
		        }
	        }

		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	var message = getRootCause($(xhr.responseText));
	        	doubleSubmitFlag = false;
				alertify.alert("알림",message);
	         }
	     }
	});
}

function finalSave() {

	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/saveTimeReport.do",
		contentType : "application/json; charset=UTF-8", 
		dataType : "json",
		data : JSON.stringify(lastRequestDatas),
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	        
	        if(false) {
	        	xhr.abort();
	        }
	        
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	 
	    },
		success : function(data) {
			doubleSubmitFlag = false;
			alertify.alert("알림",data.description);

	        //저장 혹은 승인요청이 이루어졌다면, request no. 값 넣기
	        if(data.result) {	
	        	//rowNumArr
	        	for(var i = 0; i < rowNumArr.length; i++){
	        		
	        		var $resultTarget = $('#timeSheetRow' + rowNumArr[i])
	        		
	        		//미제출 저장일 경우만 request no 와 승인 여부(APPROVED)를 set & 변경일 경우 APPROVED 가 변경되는 일은 없으므로 아무 작업도 x
	        		if($resultTarget.find("[id='request_no']").val() === null || $resultTarget.find("[id='request_no']").val() === "") {
		        		$resultTarget.find("[id='request_no']").val(data.message[i].requestNo);
	        		}
	        	}
	        }

	        deselectAll();
	        retrieveTimeReport(); 
	        
	        // [23/12/29] 계약서 오픈 여부에 따라 계약서 진행 확인 팝업 발생
	        if(CTR_OPEN_FLAG == 'Y') {
		        openCtrModal();
	        }
	        
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	var message = getRootCause($(xhr.responseText));
	        	doubleSubmitFlag = false;
				alertify.alert("알림",message);
	         }
	     }
	});
}


function checkEssentialValues(index) {
	
	var checkEnableFlag = true;
	var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + index + '"]');
	//engagement code || ep name 이 빈 값일 시 버튼 선택 불가
	if($('#eng_code' + index).text().trim().length == 0 || $('#eng_pn' + index).text().trim().length == 0) {
		alertify.alert("알림","Engagement code, EP는 필수 입력사항입니다.");
		$('.eng_checkbox' + index).prop("checked",false);
		checkEnableFlag = false;
		return false;
	}
	
	//Close코드 버튼 선택 불가 
	if( $('.eng_checkbox' + index).prop('disabled') ) {
		alertify.alert("알림","Closed 코드는 재 승인요청이 불가능 합니다. ");
		$('.eng_checkbox' + index).prop("checked",false);
		checkEnableFlag = false;
		return false;
	}

	
	return checkEnableFlag;
}

function checkEngStatusForReqAction(selectedStatus, selectedApproved, selectedEngType, selectedEType) {
	
	$(".reqTimesheetEnable").prop("disabled",false);
	
	if(selectedStatus === 'requested') {
		$('#saveDraftBtn').prop("disabled",true);
		$('#deleteBtn').prop("disabled",true);
		$('#withdrawBtn').prop("disabled",true);	
	}else if(selectedStatus === 'unsubmitted') {
		$('#withdrawBtn').prop("disabled",true);
	}else if(selectedStatus === 'rejected' && selectedApproved === 'false') {
		$('#saveDraftBtn').prop("disabled",true);
		$('#withdrawBtn').prop("disabled",true);
	}else if(selectedStatus === 'rejected' && selectedApproved === 'true') {
		$('#saveDraftBtn').prop("disabled",true);
		$('#deleteBtn').prop("disabled",true);		
		$("#withdrawBtn").css("display", "inline");		
	}else if(selectedStatus === 'submitted') {
		$('#withdrawBtn').prop("disabled",true);
		// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
// 		if(selectedEngType.trim() !== 'N' && $.inArray(selectedEType.trim(), EDU_ENG_TYPE) <= -1 && $.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {	//non-chargeable의 경우 혹은 교육 코드인 경우
		if(selectedEngType.trim() !== 'N' && $.inArray(selectedEType.trim(), EDU_ENG_TYPE) <= -1
				&& ($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1 || ACTIVE_SERVICE_LINE == "01")) {	//non-chargeable의 경우 혹은 교육 코드인 경우
			$('#saveDraftBtn').prop("disabled",true);
			$('#deleteBtn').prop("disabled",true);
		}
	}
}

function checkEngAllStatusForReqAction() {
	
	$(".reqTimesheetEnable").prop("disabled",false);
	
	$("input[type=checkbox]:checked").not('[class="check-all"]','[class="agree"]').each(function(i){
		
		var engCodeForCheck = $(this).parent().parent().find('td').eq('3').text();
		var engNameForCheck = $(this).parent().parent().find('td').eq('5').text();
		var epNameForCheck = $(this).parent().parent().find('td').eq('4').text();
		var reqNoForCheck = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#request_no').val();
		var approvedForCheck = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#approved').val();
		var statusForCheck = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#appr_status').val();
		var engTypeForCheck = $(this).parent().parent().find('td').eq('2').text();
		var eTypeForCheck = $('#timeSheetRow'+$(this).attr('class').split('eng_checkbox')[1]).find('#e_type').val();
		
		if(statusForCheck === 'requested') {
			if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1 || ACTIVE_SERVICE_LINE == "01") {
				$('#saveDraftBtn').prop("disabled",true);	
			}
			$('#deleteBtn').prop("disabled",true);
			$('#withdrawBtn').prop("disabled",true);	
		}else if(statusForCheck === 'unsubmitted') {
			$('#withdrawBtn').prop("disabled",true);
		}else if(statusForCheck === 'rejected' && approvedForCheck === 'false') {
			// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
// 			if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {
			if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1 || ACTIVE_SERVICE_LINE == "01") {
				$('#saveDraftBtn').prop("disabled",true);
			}
			$('#withdrawBtn').prop("disabled",true);
		}else if(statusForCheck === 'rejected' && approvedForCheck === 'true') {
			// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
// 			if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {
			if($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1 || ACTIVE_SERVICE_LINE == "01") {
				$('#saveDraftBtn').prop("disabled",true);
				$('#deleteBtn').prop("disabled",true);
			}
			$("#withdrawBtn").css("display", "inline");
		}else if(statusForCheck === 'submitted') {
			$('#withdrawBtn').prop("disabled",true);

			// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
// 			if(engTypeForCheck.trim() !== 'N' && $.inArray(eTypeForCheck.trim(), EDU_ENG_TYPE) <= -1 && $.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1) {	//non-chargeable의 경우 혹은 교육 코드인 경우
			if(engTypeForCheck.trim() !== 'N' && $.inArray(eTypeForCheck.trim(), EDU_ENG_TYPE) <= -1
					&& ($.inArray(ACTIVE_EY_RANK, apprExceptionList) <= -1 || ACTIVE_SERVICE_LINE == "01")) {	//non-chargeable의 경우 혹은 교육 코드인 경우
				$('#saveDraftBtn').prop("disabled",true);
				$('#deleteBtn').prop("disabled",true);
			}
		}
		
		
	});
	
}


function checkEngagementStatus(index) {
		
	var $selected = $('#timeSheetRow' + index);
	var selectedStatus = $selected.find('#appr_status').val();	
	var selectedApproved = $selected.find('#approved').val();
	var selectedEngType = $selected.find('#eng_type').text();
	var selectedEType = $selected.find('#e_type').val();
	var selectedEngCode = $selected.find('#eng_code' + index).text();
	var selectedEngName = $selected.find('#eng_name' + index).text();
	
	//checkEssentialValues(index);
	
	//버튼 disabled 처리
	//checkEngStatusForReqAction(selectedStatus, selectedApproved, selectedEngType, selectedEType);
	checkEngAllStatusForReqAction();
	
	//checkbox disabled 처리
	if($(".eng_checkbox" + index).is(":checked") == true) {
		
		/* if( (selectedEngName === 'Global code' || selectedEngCode.indexOf('D') != -1) && selectedApproved =='true' ){
			alert(" 이미 승인된 Global & Dummy 코드" + selectedEngCode + "는 재 승인요청 할 수 없습니다. ");
			$(".eng_checkbox" + index).prop("checked",false);
		} */
		
		//이미 check 상태인 row의 status 담기
		/*  $("input[type=checkbox]").each(function(i){

			var $target = $('#timeSheetRow' + i);
			var targetStatus = $target.find('#appr_status').val();
			var targetApproved = $target.find('#approved').val();
			var targetEngType = $target.find('#eng_type').text();
			
			if(selectedStatus !== targetStatus) {
				$(".eng_checkbox" + i).prop("disabled",true);	
			}
			
			//rejected 일 때만 approved 여부까지 판별
			if(selectedStatus === "rejected" && selectedApproved !== targetApproved) {
				$(".eng_checkbox" + i).prop("disabled",true);
			}
			
			//approved 일 때 engagement type 여부 판별 : approved-N / approved-C,P 일 때
			if(selectedStatus === "submitted" && selectedEngType != targetEngType) {
				if((selectedEngType == "N" && targetEngType != "N") || (selectedEngType != "N" && targetEngType == "N")) {
					$(".eng_checkbox" + i).prop("disabled",true);
				}
			}

		});  */

	}else {
		var initFlag = true;
		$("input[type=checkbox]").each(function(i){
			if($(this).is(":checked")) {
				initFlag = false;
			}
		});
		
		if(initFlag) {
			//$("input[type=checkbox]").prop("disabled",false);
			$(".reqTimesheetEnable").prop("disabled",true);
			$("#withdrawBtn").css("display", "none");
		}
	}		
}


// 이번 주 근무 시간에 대해 계산
// 1. TimeSheet 테이블을 불러왔을 때
// 2. TimeSheet 테이블 내의 actual 값이 변경되었을 때
function calculateWorkingHours() {
	
	totalPlanHours = 0;
	totalChargeableHours = 0;
	totalAuthorizedHours = 0;
	totalNonChargeableHours = 0;
	totalOverTimeHours = 0;
	accumulatedOverTimeHours = 0;

	//일별 actual hours 총합
	satAc = 0;  
	sunAc = 0;
	monAc = 0;
	tueAc = 0;
	wedAc = 0;
	thrAc = 0;
	friAc = 0;
	totalAc= 0;

	//일 별 non-chargeable actual hours
	satNonChargeableAc = 0;
	sunNonChargeableAc = 0;
	monNonChargeableAc = 0;
	tueNonChargeableAc = 0;
	wedNonChargeableAc = 0;
	thrNonChargeableAc = 0;
	friNonChargeableAc = 0;
	
	//non-chargeable time을 제외한 actual hours 총합
	
	$('#timeReportList_R tr').each(function(index, item) {
		
		if($(item).hasClass("noData")) {
			return false;
		}
		
		var $targetEng =  $('#timeReportList_L').find('[id="timeSheetRow' + item.id.split('Row')[1] + '"]');
		var targetApprStatus = $targetEng.find("[id='appr_status']").val();
		var targetApproved = $targetEng.find("[id='approved']").val();
		var engType = "";
		var hours = 0;
		var eachEngHours = 0;
		
		//engagement 별 actual time 총합(eachEngHours)과 일별 actual time(satAc, sunAc ...) 총합 계산
		if($(this).hasClass("multipleRow")) {
			
			engType = $('#timeReportList_L').find('[id="' + item.id + '"]').find("[id='eng_type_D']").text();
		
			eachEngHours += Number($(this).find("[id='Sa_D']").val());
			eachEngHours += Number($(this).find("[id='Su_D']").val());
			eachEngHours += Number($(this).find("[id='Mo_D']").val());
			eachEngHours += Number($(this).find("[id='Tu_D']").val());
			eachEngHours += Number($(this).find("[id='We_D']").val());
			eachEngHours += Number($(this).find("[id='Th_D']").val());
			eachEngHours += Number($(this).find("[id='Fr_D']").val());
			
			if((targetApprStatus === 'requested' && targetApproved === 'true') || (targetApprStatus === 'rejected' && targetApproved === 'true')) {
				satAc += Number($(this).find("[id='Sa_D']").val());
				sunAc += Number($(this).find("[id='Su_D']").val());
				monAc += Number($(this).find("[id='Mo_D']").val());
				tueAc += Number($(this).find("[id='Tu_D']").val());
				wedAc += Number($(this).find("[id='We_D']").val());
				thrAc += Number($(this).find("[id='Th_D']").val());
				friAc += Number($(this).find("[id='Fr_D']").val());
				hours += eachEngHours;
				
				//non-chargeable time 별도 저장 (총 actual time과 non-chargeable을 제외한 actual time을 별도 계산하기 위해 저장)
				if(engType === 'N') {
					satNonChargeableAc += Number($(this).find("[id='Sa_D']").val());
					sunNonChargeableAc += Number($(this).find("[id='Su_D']").val());
					monNonChargeableAc += Number($(this).find("[id='Mo_D']").val());
					tueNonChargeableAc += Number($(this).find("[id='Tu_D']").val());
					wedNonChargeableAc += Number($(this).find("[id='We_D']").val());
					thrNonChargeableAc += Number($(this).find("[id='Th_D']").val());
					friNonChargeableAc += Number($(this).find("[id='Fr_D']").val());
				}
			}
			
		}else {
			
			engType = $('#timeReportList_L').find('[id="' + item.id + '"]').find("[id='eng_type']").text();
		
			eachEngHours += Number($(this).find("[id='Sa_A']").val());
			eachEngHours += Number($(this).find("[id='Su_A']").val());
			eachEngHours += Number($(this).find("[id='Mo_A']").val());
			eachEngHours += Number($(this).find("[id='Tu_A']").val());
			eachEngHours += Number($(this).find("[id='We_A']").val());
			eachEngHours += Number($(this).find("[id='Th_A']").val());
			eachEngHours += Number($(this).find("[id='Fr_A']").val());
			
			if(!(targetApprStatus == 'requested' &&  targetApproved == 'true') && !(targetApprStatus == 'rejected' && targetApproved == 'true')) {
				if(!$(this).hasClass('rejectedRow')) {
					satAc += Number($(this).find("[id='Sa_A']").val());
					sunAc += Number($(this).find("[id='Su_A']").val());
					monAc += Number($(this).find("[id='Mo_A']").val());
					tueAc += Number($(this).find("[id='Tu_A']").val());
					wedAc += Number($(this).find("[id='We_A']").val());
					thrAc += Number($(this).find("[id='Th_A']").val());
					friAc += Number($(this).find("[id='Fr_A']").val());
					hours += eachEngHours;
				}
				
				//non-chargeable time 별도 저장 (총 actual time과 non-chargeable을 제외한 actual time을 별도 계산하기 위해 저장)
				if(engType === 'N') {
					satNonChargeableAc += Number($(this).find("[id='Sa_A']").val());
					sunNonChargeableAc += Number($(this).find("[id='Su_A']").val());
					monNonChargeableAc += Number($(this).find("[id='Mo_A']").val());
					tueNonChargeableAc += Number($(this).find("[id='Tu_A']").val());
					wedNonChargeableAc += Number($(this).find("[id='We_A']").val());
					thrNonChargeableAc += Number($(this).find("[id='Th_A']").val());
					friNonChargeableAc += Number($(this).find("[id='Fr_A']").val());
				}
			}
		}		

		//테이블 우측 - engagement 별 actual time 총 합
		$(this).find("[id='weekActualHours']").text(eachEngHours.toFixed(2));
		
		//engagement type별 total 시간
		if (engType === 'C') {
			totalChargeableHours += hours;
			
			// over time은 Chargeable & Authorized Project 만
			if (hours > 8) {
				accumulatedOverTimeHours += (hours - 8);
			}
		} else if (engType === 'P') {
			totalAuthorizedHours += hours;

			if (hours > 8) {
				accumulatedOverTimeHours += (hours - 8);
			}
		} else {
			totalNonChargeableHours += hours;
		}
		
		// 주 초과근무 : chargeable time + authorized project time - 40
		totalOverTimeHours = totalChargeableHours + totalAuthorizedHours - 40;
		if (totalOverTimeHours < 0) {
			totalOverTimeHours = 0;
		}
		
		// [2024.08][박유란] 일제출/승인
		totalAc = satAc + sunAc + monAc + tueAc + wedAc + thrAc + friAc;
		
	});
	
	//summary 테이블 - 각 engagement type별 actual time 총합
	$('#totalActualHours_CH').html("CH<br />" + totalChargeableHours.toFixed(2) + "&nbsp;<small>hr</small>");
	$('#totalActualHours_AP').html("AP<br />" + totalAuthorizedHours.toFixed(2) + "&nbsp;<small>hr</small>");
	$('#totalActualHours_N').html("Non-CH<br />" + totalNonChargeableHours.toFixed(2) + "&nbsp;<small>hr</small>");
			
	//summary 테이블 - 주 초과 근무
	$('#totalOverTimeHours').html(totalOverTimeHours.toFixed(2) + "&nbsp;<small>hr</small>");
	
	//total row (Over) - over time
	$('#totalActual').text(totalOverTimeHours.toFixed(2));
	
	//일 누적 초과 근무 : non-chargeable time을 제외한 일별 actual time 총 합을 근무제에 따라 기준을 달리해 초과 근무 시간을 계산
	//초과 근무 기준 >>
	//탄력: 12시간 이상
	//준수, 재량, 선택: 8시간 이상
	satOverTimeHours = ((satAc-satNonChargeableAc) > maximumGeneralAcPerDay ? ((satAc-satNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	sunOverTimeHours = ((sunAc-sunNonChargeableAc) > maximumGeneralAcPerDay ? ((sunAc-sunNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	monOverTimeHours = ((monAc-monNonChargeableAc) > maximumGeneralAcPerDay ? ((monAc-monNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	tueOverTimeHours = ((tueAc-tueNonChargeableAc) > maximumGeneralAcPerDay ? ((tueAc-tueNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	wedOverTimeHours = ((wedAc-wedNonChargeableAc) > maximumGeneralAcPerDay ? ((wedAc-wedNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	thrOverTimeHours = ((thrAc-thrNonChargeableAc) > maximumGeneralAcPerDay ? ((thrAc-thrNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	friOverTimeHours = ((friAc-friNonChargeableAc) > maximumGeneralAcPerDay ? ((friAc-friNonChargeableAc) - maximumGeneralAcPerDay) : 0);
	
	$('#satActual').html(satOverTimeHours.toFixed(2));
	$('#sunActual').html(sunOverTimeHours.toFixed(2));
	$('#monActual').html(monOverTimeHours.toFixed(2));
	$('#tueActual').html(tueOverTimeHours.toFixed(2));
	$('#wedActual').html(wedOverTimeHours.toFixed(2));
	$('#thrActual').html(thrOverTimeHours.toFixed(2));
	$('#friActual').html(friOverTimeHours.toFixed(2));
	
	//total row
	var totalActualTime = totalChargeableHours + totalAuthorizedHours + totalNonChargeableHours;
	var totalChargeableActualHours = totalChargeableHours + totalAuthorizedHours;
	
	$('#totalSaHours_a').html(satAc.toFixed(2));
	$('#totalSuHours_a').html(sunAc.toFixed(2));
	$('#totalMoHours_a').html(monAc.toFixed(2));
	$('#totalTuHours_a').html(tueAc.toFixed(2));
	$('#totalWeHours_a').html(wedAc.toFixed(2));
	$('#totalThHours_a').html(thrAc.toFixed(2));
	$('#totalFrHours_a').html(friAc.toFixed(2));
	$('#totalAcHours').html(totalActualTime.toFixed(2));

	$('#summary_totalActualHours').html(totalActualTime.toFixed(2) + "&nbsp;<small>hr</small>");
	
	//일 누적 초과 근무 총합 : non-chargeable time을 제외한 일별 actual time 총 합을 근무제에 따라 기준을 달리해 초과 근무 시간을 계산하고, 그 초과 근무 시간들만을 합한 것
	//초과 근무 기준 >>
	//탄력: 12시간 이상
	//준수, 재량, 선택: 8시간 이상
	var summaryOver8hours = satOverTimeHours + sunOverTimeHours + monOverTimeHours + tueOverTimeHours + wedOverTimeHours + thrOverTimeHours + friOverTimeHours;
	
	//summary 테이블 - 일 누적 초과 근무
	$('#accumulatedOverTimeHours').html((summaryOver8hours).toFixed(2) + "&nbsp;<small>hr</small>");

	if(totalChargeableActualHours > 0) {
		if(totalChargeableActualHours <= 40) {
			$("#progressBar_A").attr('class', 'circle circle-green'); //.addClass('circle-green');
		}else if(totalChargeableActualHours > 40 && totalChargeableActualHours <= 52) {
			$("#progressBar_A").attr('class', 'circle circle-warnning'); //.addClass('circle-warnning');
		}else if(totalChargeableActualHours > 52) {
			$("#progressBar_A").attr('class', 'circle circle-danger'); //.addClass('circle-danger');
		}
	}else {
		$("#progressBar_A").attr('class', 'circle circle-default'); //.addClass('circle-default');
	}
}

//--Check Box--//
function selectAll() {
	
	if ($('.check-all').is(":checked")) {
		
		var checkEnableFlag = true;
		var canSelect = true;
		var alertMessage = "";
		var thisStatus = "";
		var thisApproved = "";
		var targetStatus = "";
		var targetApproved = "";
		var targetEngType = "";
		var thisEngType = "";
		var thisEType = "";
		var thisEngName = "";
		var thisEngCode = "";
		
		//재택여부 체크 제외
		$("input[type=checkbox]").not('[id=wfh_yn]', '[class="agree"]').prop("checked",true);
		
		
		$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			//engagement code 와 ep name 중 null인 row가 있다면 일괄 선택에서 제외
			checkEnableFlag = checkEssentialValues(targetRowNum);
			thisStatus = $('#timeSheetRow' + i).find('#appr_status').val();
			thisApproved = $('#timeSheetRow' + i).find('#approved').val();
			thisEngType = $('#timeSheetRow' + i).find('#eng_type').text();
			thisEType = $('#timeSheetRow' + i).find('#e_type').val();
			thisEngName = $('#eng_name' + i).text();
			thisEngCode = $('#eng_code' + i).text();
		
			if(!canSelect) {
				//일괄 선택 체크박스 diabled
				alertify.alert("알림",alertMessage);
				$(".check-all").prop("checked",false);
				checkEnableFlag = false;
				return false;
			}
		});
		
		checkEngAllStatusForReqAction();
	} else {
		//재택여부 체크 제외
		$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);
		$(".reqTimesheetEnable").prop("disabled",true);
	}
	
	//////////////////////////////////////////////////////////////////////////////////
}

//--Check Box--//
function deselectAll() {
	$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);  //재택여부 제외
	$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false); //재택여부 제외 
}

// 이번 주 금요일을 찾아서 yyyy-MM-dd 형식으로 반환, 단 이번 주의 시작은 gT&E에 맞춰 토요일이 시작임
function findThisFriday() {
	var gap = 5 - new Date().getDay();  // 일 : 0, 월 : 1, ..., 토 : 6
	if (gap == -1) {  // T&E에서 요일은 토요일부터 시작이라, 오늘이 토요일이면 어제자 금요일이 아닌 6일 후의 금요일을 찾아야 함
		gap = 6;
	}
	
	var friday = new Date();
	friday.setDate(friday.getDate() + gap);
	
	var dd = friday.getDate();
	var mm = friday.getMonth() + 1;  // Month는 0부터 시작함
	var yy = friday.getFullYear();
	
	if (dd < 10) {
		dd = '0' + dd;
	}
	
	if (mm < 10) {
		mm = '0' + mm;
	}
	
	return yy + '-' + mm + '-' + dd;
}

function setWsDate(){
	endDate = $('#selectedWeekEnding').val();
	var tempArr = $('#selectedWeekEnding').val().split('-');
	var dt = new Date(tempArr[0], tempArr[1] - 1, tempArr[2]);
	var startDT = new Date(dt);
	startDT.setDate(startDT.getDate() - 6);
	var dd = startDT.getDate();
	var mm = startDT.getMonth() + 1; // Month는 0부터 시작함
	var yy = startDT.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	startDate = yy + '-' + mm + '-' + dd;
}

// Mercury 변환 로직 적용 : $('#searchEngList .std').children().td(2).text() = MERC_EID
/* Engagement 추가 - 확인 버튼 눌렀을 때*/
function setEng(targetRowId){	
	var inputFlag = 0;
	//사용자가 eng를 직접 입력한 경우, td안에 input 요소가 추가되므로 input의 value를 td 태그의 text로 변경
	if($('#searchEngList').children().eq(0).find("input").length !== 0) {
		
		inputFlag = 1;
		var $customizedEngTr = $('#searchEngList').children().eq(0);
		var $customizedEngTd = $customizedEngTr.find("input");

		var customizedEngType = $("#globalCodeType option:selected").val(); //$customizedEngTd.eq(1).val().trim().toUpperCase(); // 직접 입력한 코드 타입
		var customizedEngCode = $customizedEngTd.eq(1).val().trim().split('-')[1]; //직접 입력한 Engagement 코드
		var mercCustomizedEngCode = $customizedEngTd.eq(1).val().trim(); //직접 입력한 Mercury Engagement 코드
		
		var customizedEngCodeRegExr = /^[A-Z]-[0-9]{8}$/g;
		
		if(!mercCustomizedEngCode.match(customizedEngCodeRegExr)) {
    		alertify.alert("알림","Engagement Code는 X-숫자8자리 형태로만 입력할 수 있습니다.(EX. E-12345678)");       
    		return;
    	}
		
		// engagmeent code 8글자 제한
		if(customizedEngCode.length != 8) {
			alertify.alert("알림","Engagement Code는 10자리로만 입력할 수 있습니다.");
			return;
		}
		
		// engagmeent code, type 값 검증
		if(customizedEngType !== 'N' && customizedEngType !== 'C' && customizedEngType !== 'P') {
			alertify.alert("알림","Engagement type은 C/P/N 중 입력해주세요.");
			return;
		}
		
		// 직접 입력한 engagement(input 태그 사용)와 검색하여 선택한 engagement(td 태그 사용)를 동일한 방법으로 처리하기 위해 input태그들의 value를 td 태그의 text값으로 치환	
		$customizedEngTd.each(function(i, item){
			// Mercury 변환 로직 적용 : gfis EID 처리
			if(item.id === 'globalCodeInput') {
				$(item).attr('value', customizedEngCode)
			}
			
			var $target = $(item).closest('td');
			$target.text($(item).val());			
		});
		
		$customizedEngTr.addClass("std");
	}

	//검색하여 선택한 engagement
	var td = $('#searchEngList .std').children();
	
	if(!$('#searchEngList .std').hasClass('std')){
		alertify.alert("알림","Engagement를 선택하세요");
		return false;
	}
	
	var $target = $('#' + targetRowId).closest('tr');	//left table's row
	var siblingsList = $('#' + targetRowId).siblings();	//left row의 td들
	var targetEngType = $target.find("[id='eng_type']").text();
	
	//right table's row
	var rowNum = null;	//row number
	var $engRow_R = null;	//right table
	if(targetRowId.search("eng_code_D") === 0) {
		rowNum = targetRowId.split("eng_code_D")[1];
		$engRow_R = $('#timeReportList_R').find('[id="multipleRow' + rowNum + '"]');
	}else {
		rowNum = targetRowId.split("eng_code")[1];
		$engRow_R = $('#timeReportList_R').find('[id="timeSheetRow' + rowNum + '"]');
	}
	var engRowChildrenList_R = $engRow_R.children();	//right row의 td들
	
	//경영자문위원회 N 코드 입력x
	if(td.eq(3).text().trim().toUpperCase() == 'N' && (ACTIVE_EY_RANK == '04'|| ACTIVE_EY_RANK == '05') ){
		alertify.alert("알림","경영자문위원은 Non-chargeable 코드를입력할 수 없습니다.");
		return;
	}
	
	//engagement type이 non-chargeable인 경우는 non-chargeable code로만 변경 가능 & C 및 AP 코드는 non-chargeable 타입의 engagement로 변경할 수 없음
	if(targetEngType.trim().toUpperCase() === 'N' && td.eq(3).text().trim().toUpperCase() !== 'N') {
		alertify.alert("알림","Non-chargeable engagement는 Non-chargeable engagement로만 변경이 가능합니다.");
		$('#searchEng').modal('hide');
		return;
	}else if(targetEngType.trim() !== "" && targetEngType.trim().toUpperCase() !== 'N' && td.eq(3).text().trim().toUpperCase() === 'N') {
		alertify.alert("알림","chargeable 및 AP engagement는 Non-chargeable engagement로 변경할 수 없습니다.");
		$('#searchEng').modal('hide');
		return;
	}		

	$('#' + targetRowId).html('<i class="fa fa-search"></i>' + td.eq(1).text());	//engagement code
	$('#merc_' + targetRowId).html('<i class="fa fa-search"></i>' + td.eq(2).text());	//mercury engagement code
	if($target.attr('id').search('multipleRow') === 0) {
		
		if(inputFlag == 1){
			siblingsList.eq(3).html(customizedEngType);	//engagement type
		}else{
			siblingsList.eq(3).html(td.eq(3).text().toUpperCase());	//engagement type
		}
		
		// siblingsList.eq(6) : merc_eng_code_D1 위치
		siblingsList.eq(7).html('<i class="fa fa-search"></i>' + td.eq(4).text());	//ep name
		siblingsList.eq(8).html('<nobr>' + td.eq(0).text() + '</nobr>');	//engagement name
		siblingsList.eq(2).val(td.eq(6).text());	//ep gpn
		siblingsList.eq(4).val(td.eq(12).text());	// 감사보고서 확정 여부
		
		// [22.12] Non-ch, edu 코드에 대해서는 4주 이내 수정 리뷰 대상에서 제외
		siblingsList.eq(9).val(td.eq(10).text()); // multipleRow에 대한 e_type 정보 추가
		
		//activity code
		engRowChildrenList_R.eq(1).html(makeActivitySelectBox(rowNum, 'activity_code_D', td.eq(1).text().trim(), td.eq(11).text().trim()));
		
		//[24.03][정혜원] sub activity code 생성
		//multipleRow 인 경우 (승인요청 -> 승인 -> 수정 -> 재승인요청한 row)
		var activityCodeValue = $('#activity_code_D').value; //activity value로 sub activity 존재 유무 결정하기 위해
		engRowChildrenList_R.eq(2).html(makeSubActivitySelectBox('sub_activity_code_D', td.eq(1).text().trim(), td.eq(11).text().trim(), activityCodeValue));
		
		/*
		if($.inArray(td.eq(11).text(), AUDIT_GLOB_SVC_CD) > -1) {
			if(td.eq(1).text().trim() === '21563848'){
				engRowChildrenList_R.eq(1).html('<td><select id="activity_code_D" class="form-control">' + makeDropBoxForEYJapan() + '</select></td>');
			}else{
				engRowChildrenList_R.eq(1).html('<td><select id="activity_code_D" class="form-control">' + makeDropBoxForGSC35() + '</select></td>');
			}
		}else if(td.eq(1).text().trim() === '10000001') {
			engRowChildrenList_R.eq(1).html('<td><select id="activity_code_D" class="form-control">' + makeDropBoxForleave() + '</select></td>');
		}else if(td.eq(1).text().trim() === '17811828') {
			engRowChildrenList_R.eq(1).html('<td><select id="activity_code_D" class="form-control">' + makeDropBoxForSpecificEng() + '</select></td>');	
		}else {
			engRowChildrenList_R.eq(1).html('<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code_D" class="form-control" value="0000"/>' + '</td>');
		}
		*/
		
	}else {
		
		if(inputFlag == 1){
			siblingsList.eq(7).html(customizedEngType);	//engagement type
		}else{
			siblingsList.eq(7).html(td.eq(3).text().toUpperCase());	//engagement type
		}
		siblingsList.eq(11).html('<i class="fa fa-search"></i>' + td.eq(4).text());	//ep name
		siblingsList.eq(12).attr('title',td.eq(0).text());
		siblingsList.eq(12).html('<nobr>' + td.eq(0).text() + '</nobr>');	//engagement name
		siblingsList.eq(2).val(td.eq(6).text());	//ep gpn
		siblingsList.eq(6).val(td.eq(10).text());	//e_type
		siblingsList.eq(8).val(td.eq(12).text());	// 감사보고서 확정 여부
		
		// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 Start
		// - 별도 감사보고서일, 연결 확정여부와 감사보고서일을 설정함 
		siblingsList.eq(15).val(td.eq(18).text());	// 별도 감사보고서일
		siblingsList.eq(16).val(td.eq(19).text());	// 연결 감사보고서 확정여부
		siblingsList.eq(17).val(td.eq(20).text());	// 연결 감사보고서일

		//activity code
		engRowChildrenList_R.eq(1).html(makeActivitySelectBox(rowNum, 'activity_code', td.eq(1).text().trim(), td.eq(11).text().trim()));			
		
		//[24.03][정혜원] sub activity code 생성
		//timeSheetRow 인 경우
		var activityCodeValue = $('#activity_code').value; //activity value로 sub activity 존재 유무 결정하기 위해
		engRowChildrenList_R.eq(2).html(makeSubActivitySelectBox('sub_activity_code', td.eq(1).text().trim(), td.eq(11).text().trim(), activityCodeValue));
		
		/*
		if($.inArray(td.eq(11).text(), AUDIT_GLOB_SVC_CD) > -1) {
			if(td.eq(1).text().trim() === '21563848'){
				engRowChildrenList_R.eq(1).html('<td><select id="activity_code" class="form-control">' + makeDropBoxForEYJapan() + '</select></td>');
			}else{
				engRowChildrenList_R.eq(1).html('<td><select id="activity_code" class="form-control">' + makeDropBoxForGSC35() + '</select></td>');
			}
		}else if(td.eq(1).text().trim() === '10000001') {
			engRowChildrenList_R.eq(1).html('<td><select id="activity_code" class="form-control">' + makeDropBoxForleave() + '</select></td>');
		}else if(td.eq(1).text().trim() === '17811828') {
			engRowChildrenList_R.eq(1).html('<td><select id="activity_code" class="form-control">' + makeDropBoxForSpecificEng() + '</select></td>');	
		}else {
			engRowChildrenList_R.eq(1).html('<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code" class="form-control" value="0000"/>' + '</td>');
		}
		*/
		
	}
	
	// Mercury Desc
	//engRowChildrenList_R.eq(0).children().eq(0).val(td.eq(0).text()); // description
	engRowChildrenList_R.eq(0).children().eq(1).val(td.eq(13).text()); // 독립성 확인 체크 여부
	engRowChildrenList_R.eq(0).children().eq(2).val(td.eq(11).text()); // Eng 코드 (감사 = 35)
	
	//engagement type이 non-chargeable인 경우, 재택여부 체크박스는 초기화 및 비활성화
// 	if(td.eq(3).text().toUpperCase() === 'N'){
// 		engRowChildrenList_R.eq(2).children().eq(0).prop("checked",false);
// 		engRowChildrenList_R.eq(2).children().eq(0).prop("disabled",true);
// 	}
	
	calculateWorkingHours();
	$('#searchEng').modal('hide');
}

/* EP 변경 */
function setEp(targetRowId_ep){		
	if(!$('#apprList .std').hasClass('std')){
		alertify.alert("알림","EP를 선택해 주세요");
		return false;
	}

	var td = $('#apprList .std').children();
	var $target = $('#eng_pn' + targetRowId_ep).closest('tr');
	var targetRowNum = targetRowId_ep.startsWith('_D') ? targetRowId_ep.split('_D')[1] : targetRowId_ep;

	// [22.05] TMS 감사코드(제출 시점 기준) EP 변경 불가 validation 추가 - 감사코드만 해당 (변경 필요 시 RPM팀에 요청)
	// 1) 해당 Row Eng. Code가 감사코드(GLOB_SVC_CD)인지 판단
	// 2) 감사코드라면 현 시점 EP 조회
	// 3) 조회된 EP와 선택한 EP가 다르다면 EP 변경 불가 Alert 생성
	// 4) 저장 및 승인요청 시 EP가 다르다면 서비스 단에서 reject message 발생 (validateTimeReport)
	
	// target이 timeSheetRow인지 multipleRow가 인지 판단하여 globSvcCd 추출
	if($target.attr("id").search("multipleRow") === 0) {
		$target_L = $('#timeReportList_L').find('[id="multipleRow' + targetRowNum + '"]');
		$target_R = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
	}else {
		$target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		$target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
	}
	
	// 35번 감사코드인 경우 현 시점 EP 조회 (4주 이전 수정 권한 가진 어드민 제외)
	if($.inArray(SESSION_GPN, reqExceptionList) <= -1 && $.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) {	
		var datas = {
			"eid" : $target.find('#eng_code' + targetRowId_ep).text()
		};
		
		$.ajax({
			type : "post",
			url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/getEPGpn.do",
			dataType : "json",
			data : datas,
			beforeSend:function(xhr){
		        //이미지 보여주기 처리
		        xhr.setRequestHeader("AJAX", true);
		        $('.wrap-loading').removeClass('display-none');
		    },
		    complete:function(){
		        //이미지 감추기 처리
		        $('.wrap-loading').addClass('display-none');
		 
		    },
			success : function(data) {
				if(data.epGpn == td.eq(3).text()) {					
					$('#eng_pn' + targetRowId_ep).html('<i class="fa fa-search"></i>' + td.eq(0).text());
					
					if($target.attr("id").search("multipleRow") === 0) {
						$target.find('#ep_gpn_D').val(td.eq(3).text());
					}else {
						$target.find('#ep_gpn').val(td.eq(3).text());
					}	
					$('#searchApprModal').modal('hide');
				} else {
					alertify.alert("알림", "결재 승인권자를 변경할 수 없습니다. 변경 필요 시 RPM팀에 요청주시기 바랍니다.");
				}
			},
			error: function(xhr, status, err) {
		        if (xhr.status == 401) {
		            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
		             $(".b-close").click();
		             location.href = koreaPortal_context_path + "/logout.do"
		         }else if (xhr.status == 403) {
		            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
		            $(".b-close").click();
		            location.href = koreaPortal_context_path + "/logout.do"
		         }else {
		        	var message = getRootCause($(xhr.responseText));
		        	doubleSubmitFlag = false;
					alertify.alert("알림", message);
		         }
		     }
		});
	} else {
		$('#eng_pn' + targetRowId_ep).html('<i class="fa fa-search"></i>' + td.eq(0).text());
		
		if($target.attr("id").search("multipleRow") === 0) {
			$target.find('#ep_gpn_D').val(td.eq(3).text());
		}else {
			$target.find('#ep_gpn').val(td.eq(3).text());
		}	
		$('#searchApprModal').modal('hide');
	}
}

/* EP 조회 */
function searchApprList(){
	var keyWord = $("#searchApprWord").val();
	
	if(keyWord.length < 2){
		alertify.alert("알림","검색 단어를 2자이상 입력해 주세요.");
		$("#searchApprWord").focus();
		return false;
	}
	
	var datas = {
			"searchWord" : $("#searchApprWord").val()
		};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/main/selectPeopleInfo.do",
		dataType : "json",
		data : datas,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	 
	    },
		success : function(data) {
			var innerHtml =  "";
			
			$(data.resultList).each(function(key, val){
				innerHtml += '<tr>';				
				innerHtml += '<td>'+nullCheck(val.KOR_NAME)+'</td>';
				innerHtml += '<td>'+nullCheck(val.DEPART_NAME)+'</td>';
				innerHtml += '<td>'+nullCheck(val.E_MAIL)+'</td>';
				innerHtml += '<td>'+val.GPN+'</td>';	
				innerHtml += '<td>'+nullCheck(val.GUI)+'</td>'; // 21.12.14 GUI 추가 - 윤정
			});		
			$('#apprList').html(innerHtml);
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         }else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         }else {
	        	var message = getRootCause($(xhr.responseText));
	        	doubleSubmitFlag = false;
				alertify.alert("알림",message); 
	         }
	     }
	});
}

/* Engagement Code 조회 */
function searchEng(){
	var keyWord = $('#searchEngWord').val();
	
	if(keyWord.length < 3){
		alertify.alert("알림","검색어는 3자 이상 입력해 주세요");
		 $('#searchEngWord').focus();
		return false;
	}
	
	var datas = {
			"searchWord" : $('#searchEngWord').val(),
			"E_STAT" : 'O',	// Y와 O가능. Y:Status가 Open, New, Release인 project 조회, O:Status가 Open, Release인 project만 조회		
			"gpn" : ACTIVE_GPN,
			"eowDate" : selectedDate // [23/12/22] eowDate 추가
	};
	
	// Mercury Non-ch. Code 검색과 분기
	var url = "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/";
	
	if(keyWord === 'Non-Chargeable Code') {
		url += "searchNonChEng.do";
	} else {
		url += "selectEngagement.do";
	}
	
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		data : datas,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	    },
		success : function(data) {
			var innerHtml = '';
			$(data.engagementList).each(function(key, val){
				innerHtml += '<tr>';				
				innerHtml += '<td>'+val.E_NM+'</td>';
				
				// Mercury 변환 로직 적용
				innerHtml += '<td style="display:none;">'+val.EID+'</td>';
				innerHtml += '<td>'+val.MERC_EID+'</td>';
				
				innerHtml += '<td>'+val.E_TYPE_CLS+'</td>';
				//TODO :: 검증
				if(val.E_TYPE_CLS == 'N'){
					innerHtml += '<td>-</td>';
				}else{
					innerHtml += '<td>'+nullCheck(val.EP_NAME)+'</td>';
				} 
				
				innerHtml += '<td>'+nullCheck(val.EM_NAME)+'</td>';
				
				//TODO :: 검증
				if(val.E_TYPE_CLS == 'N'){
					innerHtml += '<td style="display:none;">-</td>';
				}else{
					innerHtml += '<td style="display:none;">'+val.EP_GPN+'</td>';
				} 
				innerHtml += '<td style="display:none;">'+val.EM_GPN+'</td>';
				innerHtml += '<td style="display:none;">'+val.E_STAT+'</td>';
				innerHtml += '<td>'+val.E_STAT_DESCR+'</td>';
				innerHtml += '<td style="display:none;">'+val.E_TYPE+'</td>';
				innerHtml += '<td style="display:none;">'+val.GLOB_SVC_CD+'</td>';
				innerHtml += '<td style="display:none;">'+val.FIXED_ENG+'</td>'; // 감사보고서 확정된 Eng 판별</tr>';
				innerHtml += '<td style="display:none;">'+val.SIGSIGNATURECHECK+'</td>'; // 독립성 확인 체크</tr>';
				innerHtml += '<td>'+nullCheck(val.C_LNM)+'</td>';
				innerHtml += '<td>'+nullCheck(val.CID)+'</td>';
				innerHtml += '<td>'+ (val.ALLOW_FROM_DT == '1900-01-01' ? '-' : val.ALLOW_FROM_DT) +'</td>';
				//innerHtml += '<td>'+ (val.ALLOW_TO_DT == '1900-01-01' ? '-' : val.ALLOW_TO_DT) +'</td></tr>';
				innerHtml += '<td>'+ (val.ALLOW_TO_DT == '1900-01-01' ? '-' : val.ALLOW_TO_DT) +'</td>';
				
				// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 Start
				// - 별도 감사보고일, 연결 확정여부와 감사보고서일을 설정함
				innerHtml += '<td style="display:none;">'+val.FIXED_REPORT_DATE+'</td>'; // 별도재무제표 감사보고서일
				innerHtml += '<td style="display:none;">'+val.CR_FIXED_ENG+'</td>'; // 연결재무제표 감사보고서 확정여부
				innerHtml += '<td style="display:none;">'+val.CR_FIXED_REPORT_DATE+'</td></tr>'; // 연결재무제표 감사보고서일
				// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 End
			});		
			$('#searchEngList').html(innerHtml);
		}		
	});
}

// Merury Location : 검색
function searchLoc() {
	var keyWord = $('#searchLocWord').val();	
	
	if(keyWord.length < 2){
		alertify.alert("알림","검색어는 2자 이상 입력해 주세요");
		$('#searchLocWord').focus();
		return false;
	}
	
	var datas = {
		"searchWord" : $('#searchLocWord').val()
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/searchLoc.do",
		dataType : "json",
		data : datas,
		beforeSend:function(xhr) {
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function() {
	        $('.wrap-loading').addClass('display-none');
	    },
		success : function(data) {
			var innerHtml = '';
			
			$(data.resultList).each(function(key, val){
				innerHtml += '<tr>';				
				innerHtml += '<td>'+nullCheck(val.LOC1)+'</td>';
				innerHtml += '<td>'+nullCheck(val.LOC1_NM)+'</td>';
				innerHtml += '<td>'+nullCheck(val.LOC2)+'</td>';
				innerHtml += '<td>'+nullCheck(val.LOC2_NM)+'</td>';
			});
			
			$('#searchLocList').html(innerHtml);
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         }else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         }else {
	        	var message = getRootCause($(xhr.responseText));
	        	doubleSubmitFlag = false;
				alertify.alert("알림",message); 
	         }
	     }
	});
}

// Mercury Location : 선택
function setLoc(targetRowId_loc) {
	var td = $('#searchLocList .std').children();
	
	if(!$('#searchLocList .std').hasClass('std')){
		alertify.alert("알림","Location을 선택해 주세요");
		return false;
	}
	
	var $target = $('#' + targetRowId_loc).closest('tr');	
	$('#' + targetRowId_loc).html('<i class="fa fa-search"></i>' + td.eq(0).text());
	
	if($target.attr("id").search("multipleRow") === 0) {
		$('#loc2_D_NM' + targetRowId_loc.split('loc1_D_CD')[1]).html(td.eq(3).text());
		$('#loc2_D_CD' + targetRowId_loc.split('loc1_D_CD')[1]).html(td.eq(2).text());
	}else {
		$('#loc2_NM' + targetRowId_loc.split('loc1_CD')[1]).html(td.eq(3).text());
		$('#loc2_CD' + targetRowId_loc.split('loc1_CD')[1]).html(td.eq(2).text());
	}
	
	$('#searchLoc').modal('hide');
}

function addSearchEngModalRow(targetRowId) {
	
	var $targetTd = $('#' + targetRowId);
	var $target = $targetTd.closest('tr');
	
	if($target.attr("id").indexOf("multipleRow") != -1) {
		$target = $("#timeSheetRow" + $target.attr("id").split("multipleRow")[1]);
	}
	
	var apprStatus = $target.find("[id='appr_status']").val();
	var approved = $target.find("[id='approved']").val();
	
	if((apprStatus == "requested" && approved == "true") || (apprStatus == "submitted" && approved == "true")) {
		alertify.alert("알림","이미 승인받은 이력이 존재하는 engagement 정보를 변경할 경우, Engagement code를 직접 입력하실 수 없습니다.");
		return;
	}
	
	var innerHtml = '';
	
	innerHtml += '<tr>';				
	innerHtml += '<td>Global Code</td>'; //engagement name
	innerHtml += '<td style="display:none;"><input id="globalCodeInput" type="text" class="form-control"/></td>';	//engagement code
	
	// Mercury 변환 로직 적용
	innerHtml += '<td><input id="mercGlobalCodeInput" type="text" class="form-control" style="text-transform:uppercase"/></td>';	//mercury engagement code
	//innerHtml += '<td><input id="globalCodeType" type="text" class="form-control"/></td>';	//engagement type
	innerHtml += '<td><select id="globalCodeType">';
	
	innerHtml += '<option value="C" selected> Chargeable </option>';
	innerHtml += '<option value="P" >Authorized Project</option>';						
    innerHtml += '</select></td>';
	
	innerHtml += '<td>-</td>';
	innerHtml += '<td>-</td>';
	innerHtml += '<td style="display:none;"></td>';
	innerHtml += '<td style="display:none;"></td>';
	innerHtml += '<td style="display:none;"></td>';
	innerHtml += '<td></td>';
	innerHtml += '<td style="display:none;"></td>';
	innerHtml += '<td style="display:none;"></td>';
	innerHtml += '<td>-</td>';
	innerHtml += '<td>-</td></tr>';
	
	$('#searchEngList').html(innerHtml);
	
	// Mercury 변환 로직 적용
	/* 
	// Engagement Code 직접 입력 제한 조건 숫자만 입력 가능하도록
	var replaceNotInt = /[^0-9]/gi;
	  
	$("#globalCodeInput").on("focusout", function() {
        var x = $(this).val();
        if (x.length > 0) {
            if (x.match(replaceNotInt)) {
               x = x.replace(replaceNotInt, "");
            }
            $(this).val(x);
        }
    }).on("keyup", function() {
    	if(!$(this).val().match(replaceNotInt))
    	{
    		alertify.alert("알림","Engagement Code는 숫자만 입력할 수 있습니다.");  
    	}
    	
        $(this).val($(this).val().replace(replaceNotInt, ""));
    });
	*/
	
	$("#mercGlobalCodeInput").on("keyup", function() {
        $(this).val($(this).val().toUpperCase());
    });
}

function saveTimeReport(){
	
	var dataList = new Array();
	var datas = new Object();
	var rowNumArr = new Array();
	var varInadequateFlag = false;
	var next;
	
	$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
		next = true;
		var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
		rowNumArr.push(targetRowNum);
		
		var $target_L = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_R = $('#timeReportList_R').find('[id="timeSheetRow' + targetRowNum + '"]');
		var $target_R_D = $('#timeReportList_R').find('[id="multipleRow' + targetRowNum + '"]');
		
		var activity_code = $target_R.find("[id='activity_code']").val();
		var sub_activity_code = $target_R.find("[id='sub_activity_code']").val();
		var ret_eng_code = $target_L.find("[id='ret_eng_code" + targetRowNum + "']").val();
		
		// Mercury 변환 로직 적용
		var key_eng_code = $target_L.find("[id='eng_code" + targetRowNum + "']").text();
		var merc_key_eng_code = $target_L.find("[id='merc_eng_code" + targetRowNum + "']").text();
		var eng_name = $target_L.find("[id='eng_name" + targetRowNum + "']").text();
		
		var ep_gpn = $target_L.find("[id='ep_gpn']").val();
		
		var engType = $target_L.find("[id='eng_type']").text();
		var eType = $target_L.find("[id='e_type']").val();
				
		//engagement code이 빈 값일 시 버튼 선택 불가
		if(key_eng_code === "" || typeof key_eng_code === "undefined") {
			alertify.alert("알림","Engagement code는 필수 입력사항입니다.");
			$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);   //재택여부 제외
			$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
			varInadequateFlag = true;
			doubleSubmitFlag = false;
			return false;
		}
		
		/*ep name 이 빈 값일 시 버튼 선택 불가
		C : EP 필수
		P : 교육코드는 EP 빈 값 허용 / 그 외 코드는 EP 필수
		N : EP 빈 값 허용
		*/
		if(engType.indexOf("CHARGEABLE ") != -1 || engType === 'C' || (engType === 'P' && eType !== '' && typeof eType !== 'undefined' && $.inArray(eType, EDU_ENG_TYPE) <= -1)) {
			if(ep_gpn === "-" || ep_gpn === "" || typeof ep_gpn === "undefined") {
				alertify.alert("알림","EP는 필수 입력사항입니다.");
				$("input[type=checkbox]").not('[id=wfh_yn]').prop("checked",false);    //재택여부 제외
				$("input[type=checkbox]").not('[id=wfh_yn]').prop("disabled",false);
				varInadequateFlag = true;
				doubleSubmitFlag = false;
				return false;
			}
		}
		
		//data 생성
		var dataRow = new Object();
		
		//TODO :: 검증
		//dataRow["eowDate"] = $('#selectedWeekEnding').val();
		dataRow["eowDate"] = selectedDate;
		
		if(ret_eng_code === "" || ret_eng_code === null) {
			dataRow["retEngCode"] = key_eng_code;
		}else {
			dataRow["retEngCode"] = ret_eng_code;
		}
		
		if($target_R.find("[id='activity_code']").prop('tagName').toLowerCase() === 'select') {
			dataRow["activityCode"] = $target_R.find("[id='activity_code']").find("option:selected").val();
		}else {
			dataRow["activityCode"] = $target_R.find("[id='activity_code']").val();
		}
		
		//sub activity code 값 추출 //[24.03][정혜원]
		if($target_R.find("[id='sub_activity_code']").prop('tagName').toLowerCase() === 'select') {
			dataRow["subActivityCode"] = $target_R.find("[id='sub_activity_code']").find("option:selected").val();
		}else {
			dataRow["subActivityCode"] = $target_R.find("[id='sub_activity_code']").val();
		}
		
		//재택여부 
// 		if($target_R.find("[id='wfh_yn']").is(":checked") === true) {
// 			dataRow["wfhYn"] = 'Y';
// 		}else {
// 			dataRow["wfhYn"] = 'N';
// 		}
		
		// Mercury 변환 로직 적용
		dataRow["keyEngagementCode"] = key_eng_code;		
		dataRow["mercKeyEngagementCode"] = merc_key_eng_code;
		dataRow["engagementName"] = eng_name;
		
		dataRow["retainConnection"] = $target_L.find("[id='retain_connection']").val();
		dataRow["actualTimeSat"] = $target_R.find("[id='Sa_A']").val();
		dataRow["actualTimeSun"] = $target_R.find("[id='Su_A']").val();
		dataRow["actualTimeMon"] = $target_R.find("[id='Mo_A']").val();
		dataRow["actualTimeTue"] = $target_R.find("[id='Tu_A']").val();
		dataRow["actualTimeWed"] = $target_R.find("[id='We_A']").val();
		dataRow["actualTimeThu"] = $target_R.find("[id='Th_A']").val();
		dataRow["actualTimeFri"] = $target_R.find("[id='Fr_A']").val();
		dataRow["description"] = $target_R.find("[id='description']").val();
		dataRow["engagementType"] = $target_L.find("[id='eng_type']").text();
		dataRow["loc1"] = $target_R.find("[id='loc1_CD" + targetRowNum + "']").text();
		dataRow["loc2"] = $target_R.find("[id='loc2_CD" + targetRowNum + "']").text();
		dataRow["epGpn"] = ep_gpn;
		if(GPN !== ACTIVE_GPN) {				//delegator
			dataRow["delegatorGpn"] = GPN;
		}	
		dataRow["gpn"] = ACTIVE_GPN;
		dataRow["updateUser"] = GPN; // updateUser
		
		// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요				
		var auditEng = false;		
		if($target_R_D.length == 1) { // multipleRow인 경우
			auditEng = ($.inArray($target_R_D.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;			
		} else {
			auditEng = ($.inArray($target_R.find("[id='globSvcCd']").val(), AUDIT_GLOB_SVC_CD) > -1) ? true : false;
		}
		
// 		if($target_L.find("[id='eng_type']").text() === 'N' || $.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1 || $.inArray($target_L.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) {	//non-chargeable인 경우
		if($target_L.find("[id='eng_type']").text() === 'N'
				|| ($.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1 && ACTIVE_SERVICE_LINE != "01" && !auditEng)
				|| $.inArray($target_L.find("[id='e_type']").val(), EDU_ENG_TYPE) > -1) {
			dataRow["apprStatus"] = 'submitted';
			dataRow["approved"] = 'true';
		}else {
			dataRow["apprStatus"] = $target_L.find("[id='appr_status']").val();
			dataRow["approved"] = $target_L.find("[id='approved']").val();
		}
		if($target_L.find("[id='request_no']").val() !== null) {
			dataRow["requestNo"] = $target_L.find("[id='request_no']").val();
		}
		
		dataList.push(dataRow);
		
	});
	if(next){
		//ep와 eng code가 빈 값일시 처리
		if(varInadequateFlag) {
			doubleSubmitFlag = false;
			return false;
		}
		
		lastRequestDatas["timeReportList"] = dataList;

		// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
		if($.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1 && ACTIVE_SERVICE_LINE != "01") {	// 직급이 EP 이상인 경우 저장하면 자동 승인되므로 그 전에 독립성 체크 하도록 수정 (2021.05)
			// 독립성 확인 체크 후 제출 가능
			independenceCheck(lastRequestDatas, rowNumArr,'save');
		
		}else {
			finalSave();
		}
	}
}

//확인
function withdrawTimeReport(){

	var dataList = new Array();
	var datas = new Object();
	
	var rowNumArr = new Array();
	
	var fixedYn = 'N'; //감사보고서일 확정 여부 //[24.03][정혜원]
	
	function resetConfirm(){
		$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
			
			var targetRowNum = $(this).attr('class').split('eng_checkbox')[1];
			var $target = $('#timeReportList_L').find('[id="timeSheetRow' + targetRowNum + '"]');
			
			rowNumArr.push(targetRowNum);
			
			var dataRow = new Object();
			
			dataRow["requestNo"] = $target.find("[id='request_no']").val();
			
			var fixedEng = $target.find("[id='fixed_eng']").val(); //별도 감사보고서일 확정 여부 //[24.03][정혜원]
			var crFixedEng = $target.find("[id='cr_fixed_eng']").val(); //연결 감사보고서일 확정 여부 //[24.03][정혜원]
			
			//확정된 보고서인 경우 원복 불가능 //[24.03][정혜원]
			if(fixedEng == 'Y' && crFixedEng != 'N'){
				alertify.alert("감사보고서일이 확정되어 원복 불가능합니다.");
				fixedYn = 'Y';
				return false;
			}
			
			if(GPN !== ACTIVE_GPN) {
				dataRow["delegatorGpn"] = GPN;
			}
			dataRow["updateUser"] = GPN;
			dataList.push(dataRow);
			
		});
		
		if(fixedYn != 'Y'){
			datas["timeReportList"] = dataList;
			
			$.ajax({
				type : "post",
				url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/withdrawTimeReport.do",
				contentType : "application/json; charset=UTF-8", 
				dataType : "json",
				data : JSON.stringify(datas),
				beforeSend:function(xhr){
			        //이미지 보여주기 처리
			        xhr.setRequestHeader("AJAX", true);
			        $('.wrap-loading').removeClass('display-none');
			    },
			    complete:function(){
			    	
			    	//이미지 감추기 처리
			        $('.wrap-loading').addClass('display-none');
			        $('#reqTimeSheetModal').modal('hide');
			    },
				success : function(data) {				

					alertify.alert("알림",data.description);

			        if(data.result) {	
			        	retrieveTimeReport();
			        }
			        
			        //check box 초기화
			        deselectAll();
			        $(".reqTimesheetEnable").prop("disabled",true);
			        $("input[type=checkbox]").prop("disabled",false);
				},
				error: function(xhr, status, err) {
			        if (xhr.status == 401) {
			            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
			             $(".b-close").click();
			             location.href = koreaPortal_context_path + "/logout.do"
			         } else if (xhr.status == 403) {
			            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
			            $(".b-close").click();
			            location.href = koreaPortal_context_path + "/logout.do"
			         } else {
			        	var message = getRootCause($(xhr.responseText));
			        	doubleSubmitFlag = false;
						alertify.alert("알림",message);
			         }
			     }
			});
		}
	}
	//확인버튼 클릭시 alert창 //[24.03][정혜원]
	alertify.confirm("이전 승인 상태로 원복하시겠습니까?", resetConfirm);
}

function makeTotalRow(){
	
	var innerHtml = '';
	
	innerHtml += '<tr id="overTimeRow">';

	innerHtml += '<td>'+''+'</td>';  //description
	innerHtml += '<td>'+''+'</td>';  //activity code
	innerHtml += '<td>'+''+'</td>';  //sub activity code //[24.03][정혜원]
	
	//Assurance팀만 재택여부 표시되도록
// 	if (SERVICE_LINE === "01") {
// 		innerHtml += '<td>'+''+'</td>';	 //재택 여부
// 	}
	
	innerHtml += '<td id="satPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="satActual">'+'0.00'+'</td>';
	
	innerHtml += '<td id="sunPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="sunActual">'+'0.00'+'</td>';
	
	innerHtml += '<td id="monPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="monActual">'+'0.00'+'</td>';

	innerHtml += '<td id="tuePlan">'+'0.00'+'</td>';
	innerHtml += '<td id="tueActual">'+'0.00'+'</td>';
	
	innerHtml += '<td id="wedPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="wedActual">'+'0.00'+'</td>';
	
	innerHtml += '<td id="thrPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="thrActual">'+'0.00'+'</td>';
	
	innerHtml += '<td id="friPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="friActual">'+'0.00'+'</td>';

	innerHtml += '<td id="totalPlan">'+'0.00'+'</td>';
	innerHtml += '<td id="totalActual">'+'0.00'+'</td>';
	
	innerHtml += '<td>'+''+'</td>';  //loc1
	innerHtml += '<td>'+''+'</td>';  //loc2

	
	innerHtml += '</tr>';
	
	//--------------------------------------------------------total row---------------------------------------------------------
	innerHtml += '<tr id="totalRow">';
	
	innerHtml += '<td>'+''+'</td>';  //description
	innerHtml += '<td>'+''+'</td>';  //activity code
	innerHtml += '<td>'+''+'</td>';  //sub activity code //[24.03][정혜원]
	
	//Assurance팀만 재택여부 표시되도록
// 	if (SERVICE_LINE === "01") {
// 		innerHtml += '<td>'+''+'</td>';	 //재택 여부
// 	}
	
	innerHtml += '<td id="totalSaHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalSaHours_a">'+'0.00'+'</td>';
	
	innerHtml += '<td id="totalSuHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalSuHours_a">'+'0.00'+'</td>';
	
	innerHtml += '<td id="totalMoHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalMoHours_a">'+'0.00'+'</td>';

	innerHtml += '<td id="totalTuHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalTuHours_a">'+'0.00'+'</td>';
	
	innerHtml += '<td id="totalWeHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalWeHours_a">'+'0.00'+'</td>';
	
	innerHtml += '<td id="totalThHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalThHours_a">'+'0.00'+'</td>';
	
	innerHtml += '<td id="totalFrHours_p">'+'0.00'+'</td>';
	innerHtml += '<td id="totalFrHours_a">'+'0.00'+'</td>';

	innerHtml += '<td id="totalPnHours">'+'0.00'+'</td>';
	innerHtml += '<td id="totalAcHours">'+'0.00'+'</td>';
	
	innerHtml += '<td>'+''+'</td>';  //loc1
	innerHtml += '<td>'+''+'</td>';  //loc2

	
	innerHtml += '</tr>';
	
	$('#timeSheetMonitorList').html(innerHtml);
	$('#timeSheetMonitorList input').prop("disabled",true);
	
}

function retrieveLocList() {
	var datas = {
			"loc1" : ""
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveLoc.do",
		dataType : "json",
		async: false,
		data : datas,
		beforeSend : function(xhr) {
			//이미지 보여주기 처리
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		success : function(data) {
		
			loc1List = data.result;
		}
	});
}

/* Loc1의 정보를 모두 담고있는 loc1List를 화면에 set */
function setLoc1(key, valueOfLoc1, multipleFlag) {
	//loc1List
	var resultHtml = '';
	$(loc1List).each(function(key, val) {
	
		if(valueOfLoc1 !== "" && valueOfLoc1 !== null && typeof valueOfLoc1 !== 'undefined') {
			resultHtml +=  '<option value="' + val.LOC1 + '" ' + (val.LOC1 === valueOfLoc1 ? "selected" : "") + '>' + val.LOC1 + '</option>';
		}else {
			resultHtml +=  '<option value="' + val.LOC1 + '" ' + (val.LOC1 === "Korea, Republic of" ? "selected" : "") + '>' + val.LOC1 + '</option>';
		}
		
	});

	if(multipleFlag) {
		if($("#timeReportList_R").find("[id='multipleRow" + key + "']").length > 0) {
			$("#timeReportList_R").find("[id='multipleRow" + key + "']").find('[id="loc1_D"]').html(resultHtml);
		}
	}else if(!multipleFlag || multipleFlag === null || typeof multipleFlag === 'undefined') {
		$("#timeReportList_R").find("[id='timeSheetRow" + key + "']").find('[id="loc1"]').html(resultHtml);
	}
}

function retrieveLoc2(rowIndex, valueOfLoc2, multipleFlag){
	
	//target이 timeSheetRow가 될 것인지 multipleRow가 될 것인지 결정
	var $target;
	var $loc1;
	var $loc2;
	
	if(multipleFlag) {
		if($("#timeReportList_R").find("[id='multipleRow" + rowIndex + "']").length > 0) {
			$target = $("#timeReportList_R").find("[id='multipleRow" + rowIndex + "']")
			$loc1 = $target.find('[id="loc1_D"]');
			$loc2 = $target.find('[id="loc2_D"]');
		}
	} else if(!multipleFlag || multipleFlag === null || typeof multipleFlag === 'undefined') {
		$target = $("#timeReportList_R").find("[id='timeSheetRow" + rowIndex + "']")
		$loc1 = $target.find('[id="loc1"]');
		$loc2 = $target.find('[id="loc2"]');
	}
	
	//loc2 clear
	$loc2.find("option").remove();
	
	var datas = {
			"loc1" : $loc1.find("option:selected").text()
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveLoc.do",
		dataType : "json",
		async: false,
		data : datas,
		beforeSend : function(xhr) {
			//이미지 보여주기 처리
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		complete : function() {
			//이미지 감추기 처리
			$('.wrap-loading').addClass('display-none');
		},
		success : function(data) {
			$(data.result).each(function(key, val) {
				if($loc2.attr('id').trim() === 'loc2_D') {
					$loc2.append($('<option value="' + val.LOC2 + '" ' + (valueOfLoc2 === val.LOC2 ? "selected" : "") + '>' + val.LOC2 + '</option>'));
				}else {
					$loc2.append($('<option value="' + val.LOC2 + '" ' + (valueOfLoc2 === val.LOC2 ? "selected" : "") + '>' + val.LOC2 + '</option>'));
				}
			});
			
		}
	});
}

var selectedDate; //$('#selectedWeekEnding').val()로 타임리포트 저장 / 요청하면 잘 못 된 값이 들어갈 때 있음  
function retrieveTimeReport(asyncFlag){
	$("input:checkbox[name='all']").prop("checked", false);

	//timeSheet 테이블 재조회시 ajax를 겹쳐쓰기 떄문에 beforeSend 속성이 안먹는 경우가 존재해 최초 조회시만 비동기, 재조회시 동기 처리를 하기 위한 flag 함수 (ajax 본문 async 속성에 사용)
	if(typeof asyncFlag === 'undefined') {
		asyncFlag = false;
	}

	selectedDate = $('#selectedWeekEnding').val();
	
	/*
	[22.11] 감사본부 4주 이내 타임 수정 리뷰
	다른 일자 선택 시 수정사유 입력 팝업 초기화 안되는 버그 수정
	*/
    $('#timeReportList').empty();
	
	//조회시 초기화
    $('.reqTimesheetEnable').prop("disabled",false);
    $('.check-all').prop("disabled", false);
    $('#progressBar_A').attr('class', 'circle');
    $('#progressBar_P').attr('class', 'circle');
	$('#copyBtn').prop("disabled", false);
    $('#transferList').empty(); // transferYn 초기화용
    
    engRowIndex = 0;
    
	// 2019-03-01 형식으로 바꿈
	var datas = {
			"selectedWeekEnding" : $('#selectedWeekEnding').val(),
			"APPROVED" : "false",
			"gpn" : ACTIVE_GPN
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveTimeReport.do",
		dataType : "json",
		data : datas,
		async: asyncFlag,
		beforeSend:function(xhr){
		    //이미지 보여주기 처리
		    xhr.setRequestHeader("AJAX", true);
		    $('.wrap-loading').removeClass('display-none');
		},
		/*complete:function(){
		    //이미지 감추기 처리
		    $('.wrap-loading').addClass('display-none');
		    
		},*/
		success : function(data) {
			$.ajax({
				type : "post",
				url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/selectReqExceptionList.do",
				dataType : "json",
				async: asyncFlag,
				beforeSend:function(xhr){
				    //이미지 보여주기 처리
				    xhr.setRequestHeader("AJAX", true);
				    $('.wrap-loading').removeClass('display-none');
				},
				/*complete:function(){
				    //이미지 감추기 처리
				    $('.wrap-loading').addClass('display-none');				    
				},
				*/
				success : function(result) {	
					totalPlanHours = 0;
					var nowDate = new Date(data.FIRSTDATE);
					totalPlanChargeableHours = 0;
					totalPlanAuthorizedHours = 0;
					totalPlanNonChargeableHours = 0;
					var engagementStatusArr = [];
					var innerHtml = '';
					var innerLeftHtml = '';
					var innerRightHtml = '';
					
					//조회 대상의 GPN 및 EY_RANK, HIRE_DATE setting
					ACTIVE_KOR_NAME = data.myInfo.KOR_NAME;
					ACTIVE_GPN = data.myInfo.GPN;
					ACTIVE_EY_RANK = data.myInfo.EY_RANK;
					ACTIVE_SERVICE_LINE = data.myInfo.SERVICE_LINE; // SERVICE_LINE setting
					HIRE_DATE = data.HIRE_DATE;
					RETIRE_DATE = data.RETIRE_DATE;
					//경영자문위원회 non-chargeable 검색 버튼 hide
					if(ACTIVE_EY_RANK == '04' || ACTIVE_EY_RANK == '05'){
						$("#nonChargeablePtag").hide(); 
					}else{
						$("#nonChargeablePtag").show(); 
					}
					
					// [24.02] 감사 Engagement 에 Time 제출시 파트너인 경우도 해당 code의 EP 승인 필요
					//active user가 EP 이상인 경우 승인 요청, 회수 버튼 처리
					if($.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1 && ACTIVE_SERVICE_LINE != "01") {	// 직급이 EP 미만인 사람들만 회수 및 승인요청 가능. EP 이상인 사원은 승인 요청없이 자동 승인
						//참고 : 변경할 시 .detach() 를 고려할 것. 요소를 지우지만 요소에 대한 정보를 반환해주므로 다시 append해주면 요소를 리커버리할 수 있다.
						$("#requestBtn").hide();
					}else {
						//delegation 처리
						if(!$("#requestBtn").is(':visible')) {
							$("#requestBtn").show();
						}
					}
					
					//지난 주 까지의 평균 working time
					if(asyncFlag === true) {
						retrieveWorkingHours();
					}
					
					for(var i = 0; i < 7; i++){
						if(i != 0){
							nowDate.setDate(nowDate.getDate()+1)
						}
						var nd = nowDate.format("dd");
						
						if(i == 0){
							$('#title'+i).text('Sa('+nd+')');	
						}else if(i == 1){
							$('#title'+i).text('Su('+nd+')');
						}else if(i == 2){
							$('#title'+i).text('Mo('+nd+')');
						}else if(i == 3){
							$('#title'+i).text('Tu('+nd+')');
						}else if(i == 4){
							$('#title'+i).text('We('+nd+')');
						}else if(i == 5){
							$('#title'+i).text('Th('+nd+')');
						}else if(i == 6){
							$('#title'+i).text('Fr('+nd+')');
						}
					}
					
					//수정 가능 여부 판단 (4주 전후만 가능) - 조회 데이터가 없을 때 처리하기 위해 이 위치에서 계산. 데이터가 있다면 모든 데이터 테이블을 생성한 후 수정 가능 여부에 따라 버튼 처리 / 데이터가 없다면 바로 밑에서 처리
					var thisFriday = findThisFriday();
					var thisFridayArr = thisFriday.split('-');
					
					var selectedDay = $('#selectedWeekEnding').val();
					var selectedDayArr = selectedDay.split('-');
					
					var thisFridayDate = new Date(thisFridayArr[0], parseInt(thisFridayArr[1])-1, thisFridayArr[2]);
					var selectedDayDate = new Date(selectedDayArr[0], parseInt(selectedDayArr[1])-1, selectedDayArr[2]);
					
					var diffOfEndDate = (thisFridayDate.getTime() - selectedDayDate.getTime()) / 1000 / 60 / 60 / 24;
				
					var t_Sa_r = 0;
					var t_Su_r = 0;
					var t_Mo_r = 0;
					var t_Tu_r = 0; 
					var t_We_r = 0;
					var t_Th_r = 0;
					var t_Fr_r = 0;
					
					$(data.result).each(function(key, val) {
				
						innerLeftHtml += makeLeftEngagementRow(val);
						innerRightHtml += makeRightEngagementRow(val);
						
						var Sa_r = val.Sa_R == null ? 0 :  Number(val.Sa_R.toFixed(2));
						var Su_r = val.Su_R == null ? 0 :  Number(val.Su_R.toFixed(2));
						var Mo_r = val.Mo_R == null ? 0 :  Number(val.Mo_R.toFixed(2));
						var Tu_r = val.Tu_R == null ? 0 :  Number(val.Tu_R.toFixed(2));
						var We_r = val.We_R == null ? 0 :  Number(val.We_R.toFixed(2));
						var Th_r = val.Th_R == null ? 0 :  Number(val.Th_R.toFixed(2));
						var Fr_r = val.Fr_R == null ? 0 :  Number(val.Fr_R.toFixed(2));
						
						var tot_r = Sa_r + Su_r + Mo_r + Tu_r + We_r + Th_r + Fr_r;
						var hours = 0;
						
						hours += Sa_r;
						t_Sa_r += Sa_r;
						
						hours += Su_r;
						t_Su_r += Su_r;
						
						hours += Mo_r;
						t_Mo_r += Mo_r;
						
						hours += Tu_r;
						t_Tu_r += Tu_r;
						
						hours += We_r;
						t_We_r += We_r;
						
						hours += Th_r;
						t_Th_r += Th_r;
						
						hours += Fr_r;
						t_Fr_r += Fr_r;

						var engType = typeof val.ENG_TYPE == "undefined" || val.ENG_TYPE == null ? val.RET_ENG_TYPE : val.ENG_TYPE;
						if(engType === 'C') {
							totalPlanChargeableHours += hours;
						}else if(engType === 'P') {
							totalPlanAuthorizedHours += hours;
						}else {
							totalPlanNonChargeableHours += hours;
						}
						
						engagementStatusArr.push(val.STATUS);
					});
					
					//합계 행 생성
					makeTotalRow();
					
					//origin
					//$('#totalPlanningHours').html('CH ' + totalPlanChargeableHours.toFixed(2) + ' hr &nbsp; AP ' + totalPlanAuthorizedHours.toFixed(2) + ' hr &nbsp; Non-CH ' + totalPlanNonChargeableHours.toFixed(2) + ' hr');
					
					$('#totalPlanningHours_CH').html("CH<br />" + totalPlanChargeableHours.toFixed(2) + "&nbsp;<small>hr</small>");
					$('#totalPlanningHours_AP').html("AP<br />" + totalPlanAuthorizedHours.toFixed(2) + "&nbsp;<small>hr</small>");
					$('#totalPlanningHours_N').html("Non-CH<br />" + totalPlanNonChargeableHours.toFixed(2) + "&nbsp;<small>hr</small>");
					
					totalPlanHours = t_Sa_r + t_Su_r + t_Mo_r + t_Tu_r + t_We_r + t_Th_r + t_Fr_r;
					$('#totalPlanHours').html(totalPlanHours.toFixed(2) + '&nbsp;<small>hr</small>');
					
					$('#satPlan').html((t_Sa_r > 8 ? (t_Sa_r - 8) : 0).toFixed(2));
					$('#sunPlan').html((t_Su_r > 8 ? (t_Su_r - 8) : 0).toFixed(2));
					$('#monPlan').html((t_Mo_r > 8 ? (t_Mo_r - 8) : 0).toFixed(2));
					$('#tuePlan').html((t_Tu_r > 8 ? (t_Tu_r - 8) : 0).toFixed(2));
					$('#wedPlan').html((t_We_r > 8 ? (t_We_r - 8) : 0).toFixed(2));
					$('#thrPlan').html((t_Th_r > 8 ? (t_Th_r - 8) : 0).toFixed(2));
					$('#friPlan').html((t_Fr_r > 8 ? (t_Fr_r - 8) : 0).toFixed(2));
					
					var summaryOver8hours = totalPlanChargeableHours + totalPlanAuthorizedHours + totalPlanNonChargeableHours - 40;
					var totalChargeablePlanHours = totalPlanChargeableHours + totalPlanAuthorizedHours;
						
					if (summaryOver8hours < 0) {
						summaryOver8hours = 0;
					}
					
					//total row (Over)
					$('#totalPlan').html(summaryOver8hours.toFixed(2));
					
					$('#timeReportList').html(innerHtml);
					$('#timeReportList_L').html(innerLeftHtml);
					$('#timeReportList_L').find('tr').each(function(id,el){
					    $(el).attr("style",'height:50px')
					})
					$('#timeReportList_R').html(innerRightHtml);
					
					$('#timeReportList_R tr').each(function(i){
						var targetRowid = $(this).attr('id');
					});
					
					$('[data-toggle="tooltip"]').tooltip();
			
					//total row
					$('#totalSaHours_p').html(t_Sa_r.toFixed(2));
					$('#totalSuHours_p').html(t_Su_r.toFixed(2));
					$('#totalMoHours_p').html(t_Mo_r.toFixed(2));
					$('#totalTuHours_p').html(t_Tu_r.toFixed(2));
					$('#totalWeHours_p').html(t_We_r.toFixed(2));
					$('#totalThHours_p').html(t_Th_r.toFixed(2));
					$('#totalFrHours_p').html(t_Fr_r.toFixed(2));
					$('#totalPnHours').html(totalPlanHours.toFixed(2));

					if(totalChargeablePlanHours > 0) {
						if(totalChargeablePlanHours <= 40) {
							$("#progressBar_P").attr('class', 'circle circle-green');
						}else if(totalChargeablePlanHours > 40 && totalChargeablePlanHours <= 52) {
							$("#progressBar_P").attr('class', 'circle circle-warnning');
						}else if(totalChargeablePlanHours > 52) {
							$("#progressBar_P").attr('class', 'circle circle-danger');
						}
					}else {
						$("#progressBar_P").attr('class', 'circle circle-default');
					}
					
					calculateWorkingHours();
					
					startDate = data.FIRSTDATE;
					
					//4주 이전 타임시트 수정 가능 인원
					/* var reqExceptionList = new Array(); */
					
					for(var i=0; i<result.result.length; i++){
						reqExceptionList[i]=result.result[i].GPN;
					} 
					
					
					 //4주 이전 타임시트 수정 가능 인원
					/* var reqExceptionList =  [
												'KR010016924', 'KR010017129', 'KR010014009', 'KR010013271', 'KR010016687', 'KR010010142', 'KR010015968',
												'KR010012417', 'KR010007476', 'KR010016460', 'KR010013466', 'KR010007477', 'KR010017212'
											];  */
					
					if( $.inArray( SESSION_GPN, reqExceptionList) <= -1){
						// [2024.09][박유란] 과거 4주 이내 -> 50주 이내 타임시트 수정 가능하도록 변경
						if(diffOfEndDate > 350 || diffOfEndDate < -28 || selectedDay <= GFIS_CLOSING_DATE) { // 21.11.08 추가 - 2022.02.04 이전 타임시트 수정 블락 // 윤정
							//수정 불가 + 추가 불가
							$('#timeReportList_L input, #timeReportList_L td, #timeReportList_L select').prop('disabled', true);
							$('#timeReportList_R input, #timeReportList_R td, #timeReportList_R select').prop('disabled', true);
							$('.reqTimesheetEnable').prop("disabled", true);
							$('#addTr').prop("disabled", true);
							$('.check-all').prop("disabled", true);
							$('#copyBtn').prop("disabled", true);
						}else{
							//행추가 버튼 disabled 초기화 (기본 : false). 다른 요소들은 retrieveTimeReport 때 초기화되므로 이 곳에서 처리하지 않음
							$('#addTr').prop("disabled", false);
						}
					}
				
					//뽑아온 engagement 정보들의 각 status를 비교하여 timeSheet 제출 상태를 결정
					var currStatus = '';
					timeSheetStatus = 'Complete';
					
					if ( engagementStatusArr.length == 0 ){
						timeSheetStatus = 'Incomplete';
					}
		 			
					$.each(engagementStatusArr, function(index, item) {
						//timeSheetStatus : global 변수
						if (item === 'unsubmitted' || item === 'rejected') {
							timeSheetStatus = 'Incomplete';
							return false;
						} else if (item === 'requested') 
							timeSheetStatus = 'In progress';
					});
					
					/* 입사,퇴사일 비교해서 40시간 미만 제출 가능하도록 수정*/
					var selectedDay = $('#selectedWeekEnding').val();
					var selectedDayArr = selectedDay.split('-');
					var diffOfRetireDate = -1;var diffOfHireDate = 0;
					
					var selectedDayDate = new Date(selectedDayArr[0], parseInt(selectedDayArr[1])-1, selectedDayArr[2]);
					if(HIRE_DATE != null && HIRE_DATE != "") {
						var HireDateArr = HIRE_DATE.split('-');
						var HireDate = new Date(HireDateArr[0], parseInt(HireDateArr[1])-1, HireDateArr[2]);
						diffOfHireDate = (selectedDayDate.getTime() - HireDate.getTime()) / 1000 / 60 / 60 / 24; //입사일과 선택한 주차의 차이
					}
					
					if(RETIRE_DATE != null && RETIRE_DATE != "") {
						var RetireDate = new Date(RETIRE_DATE.substring(0,4), parseInt(RETIRE_DATE.substring(4,6))-1, RETIRE_DATE.substring(6,8));
						diffOfRetireDate = (selectedDayDate.getTime() - RetireDate.getTime()) / 1000 / 60 / 60 / 24; //퇴사일과 선택한 주차의 차이
					}
					 
					//주 총 40시간 (N 포함), 일 총 8시간이 넘지 못할 때 Incomplete 처리 -> 경영자문위원은 제외
					var totalWorkingHoursForStatus = Number($('#totalMoHours_a').text()) + Number($('#totalTuHours_a').text()) 
													+ Number($('#totalWeHours_a').text()) + Number($('#totalThHours_a').text()) 
													+ Number($('#totalFrHours_a').text());
					if($.inArray(ACTIVE_EY_RANK, ['04', '05']) <= -1 && (diffOfHireDate > 6 && diffOfRetireDate < 0) ) {
						if(engagementStatusArr.length <= 0 || totalWorkingHoursForStatus < 40 || Number($('#totalMoHours_a').text()) < 8 || 
								Number($('#totalTuHours_a').text()) < 8 || Number($('#totalWeHours_a').text()) < 8 || Number($('#totalThHours_a').text()) < 8 || Number($('#totalFrHours_a').text()) < 8 ) {
							timeSheetStatus = 'Incomplete';
						}
					}
					
					//set timeSheetStatus
					$("#timeSheetStatus").html(timeSheetStatus);
					if(timeSheetStatus == 'Incomplete') {
						// 상태가 Imcomplete인 경우 노랑 -> 빨강으로 변경
						$("#timeSheetStatus").css("background-color", "#ba0000b8"); // 빨강
						$("#timeSheetStatus").css("color", "#fff"); // 흰색
					} else {
						$("#timeSheetStatus").css("background-color", "#ffe600"); // 노랑
						$("#timeSheetStatus").css("color", "#1b1b1b"); // 검은색
					}
					$("#withdrawBtn").css("display", "none");
					
					
					//조회 데이터가 없을 때 UI 처리
					if(data.result.length == 0){
						innerLeftHtml += '<tr class="noData">';
						innerLeftHtml += '<td colspan="6" style="text-align:center;">조회된 Data가 없습니다.</td>';				
						innerLeftHtml += '</tr>';
						
						innerRightHtml += '<tr class="noData">';
						//Assurance팀만 재택여부 표시되도록
// 						if (SERVICE_LINE === "01") {
// 							innerRightHtml += '<td colspan="21"></td>';
// 						} else {
// 							innerRightHtml += '<td colspan="20"></td>';	
// 						}				
						innerRightHtml += '<td colspan="21"></td></tr>';
						
						$('#timeReportList_L').html(innerLeftHtml);
						$('#timeReportList_L').find('tr').each(function(id,el){
						    $(el).attr("style",'height:50px')
						});
						
						$('#timeReportList_R').html(innerRightHtml);
						
						$('#timeReportList_R').find('tr').each(function(id,el){
						    $(el).attr("style",'height:50px')
						});
						
						$('.check-all').prop("disabled", true);

						return;
					}
					
					/*
					$(data.result).each(function(key, val) {		
						if ((val.APPROVED === 'true' && val.STATUS === "rejected") || (val.APPROVED === 'true' && val.STATUS === "requested")) {
							setLoc1(key, val.DEMAND_LOC1, true);
							retrieveLoc2(key, val.DEMAND_LOC2, true);
							setLoc1(key, val.LOC1);
							retrieveLoc2(key, val.LOC2);
						}else {
							setLoc1(key, val.LOC1);
							retrieveLoc2(key, val.LOC2);
						}
					});
					*/
				
				},
				error: function(xhr, status, err) {
	       		 if (xhr.status == 401) {
	           		 alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	            		 $(".b-close").click();
	            		 location.href = koreaPortal_context_path + "/logout.do"
	         		} else if (xhr.status == 403) {
	            		alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            		$(".b-close").click();
	            		location.href = koreaPortal_context_path + "/logout.do"
	         		} else {
	        			var message = getRootCause($(xhr.responseText));
	        			doubleSubmitFlag = false;
						alertify.alert("알림",message);
	        		}
	    		}
		  	});
        },
		error: function(xhr, status, err) {
      		 if (xhr.status == 401) {
          		 alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
           		 $(".b-close").click();
           		 location.href = koreaPortal_context_path + "/logout.do"
        		} else if (xhr.status == 403) {
           		alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
           		$(".b-close").click();
           		location.href = koreaPortal_context_path + "/logout.do"
        		} else {
       			var message = getRootCause($(xhr.responseText));
       			doubleSubmitFlag = false;
					alertify.alert("알림",message);
       		}
   		}
 	});

	// Mercury 변환 로직 적용
	$(document).off('click', "[id^='merc_eng_code']").on('click', "[id^='merc_eng_code']", function(event) {
		var $tr = $(this).closest('tr');
		var rowId = $tr.attr('id');

		// [2024.02][박유란] 확정된 감사코드 변경 차단 기능 추가 Start
		if ($tr.find('#appr_status').val() == "submitted" && $tr.find('#approved').val() == "true") {
			var fixedReportDt = null;		// 별도 감사보고서일 
			var crfixedReportDt = null;		// 연결 감사보고서일 		
			var fixedEngValue = null; 		// 별도 감사보고서일 확정여부
			var crfixedEngValue = null; 	// 연결 감사보고서일 확정여부
			var fixedWeekFriday = null;   	// 별도 감사보고서일 포함 주차의 금요일
			var crfixedWeekFriday = null; 	// 연결 감사보고서일 포함 주차의 금요일
			var merc_key_eng_code = $tr.find('#merc_eng_code' + $tr.attr("id").split("Row")[1]).text();
			var eng_name = $tr.find('#eng_name' + $tr.attr("id").split("Row")[1]).text();
			var eowDate = $('#selectedWeekEnding').val();
			
		    // 선택한 engcode의 fixed eng 값을 찾음
	        fixedEngValue = $tr.find('#fixed_eng').val();
	        crfixedEngValue = $tr.find('#cr_fixed_eng').val();
	        if(fixedEngValue === "Y"){
	        	fixedReportDt = $tr.find('#fixed_report_date').val();
	        	fixedWeekFriday = getNextFriday(fixedReportDt);
	        }
	        if (crfixedEngValue == "Y") {
	        	crfixedReportDt = $tr.find('#cr_fixed_report_date').val();
	        	crfixedWeekFriday = getNextFriday(crfixedReportDt);	
	        }
						
			// 승인된 타임시트이고 확정이고 eowDate가 감사보고서일 포함 주차 금요일 이전인 경우 alert
			if (fixedEngValue == "Y" && fixedWeekFriday != null && eowDate <= fixedWeekFriday) {			
				alertify.alert("알림", "하기 Engagement는 이미 공시시간이 확정되어 수정이 불가합니다.<br><br>" 
						              + eng_name + " - " + merc_key_eng_code + "<br>더 궁금한 사항은 담당 RPM팀에 문의해주세요.");
				return false;
			}	
			if (crfixedEngValue == "Y" && crfixedWeekFriday != null && eowDate <= crfixedWeekFriday) {			
				alertify.alert("알림", "하기 Engagement는 이미 공시시간이 확정되어 수정이 불가합니다.<br><br>" 
						              + eng_name + " - " + merc_key_eng_code + "<br>더 궁금한 사항은 담당 RPM팀에 문의해주세요.");
				return false;
			}				
		}
		// [2024.02][박유란] 확정된 감사코드 변경 차단 기능 추가 End
		
		//교육코드의 경우 code trasfer 불가
		if($("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0) {			
			if($.inArray($tr.find('input[id=e_type]').val(), EDU_ENG_TYPE) > -1 && $tr.find('#eng_code' + $tr.attr("id").split("Row")[1]).text() !== '' && $tr.find('[id="appr_status"]').val() !== "unsubmitted") {
				alertify.alert("알림","교육 코드의 Time을 이미 제출한 경우 코드 변경이 불가능합니다.");
				return;
			}
		}
		
		//Close 코드 경우 code trasfer 불가
		if($("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0) {
			if($.inArray($tr.find('input[id=eng_status]').val().charAt(0), OPEN_ENG_STAT) <= -1 && $tr.find('input[id=appr_status]').val() === 'submitted') {
				alertify.alert("알림","승인 받은 Closed 코드는 코드 변경이 불가능 합니다. - RMA에게 문의하세요");
				return;
			}
		}
		
		// 재요청, 재요청 반려된 상태인 경우 (row가 여러 개인 경우) timeSheetRow의 engagement code 변경이 불가하도록 처리
		// retain engagement 중 draft 상태인 경우 engagement code 변경 불가능
		if(rowId.search("multipleRow") === 0 || (rowId.search("timeSheetRow") === 0 && $("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0)) {
			if($tr.find('[id="appr_status"]').val() !== "unsubmitted" || $tr.find('[id="retain_connection"]').val() !== "1") {
				var EngId = $(this).attr('id');
				var activity = $tr.find('input[name=activity]').val();
				var subActivity = $tr.find('input[name=subActivity]').val(); //sub activity code 값 //[24.03][정혜원]
				
				// Mercury 변환 로직 적용
				$(".modal-body #targetRowId").val(EngId.replace("merc_", ""));
				$('#searchEngWord').val('');
				$('#searchEngList').html('');
				$('#searchEng').modal();
			}
		}
	});
	
	// 행 추가 
	$('#addTr').unbind().click(function() {
		//조회 결과 없음 문구가 떠있다면 지우고 add
		if($('#timeReportList_L').find('[class="noData"]').length > 0) {
			$('#timeReportList_L').html("");
			$('#timeReportList_R').html("");
			
			$(".check-all").prop("checked",false);
			$(".check-all").prop("disabled",false);
		}
		
		//row 추가
		$('#timeReportList_L').append(makeLeftEngagementRow());
		$('#timeReportList_R').append(makeRightEngagementRow());
		
		///////////////////////

		$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
			if($(this).closest('tr').find('#appr_status').val() != "unsubmitted") {
				//$(".eng_checkbox" + (engRowIndex-1)).prop("disabled",true);	
				return false;
			}	
		});
		
		//loc1 setting
		//setLoc1($("#timeReportList_R").find("tr:last").attr('id').split('Row')[1]);
	});
	
	$(document).off('click', "[id^='eng_pn']").on('click', "[id^='eng_pn']", function(event) {
		var $tr = $(this).closest('tr');
		
		var rowId = $tr.attr('id');
		
		//교육 코드 및 non-chargeable 코드는 ep 설정이 불가능 -> 교육코드는 ep설정 가능 하도록 임시 수정함(EP가 Global 직원인 경우,PASSISTANTlIST 테이블에서 찾을 수 없으므로 이슈 발생)
		if($("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0) {
			/* if($tr.find('input[id="e_type"]').val() === 'EDU') {
				alert("교육 코드는 EP를 설정할 수 없습니다.");
				return;
			} */
			
			if($tr.find("#eng_type").text() === 'N') {
				alertify.alert("알림","Non-chargeable 코드는 EP를 설정할 수 없습니다.");
				return;
			}
		}
		
		// 재요청, 재요청 반려된 상태인 경우 (row가 여러 개인 경우) timeSheetRow의 ep 변경이 불가하도록 처리
		if(rowId.search("multipleRow") === 0 || (rowId.search("timeSheetRow") === 0 && $("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0)) {
			var EngId = $(this).attr('id').split("eng_pn")[1];
			var activity = $tr.find('input[name=activity]').val();
			var subActivity = $tr.find('input[name=subActivity]').val(); //sub activity code 값 //[24.03][정혜원]
					
			$(".modal-body #targetRowId_ep").val(EngId);
			$('#searchApprWord').val('');
			$('#apprList').html('');	
			$('#searchApprModal').modal();
		}
	});
	
	// Mercury Location : 모달
	$(document).off('click', "[id^='loc1']").on('click', "[id^='loc1']", function(event) {
		var $tr = $(this).closest('tr');
		var rowId = $tr.attr('id');
		
		// 재요청, 재요청 반려된 상태인 경우 (row가 여러 개인 경우) timeSheetRow의 engagement code 변경이 불가하도록 처리
		if(rowId.search("multipleRow") === 0 || (rowId.search("timeSheetRow") === 0 && $("#multipleRow" + rowId.substr(rowId.length-1, 1)).length <= 0)) {
			var locId = $(this).attr('id');
			
			$(".modal-body #targetRowId_loc").val(locId);
			$('#searchLocWord').val('');
			$('#searchLocList').html('');
			$('#searchLoc').modal();
		}
	});
	
	//버튼 disabled 초기화
	$(".reqTimesheetEnable").prop("disabled",true);	
}

function makeLeftEngagementRow(val) {
	var withDBData = (typeof val !== 'undefined' && val !== null ? true : false);
	var multipleRowFlag = false;
	var innerHtml = '';
	var rowIndex = engRowIndex;
	var headerRow = 1;
	var bodyRow = 1;
	var tooltipTitle = "" ; // Close 코드 정보 토글
	var checkboxDisabled = ""; // Close 코드의 타임시트경우 requested, submitted 상태일 때는 요청 못 하도록 체크박스 비활성화 시키기 
	
	if(withDBData) {
		if(val.STATUS === "requested" && val.APPROVED === 'true') {
			headerRow = 2;
			bodyRow = 1;
		}else if(val.STATUS === "rejected") {
			if (val.APPROVED === 'true') {
				headerRow = 3;
				bodyRow = 2;
			} else {
				headerRow = 2;
				bodyRow = 1;
			}	
		}
		if($.inArray(val.E_STAT, OPEN_ENG_STAT) <= -1 && val.STATUS == 'submitted'){
			tooltipTitle ='title = " 이미 승인 받은 타임시트의 Engagement가 inactive 상태(Closing, Closed, 타임블락 등)일 경우 수정이 불가합니다. "  data-toggle ="tooltip"'
			if( val.STATUS === "submitted" ){
				checkboxDisabled = "disabled";
			}
			
		}
	}
	
	var appr_status = '';
	var appr_status_style = '';
	if (withDBData) {
		//사용자 화면에 보여줄 appr_status 정의 - 보여줄 때만 사용하므로 이 곳에서 처리
		if(val.STATUS === 'unsubmitted') {
			appr_status = 'Draft';
			appr_status_style = 'stu-blk';
		}else if(val.STATUS === 'submitted') {
			appr_status = 'Approved';
			appr_status_style = 'stu-gry';
		}else if(val.STATUS === 'requested') {
			appr_status = val.STATUS;
			appr_status_style = 'stu-gry';
		}else if(val.STATUS === 'rejected') {	
			appr_status = val.STATUS;
			appr_status_style = 'stu-blk';
		}
		appr_status = appr_status.charAt(0).toUpperCase() + appr_status.slice(1);
	}
	
	//Make reRequest/rejected engagement row
	if ((withDBData && val.STATUS === "rejected") || (withDBData && val.STATUS === "requested")) {
		if (val.APPROVED === 'true') {
			
			innerHtml += '<tr id="multipleRow' + rowIndex + '" class="multipleRow row-highlight"> style="height:50px;" ';
			//check box & status column (rowspan)
			innerHtml += '<td rowSpan="' + headerRow + '"><input '+checkboxDisabled+' type="checkbox" class="eng_checkbox' + rowIndex + '" onclick="checkEngagementStatus(' + rowIndex + ')"></td>';
			innerHtml += '<td><span class="' + appr_status_style + '">' + appr_status + '</span></td>';

			//request no & status & approved & ep gpn
			innerHtml += '<input title = "'+val.DEMAND_EP_GPN+'" type="hidden" id="ep_gpn_D" size="1" value="' + val.DEMAND_EP_GPN + '"/>';  // ep gpn

			//engagement type & engagement code & ep name & engagement description & description
			innerHtml += '<td id="eng_type_D" title = "'+val.DEMAND_ENG_TYPE+'">' + val.DEMAND_ENG_TYPE + '</td>';	//engagement type
			innerHtml += '<input type="hidden" id="fixed_eng_D' + rowIndex + '" value="' + val.FIXED_ENG + '"/>'; // 감사보고서 확정된 eng 판별
			innerHtml += '<input type="hidden" id="ret_eng_code_D' + rowIndex + '" value="' + val.RETAIN_ENG_CODE + '"/>';
			
			// Mercury 변환 로직 적용
			innerHtml += '<td title = "'+val.DEMAND_ENG_CODE+'" id="eng_code_D' + rowIndex + '" style="display:none;"><i class="fa fa-search"></i>' + val.DEMAND_ENG_CODE + '</td>';
			innerHtml += '<td title = "'+val.MERC_DEMAND_ENG_CODE+'" id="merc_eng_code_D' + rowIndex + '" style="cursor:pointer"><i class="fa fa-search"></i>' + val.MERC_DEMAND_ENG_CODE + '</td>';
			
			innerHtml += '<td title = "'+val.DEMAND_EP_NAME+'" id="eng_pn_D' + rowIndex + '" style="cursor:pointer"><i class="fa fa-search"></i>' + (typeof val.DEMAND_EP_NAME !== 'undefined' && val.DEMAND_EP_NAME !== null ? val.DEMAND_EP_NAME : '-') + '</td>';
			innerHtml += '<td title = "'+val.DEMAND_ENG_DESC+'" id="eng_name_D' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;" title="' + val.DEMAND_ENG_DESC + '"><nobr>' + val.DEMAND_ENG_DESC + '</nobr></td>';

			// [22.12] Non-ch, edu 코드에 대해서는 4주 이내 수정 리뷰 대상에서 제외
			innerHtml += '<input type="hidden" id="e_type" value="' + val.DEMAND_E_TYPE + '"/>'; // multipleRow에 대한 e_type 정보 추가
			
			// [2024.02][박유란] 연결 감사보고서일 확정여부 추가 
			innerHtml += '<input type="hidden" id="cr_fixed_eng_D' + rowIndex + '" value="' + val.CR_FIXED_ENG + '"/>'; // 연결 감사보고서 확정된 eng 판별
			innerHtml += '</tr>';
			
			multipleRowFlag = true;
		}
	}
	
	//Make main engagement Row
	if (withDBData) {
		innerHtml += '<tr '+tooltipTitle+' id="timeSheetRow' + rowIndex +'" ' + (headerRow >= 2 ? 'class="row-highlight"style="height:50px;"' : '') + ' style="' + ((val.E_STAT == 'C' || val.E_STAT == 'L') ? "background-color: #E6E6E6;height:50px;" : "") + '">';
	}else{
		innerHtml += '<tr style="height:50px;" '+tooltipTitle+' id="timeSheetRow' + rowIndex +'" ' + (headerRow >= 2 ? 'class="row-highlight" ' : '') +'>';
	}
	
	/* if(val.E_STAT == "Close") {
		innerHtmlTimeSheet += '<tr id="timeSheetRow' + key +'" style="background-color: gray;">';
		innerHtmlTimeSheet += '<td><input type="checkbox" class="timesheet_checkbox'+key+'" disabled value="'+val.REQUEST_NO+'"></td>';
	}else{
		innerHtmlTimeSheet += '<tr id="timeSheetRow' + key +'">';
		innerHtmlTimeSheet += '<td><input type="checkbox" class="timesheet_checkbox'+key+'" value="'+val.REQUEST_NO+'"></td>';
	} */
	
	
	if(!multipleRowFlag) {
		innerHtml += '<td ' + (headerRow === 2 ? 'rowSpan="' + headerRow + '"' : '') + '><input '+checkboxDisabled+' type="checkbox" class="eng_checkbox' + rowIndex + '" onclick="checkEngagementStatus(' + rowIndex + ')"></td>';
		if (withDBData) {
			innerHtml += '<td ' + (headerRow === 2 ? 'rowSpan="' + headerRow + '"' : '') + '><span class="' + appr_status_style + '">' + ($.inArray(val.E_TYPE, EDU_ENG_TYPE) > -1 && val.APPROVED === 'true' ? '사후검토' : appr_status) + '</span></td>';
		} else {
			innerHtml += '<td><span class="stu-blk">' + 'Draft' + '</span></td>';
		}
	}else{
		innerHtml += '<td class="upArrowIcon"><img src="../resources/img/common/ic-upArrow.png"/></td>';	//Row가 2개 이상인 경우 (최초 요청 반려건 제외) 화살표로 최신 데이터의 위치 표기
	}
	
	if (withDBData) {
		innerHtml += '<input type="hidden" id="ep_gpn" value="' + (val.EP_GPN != null && typeof val.EP_GPN != "undefined" && val.EP_GPN != "" ? val.EP_GPN : "-") + '"/>';  // ep gpn
		innerHtml += '<input type="hidden" id="request_no" value="' + (val.REQUEST_NO === null ? "" : val.REQUEST_NO) + '">';  // request no
		innerHtml += '<input type="hidden" id="appr_status" value="' + val.STATUS + '">';  // appr_status
		innerHtml += '<input type="hidden" id="approved" value="' + val.APPROVED + '">';  // approved
		innerHtml += '<input type="hidden" id="e_type" value="' + val.E_TYPE + '">';  // E_TYPE (교육코드 판별용)
		innerHtml += '<td id="eng_type">' + (typeof val.ENG_TYPE !== "undefined" ? val.ENG_TYPE : val.RET_ENG_TYPE) + '</td>';	//engagement type
		innerHtml += '<input type="hidden" id="fixed_eng" value="' + val.FIXED_ENG + '"/>'; // 감사보고서 확정된 eng 판별		
		innerHtml += '<input type="hidden" id="ret_eng_code' + rowIndex + '" value="' + val.RETAIN_ENG_CODE + '"/>';
		
		// Mercury 변환 로직 적용
		innerHtml += '<td id="eng_code' + rowIndex + '" style="display:none;">' + (multipleRowFlag || (val.RETAIN_CONNECTION === 1 && appr_status === 'Draft') ? '' : '<i class="fa fa-search"></i>') + val.ACTUAL_ENG_CODE + '</td>';
		innerHtml += '<td id="merc_eng_code' + rowIndex + '" style="cursor:pointer;">' + (multipleRowFlag || (val.RETAIN_CONNECTION === 1 && appr_status === 'Draft') ? '' : '<i class="fa fa-search"></i>') + val.MERC_ACTUAL_ENG_CODE + '</td>';
		
		innerHtml += '<td id="eng_pn' + rowIndex + '" style="cursor:pointer">' + (multipleRowFlag ? '' : '<i class="fa fa-search"></i>') + (typeof val.EP_NAME !== 'undefined' && val.EP_NAME !== "" && val.EP_NAME != null ? val.EP_NAME : '-') + '</td>';
		innerHtml += '<td id="eng_name' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;" title="' + (typeof val.ENG_DESC === "undefined" ? val.RETAIN_ENG_DESC : val.ENG_DESC) + '"><nobr>' + (typeof val.ENG_DESC === "undefined" ? val.RETAIN_ENG_DESC : val.ENG_DESC) + '</nobr></td>';
		innerHtml += '<input id="retain_connection" type="hidden" value="' + val.RETAIN_CONNECTION + '"/>';  // retain connection
		innerHtml += '<input id="eng_status" type="hidden" value="' + val.E_STAT + '"/>';  // engagement status 
	
		// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 Start
		// - - 별도 감사보고서일, 연결 확정여부와 감사보고서일을 설정함 		 		
		innerHtml += '<input type="hidden" id="fixed_report_date" value="' + val.FIXED_REPORT_DATE + '"/>'; 		// 별도재무제표 감사보고서일
		innerHtml += '<input type="hidden" id="cr_fixed_eng" value="' + val.CR_FIXED_ENG + '"/>'; 					// 연결재무제표 감사보고서 확정여부
		innerHtml += '<input type="hidden" id="cr_fixed_report_date" value="' + val.CR_FIXED_REPORT_DATE + '"/>'; 	// 연결재무제표 감사보고서일
		// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 End
	} else {
		innerHtml += '<input type="hidden" id="ep_gpn" value=""/>';  // ep gpn
		innerHtml += '<input type="hidden" id="request_no" value=""/>';  // request no
		innerHtml += '<input type="hidden" id="appr_status" value="unsubmitted"/>';  // appr_status
		innerHtml += '<input type="hidden" id="approved" value="false"/>';  // approved
		innerHtml += '<input type="hidden" id="e_type" value="">';  // E_TYPE (교육코드 판별용)
		innerHtml += '<td id="eng_type"></td>';	//engagement type
		innerHtml += '<input type="hidden" id="fixed_eng" value=""/>'; // 감사보고서 확정된 eng 판별		
		innerHtml += '<input type="hidden" id="ret_eng_code' + rowIndex + '" value=""/>'; //retain engagement code
		
		// Mercury 변환 로직 적용
		innerHtml += '<td id="eng_code' + rowIndex + '" style="display:none;"><i class="fa fa-search"></i></td>'; //Eng 선택
		innerHtml += '<td id="merc_eng_code' + rowIndex + '" style="cursor:pointer"><i class="fa fa-search"></i></td>'; //Eng 선택
		
		innerHtml += '<td id="eng_pn' + rowIndex + '" style="cursor:pointer"><i class="fa fa-search"></i></td>';
		innerHtml += '<td id="eng_name' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;"></td>';
		innerHtml += '<input id="retain_connection" type="hidden" value="0"/>';  // retain connection
		innerHtml += '<input id="eng_status" type="hidden" value=""/>';  // engagement status 
		
		// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 Start
		// - 별도 감사보고서일, 연결 확정여부와 감사보고서일을 설정함 		
		innerHtml += '<input type="hidden" id="fixed_report_date" value=""/>'; 		// 별도재무제표 감사보고서일
		innerHtml += '<input type="hidden" id="cr_fixed_eng" value=""/>'; 		 	// 연결재무제표 감사보고서 확정여부
		innerHtml += '<input type="hidden" id="cr_fixed_report_date" value=""/>';	// 연결재무제표 감사보고서일
		// [2024.02][박유란] 연결재무제표 공시시간 추가 기능 관련 수정 End
	}

	innerHtml += '</tr>';
	
	//반려 사유 row
	if (withDBData && val.STATUS === "rejected") {
		if(headerRow === 2) {
			innerHtml += '<tr class="row-highlight rejectedRow" style="height:50px;"><td colspan="4" class="text-left" style="height:50px;overflow:hidden; text-overflow:ellipsis;"><nobr><i class="fa fa-exclamation-circle fa-lg txt-yellow"></i><label>&nbsp반려사유 :</label>';
		}else{
			innerHtml += '<tr class="row-highlight rejectedRow" style="height:50px;"><td colspan="5" class="text-left" style="height:50px;overflow:hidden; text-overflow:ellipsis;"><nobr><i class="fa fa-exclamation-circle fa-lg txt-yellow"></i><label>&nbsp반려사유 :</label>';
		}
		innerHtml += '<span id="rejectedDesc" title="' + val.APPR_DESCRIPTION + '">&nbsp;' + val.APPR_DESCRIPTION + '</span></nobr></td>';
		innerHtml += '</tr>';	
	}
	
	return innerHtml;	
}

function makeRightEngagementRow(val) {
	
	// 코드 Close된 경우 disabled 처리와 title 처리 
	var disabled ="";
	var tooltipTitle = "";	
	
	var withDBData = (typeof val !== 'undefined' && val !== null ? true : false);
	var multipleRowFlag = false;
	var innerHtml = '';
	var rowIndex = engRowIndex++;
	
	var headerRow = 1;
	var bodyRow = 1;
	
	if(withDBData) {
		if(val.STATUS === "requested" && val.APPROVED === 'true') {
			headerRow = 2;
			bodyRow = 1;
		}else if(val.STATUS === "rejected") {
			if (val.APPROVED === 'true') {
				headerRow = 3;
				bodyRow = 2;
			} else {
				headerRow = 2;
				bodyRow = 1;
			}	
		}
		
		if($.inArray(val.E_STAT, OPEN_ENG_STAT) <= -1 && val.STATUS == 'submitted'){
			disabled = "disabled";
			tooltipTitle ='title = " 이미 승인 받은 타임시트의 Engagement가 inactive 상태(Closing, Closed, 타임블락 등)일 경우 수정이 불가합니다. "  data-toggle ="tooltip"'
		}
	}
	
	//plan 값 set
	var Sa_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Sa_R).toFixed(2) : '-';
	var Su_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Su_R).toFixed(2) : '-';
	var Mo_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Mo_R).toFixed(2) : '-';
	var Tu_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Tu_R).toFixed(2) : '-';
	var We_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.We_R).toFixed(2) : '-';
	var Th_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Th_R).toFixed(2) : '-';
	var Fr_R = withDBData && val.RETAIN_CONNECTION === 1 ? (val.Fr_R).toFixed(2) : '-';
	
	//actual 값 set (retain DB에 존재하지만 아직 저장 및 신청에 들어가지 않은 engagement는 plan 값으로 set & 그 외는 actual 값을 set)
	if(withDBData) {
		var Sa_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Sa_R).toFixed(2) : (val.Sa_A).toFixed(2);
		var Su_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Su_R).toFixed(2) : (val.Su_A).toFixed(2);
		var Mo_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Mo_R).toFixed(2) : (val.Mo_A).toFixed(2);
		var Tu_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Tu_R).toFixed(2) : (val.Tu_A).toFixed(2);
		var We_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.We_R).toFixed(2) : (val.We_A).toFixed(2);
		var Th_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Th_R).toFixed(2) : (val.Th_A).toFixed(2);
		var Fr_A = (val.REQUEST_NO === null && val.RETAIN_CONNECTION === 1) ? (val.Fr_R).toFixed(2) : (val.Fr_A).toFixed(2);
	}else {
		var Sa_A = '0';
		var Su_A = '0';
		var Mo_A = '0';
		var Tu_A = '0';
		var We_A = '0';
		var Th_A = '0';
		var Fr_A = '0';
	}
	
	var tot_r = 0;
	var tot_a = 0;
	var appr_status = '';
	
	if (withDBData) {
		if(val.RETAIN_CONNECTION === 1) {
			tot_r = Number(Sa_R)+Number(Su_R)+Number(Mo_R)+Number(Tu_R)+Number(We_R)+Number(Th_R)+Number(Fr_R);
		}
		tot_a = Number(Sa_A)+Number(Su_A)+Number(Mo_A)+Number(Tu_A)+Number(We_A)+Number(Th_A)+Number(Fr_A);
	}
	
	//Make reRequest/rejected engagement row
	if ((withDBData && val.STATUS === "rejected") || (withDBData && val.STATUS === "requested")) {
		if (val.APPROVED === 'true') {
			innerHtml += '<tr id="multipleRow' + rowIndex + '" class="multipleRow row-highlight" style="height:50px;">';
			
			innerHtml += '<td>';
			innerHtml += '<input type="text" id="description_D" class="form-control" value="' + val.DEMAND_DESCRIPTION + '"/>'; //desc
			innerHtml += '<input type="hidden" id="independenceChk" value="' + val.DEMAND_SIGSIGNATURECHECK + '"/>'; // 35번 코드 독립성 확인 여부 체크
			innerHtml += '<input type="hidden" id="globSvcCd" value="' + val.DEMAND_GLOB_SVC_CD + '"/>'; // 코드 번호 (35번 코드여부)
			innerHtml += '<input type="hidden" id="e_type" value="' + val.E_TYPE + '"/>'; // 
			innerHtml += '</td>';
			
			//activity code
			//GLOB_SVC_CD = 35일 때, select box(8개) & leave code일 때 select box(4개) & 나머지 text box
			innerHtml += makeActivitySelectBox(rowIndex, 'activity_code_D', val.DEMAND_ENG_CODE, val.DEMAND_GLOB_SVC_CD, val.DEMAND_ACTIVITY_CODE);
			
			//[24.03][정혜원] sub activity code 생성
			//timeSheetRow 인 경우
			var activityCodeValue = $('#activity_code_D').value;
			innerHtml += makeSubActivitySelectBox('sub_activity_code_D', val.DEMAND_ENG_CODE, val.DEMAND_GLOB_SVC_CD, val.DEMAND_ACTIVITY_CODE, val.DEMAND_SUB_ACTIVITY_CODE);
			
			/*
			if($.inArray(val.DEMAND_GLOB_SVC_CD, AUDIT_GLOB_SVC_CD) > -1) {
				if(val.DEMAND_ENG_CODE === '21563848'){
					innerHtml += '<td><select id="activity_code_D" class="form-control">';
					innerHtml += makeDropBoxForEYJapan(val.DEMAND_ACTIVITY_CODE);
					innerHtml += '</select></td>';					
				}else{
					innerHtml += '<td><select id="activity_code_D" class="form-control">';
					innerHtml += makeDropBoxForGSC35(val.DEMAND_ACTIVITY_CODE);
					innerHtml += '</select></td>';
				}
			}else if(val.DEMAND_ENG_CODE === '10000001') {
				innerHtml += '<td><select id="activity_code_D" class="form-control">';
				innerHtml += makeDropBoxForleave(val.DEMAND_ACTIVITY_CODE);
				innerHtml += '</select></td>';
			}else if(val.DEMAND_ENG_CODE === '17811828') {
				innerHtml += '<td><select id="activity_code_D" class="form-control">';
				innerHtml += makeDropBoxForSpecificEng(val.DEMAND_ACTIVITY_CODE);
				innerHtml += '</select></td>';
			}else {
				innerHtml += '<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code_D" class="form-control" value="' + val.DEMAND_ACTIVITY_CODE + '"/>' + '</td>';  // activity code
			}
			*/
			
			//Assurance팀만 재택여부 표시되도록
// 			if (SERVICE_LINE === "01") {
// 				if(val.ENG_TYPE === 'N') {
// 					innerHtml += '<td><input class="check-wfh" type="checkbox" id="wfh_yn" disabled></td>';
// 				} else {
// 					// 재택 여부 : 승인 되었을 경우 
// 		 			if (val.DEMAND_WFH_YN === 'Y') {
// 		 				innerHtml += '<td><input class="check-wfh" type="checkbox" id="wfh_yn" checked="true" ></td>';
// 		 			} else {
// 		 				innerHtml += '<td><input class="check-wfh" type="checkbox" id="wfh_yn" ></td>';
// 		 			}
// 				}
// 			}
			
			//working time per day
			innerHtml += '<td class="Weekend"><span id="Sa_R">'+Sa_R+'</span></td>';
			innerHtml += '<td class="Weekend">'+'<input type="text" '+tooltipTitle+' id="Sa_D" class="form-control" value="'+val.Sa_D.toFixed(2)+'" ' + disabled + ' />'+'</td>'; 
			innerHtml += '<td class="Weekend"><span id="Su_R">'+Su_R+'</span></td>';
			innerHtml += '<td class="Weekend">'+'<input type="text" '+tooltipTitle+' id="Su_D" class="form-control" value="'+val.Su_D.toFixed(2)+'" ' + disabled + '/>'+'</td>';
			innerHtml += '<td><span id="Mo_R">'+Mo_R+'</span></td>';
			innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Mo_D" class="form-control" value="'+val.Mo_D.toFixed(2)+'" ' + disabled + '/>'+'</td>';
			innerHtml += '<td><span id="Tu_R">'+Tu_R+'</span></td>';
			innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Tu_D" class="form-control" value="'+val.Tu_D.toFixed(2)+'" ' + disabled + '/>'+'</td>';
			innerHtml += '<td><span id="We_R">'+We_R+'</span></td>';
			innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="We_D" class="form-control" value="'+val.We_D.toFixed(2)+'" ' + disabled + '/>'+'</td>';
			innerHtml += '<td><span id="Th_R">'+Th_R+'</span></td>';
			innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Th_D" class="form-control" value="'+val.Th_D.toFixed(2)+'" ' + disabled + '/>'+'</td>';
			innerHtml += '<td><span id="Fr_R">'+Fr_R+'</span></td>';
			innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Fr_D" class="form-control" value="'+val.Fr_D.toFixed(2)+'" ' + disabled + '/>'+'</td>'; 
			
			innerHtml += '<td id="weekPlanHours">'+(isNaN(tot_r) ? '-' : tot_r.toFixed(2)) +'</td>'; 
			innerHtml += '<td id="weekActualHours">'+tot_a.toFixed(2)+'</td>';

			// Mercury Location : 조회
			innerHtml += '<td id="loc1_D_CD' + rowIndex + '" style="cursor:pointer;"><i class="fa fa-search"></i>' + val.DEMAND_LOC1 + '</td>';
			innerHtml += '<td id="loc2_D_NM' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;" title="' + val.DEMAND_LOC2_NM + '"><nobr>' + val.DEMAND_LOC2_NM + '</nobr></td>';
			innerHtml += '<td id="loc2_D_CD' + rowIndex + '" style="display:none;" title=' + val.DEMAND_LOC2 + '"><nobr>' + val.DEMAND_LOC2 + '</nobr></td>';
			/*
			innerHtml += '<td><select class="form-control" id="loc1_D" onchange="retrieveLoc2(' + rowIndex + ', \'' + val.DEMAND_LOC2  + '\' ,' + 'true)"></select></td>';
			innerHtml += '<td><select class="form-control" id="loc2_D"><option value="Other">Other</option></select></td>';
			*/
			
			innerHtml += '</tr>';
			
			multipleRowFlag = true;
		}
	}


	//Make main engagement Row
	if(withDBData) {
		innerHtml += '<tr style="height:50px;" '+tooltipTitle+' id="timeSheetRow' + rowIndex +'" ' + (headerRow >= 2 ? 'class="row-highlight"  ' : '') + ' style="' + ((val.E_STAT == 'C' || val.E_STAT == 'L') ? "background-color: #E6E6E6;height:50px;" : "") + '">';
		var eng_desc = val.DESCRIPTION;
		if(val.RETAIN_CONNECTION === 1 && val.STATUS === 'unsubmitted') {
			
			if(typeof val.DESCRIPTION === "undefined") {	
				/*if(typeof val.ENG_DESC === "undefined") {
					eng_desc = val.RETAIN_ENG_DESC;
				}else {
					eng_desc = val.ENG_DESC;
				}*/
				
				// Mercury Desc
				eng_desc = '';
			}
			
			innerHtml += '<td>';
			innerHtml += '<input type="text" id="description" class="form-control" value="' + eng_desc + '" ' + disabled + ' />'; //desc
			innerHtml += '<input type="hidden" id="independenceChk" value="' + val.SIGSIGNATURECHECK + '"/>'; // 35번 코드 독립성 확인 여부 체크
			innerHtml += '<input type="hidden" id="globSvcCd" value="' + val.GLOB_SVC_CD + '"/>'; // 코드 번호 (35번 코드여부)
			innerHtml += '</td>';
			
		}else {
			innerHtml += '<td>';
			innerHtml += '<input type="text" id="description" class="form-control" value="' + eng_desc + '" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' ' + disabled + ' />'; //desc
			innerHtml += '<input type="hidden" id="independenceChk" value="' + val.SIGSIGNATURECHECK + '"/>'; // 35번 코드 독립성 확인 여부 체크
			innerHtml += '<input type="hidden" id="globSvcCd" value="' + val.GLOB_SVC_CD + '"/>'; // 코드 번호 (35번 코드여부)
			innerHtml += '</td>';
		
		}

		//activity code
		//GLOB_SVC_CD = 35일 때, select box(8개) & leave code일 때 select box(4개) & 나머지 text box
		if(val.RETAIN_CONNECTION === 1 && val.STATUS === 'unsubmitted') {
			innerHtml += makeActivitySelectBox(rowIndex, 'activity_code', val.ACTUAL_ENG_CODE, val.GLOB_SVC_CD, val.ACTIVITY_CODE);
			
			//[24.03][정혜원] sub activity code 생성
			//timeSheetRow 인 경우
			var activityCodeValue = $('#activity_code').value;
			innerHtml += makeSubActivitySelectBox('sub_activity_code', val.ACTUAL_ENG_CODE, val.GLOB_SVC_CD, val.ACTIVITY_CODE, val.SUB_ACTIVITY_CODE);
			
		} else {
			innerHtml += makeActivitySelectBox(rowIndex, 'activity_code', val.ACTUAL_ENG_CODE, val.GLOB_SVC_CD, val.ACTIVITY_CODE, (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : ''));
		
			//[24.03][정혜원] sub activity code 생성
			//timeSheetRow 인 경우
			var activityCodeValue = $('#activity_code').value;
			innerHtml += makeSubActivitySelectBox('sub_activity_code', val.ACTUAL_ENG_CODE, val.GLOB_SVC_CD, val.ACTIVITY_CODE, val.SUB_ACTIVITY_CODE, (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : ''));
			
		}		
		/*
		if($.inArray(val.GLOB_SVC_CD, AUDIT_GLOB_SVC_CD) > -1) {
			if(val.ACTUAL_ENG_CODE === '21563848'){
				innerHtml += '<td><select id="activity_code" class="form-control" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' >';
				innerHtml += makeDropBoxForEYJapan(val.ACTIVITY_CODE);
				innerHtml += '</select></td>';				
			}else{
				innerHtml += '<td><select id="activity_code" class="form-control" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' >';
				innerHtml += makeDropBoxForGSC35(val.ACTIVITY_CODE);
				innerHtml += '</select></td>';
			}
		}else if(val.ACTUAL_ENG_CODE === '10000001') {
			innerHtml += '<td><select id="activity_code" class="form-control" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' >';
			innerHtml += makeDropBoxForleave(val.ACTIVITY_CODE);
			innerHtml += '</select></td>';
		}else if(val.ACTUAL_ENG_CODE === '17811828') {
			innerHtml += '<td><select id="activity_code" class="form-control">';
			innerHtml += makeDropBoxForSpecificEng(val.ACTIVITY_CODE);
			innerHtml += '</select></td>';
		}else {
			if(val.RETAIN_CONNECTION === 1 && val.STATUS === 'unsubmitted') {
				innerHtml += '<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code" class="form-control" value="' 
								+ (typeof val.ACTIVITY_CODE === 'undefined' ? '0000' : val.ACTIVITY_CODE) + '" />' + '</td>';  // activity code
			}else {
				innerHtml += '<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code" class="form-control" value="' 
								+ val.ACTIVITY_CODE + '" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' />' + '</td>';  // activity code
			}
		}
		*/
		
		//Assurance팀만 재택여부 표시되도록
// 		if (SERVICE_LINE === "01") {
// 			if(val.ENG_TYPE ==="N" || val.RET_ENG_TYPE ==="N") {
// 				innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" disabled/></td>';
// 			} else {
// 				//Reject 이외 : 재택여부 표시
// 				if(val.RETAIN_CONNECTION === 1 && val.STATUS === 'unsubmitted') {
					
// 						if (val.WFH_YN ==='Y') {
// 							innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" checked="true"/></td>';
// 						} else {
// 							innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" /></td>';
// 						}
					
// 				}else {
// 					if (val.WFH_YN ==='Y') {
// 						innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" checked="true" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' />' + '</td>';
// 					} else {
// 						innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '') + ' />' + '</td>';
// 					}
// 				}			
// 			}
// 		}
		
	}else {
		innerHtml += '<tr style="height:50px;" id="timeSheetRow' + rowIndex +'" ' + (headerRow >= 2 ? 'class="row-highlight"' : '') + '>';
		
		innerHtml += '<td>';
		innerHtml += '<input type="text" '+tooltipTitle+' id="description" class="form-control" value="" ' + disabled + '/>'; //desc
		innerHtml += '<input type="hidden" id="independenceChk" value=""/>'; // 행 추가 : 35번 코드 독립성 확인 여부 체크
		innerHtml += '<input type="hidden" id="globSvcCd" value=""/>'; // 행 추가 : 코드 번호 (35번 코드여부)
		innerHtml += '</td>';
		
		innerHtml += '<td>' + '<input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="activity_code" class="form-control" value="0000" ' + disabled + '/>' + '</td>';  
		// activity code
		
		// sub activity code //[24.03][정혜원]
		innerHtml += '<td>' + '<span id="sub_activity_code">-</span></td>';  //activity code input에 따라 변경되는 경우 수정 필요
		
		//Assurance팀만 재택여부 표시되도록
// 		if (SERVICE_LINE === "01") {
// 			//행 추가 : 재택여부 표시
// 			innerHtml += '<td>'+'<input class="check-wfh" type="checkbox" id="wfh_yn" /></td>';	
// 		}
	}
			
	innerHtml += '<td class="Weekend"><span id="Sa_R">'+Sa_R+'</span></td>';
	innerHtml += '<td class="Weekend"><input type="text" '+tooltipTitle+' id="Sa_A" class="form-control" value="'+Sa_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>'; 
	
	innerHtml += '<td class="Weekend"><span id="Su_R">'+Su_R+'</span></td>';
	innerHtml += '<td class="Weekend">'+'<input type="text" '+tooltipTitle+' id="Su_A" class="form-control" value="'+Su_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';
	
	innerHtml += '<td><span id="Mo_R">'+Mo_R+'</span></td>';
	innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Mo_A" class="form-control" value="'+Mo_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';

	innerHtml += '<td><span id="Tu_R">'+Tu_R+'</span></td>';
	innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Tu_A" class="form-control" value="'+Tu_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';
	
	innerHtml += '<td><span id="We_R">'+We_R+'</span></td>';
	innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="We_A" class="form-control" value="'+We_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';
	
	innerHtml += '<td><span id="Th_R">'+Th_R+'</span></td>';
	innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Th_A" class="form-control" value="'+Th_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';
	
	innerHtml += '<td><span id="Fr_R">'+Fr_R+'</span></td>';
	innerHtml += '<td>'+'<input type="text" '+tooltipTitle+' id="Fr_A" class="form-control" value="'+Fr_A+'" ' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + '/>'+'</td>';
	
	innerHtml += '<td id="weekPlanHours">'+(isNaN(tot_r) ? '-' : tot_r.toFixed(2)) +'</td>';
	innerHtml += '<td id="weekActualHours">'+tot_a.toFixed(2)+'</td>';

	// Mercury Location
	if (withDBData) {
		innerHtml += '<td id="loc1_CD' + rowIndex + '" style="cursor:pointer;">' + (headerRow >= 2 && val.APPROVED === 'true' ? '' : '<i class="fa fa-search"></i>') + val.LOC1 + '</td>';
		innerHtml += '<td id="loc2_NM' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;" title="' + val.LOC2_NM + '"><nobr>' + val.LOC2_NM + '</nobr></td>';
		innerHtml += '<td id="loc2_CD' + rowIndex + '" style="display:none;" title="' + val.LOC2 + '"><nobr>' + val.LOC2 + '</nobr></td>';
	} else {
		innerHtml += '<td id="loc1_CD' + rowIndex + '" style="cursor:pointer;"><i class="fa fa-search"></i>KR</td>';
		innerHtml += '<td id="loc2_NM' + rowIndex + '" style="overflow:hidden; text-overflow:ellipsis;" title="KOREA, REPUBLIC OF"><nobr>KOREA, REPUBLIC OF</nobr></td>';
		innerHtml += '<td id="loc2_CD' + rowIndex + '" style="display:none;" title="KR"><nobr>KR</nobr></td>';
	}
	/*
	if (withDBData) {
		innerHtml += '<td><select class="form-control" id="loc1" onchange="retrieveLoc2(' + rowIndex + ', \'' + val.LOC2 + '\')"' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+' ' + disabled + ' ></select></td>';
	} else {
		innerHtml += '<td><select class="form-control" id="loc1" onchange="retrieveLoc2(' + rowIndex + ')"' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+'  ' + disabled + '></select></td>';
	}
	innerHtml += '<td><select class="form-control" id="loc2"' + (headerRow >= 2 && val.APPROVED === 'true' ? 'disabled' : '')+'  ' + disabled + '><option value="Other">Other</option></select></td>';
	*/

	if (withDBData && val.STATUS === "rejected") {
		innerHtml += '<tr class="rejectedRow row-highlight" style="height:50px;" >';
		
		//Assurance팀만 재택여부 표시되도록
// 		if (SERVICE_LINE === "01") {
// 			innerHtml += '<td colspan="21">&nbsp;</td>'; //재택 여부 추가
// 		} else {
// 			//Assurance팀이 아닐경우는 기존처럼 표시
// 			innerHtml += '<td colspan="20">&nbsp;</td>';
// 		}
		innerHtml += '<td colspan="21">&nbsp;</td>';
		
		innerHtml += '</tr>';
	}
	
	innerHtml += '</tr>';

	return innerHtml;	
}

function makeActivitySelectBox(rowIndex, elementId, eid, globSvcCd, activityCode, attr) {
	var innerHtml = '';
	var datas = {
			"eid" : eid
	};
	
	$.ajax({
		type : "GET",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveActivityCodeList.do",
		async: false,
		data : datas,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		/*complete : function() {
			$('.wrap-loading').addClass('display-none');
		},*/
		success : function(data) {
			if (!isEmpty(data.result)) {
				// 감사코드 이외 기본값(0000) 설정
				if($.inArray(globSvcCd, AUDIT_GLOB_SVC_CD) < 0 && isEmpty(activityCode)) {
					activityCode = '0000';
				}
				
				var selectedFlag = false;
				
				if(elementId == 'activity_code'){
					subElementId = 'sub_activity_code';
					rowType = 'timeSheetRow';
				}
				else if(elementId == 'activity_code_D'){
					subElementId = 'sub_activity_code_D';
					rowType = 'multipleRow';
				}
				
				innerHtml = '<td><select id="' + elementId + '" class="form-control"' + (isEmpty(attr) ? '' : attr) + '>';				
				innerHtml += '<option value="----" desc="----(Select Activity Code)" '
					+ (isEmpty(activityCode) ? 'selected' : '')
					+ '>Select Activity Code</option>';
				
				$(data.result).each(function(key, val) {
					if (!selectedFlag && activityCode === val.ACTIVITY_CODE) {
						selectedFlag = true;
					}
					
					innerHtml += '<option value="' + val.ACTIVITY_CODE + '" desc="' + val.ACTIVITY_NAME + '(' + val.ACTIVITY_CODE + ')" '
						+ (activityCode === val.ACTIVITY_CODE ? 'selected' : '')
						+ '>(' + val.ACTIVITY_CODE + ')' + val.ACTIVITY_NAME + '</option>';
				})		

				// 선택값이 options에 없는 경우 추가
				if ((!selectedFlag && !isEmpty(activityCode))) {
					innerHtml += '<option value="' + activityCode + '" desc="(' + activityCode + ')" selected'
					+ '>(' + activityCode + ')' + (activityCode=='0000' ? 'General' : activityCode) + '</option>';
				}
				
				innerHtml += '</select></td>'
				
				
				//[24.03][정혜원]sub activity code 생성
				$(document).ready(function() { 
				    // select box가 변경될 때마다 makeSubActivitySelectBox 함수 실행
				    if(elementId == 'activity_code_D'){
				    	rowType = 'multipleRow';
				    	subElementId = 'sub_activity_code_D';
				    }else if(elementId == 'activity_code'){
				    	rowType = 'timeSheetRow';
				    	subElementId = 'sub_activity_code';
				    }
				    $('#' + rowType + rowIndex + ' #' + elementId).change(function() {
						$engRow_R = $(this).closest('tbody');
						if(elementId == 'activity_code_D'){
					    	rowType = 'multipleRow';
					    	subElementId = 'sub_activity_code_D';
					    }else if(elementId == 'activity_code'){
					    	rowType = 'timeSheetRow';
					    	subElementId = 'sub_activity_code';
					    }
						$engRow_R.find('tr#' + rowType + rowIndex + ' td:nth-child(3)').html(makeSubActivitySelectBox(subElementId, eid, globSvcCd, $(this).val())); // 선택한 값 넘겨주기
				    });
				});
				
				// disabled multi-row 처리
				if (attr === 'disabled') {
					innerHtml = '<td><input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="' + elementId
					+ '" class="form-control" value="' + activityCode + '" '
					+ (isEmpty(attr) ? '' : attr) + '/></td>';
				}
				
			} else {
				innerHtml = '<td><input type="text" style="ime-mode:disabled;" onKeyUp="this.value=this.value.toUpperCase();" id="' + elementId
					+ '" class="form-control" value="' + (isEmpty(activityCode) ? '0000' : activityCode) + '" '
					+ (isEmpty(attr) ? '' : attr) + '/></td>';
			}
		}
	});
	
	return innerHtml;
}


// [2024.03][정혜원] sub activity code 생성
// [2024.08][박유란] 매번 selectCpyType API 호출하던 기능을 화면 로딩 시에 만들어 놓은 cpaTypeList를 사용하도록 수정함.
function makeSubActivitySelectBox(elementId, eid, globSvcCd, activityCode, subActivityCode, attr) { //globSvcCd : 감사코드(35) 확인용
	var innerHtml = '';
	
	if (activityCode != '0000' && (activityCode == 'QRA3' || activityCode == 'YE03')) { //activity code가 전문가인 경우에만 sub activity code 활성화

		if (cpaTypeList != null && cpaTypeList.length > 0) {
			var selectedFlag = false;
			
			//select box
			innerHtml = '<td><select id="' + elementId + '" class="form-control" ' + (isEmpty(attr) ? '' : attr) + '>';				
			innerHtml += '<option id="selctAll" value="none" desc="----(Select Sub Activity Code)" '
				+ '>Select Sub Activity Code</option>';
			
			cpaTypeList.forEach(item => {
				if (!selectedFlag && (subActivityCode === item.CPA_TYPE)) 
					selectedFlag = true;
				
				if (typeof item.CPA_TYPE != 'undefined') {
					innerHtml += '<option value="' + item.CPA_TYPE + '" desc="' + item.CPA_TYPE + '" '
					+ (((isEmpty(subActivityCode) && item.CPA_TYPE === item.TYPE) || (!isEmpty(subActivityCode) && subActivityCode === item.CPA_TYPE))  ? 'selected' : '') + '>' 
					+ (item.CPA_TYPE == "JE_TEST" ? "JE TEST" : item.CPA_TYPE) + '</option>';
				}
				
				if (isEmpty(subActivityCode) && item.CPA_TYPE == 'ALL') 
					 $("#subActivityCode option[value='----']").attr('selected', 'selected');
				
			});		

			innerHtml += '</select></td>';			
		}
		
	} else
		innerHtml = '<td style="display:block;width:inherit;text-align:center;"><span id="' + elementId + '">-</span></td>';
		
	// disabled multi-row 처리 (승인 요청 -> 승인 -> 수정 -> 재승인 요청 의 경우 multi-row)
	if (attr === 'disabled') 
		innerHtml = '<td id="subActivityInput"><span id="' + elementId + '">' + (typeof subActivityCode == 'undefined' ? '-' : subActivityCode) + '</span></td>';
				
	return innerHtml;
}

var isEmpty = function(value) {
	if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
		return true;
	} else {
		return false;
	}
};

function makeDropBoxForGSC35(valueOfDB) {

	var innerHtml = '';
	innerHtml += '<option value="----" desc="----(Select Activity Code)"' + (valueOfDB==='----' || typeof valueOfDB === 'undefined' || valueOfDB === null ? 'selected' : '') + '>Select Activity Code</option>';
	//innerHtml += '<option value="0000" desc="General(0000)"' + (valueOfDB==='0000' ? 'selected' : '') + '>(0000)General</option>';
	innerHtml += '<option value="NPHR" desc="비공시 시간(NPHR)"' + (valueOfDB==='NPHR' ? 'selected' : '') + '>(NPHR)비공시 시간</option>';
	innerHtml += '<option value="QRA1" desc="분반기_심리(QRA1)"' + (valueOfDB==='QRA1' ? 'selected' : '') + '>(QRA1)분반기_심리</option>';
	innerHtml += '<option value="QRA2" desc="분반기_감사팀(QRA2)"' + (valueOfDB==='QRA2' ? 'selected' : '') + '>(QRA2)분반기_감사팀</option>';
	innerHtml += '<option value="QRA3" desc="분반기_전문가(QRA3)"' + (valueOfDB==='QRA3' ? 'selected' : '') + '>(QRA3)분반기_전문가</option>';
	innerHtml += '<option value="YE01" desc="기말_심리(YE01)"' + (valueOfDB==='YE01' ? 'selected' : '') + '>(YE01)기말_심리</option>';
	innerHtml += '<option value="YE02" desc="기말_감사팀(YE02)"' + (valueOfDB==='YE02' ? 'selected' : '') + '>(YE02)기말_감사팀</option>';
	innerHtml += '<option value="YE03" desc="기말_전문가(YE03)"' + (valueOfDB==='YE03' ? 'selected' : '') + '>(YE03)기말_전문가</option>';
	
	return innerHtml;	
}

function makeDropBoxForleave(valueOfDB) {

	var innerHtml = '';
	innerHtml += '<option value="0000" desc="Authorized Absence (0000)"' + (valueOfDB==='0000' || typeof valueOfDB === "undefined" || valueOfDB === null ? 'selected' : '') + '>(0000)Authorized Absence</option>';
	innerHtml += '<option value="ARMY" desc="Army / Civil Duty (ARMY)"' + (valueOfDB==='ARMY' ? 'selected' : '') + '>(ARMY)Army / Civil Duty</option>';
	innerHtml += '<option value="EDUC" desc="Education (EDUC)"' + (valueOfDB==='EDUC' ? 'selected' : '') + '>(EDUC)Education</option>';
	innerHtml += '<option value="MATL" desc="MATL - Maternity Leave (MATL)"' + (valueOfDB==='MATL' ? 'selected' : '') + '>(MATL)MATL - Maternity Leave</option>';
	innerHtml += '<option value="TIL" desc="TIL (Time in Lieu)"' + (valueOfDB==='TIL' ? 'selected' : '') + '>(TIL)Time in Lieu</option>';
	
	return innerHtml;
}

function makeDropBoxForSpecificEng(valueOfDB) {
	//engagement code 17811828에 대한 activity code 목록
	
	var innerHtml = '';
	innerHtml += '<option value="0000" desc="General (0000)"' + (valueOfDB==='0000' || typeof valueOfDB === "undefined" || valueOfDB === null ? 'selected' : '') + '>(0000)General</option>';
	innerHtml += '<option value="1000" desc="품질관리제도의 설계 및 관리 (1000)"' + (valueOfDB==='1000' ? 'selected' : '') + '>(1000)품질관리제도의 설계 및 관리</option>';
	innerHtml += '<option value="2002" desc="사후심리 (2002)"' + (valueOfDB==='2002' ? 'selected' : '') + '>(2002)사후심리</option>';
	innerHtml += '<option value="3010" desc="연구 (1) 세미나/외부교육/Area Call 참석 (3010)"' + (valueOfDB==='3010' ? 'selected' : '') + '>(3010)연구 (1) 세미나/외부교육/Area Call 참석</option>';
	innerHtml += '<option value="3020" desc="연구 (2) 방법론/Form/Template 개발 (3020)"' + (valueOfDB==='3020' ? 'selected' : '') + '>(3020)연구 (2) 방법론/Form/Template 개발</option>';
	innerHtml += '<option value="3030" desc="자문 (1) 내부 (3030)"' + (valueOfDB==='3030' ? 'selected' : '') + '>(3030)자문 (1) 내부</option>';
	innerHtml += '<option value="3040" desc="자문 (1) 외부 (3040)"' + (valueOfDB==='3040' ? 'selected' : '') + '>(3040)자문 (1) 외부</option>';
	innerHtml += '<option value="5000" desc="교육훈련 기획 및 운영 (5000)"' + (valueOfDB==='5000' ? 'selected' : '') + '>(5000)교육훈련 기획 및 운영</option>';
	innerHtml += '<option value="5005" desc="PPG_내부 업무_기타 업무 (5005)"' + (valueOfDB==='5005' ? 'selected' : '') + '>(5005)PPG_내부 업무_기타 업무</option>';
	innerHtml += '<option value="5400" desc="PACE 업무 (5400)"' + (valueOfDB==='5400' ? 'selected' : '') + '>(5400)PACE 업무</option>';
	innerHtml += '<option value="6001" desc="감리 대응 및 개선권고사항 관리 (1) 국내 (6001)"' + (valueOfDB==='6001' ? 'selected' : '') + '>(6001)감리 대응 및 개선권고사항 관리 (1) 국내</option>';
	innerHtml += '<option value="6002" desc="감리 대응 및 개선권고사항 관리 (2) 해외 (6002)"' + (valueOfDB==='6002' ? 'selected' : '') + '>(6002)감리 대응 및 개선권고사항 관리 (2) 해외</option>';
	innerHtml += '<option value="6003" desc="감리 대응 및 개선권고사항 관리 (3) EYG (6003)"' + (valueOfDB==='6003' ? 'selected' : '') + '>(6003)감리 대응 및 개선권고사항 관리 (3) EYG</option>';
	innerHtml += '<option value="7000" desc="감사조서 관리 (7000)"' + (valueOfDB==='7000' ? 'selected' : '') + '>(7000)감사조서 관리</option>';
	innerHtml += '<option value="8010" desc="그 밖의 업무 - 감사인 등록유지 (8010)"' + (valueOfDB==='8010' ? 'selected' : '') + '>(8010)그 밖의 업무 - 감사인 등록유지</option>';
	innerHtml += '<option value="8020" desc="그 밖의 업무 - 품질부문 성과평가 (8020)"' + (valueOfDB==='8020' ? 'selected' : '') + '>(8020)그 밖의 업무 - 품질부문 성과평가</option>';
	innerHtml += '<option value="8030" desc="그 밖의 업무 - 감사시간 모니터링 (8030)"' + (valueOfDB==='8030' ? 'selected' : '') + '>(8030)그 밖의 업무 - 감사시간 모니터링</option>';
	innerHtml += '<option value="8040" desc="그 밖의 업무 - 외부 회의/위원회 등 참석 (8040)"' + (valueOfDB==='8040' ? 'selected' : '') + '>(8040)그 밖의 업무 - 외부 회의/위원회 등 참석</option>';
	innerHtml += '<option value="8050" desc="그 밖의 업무 - 기타 품질관리실의 운영 (8050)"' + (valueOfDB==='8050' ? 'selected' : '') + '>(8050)그 밖의 업무 - 기타 품질관리실의 운영</option>';
	innerHtml += '<option value="9010" desc="PPG 업무 - IT (9010)"' + (valueOfDB==='9010' ? 'selected' : '') + '>(9010)PPG 업무 - IT</option>';
	innerHtml += '<option value="9020" desc="PPG 업무 - DVC (9020)"' + (valueOfDB==='9020' ? 'selected' : '') + '>(9020)PPG 업무 - DVC</option>';
	innerHtml += '<option value="9030" desc="PPG 업무 - 영문 (9030)"' + (valueOfDB==='9030' ? 'selected' : '') + '>(9030)PPG 업무 - 영문</option>';
	innerHtml += '<option value="9040" desc="PPG 업무 - CMC (9040)"' + (valueOfDB==='9040' ? 'selected' : '') + '>(9040)PPG 업무 - CMC</option>';
	
	return innerHtml;
}

function makeDropBoxForEYJapan(valueOfDB){
	
	var innerHtml = '';
	innerHtml += '<option value="----" desc="----(Select Activity Code)"' + (valueOfDB==='----' || typeof valueOfDB === 'undefined' || valueOfDB === null ? 'selected' : '') + '>Select Activity Code</option>';
	innerHtml += '<option value="NPH" desc="EY Japan 용역(NPH)"' + (valueOfDB==='NPH' ? 'selected' : '') + '>(NPH)EY Japan 용역</option>';
	innerHtml += '<option value="NPHR" desc="비공시 시간(NPHR)"' + (valueOfDB==='NPHR' ? 'selected' : '') + '>(NPHR)비공시 시간</option>';
	innerHtml += '<option value="QRA1" desc="분반기_심리(QRA1)"' + (valueOfDB==='QRA1' ? 'selected' : '') + '>(QRA1)분반기_심리</option>';
	innerHtml += '<option value="QRA2" desc="분반기_감사팀(QRA2)"' + (valueOfDB==='QRA2' ? 'selected' : '') + '>(QRA2)분반기_감사팀</option>';
	innerHtml += '<option value="QRA3" desc="분반기_전문가(QRA3)"' + (valueOfDB==='QRA3' ? 'selected' : '') + '>(QRA3)분반기_전문가</option>';
	innerHtml += '<option value="YE01" desc="기말_심리(YE01)"' + (valueOfDB==='YE01' ? 'selected' : '') + '>(YE01)기말_심리</option>';
	innerHtml += '<option value="YE02" desc="기말_감사팀(YE02)"' + (valueOfDB==='YE02' ? 'selected' : '') + '>(YE02)기말_감사팀</option>';
	innerHtml += '<option value="YE03" desc="기말_전문가(YE03)"' + (valueOfDB==='YE03' ? 'selected' : '') + '>(YE03)기말_전문가</option>';
	
	return innerHtml;
}

/* ********************************************************
 * 체크박스 선택행 삭제 기능
 ******************************************************** */ 
 function delTr(rowNum){
	
	$('#timeReportList_L').find('[id="timeSheetRow' + rowNum + '"]').remove();
	$('#timeReportList_R').find('[id="timeSheetRow' + rowNum + '"]').remove();
	
 }


/* delegation */
function setDelegator(delegatorGpn, obj){
	
	var setOption = "";
	setOption = obj.id.toString() === "insertDelegator" ? "INSERT" : "DELETE";
	
	if($('#delegatorInfoList tr').hasClass('std') == false){
		alertify.alert("알림", "Delegator를 선택해 주세요");
		return false;
	}
	
	//delegator가 EP 이상이라면 등록 불가
	if($.inArray($('#delegatorInfoList .std').children().eq(4).text(), apprExceptionList) > -1) {
		alertify.alert("알림","EP 이상은 delegator로 등록할 수 없습니다.");
		return false;
	}
	
	var datas = {
			"DELEGATOR_GPN" : $(".std").children().eq(3).text(),
			"DELEGATOR_TYPE" : 'REQ',
			"OPTION" : setOption
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/processSetDelegator.do",
		dataType : "json",
		data : datas,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	    },
		success : function(data) {
			// [2024.10][박유란] 
			//  - Delegator 삭제 시 목록, 검색어 초기화 추가
			//  - 삭제/등록 시 alert 문구 구분되도록 변경
			
			//var innerHtml = '';
			//alertify.alert("알림","Delegator 설정이 완료되었습니다.");			
			if (setOption == 'DELETE'){
				alertify.alert("알림", "Delegator 삭제가 완료되었습니다.");
				$('#searchDelegator').val("");  //Delegator 모달 텍스트 박스
				$('#delegatorInfoList').html("");  //Delegator 조회 결과 테이블
			} else
				alertify.alert("알림", "Delegator 등록이 완료되었습니다.");
			
			$('#setDelegatorModal').modal('hide');
			$('#searchEngList').html('');
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	 var message = getRootCause($(xhr.responseText));
	        	 doubleSubmitFlag = false;
				alertify.alert("알림",message);
	         }
	     }
	}); 
}
	
/* delegator지정을 위한 직원 조회 */
function searchDelegator(gpnName , delegatorGpn){
	//alert(gpnName);
	var innerHtml =  "";
	
	var datas = {
			"searchWord" : gpnName
		};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/main/selectPeopleInfo.do",
		dataType : "json",
		data : datas,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    }, 	
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');
	 
	    },
		success : function(data) {
			
			
			$(data.resultList).each(function(key, val){
				
				if(delegatorGpn != null && delegatorGpn != val.GPN){
					return true;
				}
				innerHtml += '<tr id = "gpnInfo">';				
				innerHtml += '<td style="cursor:pointer">'+nullCheck(val.KOR_NAME)+'</td>';
				innerHtml += '<td style="cursor:pointer">'+nullCheck(val.DEPART_NAME)+'</td>';
				innerHtml += '<td style="cursor:pointer">'+nullCheck(val.E_MAIL)+'</td>';
				innerHtml += '<td style="cursor:pointer">'+val.GPN+'</td>';
				innerHtml += '<td style="display:none;">'+val.EY_RANK+'</td>';
				innerHtml += '<td style="cursor:pointer">'+nullCheck(val.GUI)+'</td>'; // 21.12.14 추가 - 윤정
			});		
			$('#delegatorInfoList').html(innerHtml);
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
	        	 var message = getRootCause($(xhr.responseText));
	        	 doubleSubmitFlag = false;
				alertify.alert("알림",message);
	         }
	     }
	});		
}
	
function selectGpnRelevantDelegation(REQUESTOR_GPN) {
	
	//최초 요청 일 때만 ( REQUESTOR_GPN 이 null 값이면 최초 요청)
	if(REQUESTOR_GPN == null){
		var innerHtml="";
		if(KOREAN_NAME != ''){
			innerHtml +=  '<option value="' + GPN + '">'+ KOREAN_NAME +'</option>';
		}else{
			innerHtml +=  '<option value="' + GPN + '">'+ KOREAN_NAME_INACTIVE +'- Inactive</option>';
		}
		$('#epSelect').html(innerHtml);
	}
	
	var datas = {
			"DELEGATOR_TYPE" : 'REQ',	
			"OPTION" : "SELECT",
			"REQUESTOR_GPN" : REQUESTOR_GPN
	};
	
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/processSetDelegator.do",
		dataType : "json",
		data : datas,
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        if(typeof REQUESTOR_GPN !== "undefined") {
	        	$('.wrap-loading').addClass('display-none');
	        }
	       
	    },
		success : function(data) {			
			$('#epSelect').css("display", true);						
			if (data.result.length == 0) 			
				return;
			
			$(data.result).each(function(key, val){
				innerHtml +=  '<option value="'+val.GPN+'">'+val.KOR_NAME+'</option>';
				if(REQUESTOR_GPN != null){
					searchDelegator(val.KOR_NAME , val.DELEGATOR_GPN);
				}

			});
			
			if (REQUESTOR_GPN == null){
				$('#epSelect').html(innerHtml);
			}			
		},
	    error : function(xhr, status, error){
	    	$('#epSelect').html(innerHtml);
	    	alertify.alert(xhr);
			alertify.alert(status);
			alertify.alert(error);	
		}
	});		
}

	
function selectEP() {
	 var epSelect = document.getElementById("epSelect");
	$delegationBtnDiv = $("#delegationBtn").closest('div');
	
	 if(GPN != epSelect.options[epSelect.selectedIndex].value){
		 $('#delegationBtn').prop("disabled", true);
	 }else{
		 $('#delegationBtn').prop("disabled", false);
	 }
	 ACTIVE_GPN = epSelect.options[epSelect.selectedIndex].value;
	
	 // [2024.10][박유란] Active User 변경 시 selectCpaType 실행하도록 추가
	 selectCpaType();
	 
	 retrieveTimeReport(true);
}
	
var selectedEOWdate = "";
function selectCopyDateList(friday) {
	var datas = {
			"friday" : friday
	};

	$ .ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/selectCopyTimeSheetData.do",
		dataType : "json",
		data : datas,
		beforeSend : function(xhr) {
			//이미지 보여주기 처리
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		complete : function() {
			//이미지 감추기 처리
			$('.wrap-loading').addClass('display-none');
		},
		success : function(data) {
			var innerHtml = '';

		 	if (data.result.length == 0) {
				innerHtml += '<tr><td colspan="6">데이터가 없습니다.</td></tr>';
			} else {
				$(data.result).each(function(key, val) {
					// 현재 주차로부터 4주치 timeSheet만 copylist에 해당
						selectedEOWdate = val.DATE;
						innerHtml += '<tr><td><a class="text-link" onclick="selectCopyTimesheet(this);">'+data.result[key]+'</a></td></tr>';
				});
			} 
		
		 	$('#DateList').empty();
			$('#DateList').html(innerHtml);
			$('#copyDatelistModal').modal();
		},
		error: function(xhr, status, err) {
	        if (xhr.status == 401) {
	            alertify.alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	             $(".b-close").click();
	             location.href = koreaPortal_context_path + "/logout.do"
	         } else if (xhr.status == 403) {
	            alertify.alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	            $(".b-close").click();
	            location.href = koreaPortal_context_path + "/logout.do"
	         } else {
					var msg = getRootCause($(xhr.responseText));
					alertify.alert(msg);	
	         }
	     }
	});
}
	
function selectCopyTimesheet(obj) {
	var datas = {
			 "EOW_DATE" : obj.text,
			 "GPN" : ACTIVE_GPN
	};
		
	$.ajax({
		type : "post",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/selectCopyTimesheet.do",
		dataType : "json",
		data : datas,	
		beforeSend:function(xhr){
	        //이미지 보여주기 처리
	        xhr.setRequestHeader("AJAX", true);
	        $('.wrap-loading').removeClass('display-none');
	    },
	    complete:function(){
	        //이미지 감추기 처리
	        $('.wrap-loading').addClass('display-none');	        
	    },
		success : function(data) {
			$("input:checkbox[name='copyAll']").prop("checked", false);
			var innerHtmlTimeSheet = "";

			if (data.timeSheetResult.length == 0) {
				//Assurance팀만 재택여부 표시되도록
// 				if (SERVICE_LINE === "01") {
// 					// 재택 여부
// 					innerHtmlTimeSheet += '<tr><td colspan="16">검색결과가 없습니다.</td></tr>';
// 				} else {
// 					innerHtmlTimeSheet += '<tr><td colspan="15">검색결과가 없습니다.</td></tr>';
// 				}
				innerHtmlTimeSheet += '<tr><td colspan="15">검색결과가 없습니다.</td></tr>';
			}else {
				$(data.timeSheetResult).each(function(key, val) {				
					
					if($.inArray(val.E_STAT, OPEN_ENG_STAT) <= -1) {
						val.E_STAT = val.E_STAT_DESCR;  
						innerHtmlTimeSheet += '<tr id="timeSheetRow' + key +'" style="background-color:#F8F9F9;color:#808B96">';
						innerHtmlTimeSheet += '<td><input type="checkbox" name="copyCheck" class="timesheet_checkbox'+key+'" disabled value="'+val.REQUEST_NO+'"></td>';
					}else{
						val.E_STAT = val.E_STAT_DESCR; 
						innerHtmlTimeSheet += '<tr id="timeSheetRow' + key +'">';
						innerHtmlTimeSheet += '<td><input type="checkbox" name="copyCheck" class="timesheet_checkbox'+key+'" value="'+val.REQUEST_NO+'"></td>';
						
					}
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.REQUEST_NO+'" id="requestNo">';
					innerHtmlTimeSheet += '<input type="hidden" id="independenceChk" value="' + val.SIGSIGNATURECHECK + '"/>'; // 35번 코드 독립성 확인 여부 체크
					innerHtmlTimeSheet += '<input type="hidden" id="globSvcCd" value="' + val.GLOB_SVC_CD + '"/>'; // 코드 번호 (35번 코드여부)
					innerHtmlTimeSheet += '<td id="engStat">'+val.E_STAT+'</td>';
					innerHtmlTimeSheet += '<td id="engType">'+val.ENGAGEMENT_TYPE+'</td>';
					
					// Mercury 변환 로직 적용
					innerHtmlTimeSheet += '<td style="display:none;" id="engagementCode">'+val.KEY_ENGAGEMENT_CODE+'</td>';
					innerHtmlTimeSheet += '<td id="mercEngagementCode">'+val.MERC_KEY_ENGAGEMENT_CODE+'</td>';
					
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.FIXED_ENG+'" id="fixedCopyEng">';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.EP_GPN+'" id="epGPN">';
					innerHtmlTimeSheet += '<td id="epName">'+(typeof val.EP_NAME == "undefined" ? '-' : val.EP_NAME)+'</td>';
					//innerHtmlTimeSheet += '<td id="engagementName" class="copytd" style="overflow:hidden; text-overflow:ellipsis;">'+(typeof val.E_NM == "undefined" ? val.DESCRIPTION : val.E_NM)+'</td>';
					innerHtmlTimeSheet += '<td id="engagementName" class="copytd" style="overflow:hidden; text-overflow:ellipsis;">'+(typeof val.E_NM == "undefined" ? 'Global Code' : val.E_NM)+'</td>';
					innerHtmlTimeSheet += '<td id="engDesc" class="copytd" style="overflow:hidden; text-overflow:ellipsis;">'+val.DESCRIPTION+'</td>';
					innerHtmlTimeSheet += '<td id="activityCode">'+val.ACTIVITY_CODE+'</td>';
					innerHtmlTimeSheet += '<td id="subActivityCode">'+ (typeof val.SUB_ACTIVITY_CODE == "undefined" ? '-' : val.SUB_ACTIVITY_CODE) +'</td>'; //[24.03][정혜원] sub activity code 생성 //추후 조건 설정 예정(데이터 유무에 따라 -)
					
					//Assurance팀만 재택여부 표시되도록
// 					if (SERVICE_LINE === "01") {
// 						// 재택 여부
//  					innerHtmlTimeSheet += '<td id="wfhYn">'+(val.WFH_YN == "Y" ? 'Y' : 'N')+'</td>';
// 					}
					
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.GLOB_SVC_CD+'" id="glob_svc_cd">';
					innerHtmlTimeSheet += '<td id="Sa_A">'+val.Sa_A+'</td>';
					innerHtmlTimeSheet += '<td id="Su_A">'+val.Su_A+'</td>';
					innerHtmlTimeSheet += '<td id="Mo_A">'+val.Mo_A+'</td>';
					innerHtmlTimeSheet += '<td id="Tu_A">'+val.Tu_A+'</td>';
					innerHtmlTimeSheet += '<td id="We_A">'+val.We_A+'</td>';
					innerHtmlTimeSheet += '<td id="Th_A">'+val.Th_A+'</td>';
					innerHtmlTimeSheet += '<td id="Fr_A">'+val.Fr_A+'</td>';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.LOC1+'" id="loc1">';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.LOC2_NM+'" id="loc2_NM">';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.LOC2+'" id="loc2">';
					// [2024.02][박유란] 연결 감사보고서일 관련 Data 설정 추가 
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.FIXED_REPORT_DATE+'" id="fixedDate">';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.CR_FIXED_ENG+'" id="crFixedEng">';
					innerHtmlTimeSheet += '<input type="hidden" value="'+val.CR_FIXED_REPORT_DATE+'" id="crFixedDate">';
					innerHtmlTimeSheet += '</tr>';
				});
			}
			
			$('#copyTimeSheetList').empty();
			$('#copyTimeSheetList').html(innerHtmlTimeSheet);
			$('#copyTimeSheetlistModal').modal();
		}
	});
}
	
function addCopytimeSheet() {
	var rowData;
	
	if($("#copyTimeSheetList input[type=checkbox]:checked").length == 0) {
		alertify.alert("알림","copy할 타임시트를 선택해주세요.");
	}else {
		$("#copyTimeSheetList input[type=checkbox]:checked").each(function(i){
			var targetRowNum = $(this).attr('class').split('timesheet_checkbox')[1];
			var $target = $('#copyTimeSheetList').find('[id="timeSheetRow' + targetRowNum + '"]');
			
			rowData = {
		  		REQUEST_NO : "",
		  		STATUS : "unsubmitted",
	    		APPROVED : "false",
	    		RETAIN_CONNECTION : "0",
	    		ENG_TYPE : $target.find("[id='engType']").text(),
	    		ACTUAL_ENG_CODE : $target.find("[id='engagementCode']").text(),
	    		// Mercury 변환 로직 적용
	    		MERC_ACTUAL_ENG_CODE : $target.find("[id='mercEngagementCode']").text(),
	    		RETAIN_ENG_CODE : $target.find("[id='engagementCode']").text(),
	    		ENG_DESC : $target.find("[id='engagementName']").text(),
	    		DESCRIPTION : $target.find("[id='engDesc']").text(),
	  			EP_GPN : $target.find("[id='epGPN']").val(),
	  			EP_NAME : $target.find("[id='epName']").text(),
	  			LOC1 : $target.find("[id='loc1']").val(),
	    		LOC2_NM : $target.find("[id='loc2_NM']").val(),
	    		LOC2 : $target.find("[id='loc2']").val(),
				Sa_A : parseFloat($target.find("[id='Sa_A']").text()),
				Su_A : parseFloat($target.find("[id='Su_A']").text()),
				Mo_A : parseFloat($target.find("[id='Mo_A']").text()),
				Tu_A : parseFloat($target.find("[id='Tu_A']").text()),
				We_A : parseFloat($target.find("[id='We_A']").text()),
				Th_A : parseFloat($target.find("[id='Th_A']").text()),
				Fr_A : parseFloat($target.find("[id='Fr_A']").text()),
				ACTIVITY_CODE : $target.find("[id='activityCode']").text(),
				SUB_ACTIVITY_CODE : $target.find("[id='subActivityCode']").text(), //[24.03][정혜원] sub activity code 생성
				//WFH_YN : $target.find("[id='wfhYn']").text(),	//재택여부
				GLOB_SVC_CD : $target.find("[id='globSvcCd']").val(), // 감사코드 (35) 확인용
				FIXED_ENG : $target.find("[id='fixedCopyEng']").val(), // 감사보고서 확정 여부
				SIGSIGNATURECHECK : $target.find("[id='independenceChk']").val(), // 독립성 확인서 제출 여부
				
				// [2024.02][박유란] 연결 감사보고서일 관련 Data 설정 추가 
				FIXED_REPORT_DATE : $target.find("[id='fixedDate']").val(), // 별도 감사보고서일
				CR_FIXED_ENG : $target.find("[id='crFixedEng']").val(), // 연결 감사보고서일 확정 여부
				CR_FIXED_REPORT_DATE : $target.find("[id='crFixedDate']").val(), // 연결 감사보고서일
		      }
			
			//조회 결과 없음 문구가 떠있다면 지우고 add
			if($('#timeReportList_L').find('[class="noData"]').length > 0) {
				$('#timeReportList_L').html("");
				$('#timeReportList_R').html("");
				
				$(".check-all").prop("checked",false);
				$(".check-all").prop("disabled",false);
			}
			
			//row 추가
			$('#timeReportList_L').append(makeLeftEngagementRow(rowData));
			$('#timeReportList_L').find('tr').each(function(id,el){
			    $(el).attr("style",'height:50px')
			});
			$('#timeReportList_R').append(makeRightEngagementRow(rowData));
			
			$('#timeReportList_R').find('tr').each(function(id,el){
			    $(el).attr("style",'height:50px')
			});
			calculateWorkingHours();
			
			$("#timeReportList_L input[type=checkbox]:checked").each(function(i){
				if($(this).closest('tr').find('#appr_status').val() != "unsubmitted") {
					return false;
				}	
			});
			
			//loc1 setting
			//setLoc1($("#timeReportList_R").find("tr:last").attr('id').split('Row')[1]);
		});
		$('#copyDatelistModal').modal('hide');
		$('#copyTimeSheetlistModal').modal('hide');
	}
}
	
function selectAllCopyList() {
	if($("#copyTimeSheetList input[type=checkbox]").is)
	$("#copyTimeSheetList input[type=checkbox]").prop("checked", "checked");
}

function moveAicList() {
	return location.href="<c:out value='${pageContext.request.contextPath}'/>/aic/aicList.do"
}

function moveCtrList() {
	return location.href="<c:out value='${pageContext.request.contextPath}'/>/contract/contractList.do"
}

function openCtrModal() {	
	$.ajax({
		type : "GET",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/retrieveEarlyEngList.do",
		async: false,
		data : {
			"eowDate" : selectedDate
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		/*complete : function() {
			$('.wrap-loading').addClass('display-none');
		},*/
		success : function(data) {
			if(!isEmpty(data.earlyEngList)) {
				var tableBody = document.getElementById('earlyEngList');
				tableBody.innerHTML = ''; // 테이블 body 초기화					
				data.earlyEngList.forEach(function(item) {
					var row = document.createElement('tr');
					
					// Engagement ID 필드 추가
					var cellEid = document.createElement('td');
					cellEid.textContent = item['eid'];
					row.appendChild(cellEid);
					
					// Engagment Name 필드 추가
					var cellEnm = document.createElement('td');
					cellEnm.textContent = item['enm'];
					row.appendChild(cellEnm);
					
					// Description 필드 추가
					var cellDesc = document.createElement('td');
					cellDesc.textContent = item['desc'];
					row.appendChild(cellDesc);
					
					tableBody.appendChild(row);
				});
				$("#ctrModal").modal();
			}
		}
	});
}
	
// [2024.02][송일수] 추가 구현 Start
// [2024.08][박유란] 현재 시간 기준(today)으로  처리 추가 
function getNextFriday(date) {
	let inputDate;
	if (date == 'today')
		inputDate = new Date();
	else
    // 입력된 날짜를 Date 객체로 변환합니다.
    	inputDate = new Date(date);

    // 만약 잘못된 날짜 형식이라면 오류를 반환합니다.
    if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date format');
    }

    // 입력된 날짜의 요일을 가져옵니다.
    let dayOfWeek = inputDate.getDay();

    // 다음 금요일을 구하기 위한 보정값을 계산합니다.
    let daysUntilFriday = (5 - dayOfWeek + 7) % 7;

    // 입력된 날짜에 보정값을 더하여 다음 금요일의 날짜를 계산합니다.
    let nextFridayDate = new Date(inputDate.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000);

    // yyyy-mm-dd 형식으로 반환합니다.
    return nextFridayDate.toISOString().slice(0, 10);
}
// [2024.02][송일수] 추가 구현 END
	
// [2024.08][박유란] 컨설팅 RPM 요청으로 추가함
// 타임시트 대리 접속 버튼 추가 Start ---------------------------------------------------------
function retireEmpTsSubmit(AUTHORITY) {
	// Admin 권한이 있는 경우에만 버튼을 노출함. default는 display none
	if (AUTHORITY == 'TS_ADMIN') 
		$('#oepnInActiveUserPageModal').show();			
	else
		return;
			 
	$('#oepnInActiveUserPageModal').on('click', function() {
		$('#inActiveUserInput').val('');
		$('#inActiveUserModal').modal();
	});
	
	$('#inActiveUserReqPageLink').on('click', function() {
		if($("input#inActiveUserInput").val() == null || $("input#inActiveUserInput").val() == "") {
			alert("대리할 GUI을 입력해 주세요.");
			return false;
		}
		
		var datas = {
			"retiredGUI" : $('input#inActiveUserInput').val().trim()
		};
		
		$.ajax({
			type : "GET",
			url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/validateRetiredGUI.do",
			async: false,
			data : datas,	
			success : function(data) {
				if (!data.result) {
					alert("GUI에 해당하는 GPN을 찾을 수 없습니다.");
					return;
				} else {
					$("#inActiveUserReqPageLink").attr('href', '<c:out value='${pageContext.request.contextPath}'/>/timeSheet/timeSheetReq.do?retire_gpn=' + data.result.GPN);
				}
			}
		});		
	});
}
// 타임시트 대리 접속 버튼 추가 End ---------------------------------------------------------
	
// [2024.08][박유란] selectCpaType API 연동을 별도 function 으로 분리함. 
function selectCpaType() { 

	var datas = {
		"activeUser" : ACTIVE_GPN	
	};
	
	$.ajax({
		type : "GET",
		url : "<c:out value='${pageContext.request.contextPath}'/>/timeSheet/selectCpaType.do",
		async: false,
		data : datas,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("AJAX", true);
			$('.wrap-loading').removeClass('display-none');
		},
		success : function(data) {
			if (data.result != null && data.result != undefined && data.result.length > 0) {	
				cpaTypeList = [];
				data.result.forEach(item => {
					cpaTypeList.push(item);
				});
			}				
		}
	});
}
	
</script>
</head>
<body style="scroll-y:no;">
	<div id="wrapper">
	<input type="hidden" value="${myInfo.GPN}" id="sessionGpn">
	<input type="hidden" id="nowDate" value="${nowDate}" >
	<input type="hidden" value="${selectEndDate }" id="selectEndDate">
	<c:set var="sl" value="${myInfo.SERVICE_LINE}" />
		<%@ include file="../common/menu.jsp" %>		
		<div id="page-wrapper">
		    <div class="row">		    	
                <div class="col-lg-12">
                	<div class="col-lg-7 page-header">
<!--                 		<h3 id="timeSheetTitle">TimeSheet 제출<a style="color: #BA0000; font-size: 16px; font-weight: bold; margin-left: 10px;" id="manual" href="" target='_bacnk'>Manual</a></h3> -->
                		<h3 id="timeSheetTitle">TimeSheet 제출
                			<a class="emphasize" id="manual" href="" target='_bacnk'>Manual</a>
                		</h3>
                	</div>
                	<!-- [2024.08][박유란] 권호한 파트너님 요청으로 "타임시트 대리 접속" 버튼 추가함  -->
                	<div class="col-lg-3 page-header no-pd">
                		<div style="float: right;">
                			<button class="btn btn-default btn-search" type="button" id="oepnInActiveUserPageModal" style="display: none;">타임시트 대리 접속</button>
                			<button class="btn btn-default btn-search" type="button" id="delegationBtn" style="left-margin: 20px">Delegation</button>
                		</div>
                	</div>
                	<div class="col-lg-1 page-header no-pd"><label id="delegationLabel" class="stit">Active User</label></div>
                	<div class="col-lg-1 page-header no-pd">
                		<select id="epSelect" class="form-control" onchange="selectEP()"></select>
                	</div>
                </div>
            </div> 
			
			<div class="workSheet-area">
				<div class="row">
					<!-- 근무제 & 기간  -->
					<div class="col-md-4 col-md-border">
						<div class="row">
							<label class="col-xs-4 col-md-3">근무제</label>
							<div class="col-xs-8 col-md-9">
								<span class="txt-process" id="workingType"></span>
							</div>
						</div>
						<div class="row mt20">
							<label class="col-xs-4 col-md-3">기간</label>
							<div id="workingPeriod" class="col-xs-8 col-md-9">
								<span id="workingPeriodByDate"></span><span id="workingPeriodByWeek"></span>
							</div>
						</div>
					</div>
					<!--// 근무제 & 기간  -->
					
					<!-- 총계획시간 & 총승인요청시간 -->
					<div class="col-md-5">
						<div class="row">
							<label class="col-md-3">총 예상시간</label>
							<div class="col-md-9">
								<div id="totalPlanHours" class="col-md-2">
								</div>
								<div class="col-md-2">
									<!-- 게이지바 -->
									<!-- <table class="table-responsive table-bordered"
										cellpadding="0" cellspacing="0">
										<tr data-toggle="tooltip" data-placement="bottom" data-html="true" title="" id = 'progressBar_P'>
										</tr>
									</table>-->
									<div data-toggle="tooltip" data-placement="bottom" data-html="true" title="" id ='progressBar_P' class="circle">
										</div>
								</div>
								<div id="totalPlanningHours_CH" class="col-xs-4 col-md-2 line-h">
								</div>
								<div id="totalPlanningHours_AP" class="col-xs-4 col-md-2 line-h">
								</div>
								<div id="totalPlanningHours_N" class="col-xs-4 col-md-3 line-h">
								</div>
							</div>
						</div>
						<div class="row mt20">
							<label class="col-md-3 line-h">총 승인요청시간</label>
							<div class="col-md-9">
								<div id="summary_totalActualHours" class="col-md-2">
								</div>
								<div class="col-md-2">
									<!-- 게이지바 -->
									<!-- <table class="table-responsive table-bordered"
										cellpadding="0" cellspacing="0">
										<tr data-toggle="tooltip" data-placement="bottom" data-html="true" title="" id="progressBar_A">
										</tr>
									</table> -->
									<div data-toggle="tooltip" data-placement="bottom" data-html="true" title="" id ='progressBar_A' class="circle">
										</div>
								</div>
								<div id="totalActualHours_CH" class="col-xs-4 col-md-2 line-h">
								</div>
								<div id="totalActualHours_AP" class="col-xs-4 col-md-2 line-h">
								</div>
								<div id="totalActualHours_N" class="col-xs-4 col-md-3 line-h">
								</div>
							</div>
						</div>
					</div>
					<!--// 총계획시간 & 총승인요청시간 -->
					
					<!-- 주초과근무 & 일누적초과근무 -->
					<div class="col-md-2 col-md-border" style="margin-left:30px;">
						<div class="row">
							<label class="col-xs-4 col-md-9">주 초과근무</label>
							<div id="totalOverTimeHours" class="col-xs-8 col-md-3 pr10">
							</div>
						</div>
						<div class="row mt20">
							<label class="col-xs-4 col-md-9">일 누적 초과근무</label>
							<div id="accumulatedOverTimeHours" class="col-xs-8 col-md-3 pr10">
							</div>
						</div>
					</div>
					<!--// 주초과근무 & 일누적초과근무 -->
					
				</div>
			</div>

            <!-- Search  -->
            <div class="search-box mt20">
				<div class="row">
					<div class="form-group col-md-4">
						<label class="col-md-4">Week Ending</label>
						<div class="col-md-8">
							<input class="fa form-control w120" id="selectedWeekEnding" name="datepicker_s" readonly>
							<button class="btn btn-default btn-search" type="button" id="selectReqList" onclick="retrieveTimeReport(true)">조회</button>
						</div>
					</div>
					<div class=" col-md-offset-8"></div>
				</div>
			</div>
            <!--// Search  -->
            
            <!-- Grid State & Button Area -->
            <div class="row">
				<div class="col-md-4 mt10"><label>타임시트 현황 :&nbsp;</label><span id="timeSheetStatus" class="txt-status"></span></div>
				<div id="insertTimeSheetBtnDiv" class="col-md-8 text-right">
					<button type="button" id="withdrawBtn" class="btn btn-default btn-basic reqTimesheetEnable" onclick="withdrawTimeReport()" style="display:none;">확인</button>
					<button class="btn btn-default btn-search" id="copyBtn" type="button">Copy TimeSheet</button>
					<button type="button" id="saveDraftBtn" class="btn btn-default btn-basic reqTimesheetEnable" onclick="processTimeReport('save')">저장</button>
					<button type="button" id="deleteBtn" class="btn btn-default btn-basic reqTimesheetEnable" onclick="removeTimeReport()">삭제</button>
					<button type="button" id="requestBtn" class="btn btn-default btn-basic reqTimesheetEnable" onclick="processTimeReport('request')">승인요청</button>
			</div>
            <!--// Grid State & Button Area -->
            
            <!-- scrollBarlLayer Area -->
            <div id="scrollbarLayer" style="position:absolute;right:10px;top:300px;width:100px;">
				<h1>
			      	<span data-toggle="tooltip" id="leftScroll" title ="키보드의  Ctrl+방향키로도 이동할 수 있습니다." style="cursor:pointer; color:#0B0B3B" class="glyphicon glyphicon-circle-arrow-left"></span>
			        <span data-toggle="tooltip" id="rightScroll" title ="키보드의  Ctrl+방향키로도 이동할 수 있습니다." style="cursor:pointer; color:#0B0B3B" class="glyphicon glyphicon-circle-arrow-right"></span>
			     </h1>
			</div>
			<!-- //scrollBarlLayer Area -->
			
			<!-- Table Area -->
            <div id = "tbl-timeSheet"class="tbl-fix-area mt10">
				<div class="tbl-fix-left" style="width: 35%;padding-bottom: 21px;">
					<!-- Left(Fixed) Start-->
					<table class="table table-bordered text-center" cellspacing="0"
						cellpadding="0" style="height:100%;margin-bottom:0px;table-layout:fixed;">
						<colgroup>
							<col width="5%"></col>
							<col width="18%"></col>
							<col width="5%"></col>
							<col width="24%"></col>
							<col width="18%"></col>
							<col width="30%"></col>	
						</colgroup>
						<thead>
							<tr>
								<th scope="col" rowspan="2"><input name="all" type="checkbox" class="check-all" onClick="selectAll()"></th>
								<th scope="col" rowspan="2">Status</th>
								<th scope="col" colspan="4">Engagement</th>
							</tr>
							<tr>
								<th scope="col"></th>
								<th scope="col">Code</th>
								<th scope="col">EP</th>
								<th scope="col">Name</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="6">초과근무</th>
							</tr>
							<tr>
								<th colspan="6">합&emsp;&emsp;계</th>
							</tr>
						</tfoot>
						<tbody id="timeReportList_L">
						</tbody>
					</table>
				</div> 
           		<!--// Left(Fixed) End-->
           		
            	<!-- Right(Scrolltab) Start -->
            	<div class="tbl-fix-right" style="width: 65%">
					<table class="table table-bordered text-center mb_25"
								cellspacing="0" cellpadding="0" style="width:160%">
						<colgroup>
							<col style="width: 100px"></col>
							<col style="width: 280px"></col>
							<col style="width: 280px"></col> <!-- [24.03][정혜원] sub activity code -->
							<col style="width: 70px"></col>
							<!-- Service Line = '01'일 경우만 표시 -->							
<%-- 							<c:if test="${sl == '01'}"> --%>
<%-- 								<col style="width: 70px"></col> <!-- 재택 여부  --> --%>
<%-- 							</c:if> --%>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 70px"></col>
							<col style="width: 150px"></col>
							<col style="width: 130px"></col>
						</colgroup>
						<thead>
							<tr>
								<th scope="col" rowspan="2">Description</th>
								<th scope="col" rowspan="2">Activity</th>
								<th scope="col" rowspan="2">Sub Activity</th> <!-- [24.03][정혜원] sub activity code 생성 -->
								<!-- Service Line = '01'일 경우만 표시 -->							
<%-- 								<c:if test="${sl == '01' }"> --%>
<!-- 									<th scope="col" rowspan="2"> 재택 여부 추가  -->
<!-- 									재택<span data-toggle="tooltip" data-placement="bottom" data-html="true" id="wfhDescription"> -->
<!-- 									<i class="fa fa-question-circle fa-lg"></i></span><br/> -->
<!-- 									여부&nbsp;&nbsp;&nbsp;&nbsp; -->
<!-- 									</th> -->
<%-- 								</c:if> --%>
								<th scope="col" colspan="2" id="title0" class="Weekend">Sa()</th>
								<th scope="col" colspan="2" id="title1" class="Weekend">Su()</th>
								<th scope="col" colspan="2" id="title2">Mo()</th>
								<th scope="col" colspan="2" id="title3">Tu()</th>
								<th scope="col" colspan="2" id="title4">We()</th>
								<th scope="col" colspan="2" id="title5">Th()</th>
								<th scope="col" colspan="2" id="title6">Fr()</th>
								<th scope="col" colspan="2">Total</th>
								<th scope="col" rowspan="2" colspan="2">Location</th>
								<!-- <th scope="col" rowspan="2">Loc1</th>
								<th scope="col" rowspan="2">Loc2</th> -->
							</tr>
							<tr>
								<th scope="col" class="Weekend">Plan</th>
								<th scope="col" class="Weekend">Actual</th>
								<th scope="col" class="Weekend">Plan</th>
								<th scope="col" class="Weekend">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
								<th scope="col">Plan</th>
								<th scope="col">Actual</th>
						</thead>
						<tfoot id="timeSheetMonitorList">
						</tfoot>
						<tbody id="timeReportList_R">
						</tbody>
					</table>
				</div>
            	<!--// Right(Scrolltab) End -->
            </div>
            <!--// Table Area -->
            
            <!-- 행추가 -->
			<div class="btn-area">
				<button type="button" class="btn btn-default btn-basic" id="addTr"><i class="fa fa-plus"></i> 행추가</button>
			</div>
			<!--// 행추가 -->
</body>

<!-- Engagement Code Search Modal -->
<div class="modal fade" id="searchEng" tabindex="-1" role="dialog" aria-labelledby="searchEngLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel">Engagement Code 검색</h4>			
			</div>
			<div class="modal-body">
				
				
				<div class="form-group input-group">
					<input type="hidden" class="form-control" id="targetRowId">
					<input type="text" class="form-control" id="searchEngWord">
					<span class="input-group-btn">
						<button class="btn btn-default" onClick="searchEng()" style="height:34px;" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
				
				<b>*Engagement Name과 code 및 EP, EM의 이름으로 검색 가능합니다.</b>
				<p align="right" id = "nonChargeablePtag" class ="pnt"><b> Non - Chargeable Code </b><i class="fa fa-search"></i></p>
				
				
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head" id="engagementTable">
						<colgroup>
							<col style="width:20%;"></col>
							<col style="width:20%;"></col>
							<col style="width:10%;"></col>
							<col style="width:20%;"></col>
							<col style="width:20%;"></col>
							<col style="width:10%;"></col>
						<colgroup>
						<thead>
							<tr>
								<th>Eng Name</th>
								<th>Eng Code</th>								
								<th>Type</th>
								<th>EP</th>
								<th>EM</th>
								<th>Status</th>
								<th>Client Name</th>
								<th>Client Code</th>
								<th>Time Allowed From</th>
								<th>Time Allowed To</th>
							</tr>
						</thead>
						<tbody id="searchEngList">
						</tbody>
					</table>
				</div>
			</div>		
			<!-- modal-footer -->
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onClick="addSearchEngModalRow($('input#targetRowId').val())">직접 입력</button>
				<button type="button" class="btn btn-info" onClick="setEng($('input#targetRowId').val())">확인</button>				
				<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>               
			</div>
			<!-- //modal-footer -->
		</div>		
	</div>
</div>
<!-- Engagement Code Search Modal -->

<!-- 직원 검색  Modal -->
<div class="modal fade" id="searchApprModal" tabindex="-1" role="dialog" aria-labelledby="searchApprModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel">결재 승인권자 조회</h4>			
			</div>
			
			<div class="modal-body">
				<div class="form-group input-group">
					<input type="hidden" class="form-control" id="targetRowId_ep">
					<input type="text" class="form-control" id="searchApprWord">
					<span class="input-group-btn">
						<button class="btn btn-default" onclick="searchApprList()" style="height:34px;" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
				
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head" id="engagementTable">
						<colgroup>							
							<col style="width:15%;"></col>
							<col style="width:15%;"></col>
							<col style="width:30%;"></col>
							<col style="width:20%;"></col>
							<col style="width:20%;"></col>								
						<colgroup>
						<thead>
							<tr>
								<th>이름</th>
								<th>부서</th>								
								<th>EMAIL</th>
								<th>GPN</th>
								<th>GUI</th> <!-- 21.12.13 추가 - 윤정 -->									
							</tr>
						</thead>
						<tbody id="apprList">
						</tbody>
					</table>
				</div>					
				
			</div>
									
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onClick="setEp($('input#targetRowId_ep').val())">확인</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>                   
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- Location Code Search Modal -->
<div class="modal fade" id="searchLoc" tabindex="-1" role="dialog" aria-labelledby="searchLocLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel">Location 검색</h4>			
			</div>
			<div class="modal-body">				
				
				<div class="form-group input-group">
					<input type="hidden" class="form-control" id="targetRowId_loc">
					<input type="text" class="form-control" id="searchLocWord">
					<span class="input-group-btn">
						<button class="btn btn-default" onClick="searchLoc()" style="height:34px;" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
				
				<b>* 최대 100개 까지 조회됩니다. 검색어를 입력해주세요.</b>
				<!--  <p align="right" id = "nonChargeablePtag" class ="pnt"><b> Non - Chargeable Code </b><i class="fa fa-search"></i></p>
				-->				
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head" id="locTable">
						<thead>
							<tr>
								<th colspan='2'>Loc1</th>						
								<th colspan='2'>Loc2</th>
							</tr>
						</thead>
						<tbody id="searchLocList">
						</tbody>
					</table>
				</div>
			</div>		
			<!-- modal-footer -->
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onClick="setLoc($('input#targetRowId_loc').val())">확인</button>				
				<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>               
			</div>
			<!-- //modal-footer -->
		</div>		
	</div>
</div>
<!-- Location Code Search Modal -->

<!-- 재요청 Modal -->
<div class="modal fade" id="transferTimeSheetModal" tabindex="-1"
	role="dialog" aria-labelledby="searchApprModalLabel"
	aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel"> 변경 사유 </h4>			
			</div>
			<!-- modal-body -->
			<div class="modal-body">			
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head" id="transferReasonTable">
						<colgroup>							
							<col style="width:30%;"></col>
							<col style="width:10%;"></col>
							<col style="width:60%;"></col>						
						<colgroup>
						<thead>
							<tr>
								<th>Engagement</th>
								<th>Ep</th>
								<th>변경 사유</th>								
							</tr>
						</thead>
						<tbody id="transferList">
						</tbody>
					</table>
				</div>					
				
			</div>
			<!-- //modal-body -->

			<!-- modal-footer -->
			<div class="modal-footer">
				<button type="button" id="transferReasonBtn" class="btn btn-success" onclick="compareActualWithPlan()">승인 요청</button>
			</div>
			<!-- //modal-footer -->
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- //재요청 Modal -->

<!-- Set Delegator Modal -->
<div class="modal fade" id="setDelegatorModal" tabindex="-1" role="dialog" aria-labelledby="searchApprModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel"> Delegator 설정 </h4>			
			</div>
			
			<div class="modal-body">
				<div class="form-group input-group">
					<input type="text" class="form-control" id="searchDelegator" onKeypress="if(event.keyCode == 13){searchDelegator($('input#searchDelegator').val());}" >
					<span class="input-group-btn">
						<button class="btn btn-default" id="searchDelegatorBtn" onclick = "searchDelegator($('input#searchDelegator').val())" style="height:34px;" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
				
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head table-hover" id="delegatorInfoTable">
						<colgroup>							
							<col style="width:15%;"></col>
							<col style="width:20%;"></col>
							<col style="width:25%;"></col>
							<col style="width:20%;"></col>	
							<col style="width:20%;"></col>						
						<colgroup>
						<thead>
							<tr>
								<th>이름</th>
								<th>부서</th>								
								<th>EMAIL</th>
								<th>GPN</th>	
								<th>GUI</th> <!-- 21.12.14 추가 - 윤정 -->							
							</tr>
						</thead> 
						<tbody id="delegatorInfoList">
						</tbody>
					</table>
				</div>					
				
			</div>
									
			<div class="modal-footer">
				<button type="button" id = "insertDelegator" class="btn btn-info" onClick="setDelegator($('input#searchDelegator').val() , this)">등록</button>
				<button type="button" id = "deleteDelegator" class="btn btn-danger" onClick="setDelegator($('input#searchDelegator').val() , this)">삭제</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>                   
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- //End Delegator Modal -->

<!-- retain time diff(actual과 plan간의) Modal -->
<div class="modal fade" id="timeDiffReasonModal" tabindex="-1" role="dialog" aria-labelledby="timeDiffReasonModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close closeTimeDiffReason" data-dismiss="modal" aria-hidden="true">&times;</button>	
				<h4 class="modal-title" id="myModalLabel">사유서 제출</h4>			
			</div>
			
			<div class="modal-body">
				<input type="hidden" class="form-control" id="tsDesc">
				<div class="table-responsive" style="margin-top:5px;max-height:250px;" >
					<table class="table table-bordered tx-center tx-head" id="timeDiffReasonTable">
						<colgroup>							
							<col style="width:25%;"></col>
							<col style="width:15%;"></col>
							<col style="width:10%;"></col>
							<col style="width:10%;"></col>	
							<col style="width:40%;"></col>						
						<colgroup>
						<thead>
							<tr>
								<th>Engagement</th>
								<th>Ep</th>
								<th>Plan</th>								
								<th>Actual</th>
								<th>변경 사유</th>								
							</tr>
						</thead>
						<tbody id="timeDiffReasonList">
						</tbody>
					</table>
				</div>					
				
			</div>
									
			<div class="modal-footer">
				<button type="button" id="RequestTimeDiffReasonBtn" class="btn btn-info" onClick="requestTimeReport($('input#tsDesc').val())">확인</button>                 
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- copy timeSheetDateList Modal -->
<div class="modal fade" role="dialog" id="copyDatelistModal">
	<div class="modal-dialog" style="width: 350px; font-size:15px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="copylistModal">Date List</h4>
			</div>
			<div class="modal-body">
				<p>* copy할 TimeSheet 주차를 선택해주세요.</p>
				<table class="table table-condensed mt10" id="DateList"></table>
			</div>
		</div>
	</div>
</div>
<!-- /.modal -->

<!-- copy timeSheetList Modal -->
<div class="modal fade" role="dialog" id="copyTimeSheetlistModal">
	<div class="modal-dialog" style="width: 1300px; font-size:14px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<button class="btn btn-default btn-search" id="addtimeSheetBtn" style="margin-right:20px;float:right;" onclick="addCopytimeSheet()" type="button">추가</button>
				<h4 class="modal-title" id="copylistModal">TimeSheet List</h4>
			</div>
			<div class="modal-body" style="overflow-x: auto;">
				<table class="table table-hover table-condensed table-bordered text-center th-size">
					<thead>
						<tr>
							<th width="2%"><input name="copyAll" id="copyAll" type="checkbox" class="check-all-copy"></th>
							<th width="8%">STATUS</th>
							<th width="6%">Type</th>
							<th width="10%">Engagement Code</th>
							<th width="7%">EP</th>
							<th width="20%">Engagement Name</th>
							<th width="20%">Description</th>
							<th width="7%">Activity</th>
							<th width="7%">Sub Activity</th> <!-- [24.03][정혜원] sub activity code 생성 -->
							<!-- Service Line = '01'일 경우만 표시 -->							
<%-- 							<c:if test="${sl == '01' }"> --%>
<!-- 								<th width="7%">재택 여부</th> 재택 여부 -->
<%-- 							</c:if> --%>
							<th width="3%">토</th>
							<th width="3%">일</th>
							<th width="3%">월</th>
							<th width="3%">화</th>
							<th width="3%">수</th>
							<th width="3%">목</th>
							<th width="3%">금</th>
						</tr>
					</thead>
					<tbody id="copyTimeSheetList"></tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- 감사코드 독립성 확인 체크 modal -->
<div class="modal fade" role="dialog" id="independenceChkModal">
	<div class="modal-dialog" style="width: 800px; font-size:14px;">
		<div class="modal-content">
			<input type="hidden" id="rowNumArr" value="">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<p class="modal-title" id="engagementInfo" style="font-size:16px; color:#ffe600;"></p>
			</div>
			
			<div class="modal-body" style="overflow-x: auto;">
				<div class="col" style="text-align:center;">
					<label>감사(검토)참여자 독립성 확인서<br><br></label>
				</div>
			
				<div class="col">
					<span>
						본인은 해당 TimeSheet 제출 주 전체 기간에 대해 다음 사항을 확인합니다.<br><br>
						본인은 국내 공인회계사법과 공인회계사윤리기준 및 EYG Independence Policy 등에서 요구하는 아래에 요약된 독립성
						요구사항에 관한 법인의 정책을 충분히 숙지하고 있습니다. 본인(배우자 및 부양직계가족 포함)은 <span id='clientList'></span>
						뿐만 아니라 그 종속회사들 및 중요한 관계회사들 (이하 "독립성준수대상회사",
						<a href="https://gis.ey.net" target="_blank" style="color: blue; text-decoration: underline;">EY.GIS.Web</a>)에 대하여 독립성 준수 대상기간
						(감사대상 회계연도 개시일로부터 감사보고서 발행일까지)동안 이러한  독립성 요구 정책을 준수하고 있습니다. 
						<br><br>
						1. 독립성준수대상회사의 감사 (검토) 참여자로서<br><br>
							&emsp;a) 본인은 독립성준수대상회사에 대해 어떠한 재무적 이해관계가 없음. 특히 본인은 독립성준수대상회사의<br>
							&emsp;&emsp;주식 또는 출자지분을 소유하지 않으며 당해 감사대상회사(관계회사 제외)와 3천만원 이상의 채권<br>
							&emsp;&emsp;(예금자보호법에 따라 보호되는 금액 한도 이내 채권 제외) 또는 채무 관계가 있지 않음.<br>
							&emsp;b) 본인은 독립성준수대상회사 및 그 경영자 또는 그 지배주주와의 공통투자 등 사업관계가 없음.<br>
							&emsp;c) 본인은 독립성준수대상회사의 임직원으로 근무하지 아니하였음. 또한 본인이 독립성준수대상 회사와<br>
							&emsp;&emsp;고용협상을 하는 경우 시작하기 전에 감사담당파트너에게 보고할 것임.<br>
							&emsp;d) 본인의 배우자 및 부양 직계가족 또는 상기 1.a)항 내지 1.c)항을 모두 준수하고 있으며,<br>
							&emsp;&emsp;상기 독립성준수대상회사와 고용관계를 유지하고 있지 않음.<br>
						<br>
						2. 본인은 EY Global Code of Conduct 및 Confidentiality Policy에 따라 감사(검토)과정 또는 감사(검토)를 수행한 결과<br>
							&emsp;지득한 독립성준수대상회사의 비밀과 미공개정보(회사제출자료, 감사(검토)조서, 감사의견 등)를 보호할 것이며,<br>
							&emsp;정당한 사유없이 타인에게 누설하지 않을 것임. 또한 본인은 Insider Trading Policy에 따라 <br>
							&emsp;자신 또는 타인의 사적 이익을 위해 비밀과 미공개정보를 사용하지 않을 것임.
						<br><br>
						다음에 기재된 사항을 제외하고는 본 확인서에 기재된 모든 내용은 사실이고 정확합니다.<br><br>
					</span>
				</div>	
				
				<div class="col" style="float:left;width:30%;height:60px;">
					<label for="agree"><input class="agree" type="checkbox" style="margin-bottom:10px;" id="agree" name="agree" onclick="independenceAgree(this)"> 확인 후 서명</label> <br>
					<label for="disagree"><input class="agree" type="checkbox" style="margin-bottom:10px;" id="disagree" name="agree" onclick="independenceAgree(this)"> 동의하지 않음</label>
				</div>
				
				<div class="col" style="text-align:center;float:left;width:40%;height:60px;">
					<label>${nowDate}</label><br>
					<label id="activeUserName"></label>
				</div>
				
				<div class="col" style="float:right;width:30%;height:60px;">
					<button type="button" style="float:right;margin-top:15px;" class="btn btn-default btn-search" onClick="submitIndependenceChk()">Submit</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- AIC 독립성 확인서 미제출 내역 존재 modal -->
<div class="modal fade" role="dialog" id="aicModal">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<input type="hidden" id="test" value="">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<p class="modal-title" style="font-size:16px; color:#ffe600;">독립성 확인</p>
			</div>
			
			<div class="modal-body" style="overflow-x: auto;">			
				<div class="col">
					<span>
						감사(검토)참여자 독립성 확인서가 미제출된 내역이 존재합니다.<br>
						제출 페이지로 이동하여 확인서를 제출해주세요.
					</span>
				</div>
				
				<div class="col" style="float:right;width:30%;height:60px;">
					<button type="button" style="float:right;margin-top:15px;" class="btn btn-default btn-search" onClick="moveAicList()">제출 페이지로 이동</button>
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- [22/12/29] 계약서 진행 확인 팝업 -->
<div class="modal fade" role="dialog" id="ctrModal">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<input type="hidden" id="test" value="">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<p class="modal-title" style="font-size:16px; color:#ffe600;">계약서 진행 확인</p>
			</div>
			
			<div class="modal-body" style="overflow-x: auto;">		
				<table style="margin-bottom:35px" class="table table-hover table-condensed table-bordered text-center th-size">
					<thead>
						<tr>
							<th width="10%">Engagement Code</th>
							<th width="20%">Engagement Name</th>
							<th width="70%">Description</th>
						</tr>
					</thead>
					<tbody id="earlyEngList"></tbody>
				</table>		
				<div>
					<button type="button" style="position: fixed; bottom: 20px; right: 15px; z-index: 999;" class="btn btn-default btn-search" onClick="moveCtrList()">계약 관리 시스템으로 이동</button>
				</div>		
			</div>
		</div>
	</div>
</div>

<!-- 타임시트 대리 접속  Modal : [2024.08][박유란] 컨설팅 RPM 요청으로 추가함  -->
<div class="modal fade" id="inActiveUserModal" tabindex="-1" role="dialog" aria-labelledby="reqTimeSheetModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- modal-header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h2 class="text-center"> 타임시트 대리 접속 </h2>
			</div>
			<!-- //modal-headers -->
			<div class="panel panel-default" style="margin-top: 5px;">
				<!-- panel-body -->
				<div class="panel-body">
					<div class="row" style="margin-top: 10px;">
						<label class="stit">&nbsp; &nbsp; &nbsp; &nbsp; GUI : </label>
						<input class="fa form-control w120" id="inActiveUserInput">
					</div>
				</div>
				<!-- //panel-body -->
			</div>
			
			<!-- modal-footer -->
			<div class="modal-footer">
	
			    <a id="inActiveUserReqPageLink" href=""> TimeSheet 제출</a>
			
			</div>
			<!-- //modal-footer -->
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- // 타임시트 대리 접속  Modal -->

</html>