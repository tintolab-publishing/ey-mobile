const PubData = {
    '/timeSheet/selectStatusCount.do': {
        data: {
            result: {
                TSDraft: 2,
                TSRejected: 2,
                TSWaiting: 1,
                TSConfirmWaiting: 2,
                ThisWeek: "Incomplete"
            }
        }
    },
    '/roundRobin2/api/selectRoundRobinState.do': {
        data: {
            userPending: [1, 2],
            userComplete: [2, 3],
            userReject: [3, 4],
            approverPending: [4, 5]
        }
    },
    '/expense/expcenseStatusCount.do': {
        data: {
            payment_Req_FA_Count: 1,
            payment_Req_SA_Count: 1,
            payment_Req_CP_Count: 1,
            payment_Appr_PRC_Count: 1
        }
    },
    '/procurement/api/selectSubcontractDashboard.do': {
        data: {
            approvalCount: 1,
            approvedCount: 1,
            waitingCount: 1
        }
    },
    '/main/selectMyInfo.do': {
        data: {
            myInfo: {
                CEL_PHONE: "+82 10 4406 4640",
                LOCAL_POSITION_CODE: "59",
                EXT_NO: "",
                GPN: "20230064818",
                ASSISTANT_EXT_NO: "",
                SERVICE_LINE: "09",
                POSITION_NAME: "직원",
                ASSISTANT_NAME: "",
                ASSISTANT_INTERNET_ADDR: "",
                LPN: "24358     ",
                ASSISTANT_LPN: "",
                KOR_NAME: "홍길동",
                E_MAIL: "Gildong.Hong@kr.ey.com",
                ENG_NAME: "Gildong Hong",
                SERVICE_LINE_NAME: "CBS",
                ASSISTANT_CEL_PHONE: "",
                DEPART_NAME: "CBS General-IT",
                EY_RANK: "66"
            }
        }
    },
    '/main/selectPeopleInfo.do': (data) => {
        const searchWord = data.searchWord || '';
        const resultList = [
            {
                CEL_PHONE: "+82 10 4406 4640",
                LOCAL_POSITION_CODE: "59",
                EXT_NO: "",
                GPN: "20230064818",
                ASSISTANT_EXT_NO: "02 222 2222",
                SERVICE_LINE: "09",
                POSITION_NAME: "사원",
                ASSISTANT_NAME: "김철수",
                ASSISTANT_INTERNET_ADDR: "choel@email.com",
                LPN: "24358     ",
                ASSISTANT_LPN: "2222",
                KOR_NAME: "홍길동",
                E_MAIL: "Gildong.Hong@kr.ey.com",
                ENG_NAME: "Gildong Hong",
                SERVICE_LINE_NAME: "CBS",
                ASSISTANT_CEL_PHONE: "010 1111 1111",
                DEPART_NAME: "CBS General-IT",
                EY_RANK: "66",
                GUI: "2193795"
            },
            {
                CEL_PHONE: "+82 10 4406 4640",
                LOCAL_POSITION_CODE: "59",
                EXT_NO: "",
                GPN: "111111111111",
                ASSISTANT_EXT_NO: "",
                SERVICE_LINE: "09",
                POSITION_NAME: "대리",
                ASSISTANT_NAME: "",
                ASSISTANT_INTERNET_ADDR: "",
                LPN: "24358     ",
                ASSISTANT_LPN: "",
                KOR_NAME: "홍길동1",
                E_MAIL: "Gildong.Hong1@kr.ey.com",
                ENG_NAME: "Gildong Hong1",
                SERVICE_LINE_NAME: "CBS",
                ASSISTANT_CEL_PHONE: "",
                DEPART_NAME: "EY Technology",
                EY_RANK: "66",
                GUI: "2193795"
            },
            {
                CEL_PHONE: "+82 10 4406 4640",
                LOCAL_POSITION_CODE: "59",
                EXT_NO: "",
                GPN: "222222222222",
                ASSISTANT_EXT_NO: "",
                SERVICE_LINE: "09",
                POSITION_NAME: "과장",
                ASSISTANT_NAME: "",
                ASSISTANT_INTERNET_ADDR: "",
                LPN: "24358     ",
                ASSISTANT_LPN: "",
                KOR_NAME: "홍길동2",
                E_MAIL: "Gildong.Hong2@kr.ey.com",
                ENG_NAME: "Gildong Hong2",
                SERVICE_LINE_NAME: "CBS",
                ASSISTANT_CEL_PHONE: "",
                DEPART_NAME: "CBS General-IT2",
                EY_RANK: "66",
                GUI: "2193795"
            },
            {
                CEL_PHONE: "+82 10 4406 4640",
                LOCAL_POSITION_CODE: "59",
                EXT_NO: "",
                GPN: "333333333333",
                ASSISTANT_EXT_NO: "",
                SERVICE_LINE: "09",
                POSITION_NAME: "차장",
                ASSISTANT_NAME: "",
                ASSISTANT_INTERNET_ADDR: "",
                LPN: "24358     ",
                ASSISTANT_LPN: "",
                KOR_NAME: "홍길동3",
                E_MAIL: "Gildong.Hong3@kr.ey.com",
                ENG_NAME: "Gildong Hong3",
                SERVICE_LINE_NAME: "CBS",
                ASSISTANT_CEL_PHONE: "",
                DEPART_NAME: "CBS General-IT",
                EY_RANK: "66",
                GUI: "2193795"
            },
        ];

        const filteredPeople = resultList.filter(person =>
            person.KOR_NAME.toLowerCase().includes(searchWord.toLowerCase()) ||
            person.E_MAIL.toLowerCase().includes(searchWord.toLowerCase()) ||
            person.ENG_NAME.toLowerCase().includes(searchWord.toLowerCase()) ||
            person.GPN.toLowerCase().includes(searchWord.toLowerCase())
        );

        return {
            data: {
                resultList: filteredPeople
            }
        };
    },
    '/procurement/api/selectSubcontractApprovalList.do': (data) => {
        const processingData = [
            {
                "companyNameKorean": "(주)새연에스엔에스",
                "subcontractCode": "P0001502",
                "engagementName": "Procurement Test",
                "rdoApprovalDate": "          ",
                "epApprovalDate": "2023-04-12",
                "dhApprovalDate": "N/A",
                "gmApprovalDate": "2023-06-12",
                "rmpApprovalDate": "N/A",
                "vendorService": "Test",
                "projectDescription": "Procurement Test",
                "requestDate": "2022-06-29",
                "approvalId": 1846,
                "approvalGpn": "KR010012715",
                "subcontractRevision": 2,
                "engagementId": "",
                "MERC_ENGAGEMENT_CODE": "",
                "pmApprovalDate": "2023-03-16",
                "createDate": "2022-02-14"
            },
            {
                "companyNameKorean": "(주)오픈시스넷",
                "subcontractCode": "P0001467",
                "engagementName": "TC_22_ISC_HYOSUNGTNS_NHA WOS",
                "rdoApprovalDate": "2021-09-07",
                "epApprovalDate": "2021-09-07",
                "dhApprovalDate": "2021-12-17",
                "gmApprovalDate": "2021-09-07",
                "rmpApprovalDate": "N/A",
                "vendorService": "UI/UX 기획및 설계, Java & Java script 개발, eCommerce 구축 경험 인력 보유",
                "projectDescription": "TC_22_ISC_HYOSUNGTNS_NHA WOS_UIUX 기획 및 시스템개발",
                "requestDate": "2021-09-06",
                "approvalId": 1799,
                "approvalGpn": "KR010013310",
                "subcontractRevision": 1,
                "engagementId": "",
                "MERC_ENGAGEMENT_CODE": "",
                "pmApprovalDate": "2021-09-06",
                "createDate": "2021-09-03"
            },
        ];

        const completeData = [
            {
                "companyNameKorean": "수 번역회사",
                "subcontractCode": "P0001438",
                "engagementName": "TAX/YHN/FY21/20TPD/PfizerKorea",
                "rdoApprovalDate": "N/A",
                "epApprovalDate": "2023-04-07",
                "dhApprovalDate": "2021-09-07",
                "gmApprovalDate": "2021-09-07",
                "rmpApprovalDate": "N/A",
                "vendorService": "영한번역",
                "projectDescription": "TAX.YHN.FY21.20TPD.PfizerKorea",
                "requestDate": "2021-08-23",
                "approvalId": 1766,
                "approvalGpn": "KR010014303",
                "subcontractRevision": 1,
                "engagementId": "22560728",
                "MERC_ENGAGEMENT_CODE": "E-22560728",
                "pmApprovalDate": "2021-08-23",
                "createDate": "2021-08-23"
            },
            {
                "companyNameKorean": "이촌회계법인",
                "subcontractCode": "P0001384",
                "engagementName": "TD/FY22/오동혁/S",
                "rdoApprovalDate": "N/A",
                "epApprovalDate": "2023-08-10",
                "dhApprovalDate": "N/A",
                "gmApprovalDate": "2021-09-07",
                "rmpApprovalDate": "N/A",
                "vendorService": "Echon was involved in the same project in FY20.",
                "projectDescription": "Project S",
                "requestDate": "2021-08-20",
                "approvalId": 1683,
                "approvalGpn": "KR010012998",
                "subcontractRevision": 1,
                "engagementId": "",
                "MERC_ENGAGEMENT_CODE": "",
                "pmApprovalDate": "2021-08-20",
                "createDate": "2021-07-15"
            },
        ];

        if (data.approvalStatusCode === 'PROCESSING') {
            return { data: processingData };
        } else if (data.approvalStatusCode === 'COMPLETE') {
            return { data: completeData };
        }

        return { data: [] };
    },
    '/procurement/api/selectSubcontractList.do': (data) => {
        const processingData = [
            {
                "supplierBeginDate": "2024-08-01",
                "seviceLineCodeName": "CONS",
                "taxTypeCodeName": "부가세 (VAT)",
                "supplierEndDate": "2024-08-31",
                "companyNameKorean": "(주)하이아스",
                "subseviceLineCode": "KDS",
                "clientName": "Ernst & Young Han Young",
                "engagementName": "IAW_FY22 Digital EY Rollout",
                "paymentTotalAmount": 2826504447.00,
                "previousRevisionDiffAmount": 0,
                "corporationCodeName": "이와이케이디에스 유한회사",
                "engagementManagerGpnName": "권호한",
                "subcontractUseYn": "N",
                "engagementManagerGpn": "KR010014009",
                "subcontractDate": "2024-07-30",
                "taxTypeCode": "VAT",
                "taxPercent": "10",
                "subcontractStatus": "APR",
                "MERC_ENGAGEMENT_CODE": "E-22728843",
                "seviceLineCode": "ADV",
                "taxType": "부가세",
                "createDate": "2024-10-01",
                "createGpn": "KR010014224",
                "corporationCode": "KDS",
                "subcontractCode": "P0001639",
                "subcontractStatusName": "승인 진행 중",
                "paceId": "O-2719784",
                "createGpnName": "서동수",
                "preInputYn": "N",
                "engagementPartnerGpnName": "권호한",
                "engagementPartnerGpn": "KR010014009",
                "projectDescription": "FY25 디자인 적용전 테스트 ",
                "supplierContractValue": 50000000.00,
                "monthlyPayRate": 25000000.00,
                "sorucingBuyerGpn": "KR010014224",
                "supplierType": "COR",
                "subcontractRevision": 1,
                "engagementId": "22728843"
            },
            {
                "supplierBeginDate": "2022-12-31",
                "seviceLineCodeName": "FSO CONS",
                "taxTypeCodeName": "원천징수(WHT)",
                "supplierEndDate": "2024-04-01",
                "companyNameKorean": "최형재",
                "subseviceLineCode": "FSO BC-Customer-IED",
                "clientName": "KakaoBank Corp.",
                "engagementName": "BVBD/2022/임성준/카카오뱅크/신용카드인가",
                "paymentTotalAmount": 476802860.00,
                "previousRevisionDiffAmount": 0,
                "corporationCodeName": "이와이컨설팅 유한책임회사",
                "engagementManagerGpnName": "서동수",
                "subcontractUseYn": "N",
                "engagementManagerGpn": "KR010014224",
                "subcontractDate": "2024-04-29",
                "taxTypeCode": "WHT",
                "taxPercent": "3.3",
                "subcontractStatus": "APR",
                "MERC_ENGAGEMENT_CODE": "E-66617063",
                "seviceLineCode": "FAD",
                "taxType": "원천징수",
                "createDate": "2024-10-02",
                "createGpn": "KR010022730",
                "corporationCode": "CSL",
                "subcontractCode": "P0001631",
                "subcontractStatusName": "승인 진행 중",
                "paceId": "26601631",
                "createGpnName": "이예솔",
                "preInputYn": "N",
                "engagementPartnerGpnName": "임성준",
                "engagementPartnerGpn": "KR010010513",
                "projectDescription": "카카오뱅크 신용카드업 예비허가 획득 컨설팅",
                "supplierContractValue": 63000000.00,
                "monthlyPayRate": 18000000.00,
                "sorucingBuyerGpn": "KR010014882",
                "supplierType": "PER",
                "subcontractRevision": 1,
                "engagementId": "66617063"
            },
        ];

        const completeData = [
            {
                "supplierBeginDate": "2024-03-01",
                "seviceLineCodeName": "CONS",
                "taxTypeCodeName": "부가세 (VAT)",
                "supplierEndDate": "2024-03-22",
                "companyNameKorean": "(주)이든티앤에스",
                "subseviceLineCode": "EYH, EYC, EYAI, EYP",
                "clientName": "-",
                "engagementName": "Engagement Name #1",
                "paymentTotalAmount": 10000000.00,
                "previousRevisionDiffAmount": 0,
                "corporationCodeName": "이와이컨설팅 유한책임회사",
                "engagementManagerGpnName": "이예솔",
                "subcontractUseYn": "N",
                "engagementManagerGpn": "KR010022730",
                "subcontractDate": "2024-03-21",
                "taxTypeCode": "VAT",
                "taxPercent": "10",
                "subcontractStatus": "IND",
                "MERC_ENGAGEMENT_CODE": "",
                "seviceLineCode": "ADV",
                "taxType": "부가세",
                "createDate": "2024-10-03",
                "createGpn": "KR010019113",
                "corporationCode": "CSL",
                "subcontractCode": "P0001624",
                "subcontractStatusName": "승인 완료",
                "paceId": "-",
                "createGpnName": "조요섭",
                "preInputYn": "N",
                "engagementPartnerGpnName": "서동수",
                "engagementPartnerGpn": "KR010014224",
                "projectDescription": "TC_21_JSH_Samsung_Semiconductor Web Renovation ",
                "supplierContractValue": 5500000.00,
                "monthlyPayRate": 1000000.00,
                "sorucingBuyerGpn": "KR010014224",
                "supplierType": "COR",
                "subcontractRevision": 1,
                "engagementId": ""
            },
            {
                "supplierBeginDate": "2024-03-01",
                "seviceLineCodeName": "CONS",
                "taxTypeCodeName": "부가세 (VAT)",
                "supplierEndDate": "2024-03-18",
                "companyNameKorean": "(주)이든티앤에스",
                "subseviceLineCode": "EYH, EYC, EYAI, EYP",
                "clientName": "-",
                "engagementName": "TSBD-23/류진호/하나은행/ONE Pre Biz PI/PMO",
                "paymentTotalAmount": 0.00,
                "previousRevisionDiffAmount": 0,
                "corporationCodeName": "이와이컨설팅 유한책임회사",
                "engagementManagerGpnName": "서동수",
                "subcontractUseYn": "N",
                "engagementManagerGpn": "KR010014224",
                "subcontractDate": "2024-04-25",
                "taxTypeCode": "VAT",
                "taxPercent": "10",
                "subcontractStatus": "IND",
                "MERC_ENGAGEMENT_CODE": "",
                "seviceLineCode": "ADV",
                "taxType": "부가세",
                "createDate": "2024-10-04",
                "createGpn": "KR010019113",
                "corporationCode": "CSL",
                "subcontractCode": "P0001622",
                "subcontractStatusName": "승인 완료",
                "paceId": "-",
                "createGpnName": "조요섭",
                "preInputYn": "N",
                "engagementPartnerGpnName": "서동수",
                "engagementPartnerGpn": "KR010014224",
                "projectDescription": "TC_21_JSH_Samsung_Semiconductor Web Renovation ",
                "supplierContractValue": 120000.00,
                "monthlyPayRate": 0.00,
                "sorucingBuyerGpn": "KR010014224",
                "supplierType": "COR",
                "subcontractRevision": 1,
                "engagementId": ""
            },
        ];

        if (data.subcontractStatus === 'APR') {
            return { data: processingData };
        } else if (data.subcontractStatus === 'IND') {
            return { data: completeData };
        }

        return { data: [] };
    },
    '/procurement/api/selectSubcontract.do': (data) => {
        const detailData = {
            req: {
                "engagementBillingList": [],
                "subcontractApprovals": [
                    {
                        "approvalRole": "PM",
                        "sendEmailYn": "Y",
                        "updateDate": "2023-03-16",
                        "createGpn": "KR010019113",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Dongsoo.Seo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010014224",
                        "sequence": 1,
                        "approvalRank": "이사",
                        "approvalRequestDate": "2022-06-29",
                        "approvalTypeName": "",
                        "approvalRoleName": "Procurement",
                        "approvalId": 1846,
                        "approvalGpn": "KR010014224",
                        "approvalGpnName": "서동수",
                        "delegateGpn": "",
                        "fileId": 0,
                        "createDate": "2022-06-29"
                    },
                    {
                        "approvalRole": "EP",
                        "sendEmailYn": "Y",
                        "updateDate": "2023-04-12",
                        "createGpn": "KR010019113",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Yoseop.Jo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010019113",
                        "sequence": 2,
                        "approvalRank": "직원",
                        "approvalRequestDate": "2023-03-16",
                        "approvalTypeName": "",
                        "approvalRoleName": "EP",
                        "approvalId": 1846,
                        "approvalGpn": "KR010019113",
                        "approvalGpnName": "조요섭",
                        "delegateGpn": "",
                        "fileId": 0,
                        "createDate": "2022-06-29"
                    },
                    {
                        "approvalRole": "GM",
                        "sendEmailYn": "Y",
                        "updateDate": "2023-06-12",
                        "createGpn": "KR010019113",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Yoseop.Jo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010019113",
                        "sequence": 3,
                        "approvalRank": "직원",
                        "approvalRequestDate": "2023-04-12",
                        "approvalTypeName": "",
                        "approvalRoleName": "부문대표",
                        "approvalId": 1846,
                        "approvalGpn": "KR010019113",
                        "approvalGpnName": "조요섭",
                        "delegateGpn": "",
                        "fileId": 0,
                        "createDate": "2022-06-29"
                    },
                    {
                        "approvalRole": "RDO",
                        "sendEmailYn": "Y",
                        "updateDate": "          ",
                        "createGpn": "KR010019113",
                        "approvalStatusCodeName": "",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Bokhan.Lee@kr.ey.com",
                        "approvalStatusCode": "",
                        "updateGpn": "KR010019113",
                        "sequence": 4,
                        "approvalRank": "본부장",
                        "approvalRequestDate": "2023-06-12",
                        "approvalTypeName": "",
                        "approvalRoleName": "RDO",
                        "approvalId": 1846,
                        "approvalGpn": "KR010012715",
                        "approvalGpnName": "이복한",
                        "delegateGpn": "",
                        "fileId": 0,
                        "createDate": "2022-06-29"
                    }
                ],
                "subcontractAbc": {
                    "surveyStatus": "NOT",
                    "researchResult": "",
                    "companyNameKorean": "(주)새연에스엔에스",
                    "abcRequestGpn": "",
                    "vendorId": 20,
                    "researchResultName": "",
                    "expirationStatus": "실사 대상 아님",
                    "vendorService": "FWP_FY22 Digital _ 법인내부 시스템 개발 및 RPA 운영 ( AP, 구매, BD, T&E, RPA ) ",
                    "gfisCid": "",
                    "abcId": 924,
                    "chargerNameKorean": "김종식",
                    "cpi": "61.0",
                    "countryEnglish": "KOR",
                    "abcRequestName": "",
                    "chargerEmail": "jskim6841@gmail.com",
                    "createGpn": "KR010014224",
                    "contractPurpose": "하도급",
                    "vendorSelectionReason": "법인내 시스템 유지보수를 지속적으로 담당하고 있음.  ",
                    "abcStatus": "Y",
                    "surveyStatusName": "미발송",
                    "serviceAmountCurrency": "KRW",
                    "subcontractingYn": "S",
                    "researchStatusName": "실사 대상 아님",
                    "countryEnglishName": "Korea, South",
                    "eyPartnerGpn": "KR010014009",
                    "existingEyClientYn": "N",
                    "eyPartnerName": "권호한",
                    "contractAmount": 341000000,
                    "expiration": "",
                    "researchName": "엄민지",
                    "fileId": 2649,
                    "listedCompanyYn": "N",
                    "researchFolder": "",
                    "updateDate": "2021-06-16 13:35:49.923",
                    "researchGpn": "KR010019383",
                    "chargerMobile": "02-561-3937",
                    "baseYear": "2021",
                    "eyChargerEmail": "Dongsoo.Seo@kr.ey.com",
                    "updateGpn": "KR010019383",
                    "eyChargerGpn": "KR010014224",
                    "serviceAmount": 0,
                    "abcRequestYn": "N",
                    "vendorStatusYn": "Y",
                    "useYn": "Y",
                    "cancelReason": "기존  EY클라이언트(PACE ID 22876200)로 실사 대상이 아님.",
                    "createDate": "2021-06-15 11:39:15.963",
                    "eyChargerName": "서동수",
                    "eyPartnerEmail": "Ho-Han.Kwon@kr.ey.com",
                    "eyServiceLine": "ASS|TAX|ADV|TAS|FAS|FTX|FAD|FTS|CBS",
                    "abcRequestEmail": "",
                    "researchStatus": "NOT",
                    "contractAmountCurrency": "KRW",
                    "eyCorporation": "CSL",
                    "visaRelatedWorkYn": "N",
                    "identificationNumber": "2208718139"
                },
                "appendEmail": "Yoseop.Jo@kr.ey.com;sung-jin.kim@kr.ey.com;",
                "subcontractInsuranceMaster": {},
                "subcontractMasterInfomation": {
                    "indepenceAttachFileName": "",
                    "resourcePlanComment": "Test",
                    "updateDate": "2022-06-29 04:45:25.037",
                    "updateGpn": "KR010019113",
                    "nonStandDardAttachFileName": "",
                    "bretAttachFileName": "BRET - 7245142(Saeyon SNS Co. Ltd) 연장 완료.msg",
                    "subcontractUseYn": "N",
                    "qualitytAttachFileName": "Quality approval.bmp",
                    "approvalId": 1846,
                    "subcontractStatus": "APR",
                    "createDate": "2022-02-14 04:13:06",
                    "bretAttachFileSequence": 3,
                    "createGpn": "KR010019113",
                    "requestType": "REU",
                    "resourcePlanGpn": "KR010000729",
                    "subcontractCode": "P0001502",
                    "sorucingBuyerGpnName": "서동수",
                    "maxSubcontractRevision": 2,
                    "resourcePlanGpnName": "백성준",
                    "createGpnName": "조요섭",
                    "standDardAttachFileName": "P0001321_1_Ernst & Young Han Young_(주)새연에스엔에스_FWP_FY22 Digital _ 법인내부 시스템 개발 및 RPA 운영 ( AP, 구매, BD, T&E, RPA ) .doc",
                    "preInputYn": "N",
                    "subcontractComment": "Test",
                    "projectDescription": "Procurement Test",
                    "sorucingBuyerGpn": "KR010014224",
                    "subcontractRevision": 2,
                    "fileId": 2940
                },
                "subcontractBret": {
                    "sponsor": "",
                    "updateDate": "2022-06-29 04:45:25.113",
                    "createGpn": "KR010019113",
                    "subcontractCode": "P0001502",
                    "gcspName": "",
                    "thirdPartyEndDate": "          ",
                    "bretId": "12341",
                    "updateGpn": "KR010019113",
                    "bridgeStatus": "",
                    "completeDate": "          ",
                    "existingEyClientYn": "N",
                    "g360Status": "",
                    "preparedBy": "",
                    "anticiStartDate": "          ",
                    "mvrThirdPartyName": "",
                    "gfisCid": "",
                    "bretChannelStatus": "",
                    "subcontractRevision": 2,
                    "independenceComment": "",
                    "createDate": "2022-02-14 04:13:08.917"
                },
                "subcontractQuality": {
                    "sufficientCapacityComment": "",
                    "updateDate": "2022-06-29 04:45:25.130",
                    "subcontractorConnectingYn": " ",
                    "highQualityServiceYn": " ",
                    "liabilityInsuranceCoverageYn": " ",
                    "updateGpn": "KR010019113",
                    "vendorService": "",
                    "sufficientCapabilityReviewYn": " ",
                    "sufficientCapabilityReviewComment": "",
                    "subcontractorRiskManagementYn": " ",
                    "workProduct": "",
                    "subcontractorOutsideYn": " ",
                    "subcontractorMitigateComment": "",
                    "itComponentComment": "",
                    "createDate": "2022-02-14 04:13:09.230",
                    "highQualityServiceComment": "",
                    "indemnityInsuranceCoverageYn": " ",
                    "qualityComment": "",
                    "subcontractorIndicationYn": " ",
                    "createGpn": "KR010019113",
                    "itComponentYn": " ",
                    "vendorSelectionReason": "",
                    "subcontractCode": "P0001502",
                    "sufficientFinancialResourcesComment": "",
                    "sortCode": "",
                    "sufficientCapacityYn": " ",
                    "subcontractorAntiBriberyYn": " ",
                    "indemnityInsuranceCoverageLevel": "",
                    "sufficientFinancialResourcesYn": " ",
                    "liabilityInsuranceCoverageLevel": "",
                    "subcontractorRelationshipYn": " ",
                    "subcontractRevision": 2
                },
                "subcontractEngagement": {
                    "updateDate": "2022-06-29 04:45:25.050",
                    "subseviceLineCode": "9",
                    "clientName": "Procurement Test",
                    "engagementName": "Procurement Test",
                    "engagementBeginDate": "2022-02-01",
                    "channelStatus": "1",
                    "updateGpn": "KR010019113",
                    "totalSubcontractPercent": 9.9,
                    "engagementEndDate": "2022-02-28",
                    "erpPercent": 0.00,
                    "engagementManagerGpnName": "김성진",
                    "engagementManagerGpn": "KR010004444",
                    "engagementCurrencyCode": "KRW",
                    "MERC_ENGAGEMENT_CODE": "",
                    "seviceLineCode": "TAX",
                    "createDate": "2022-02-14 04:13:06.917",
                    "engagementPartnerGpnEngName": "Sang Wook Park",
                    "createGpnEngName": "Yoseop Jo",
                    "clientId": "123456",
                    "createGpn": "KR010019113",
                    "topTotalEngagementRevenue": 809090909.00,
                    "corporationCode": "CSL",
                    "subcontractCode": "P0001502",
                    "engagementType": "PRE",
                    "paceId": "123456",
                    "marginPct": 0.00,
                    "subcontractPercent": 9.9,
                    "contingencyPercent": 0.00,
                    "engagementManagerGpnEngName": "Sung Jin Kim",
                    "crmId": "",
                    "engagementPartnerGpnName": "박상욱",
                    "engagementPartnerGpn": "KR010000821",
                    "totalEngagementRevenue": 2020000000.00,
                    "subcontractRevision": 2,
                    "engagementId": ""
                },
                "engagementBillingSum": {},
                "subcontractCommercial": {
                    "purchasingType": "OTHER",
                    "supplierBeginDate": "2022-02-01",
                    "companyAddressKorean": "서울특별시 강남구 테헤란로14길6 718",
                    "updateDate": "2022-06-29 04:45:25.067",
                    "supplierEndDate": "2022-02-28",
                    "companyNameKorean": "(주)새연에스엔에스",
                    "vendorId": 20,
                    "procurementConfirmYn": "Y",
                    "monthlyBillRate": 999999999.000000,
                    "updateGpn": "KR010019113",
                    "useSystem": "",
                    "vendorService": "Test",
                    "abcYn": "N",
                    "paymentTermsCode": "MIL",
                    "msaAttachFileSequence": 0,
                    "eyEquivalentLevel": "",
                    "deliverableList": "Test",
                    "taxTypeCode": "VAT",
                    "taxPercent": "10",
                    "paymentTermsCodeName": "Milestone",
                    "workScopeComment": "Test",
                    "contractTypeCodeName": "Scope Of Work",
                    "contractTypeCode": "SOW",
                    "createDate": "2022-02-14 04:13:07.057",
                    "ceoNameKorean": "김종식",
                    "msaAttachFileName": "",
                    "createGpn": "KR010019113",
                    "subcontractCode": "P0001502",
                    "dpsddUseYn": "",
                    "reponsibilityComment": "Test",
                    "procurementOverallComment": "Procurement Test",
                    "dpsddScore": "",
                    "supplierTypeName": "Entity(법인/회사)",
                    "supplierContractValue": 200000000.00,
                    "identificationNumber": "2208718139",
                    "monthlyPayRate": 999999999.00,
                    "supplierType": "COR",
                    "subcontractRevision": 2,
                    "regularPositionYn": "N",
                    "currencyCode": "KRW",
                    "companyNameEnglish": "saeyeon SNS",
                    "supplierMargin": 99.0,
                    "fileId": 1048
                },
                "subcontractInsuranceDetailList": [],
                "subcontractApproval": {
                    "updateDate": "2022-06-29 00:53:03.103",
                    "drafterRank": "직원",
                    "createGpn": "KR010019113",
                    "approvalDescription": "",
                    "approvalType": "SUBCONTRACT",
                    "drafterEmail": "Yoseop.Jo@kr.ey.com",
                    "approvalStatusCode": "PROCESSING",
                    "approvalId": 1846,
                    "drafterGpn": "KR010019113",
                    "updateGpn": "KR010019113",
                    "createDate": "2022-02-14 04:13:04.433"
                },
                "procurementGpnEmail": "Dongsoo.Seo@kr.ey.com",
                "subcontractPaymentList": [
                    {
                        "amount": 200000000.00,
                        "tantativePaymentDate": "2022-02-09",
                        "middlePaymentStartDate": "1900-01-01",
                        "middlePaymentCount": 0,
                        "paymentId": 1,
                        "subcontractCode": "P0001502",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2,
                        "middlePaymentEndDate": "1900-01-01",
                        "paymentType": "중도금"
                    }
                ],
                "subcontractBillingList": [
                    {
                        "amount": 404000000.00,
                        "billingId": 1,
                        "tantativeBillingEndDate": "2020-03-12",
                        "billingType": "착수금",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001502",
                        "tantativeBillingBeginDate": "2020-03-12",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2
                    },
                    {
                        "amount": 404000000.00,
                        "billingId": 2,
                        "tantativeBillingEndDate": "2020-09-13",
                        "billingType": "중도금",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001502",
                        "tantativeBillingBeginDate": "2020-09-13",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2
                    },
                    {
                        "amount": 404000000.00,
                        "billingId": 3,
                        "tantativeBillingEndDate": "2020-09-13",
                        "billingType": "중도금",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001502",
                        "tantativeBillingBeginDate": "2020-09-13",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2
                    },
                    {
                        "amount": 404000000.00,
                        "billingId": 4,
                        "tantativeBillingEndDate": "2020-12-13",
                        "billingType": "중도금",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001502",
                        "tantativeBillingBeginDate": "2020-12-13",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2
                    },
                    {
                        "amount": 404000000.00,
                        "billingId": 5,
                        "tantativeBillingEndDate": "2021-04-13",
                        "billingType": "잔금",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001502",
                        "tantativeBillingBeginDate": "2021-04-13",
                        "percentage": "",
                        "remark": "",
                        "subcontractRevision": 2
                    }
                ],
                "subcontractLegal": {
                    "updateDate": "2022-06-29 04:45:25.113",
                    "createGpn": "KR010019113",
                    "publicInstitutionYn": "N",
                    "subcontractCode": "P0001502",
                    "eyStandardYn": "N",
                    "gcoComment": "",
                    "subcontractRevision": 2,
                    "gcoConfirmRequiredYn": "N",
                    "updateGpn": "KR010019113",
                    "createDate": "2022-02-14 04:13:09.073"
                }
            },
            cpl: {
                "engagementBillingList": [],
                "subcontractApprovals": [
                    {
                        "approvalRole": "PM",
                        "sendEmailYn": "Y",
                        "updateDate": "2024-07-30",
                        "createGpn": "KR010014224",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Dongsoo.Seo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010014224",
                        "sequence": 1,
                        "approvalRank": "이사",
                        "approvalRequestDate": "2024-07-30",
                        "approvalTypeName": "",
                        "approvalRoleName": "Procurement",
                        "approvalId": 2027,
                        "approvalGpn": "KR010014224",
                        "approvalGpnName": "서동수",
                        "fileId": 0,
                        "createDate": "2024-07-30"
                    },
                    {
                        "approvalRole": "EP",
                        "sendEmailYn": "Y",
                        "updateDate": "2024-07-30",
                        "createGpn": "KR010014224",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "TEST ",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Dongsoo.Seo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010014224",
                        "sequence": 2,
                        "approvalRank": "이사",
                        "approvalRequestDate": "2024-07-30",
                        "approvalTypeName": "",
                        "approvalRoleName": "EP",
                        "approvalId": 2027,
                        "approvalGpn": "KR010014224",
                        "approvalGpnName": "서동수",
                        "fileId": 0,
                        "createDate": "2024-07-30"
                    },
                    {
                        "approvalRole": "GM",
                        "sendEmailYn": "Y",
                        "updateDate": "2024-07-30",
                        "createGpn": "KR010014224",
                        "approvalStatusCodeName": "승인",
                        "approvalDescription": "",
                        "approvalType": "SUBCONTRACT",
                        "approvalEmail": "Dongsoo.Seo@kr.ey.com",
                        "approvalStatusCode": "APPROVAL",
                        "updateGpn": "KR010014224",
                        "sequence": 3,
                        "approvalRank": "이사",
                        "approvalRequestDate": "2024-07-30",
                        "approvalTypeName": "",
                        "approvalRoleName": "부문대표",
                        "approvalId": 2027,
                        "approvalGpn": "KR010014224",
                        "approvalGpnName": "서동수",
                        "fileId": 0,
                        "createDate": "2024-07-30"
                    }
                ],
                "subcontractAbc": {
                    "surveyStatus": "COMPLETE",
                    "researchResult": "LOW",
                    "companyNameKorean": "(주)하이아스",
                    "vendorId": 1194,
                    "researchResultName": "Low",
                    "expirationStatus": "실사 완료",
                    "vendorService": "Korea Portal 운영 인력 제공",
                    "gfisCid": "",
                    "abcId": 1068,
                    "chargerNameKorean": "김견욱",
                    "cpi": "",
                    "countryEnglish": "KOR",
                    "abcRequestName": "",
                    "chargerEmail": "kim@hiaas.co.kr",
                    "createGpn": "KR010019113",
                    "contractPurpose": "하도급",
                    "vendorSelectionReason": "기존 계약 연장",
                    "abcStatus": "N",
                    "surveyStatusName": "작성완료",
                    "contactYn": "N",
                    "serviceAmountCurrency": "KRW",
                    "subcontractingYn": "S",
                    "researchStatusName": "실사 완료",
                    "countryEnglishName": "Korea, South",
                    "eyPartnerGpn": "KR010014224",
                    "existingEyClientYn": "N",
                    "eyPartnerName": "서동수",
                    "agentYn": "Y",
                    "contractAmount": 100000000,
                    "expiration": "N",
                    "researchName": "조요섭",
                    "fileId": 0,
                    "listedCompanyYn": "N",
                    "researchFolder": "-",
                    "updateDate": "2024-03-26 08:17:02.953",
                    "researchGpn": "KR010019113",
                    "publicYn": "N",
                    "chargerMobile": "010-2997-3945",
                    "baseYear": "2024",
                    "eyChargerEmail": "Yoseop.Jo@kr.ey.com",
                    "updateGpn": "KR010019113",
                    "eyChargerGpn": "KR010019113",
                    "serviceAmount": 300000000,
                    "vendorStatusYn": "Y",
                    "surveySendDate": "2024-03-26",
                    "useYn": "Y",
                    "cancelReason": "",
                    "expirationDate": "2027-03-26",
                    "createDate": "2024-03-26 08:16:17.970",
                    "resultSendDate": "2024-03-26",
                    "eyChargerName": "조요섭",
                    "eyPartnerEmail": "Dongsoo.Seo@kr.ey.com",
                    "abcRequestEmail": "",
                    "researchStatus": "COMPLETE",
                    "contractAmountCurrency": "KRW",
                    "identificationNumber": "7338602460"
                },
                "appendEmail": "Dongsoo.Seo@kr.ey.com;Ho-Han.Kwon@kr.ey.com;Ho-Han.Kwon@kr.ey.com;",
                "subcontractInsuranceMaster": {},
                "subcontractMasterInfomation": {
                    "indepenceAttachFileName": "",
                    "resourcePlanComment": "내부 가용 자원 없음 확인",
                    "updateDate": "2024-07-30 06:51:24.117",
                    "updateGpn": "KR010019113",
                    "nonStandDardAttachFileName": "",
                    "bretAttachFileName": "P0001639_1_Ernst & Young Han Young__FY25 디자인 적용전 테스트 _20240730133325.723.doc",
                    "subcontractUseYn": "N",
                    "qualitytAttachFileName": "인력이 투입되는 고객사 목적의 하도급 외에는 Quality승인은 필요 없습니다.docx",
                    "approvalId": 2027,
                    "subcontractStatus": "IND",
                    "createDate": "2024-07-30 05:29:40",
                    "bretAttachFileSequence": 3,
                    "createGpn": "KR010014224",
                    "requestType": "NEW",
                    "resourcePlanGpn": "KR010017212",
                    "subcontractCode": "P0001639",
                    "sorucingBuyerGpnName": "서동수",
                    "maxSubcontractRevision": 2,
                    "resourcePlanGpnName": "타임운영1",
                    "createGpnName": "서동수",
                    "standDardAttachFileName": "P0001639_1_Ernst & Young Han Young__FY25 디자인 적용전 테스트 .doc",
                    "preInputYn": "N",
                    "subcontractComment": "FY25 디자인 적용전 테스트 ",
                    "projectDescription": "FY25 디자인 적용전 테스트 ",
                    "sorucingBuyerGpn": "KR010014224",
                    "subcontractRevision": 1,
                    "fileId": 5640
                },
                "subcontractBret": {
                    "sponsor": "In Suk Chung (In-Suk.Chung@kr.ey.com)",
                    "updateDate": "2024-07-30 05:46:01.470",
                    "createGpn": "KR010014224",
                    "subcontractCode": "P0001639",
                    "gcspName": "",
                    "thirdPartyEndDate": "2025-03-28",
                    "bretId": "BRI-12576660",
                    "updateGpn": "KR010019113",
                    "bridgeStatus": "Complete",
                    "completeDate": "2023-03-23",
                    "existingEyClientYn": "N",
                    "g360Status": "",
                    "preparedBy": "Kwon, Ho-Han (Ho-Han.Kwon@kr.ey.com)",
                    "anticiStartDate": "2023-03-23",
                    "auditClientYn": " ",
                    "mvrThirdPartyName": "Hiaas",
                    "gfisCid": "",
                    "bretChannelStatus": "Non - Client",
                    "subcontractRevision": 1,
                    "independenceComment": "",
                    "createDate": "2024-07-30 05:29:40.280"
                },
                "subcontractQuality": {
                    "sufficientCapacityComment": "",
                    "updateDate": "2024-07-30 05:46:01.937",
                    "subcontractorConnectingYn": " ",
                    "highQualityServiceYn": " ",
                    "liabilityInsuranceCoverageYn": " ",
                    "updateGpn": "KR010019113",
                    "vendorService": "",
                    "sufficientCapabilityReviewYn": " ",
                    "sufficientCapabilityReviewComment": "",
                    "subcontractorRiskManagementYn": " ",
                    "workProduct": "",
                    "subcontractorOutsideYn": " ",
                    "subcontractorMitigateComment": "",
                    "itComponentComment": "",
                    "createDate": "2024-07-30 05:29:40.313",
                    "highQualityServiceComment": "",
                    "indemnityInsuranceCoverageYn": " ",
                    "qualityComment": "",
                    "subcontractorIndicationYn": " ",
                    "createGpn": "KR010014224",
                    "itComponentYn": " ",
                    "vendorSelectionReason": "",
                    "subcontractCode": "P0001639",
                    "sufficientFinancialResourcesComment": "",
                    "sortCode": "",
                    "sufficientCapacityYn": " ",
                    "subcontractorAntiBriberyYn": " ",
                    "indemnityInsuranceCoverageLevel": "",
                    "sufficientFinancialResourcesYn": " ",
                    "liabilityInsuranceCoverageLevel": "",
                    "subcontractorRelationshipYn": " ",
                    "subcontractRevision": 1
                },
                "subcontractEngagement": {
                    "updateDate": "2024-07-30 05:46:00.250",
                    "subseviceLineCode": "KDS",
                    "clientName": "Ernst & Young Han Young",
                    "engagementName": "IAW_FY22 Digital EY Rollout",
                    "engagementBeginDate": "2021-10-07",
                    "channelStatus": "",
                    "updateGpn": "KR010019113",
                    "totalSubcontractPercent": 48.8,
                    "sourcingRequestId": "S000153",
                    "engagementEndDate": "2023-03-07",
                    "erpPercent": 8.88,
                    "engagementManagerGpnName": "권호한",
                    "engagementManagerGpn": "KR010014009",
                    "engagementCurrencyCode": "KRW",
                    "MERC_ENGAGEMENT_CODE": "E-22728843",
                    "seviceLineCode": "ADV",
                    "createDate": "2024-07-30 05:29:40.220",
                    "engagementPartnerGpnEngName": "Ho-Han Kwon",
                    "createGpnEngName": "Mike Dongsoo Seo",
                    "clientId": "KR91",
                    "createGpn": "KR010014224",
                    "topTotalEngagementRevenue": 2826504447.00,
                    "corporationCode": "KDS",
                    "subcontractCode": "P0001639",
                    "engagementType": "NOR",
                    "paceId": "O-2719784",
                    "marginPct": 25.10,
                    "subcontractPercent": 1.8,
                    "contingencyPercent": 5.00,
                    "engagementManagerGpnEngName": "Ho-Han Kwon",
                    "crmId": "O-2719784",
                    "engagementPartnerGpnName": "권호한",
                    "engagementPartnerGpn": "KR010014009",
                    "totalEngagementRevenue": 2826504447.00,
                    "subcontractRevision": 1,
                    "engagementId": "22728843"
                },
                "engagementBillingSum": null,
                "subcontractCommercial": {
                    "purchasingType": "TALCT",
                    "supplierBeginDate": "2024-08-01",
                    "companyAddressKorean": "서울시 영등포구 국회대로 74길 19, 동우국제빌딩 304호",
                    "payRateType": "Monthly",
                    "updateDate": "2024-07-30 05:46:00.577",
                    "supplierEndDate": "2024-08-31",
                    "companyNameKorean": "(주)하이아스",
                    "chargerMobile": "010-2997-3945",
                    "vendorId": 1194,
                    "procurementConfirmYn": "Y",
                    "monthlyBillRate": 26250000.000000,
                    "updateGpn": "KR010019113",
                    "useSystem": "Client.s Environment",
                    "vendorService": "테스트",
                    "abcYn": "N",
                    "paymentTermsCode": "MON",
                    "msaAttachFileSequence": 4,
                    "eyEquivalentLevel": "SMR",
                    "deliverableList": "테스트",
                    "taxTypeCode": "VAT",
                    "taxPercent": "10",
                    "paymentTermsCodeName": "Monthly",
                    "workScopeComment": "테스트",
                    "contractTypeCodeName": "T & M Standard",
                    "chargerNameKorean": "김견욱",
                    "contractTypeCode": "TNM",
                    "createDate": "2024-07-30 05:29:40.233",
                    "ceoNameKorean": "임형태",
                    "msaAttachFileName": "Master 계약서.txt",
                    "chargerEmail": "kim@hiaas.co.kr",
                    "createGpn": "KR010014224",
                    "subcontractCode": "P0001639",
                    "dpsddUseYn": "아니오",
                    "reponsibilityComment": "테스트",
                    "procurementOverallComment": "FY25 디자인 적용전 테스트",
                    "dpsddScore": "Low",
                    "supplierTypeName": "Entity(법인/회사)",
                    "supplierContractValue": 50000000.00,
                    "identificationNumber": "7338602460",
                    "monthlyPayRate": 25000000.00,
                    "supplierType": "COR",
                    "subcontractRevision": 1,
                    "regularPositionYn": "N",
                    "currencyCode": "KRW",
                    "companyNameEnglish": "Hiaas",
                    "supplierMargin": 4.8,
                    "fileId": 5454
                },
                "subcontractInsuranceDetailList": [],
                "subcontractApproval": {
                    "updateDate": "2024-07-30 05:46:27.297",
                    "drafterRank": "이사",
                    "createGpn": "KR010014224",
                    "approvalDescription": "",
                    "approvalType": "SUBCONTRACT",
                    "drafterEmail": "Dongsoo.Seo@kr.ey.com",
                    "approvalStatusCode": "COMPLETE",
                    "approvalId": 2027,
                    "drafterGpn": "KR010014224",
                    "updateGpn": "KR010019113",
                    "createDate": "2024-07-30 05:29:40.187"
                },
                "procurementGpnEmail": "Dongsoo.Seo@kr.ey.com",
                "subcontractPaymentList": [
                    {
                        "amount": 50000000.00,
                        "tantativePaymentDate": "2024-07-31",
                        "middlePaymentStartDate": "1900-01-01",
                        "middlePaymentCount": 0,
                        "paymentId": 1,
                        "subcontractCode": "P0001639",
                        "percentage": "",
                        "remark": "잔금",
                        "subcontractRevision": 1,
                        "middlePaymentEndDate": "1900-01-01",
                        "paymentType": "잔금"
                    }
                ],
                "subcontractBillingList": [
                    {
                        "amount": 2826504447.00,
                        "billingId": 1,
                        "billingType": "예산(일반구매)",
                        "tantativeBillingDate": "",
                        "subcontractCode": "P0001639",
                        "tantativeBillingBeginDate": "2024-07-31",
                        "percentage": "",
                        "remark": "내부 프로젝트 예산",
                        "subcontractRevision": 1
                    }
                ],
                "subcontractLegal": {
                    "updateDate": "2024-07-30 05:46:01.703",
                    "createGpn": "KR010014224",
                    "publicInstitutionYn": "N",
                    "subcontractCode": "P0001639",
                    "eyStandardYn": "N",
                    "gcoComment": "",
                    "subcontractRevision": 1,
                    "gcoConfirmRequiredYn": "N",
                    "updateGpn": "KR010019113",
                    "createDate": "2024-07-30 05:29:40.297"
                }
            },
        };

        if (data.subcontractCode === 'P0001502' || data.subcontractCode === 'P0001467' || data.subcontractCode === 'P0001639' || data.subcontractCode === 'P0001631') {
            return { data: detailData.req };
        } else if (data.subcontractCode === 'P0001438' || data.subcontractCode === 'P0001384' || data.subcontractCode === 'P0001624' || data.subcontractCode === 'P0001622') {
            return { data: detailData.cpl };
        }

        return { data: [] };
    },
    '/timeSheet/selectReqExceptionList.do': {
        data: {
            result: [
                {
                    "GPN": "KR010011440"
                },
                {
                    "GPN": "KR010012129"
                },
                {
                    "GPN": "KR010012557"
                },
                {
                    "GPN": "KR010015989"
                },
                {
                    "GPN": "KR010016769"
                },
                {
                    "GPN": "KR010017212"
                },
                {
                    "GPN": "KR010017525"
                },
                {
                    "GPN": "KR010022674"
                },
                {
                    "GPN": "KR010022729"
                },
                {
                    "GPN": "KR010023861"
                }
            ]
        }
    },
    '/timeSheet/selectCpaType.do': {
        data: {
            result: [
                {
                    "CPA_TYPE": "계리",
                    "COMPETENCY": "ADV005"
                },
                {
                    "CPA_TYPE": "기타전문가"
                },
                {
                    "CPA_TYPE": "DVC"
                },
                {
                    "CPA_TYPE": "FAIT",
                    "COMPETENCY": "ADV"
                },
                {
                    "CPA_TYPE": "Forensics",
                    "COMPETENCY": "Forensics"
                },
                {
                    "CPA_TYPE": "Helix",
                    "COMPETENCY": "CBS"
                },
                {
                    "CPA_TYPE": "JE_TEST"
                },
                {
                    "CPA_TYPE": "TARAS",
                    "COMPETENCY": "TAX"
                },
                {
                    "CPA_TYPE": "VM&E",
                    "COMPETENCY": "TAS"
                }
            ]
        }
    },
    '/timeSheet/retrieveTimeReport.do': {
        data: {
            "result": [
                {
                    "GPN": "20230064818",
                    "REQUEST_NO": 2577081,
                    "STATUS": "requested",
                    "APPROVED": "false",
                    "RETAIN_CONNECTION": 0,
                    "RETAIN_ENG_CODE": "66942039",
                    "ACTUAL_ENG_CODE": "66942039",
                    "FIXED_ENG": "N",
                    "ENG_TYPE": "C",
                    "EP_GPN": "KR010010585",
                    "EOW_DATE": 1727971200000,
                    "ENG_DESC": "TSBD-23/류진호/하나은행/프로젝트ONE IT PMO",
                    "DESCRIPTION": "",
                    "ACTIVITY_CODE": "0000",
                    "LOC1": "KR",
                    "LOC2": "KR",
                    "Sa_A": 0.0,
                    "Su_A": 0.0,
                    "Mo_A": 8.0,
                    "Tu_A": 8.0,
                    "We_A": 8.0,
                    "Th_A": 8.0,
                    "Fr_A": 8.0,
                    "CREATE_DATE": 1727795766037,
                    "SIGSIGNATURECHECK": 0,
                    "GLOB_SVC_CD": "10668",
                    "E_TYPE": "E_CEE",
                    "DEMAND_ENG_CODE": "66942039",
                    "DEMAND_ENG_TYPE": "C",
                    "DEMAND_EP_GPN": "KR010010585",
                    "DEMAND_ENG_DESC": "TSBD-23/류진호/하나은행/프로젝트ONE IT PMO",
                    "DEMAND_ACTIVITY_CODE": "0000",
                    "DEMAND_LOC1": "KR",
                    "DEMAND_LOC2": "KR",
                    "DEMAND_DESCRIPTION": "",
                    "Sa_D": 0.0,
                    "Su_D": 0.0,
                    "Mo_D": 8.0,
                    "Tu_D": 8.0,
                    "We_D": 8.0,
                    "Th_D": 8.0,
                    "Fr_D": 8.0,
                    "DEMAND_SIGSIGNATURECHECK": 0,
                    "DEMAND_GLOB_SVC_CD": "10668",
                    "DEMAND_E_TYPE": "E_CEE",
                    "FINAL_REQ_DATE": "2024-10-03 22:01:05",
                    "EP_NAME": "류진호",
                    "DEMAND_EP_NAME": "류진호",
                    "FORMER_APPROVED": null,
                    "FOLLOWER_APPROVED": null,
                    "Sa_R": 0,
                    "Su_R": 0,
                    "Mo_R": 0,
                    "Tu_R": 0,
                    "We_R": 0,
                    "Th_R": 0,
                    "Fr_R": 0,
                    "E_STAT": "R",
                    "LOC2_NM": "KOREA, REPUBLIC OF",
                    "DEMAND_LOC2_NM": "KOREA, REPUBLIC OF",
                    "FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "CR_FIXED_REPORT_DATE": "",
                    "MERC_ACTUAL_ENG_CODE": "E-66942039",
                    "MERC_DEMAND_ENG_CODE": "E-66942039"
                }
            ],
            "FIRSTDATE": "2024-09-28",
            "HIRE_DATE": "2024-07-25",
            "RETIRE_DATE": null,
            "myInfo": {
                "CEL_PHONE": "+82 10 4406 4640",
                "GPN": "20230064818",
                "Merc_Competency": "CBS102",
                "SERVICE_LINE": "09",
                "POSITION_NAME": "직원",
                "LPN": "24358",
                "KOR_NAME": "이승휘",
                "E_MAIL": "Seungwhui.Lee@kr.ey.com",
                "ENG_NAME": "Seungwhui Lee",
                "SERVICE_LINE_NAME": "CBS",
                "DEPART_NAME": "CBS General-IT",
                "EY_RANK": "66",
                "GUI": "3605205"
            },
            "ENDDATE": "2024-10-04"
        }
    },
    '/timeSheet/selectEngagement.do': {
        data: {
            "engagementList": [
                {
                    "EP_GPN": "KR010010585",
                    "EID": "66942039",
                    "E_TYPE_CLS": "C",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "KR010010585",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "류진호",
                    "EM_NAME": "류진호",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "KEB Hana Bank",
                    "GLOB_SVC_CD": "10668",
                    "E_TYPE": "E_CEE",
                    "MERC_EID": "E-66942039",
                    "E_NM": "TSBD-23/류진호/하나은행/프로젝트ONE IT PMO",
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "",
                    "E_TYPE_DESCR": "Client Engagement Expense",
                    "E_TYPE_CLS_DESCR": "CHARGEABLE",
                    "CID": "12199756"
                },
                {
                    "EP_GPN": "KR010010585",
                    "EID": "67835106",
                    "E_TYPE_CLS": "C",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "KR010010577",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "류진호",
                    "EM_NAME": "유창호",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "KEB Hana Bank",
                    "GLOB_SVC_CD": "10232",
                    "E_TYPE": "E_CEE",
                    "MERC_EID": "E-67835106",
                    "E_NM": "TSBD-24/류진호/하나은행/IT자문컨설팅",
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "",
                    "E_TYPE_DESCR": "Client Engagement Expense",
                    "E_TYPE_CLS_DESCR": "CHARGEABLE",
                    "CID": "12199756"
                },
                {
                    "EP_GPN": "KR010010585",
                    "EID": "68016437",
                    "E_TYPE_CLS": "C",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "KR010011534",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "류진호",
                    "EM_NAME": "김준구",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "KEB Hana Bank",
                    "GLOB_SVC_CD": "10668",
                    "E_TYPE": "E_CEE",
                    "MERC_EID": "E-68016437",
                    "E_NM": "TSBD-24/류진호/하나은행/차세대2단계 PI/ISP Phase1",
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "",
                    "E_TYPE_DESCR": "Client Engagement Expense",
                    "E_TYPE_CLS_DESCR": "CHARGEABLE",
                    "CID": "12199756"
                },
                {
                    "EP_GPN": "KR010016997",
                    "EID": "68022759",
                    "E_TYPE_CLS": "C",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "KR010015970",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "이재원",
                    "EM_NAME": "한종우",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "KEB Hana Bank",
                    "GLOB_SVC_CD": "10668",
                    "E_TYPE": "E_CEE",
                    "MERC_EID": "E-68022759",
                    "E_NM": "TSBD-24/이재원/하나은행/차세대2단계 PI/ISP Phase1",
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "",
                    "E_TYPE_DESCR": "Client Engagement Expense",
                    "E_TYPE_CLS_DESCR": "CHARGEABLE",
                    "CID": "12199756"
                }
            ]
        }
    },
    '/timeSheet/searchNonChEng.do': {
        data: {
            "engagementList": [
                {
                    "EP_GPN": "",
                    "EID": "KR910001",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910001",
                    "E_NM": "Excused Leave",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                },
                {
                    "EP_GPN": "",
                    "EID": "KR910002",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910002",
                    "E_NM": "Public Holidays declared in Prakas",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                },
                {
                    "EP_GPN": "",
                    "EID": "KR910003",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910003",
                    "E_NM": "Illness",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                },
                {
                    "EP_GPN": "",
                    "EID": "KR910013",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910013",
                    "E_NM": "Time Off Without Pay",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                },
                {
                    "EP_GPN": "",
                    "EID": "KR910014",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910014",
                    "E_NM": "Unassigned",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                },
                {
                    "EP_GPN": "",
                    "EID": "KR910015",
                    "E_TYPE_CLS": "N",
                    "E_STAT_DESCR": "Released",
                    "EM_GPN": "-",
                    "FIXED_ENG": "N",
                    "SIGSIGNATURECHECK": 0,
                    "ALLOW_FROM_DT": "1900-01-01",
                    "E_STAT": "R",
                    "EP_NAME": "",
                    "EM_NAME": "-",
                    "ALLOW_TO_DT": "1900-01-01",
                    "C_LNM": "Ernst & Young Han Young",
                    "GLOB_SVC_CD": "200085",
                    "E_TYPE": "P_ABSLEA",
                    "MERC_EID": "A-KR910015",
                    "E_NM": "Vacation - (Current Fiscal Year)",
                    "BLOCK_CD": "",
                    "E_TYPE_DESCR": "Absence Leave",
                    "E_TYPE_CLS_DESCR": "NON-CHARGEABLE",
                    "CID": "KR91"
                }
            ]
        }
    },
    '/timeSheet/retrieveActivityCodeList.do': {
        data: {
            "result": [
                {
                    "ACTIVITY_NAME": "General",
                    "MERC_EID": "E-66942039",
                    "ACTIVITY_CODE": "0000"
                }
            ]
        }
    },
    '/payment/api/selectApVoucherList.do': (data) => {
        const saList = [
            {
                "autoPay": "N",
                "step1Name": "",
                "licenseNo": "2178800722",
                "gdsComment": "",
                "roundRobinId": "",
                "cancelYn": "N",
                "holdingYn": "N",
                "reviewGpnName": "",
                "vendorId": "400170574",
                "totTaxAmt": 0.00,
                "statusCdName": "부서 승인중",
                "step2Name": "",
                "financeHoldingYn": "N",
                "businessPlace": "BP91",
                "gdsUpdateDate": -2209017600000,
                "provisionType": "NM",
                "provisionTypeName": "일반",
                "payTo": "VENDOR",
                "invoiceNo": "K2410040001",
                "requestGpn": "20230064818",
                "createGpn": "20230064818",
                "subcontractCode": "",
                "buCode": "",
                "vendorName": "tintoLAB co.,Ltd,",
                "step4Name": "",
                "requestName": "홍길동",
                "domesticYn": "Y",
                "asStatus": "          ",
                "voucherDesc": "Test",
                "paymentTerm": "",
                "fileId": 8781,
                "step3Name": "",
                "updateDate": "2020-10-04 00:00:00",
                "payToName": "법인",
                "paymentBank": "HSBC",
                "draftComment": "",
                "sectionCode": "",
                "updateGpn": "20230064818",
                "financeOrder": 2,
                "voucherId": "AP0007703",
                "requestDate": "2024-10-04",
                "generalOrder": 1,
                "paymentReqDate": "2024-10-07",
                "approvalId": 19235,
                "currency": "KRW",
                "gfisVoucherId": "",
                "paymentSchDate": "",
                "refVoucherId": "",
                "createDate": "2020-10-04 00:00:00",
                "provisionVoucherId": "",
                "totPaymentAmt": 5000000.00,
                "paymentBankName": "HSBC(일반 vendor)",
                "gdsUser": "",
                "entityCode": "",
                "mercuryPo": "121",
                "ap2SapInvoiceNo": "",
                "ensId": "",
                "statusCd": "SA",
                "totAmt": 0.00,
                "gdsOrder": 3,
                "invoiceDate": "2024-10-04",
                "paymentYn": "N",
                "autoPayStDate": "",
                "autoPayEdDate": "",
                "financeComment": "",
                "changeAttachfileYn": "N",
                "financeApprovalId": 19236,
                "paymentDate": "",
                "entity": "Ernst & Young Han Young"
            }
        ];

        const faList = [
            {
                "autoPay": "N",
                "step1Name": "",
                "licenseNo": "2178800722",
                "gdsComment": "",
                "roundRobinId": "",
                "cancelYn": "N",
                "holdingYn": "N",
                "reviewGpnName": "",
                "vendorId": "400170574",
                "totTaxAmt": 0.00,
                "statusCdName": "Finance 승인중",
                "step2Name": "",
                "financeHoldingYn": "N",
                "businessPlace": "BP91",
                "gdsUpdateDate": -2209017600000,
                "provisionType": "NM",
                "provisionTypeName": "일반",
                "payTo": "VENDOR",
                "invoiceNo": "K2410040001",
                "requestGpn": "20230064818",
                "createGpn": "20230064818",
                "subcontractCode": "",
                "buCode": "",
                "vendorName": "tintoLAB co.,Ltd,",
                "step4Name": "",
                "requestName": "홍길동",
                "domesticYn": "Y",
                "asStatus": "          ",
                "voucherDesc": "Test",
                "paymentTerm": "",
                "fileId": 8781,
                "step3Name": "",
                "updateDate": "2020-10-04 00:00:00",
                "payToName": "법인",
                "paymentBank": "HSBC",
                "draftComment": "",
                "sectionCode": "",
                "updateGpn": "20230064818",
                "financeOrder": 2,
                "voucherId": "AP0007704",
                "requestDate": "2024-10-04",
                "generalOrder": 1,
                "paymentReqDate": "2024-10-07",
                "approvalId": 19235,
                "currency": "KRW",
                "gfisVoucherId": "",
                "paymentSchDate": "",
                "refVoucherId": "",
                "createDate": "2020-10-04 00:00:00",
                "provisionVoucherId": "",
                "totPaymentAmt": 6000000.00,
                "paymentBankName": "HSBC(일반 vendor)",
                "gdsUser": "",
                "entityCode": "",
                "mercuryPo": "121",
                "ap2SapInvoiceNo": "",
                "ensId": "",
                "statusCd": "FA",
                "totAmt": 0.00,
                "gdsOrder": 3,
                "invoiceDate": "2024-10-04",
                "paymentYn": "N",
                "autoPayStDate": "",
                "autoPayEdDate": "",
                "financeComment": "",
                "changeAttachfileYn": "N",
                "financeApprovalId": 19236,
                "paymentDate": "",
                "entity": "Ernst & Young Han Young"
            }
        ];

        const cpList = [
            {
                "autoPay": "N",
                "step1Name": "",
                "licenseNo": "2178800722",
                "gdsComment": "",
                "roundRobinId": "",
                "cancelYn": "N",
                "holdingYn": "N",
                "reviewGpnName": "",
                "vendorId": "400170574",
                "totTaxAmt": 0.00,
                "statusCdName": "처리완료",
                "step2Name": "",
                "financeHoldingYn": "N",
                "businessPlace": "BP91",
                "gdsUpdateDate": -2209017600000,
                "provisionType": "NM",
                "provisionTypeName": "일반",
                "payTo": "VENDOR",
                "invoiceNo": "K2410040001",
                "requestGpn": "20230064818",
                "createGpn": "20230064818",
                "subcontractCode": "",
                "buCode": "",
                "vendorName": "tintoLAB co.,Ltd,",
                "step4Name": "",
                "requestName": "홍길동",
                "domesticYn": "Y",
                "asStatus": "          ",
                "voucherDesc": "Test",
                "paymentTerm": "",
                "fileId": 8781,
                "step3Name": "",
                "updateDate": "2020-10-04 00:00:00",
                "payToName": "법인",
                "paymentBank": "HSBC",
                "draftComment": "",
                "sectionCode": "",
                "updateGpn": "20230064818",
                "financeOrder": 2,
                "voucherId": "AP0007705",
                "requestDate": "2024-10-04",
                "generalOrder": 1,
                "paymentReqDate": "2024-10-07",
                "approvalId": 19235,
                "currency": "KRW",
                "gfisVoucherId": "",
                "paymentSchDate": "",
                "refVoucherId": "",
                "createDate": "2020-10-04 00:00:00",
                "provisionVoucherId": "",
                "totPaymentAmt": 7000000.00,
                "paymentBankName": "HSBC(일반 vendor)",
                "gdsUser": "",
                "entityCode": "",
                "mercuryPo": "121",
                "ap2SapInvoiceNo": "",
                "ensId": "",
                "statusCd": "CP",
                "totAmt": 0.00,
                "gdsOrder": 3,
                "invoiceDate": "2024-10-04",
                "paymentYn": "N",
                "autoPayStDate": "",
                "autoPayEdDate": "",
                "financeComment": "",
                "changeAttachfileYn": "N",
                "financeApprovalId": 19236,
                "paymentDate": "",
                "entity": "Ernst & Young Han Young"
            }
        ];

        if (data.statusCd === 'SA') {
            return { data: saList };
        }
        else if (data.statusCd === 'FA') {
            return { data: faList };
        }
        else if (data.statusCd === 'CP') {
            return { data: cpList };
        }

        return { data: [] };
    },
    '/payment/api/selectApVoucherApprovalList.do': (data) => {
        const prcList = [
            {
                "autoPay": "N",
                "approvalStatusCodeName": "진행중",
                "paymentBank": "HSBC",
                "reviewGpnName": "심정은",
                "statusCdName": "Finance 승인중",
                "mercCostCenterIdDescr": "1KR91-1Auit010",
                "voucherId": "AP0007659",
                "requestDate": "2022-09-13",
                "approvalId": 19147,
                "approvalGpn": "KR010020964",
                "currency": "KRW",
                "gfisVoucherId": "",
                "invoiceNo": "K2209130008",
                "paymentSchDate": "20220930",
                "totPaymentAmt": 3837719.00,
                "draftGpnName": "심정은",
                "ap2SapInvoiceNo": "",
                "mercCostCenterId": "KR100074",
                "statusCd": "FA",
                "totAmt": 3500000.00,
                "vendorName": "박리라",
                "requestName": "홍길동1",
                "requestGpn": "111111111111",
                "provisionTypeName": "일반",
                "voucherDesc": "1111",
                "approvalGpnName": "심정은",
                "financeApprovalId": 19148,
                "entity": "Ernst & Young Han Young"
            }
        ];

        const cmpList = [
            {
                "autoPay": "N",
                "approvalStatusCodeName": "완료",
                "paymentBank": "HSBC",
                "reviewGpnName": "심정은",
                "statusCdName": "처리완료",
                "mercCostCenterIdDescr": "1KR91-1Auit999",
                "voucherId": "AP0007687",
                "requestDate": "2023-01-16",
                "approvalId": 19209,
                "approvalGpn": "",
                "currency": "KRW",
                "gfisVoucherId": "",
                "invoiceNo": "K2301160001",
                "paymentSchDate": "20230131",
                "totPaymentAmt": 2100.00,
                "draftGpnName": "",
                "ap2SapInvoiceNo": "K2301160001",
                "mercCostCenterId": "KR91101001",
                "statusCd": "CP",
                "totAmt": 2100.00,
                "vendorName": "Samsung SDS",
                "requestName": "홍길동2",
                "requestGpn": "222222222222",
                "provisionTypeName": "일반",
                "voucherDesc": "대량 Sub line upload test",
                "approvalGpnName": "",
                "financeApprovalId": 19210,
                "entity": "Ernst & Young Han Young"
            }
        ];

        if (data.approvalStatusCode === 'PRC') {
            return { data: prcList };
        }
        else if (data.approvalStatusCode === 'CMP') {
            return { data: cmpList };
        }

        return { data: [] };
    },
    '/payment/api/selectApVoucherResponse.do': {
        data: {
            "approvalCancelList": [
                {
                    "approvalRole": "",
                    "cancelDesc": "반려 코멘트1",
                    "cancelSeq": 2,
                    "cancelDate": "2024-08-29 06:00:54.",
                    "updateDate": 1724882454607,
                    "createGpn": "33333333333",
                    "approvalSeq": 1,
                    "approvalType": "AS",
                    "approvalEmail": "Gahyun.Kim1@kr.ey.com",
                    "updateGpn": "33333333333",
                    "voucherId": "AP0007699",
                    "approvalRank": "Intern",
                    "approvalId": 19233,
                    "approvalGpn": "33333333333",
                    "approvalGpnName": "홍길동3",
                    "createDate": 1724882454607
                },
                {
                    "approvalRole": "",
                    "cancelDesc": "반려 코멘트2",
                    "cancelSeq": 1,
                    "cancelDate": "2024-08-29 05:59:23.",
                    "updateDate": 1724882363187,
                    "createGpn": "33333333333",
                    "approvalSeq": 1,
                    "approvalType": "AS",
                    "approvalEmail": "Gahyun.Kim1@kr.ey.com",
                    "updateGpn": "33333333333",
                    "voucherId": "AP0007699",
                    "approvalRank": "Intern",
                    "approvalId": 19233,
                    "approvalGpn": "33333333333",
                    "approvalGpnName": "홍길동3",
                    "createDate": 1724882363187
                }
            ],
            "approval": {
                "updateDate": "2022-11-03",
                "createGpn": "20230064818",
                "serviceLineName": "CBS",
                "financeReviewName": "검토완료",
                "approvalDesc": "",
                "approvalType": "AS",
                "draftGpnName": "홍길동",
                "approvalStatusCode": "CMP",
                "updateGpn": "20230064818",
                "positionName": "차장                                    ",
                "drafterRank": "과장",
                "approvalRequestDate": "",
                "drafterEmail": "Jongho.Yoon@kr.ey.com",
                "approvalId": 19149,
                "drafterGpn": "20230064818",
                "createDate": 1663521978057
            },
            "financeApproval": {
                "updateDate": "2022-11-03",
                "createGpn": "20230064818",
                "serviceLineName": "CBS",
                "financeReviewName": "검토완료",
                "approvalDesc": "1",
                "approvalType": "AF",
                "draftGpnName": "홍길동",
                "approvalStatusCode": "CMP",
                "updateGpn": "20230064818",
                "positionName": "차장                                    ",
                "drafterRank": "과장",
                "approvalRequestDate": "2022-11-03",
                "drafterEmail": "Jongho.Yoon@kr.ey.com",
                "approvalId": 19150,
                "drafterGpn": "20230064818",
                "createDate": 1663521978323
            },
            "apVouchersList": [
                {
                    "materialClassDescr": "Printer Parts, Components, Accessories",
                    "glAccountDescr": "Printers & MFDs-Cons",
                    "updateDate": 1667422168070,
                    "budgetCode": "",
                    "priceBasisQuantityQuantity": 0,
                    "engagementName": "2021(12)/김희영/외감/기아차",
                    "unitOfmeasure": "EA",
                    "updateGpn": "20230064818",
                    "payOuCode": "",
                    "legalEntity": "EY-HanYoung-KR",
                    "mercCostCenterIdDescr": "1KR91-1Auit999",
                    "subTaxAmt": 0.00,
                    "paySmuCode": "",
                    "exchangeRate": 1.00,
                    "voucherId": "AP0007660",
                    "currency": "KRW",
                    "taxRatio": 0.0,
                    "glAccount": "83002015",
                    "gfisVoucherId": "",
                    "createDate": 1667422168070,
                    "legalEntityCd": "KR91",
                    "priceBasisQuantityConversionFactor": 0.00,
                    "payGpnName": "",
                    "mercEid": "E-22324898",
                    "materialClass": "43101040",
                    "createGpn": "20230064818",
                    "localCoaName": "",
                    "quantity": 1,
                    "voucherSeq": 1,
                    "voucherType": "CC",
                    "subDesc": "",
                    "engagementType": "C",
                    "mercCostCenterId": "KR91101001",
                    "totAmt": 100000.00,
                    "invoiceDate": "",
                    "payCostCenterId": "",
                    "krwAmt": 100000.00,
                    "payBuCode": "",
                    "payGpn": "",
                    "priceBasisQuantityUnitOfMeasure": "",
                    "subAmt": 100000.00,
                    "primaryWorkLoc": "KR",
                    "budgetCodeName": "",
                    "voucherTypeName": "법인 카드",
                    "payMuCode": "",
                    "payCostCenterIdDescr": "",
                    "entity": "Ernst & Young Han Young"
                },
                {
                    "materialClassDescr": "Printer Parts, Components, Accessories",
                    "glAccountDescr": "Printers & MFDs-Cons",
                    "updateDate": 1667422168070,
                    "budgetCode": "",
                    "priceBasisQuantityQuantity": 0,
                    "engagementName": "2021(12)/김희영/외감/기아차",
                    "unitOfmeasure": "EA",
                    "updateGpn": "20230064818",
                    "payOuCode": "",
                    "legalEntity": "EY-HanYoung-KR",
                    "mercCostCenterIdDescr": "1KR91-1Auit999",
                    "subTaxAmt": 0.00,
                    "paySmuCode": "",
                    "exchangeRate": 1.00,
                    "voucherId": "AP0007660",
                    "currency": "KRW",
                    "taxRatio": 0.0,
                    "glAccount": "83002015",
                    "gfisVoucherId": "",
                    "createDate": 1667422168070,
                    "legalEntityCd": "KR91",
                    "priceBasisQuantityConversionFactor": 0.00,
                    "payGpnName": "",
                    "mercEid": "E-22324898",
                    "materialClass": "43101040",
                    "createGpn": "20230064818",
                    "localCoaName": "",
                    "quantity": 1,
                    "voucherSeq": 2,
                    "voucherType": "CC",
                    "subDesc": "",
                    "engagementType": "C",
                    "mercCostCenterId": "KR91101001",
                    "totAmt": 100000.00,
                    "invoiceDate": "",
                    "payCostCenterId": "",
                    "krwAmt": 100000.00,
                    "payBuCode": "",
                    "payGpn": "",
                    "priceBasisQuantityUnitOfMeasure": "",
                    "subAmt": 100000.00,
                    "primaryWorkLoc": "KR",
                    "budgetCodeName": "",
                    "voucherTypeName": "법인 카드",
                    "payMuCode": "",
                    "payCostCenterIdDescr": "",
                    "entity": "Ernst & Young Han Young"
                }
            ],
            "approvalsList": [
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "2022-11-03",
                    "createGpn": "11111111111",
                    "approvalSeq": 1,
                    "approvalStatusCodeName": "대리 승인",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "DGT",
                    "updateGpn": "11111111111",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "11111111111",
                    "approvalGpnName": "홍길동1",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                },
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "",
                    "createGpn": "22222222222",
                    "approvalSeq": 2,
                    "approvalStatusCodeName": "",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "",
                    "updateGpn": "22222222222",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "22222222222",
                    "approvalGpnName": "홍길동2",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                },
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "",
                    "createGpn": "33333333333",
                    "approvalSeq": 3,
                    "approvalStatusCodeName": "",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "",
                    "updateGpn": "33333333333",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "33333333333",
                    "approvalGpnName": "홍길동3",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                }
            ],
            "financeApprovalsList": [
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "2022-11-03",
                    "createGpn": "11111111111",
                    "approvalSeq": 1,
                    "approvalStatusCodeName": "승인",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "APV",
                    "updateGpn": "11111111111",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "11111111111",
                    "approvalGpnName": "홍길동1",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                },
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "",
                    "createGpn": "22222222222",
                    "approvalSeq": 2,
                    "approvalStatusCodeName": "",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "",
                    "updateGpn": "22222222222",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "22222222222",
                    "approvalGpnName": "홍길동2",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                },
                {
                    "approvalRole": "",
                    "sendEmailYn": "Y",
                    "updateDate": "",
                    "createGpn": "33333333333",
                    "approvalSeq": 3,
                    "approvalStatusCodeName": "",
                    "serviceLineName": "CBS",
                    "approvalDesc": "",
                    "approvalType": "AS",
                    "approvalEmail": "Jongho.Yoon@kr.ey.com",
                    "approvalStatusCode": "",
                    "updateGpn": "33333333333",
                    "positionName": "차장                                    ",
                    "approvalRank": "과장",
                    "approvalRequestDate": "2022-11-03",
                    "approvalTypeName": "AP 전표 승인",
                    "approvalRoleName": "",
                    "approvalId": 19149,
                    "approvalGpn": "33333333333",
                    "approvalGpnName": "홍길동3",
                    "delegateGpn": "",
                    "fileId": 0,
                    "createDate": "2022-11-03"
                }
            ],
            "apVoucher": {
                "autoPay": "N",
                "step1Name": "홍길동",
                "licenseNo": "8400000000",
                "gdsComment": "",
                "roundRobinId": "",
                "cancelYn": "N",
                "holdingYn": "N",
                "reviewGpnName": "홍길동",
                "vendorId": "E02273983",
                "step4UpdateDate": "          ",
                "totTaxAmt": 0.00,
                "statusCdName": "처리완료",
                "step2Name": "",
                "financeHoldingYn": "N",
                "businessPlace": "BP91",
                "gdsUpdateDate": -2209017600000,
                "provisionType": "NM",
                "provisionTypeName": "일반",
                "payTo": "",
                "invoiceNo": "K2209190001",
                "requestGpn": "20230064818",
                "createGpn": "20230064818",
                "subcontractCode": "P0001502",
                "buCode": "",
                "vendorName": "tintoLAB co.,Ltd,",
                "step4Name": "",
                "requestName": "홍길동",
                "domesticYn": "",
                "asStatus": "2022-11-03",
                "voucherDesc": "12312\r\n1123\r\n111",
                "step1UpdateDate": "2022-11-03",
                "paymentTerm": "",
                "fileId": 8730,
                "step3Name": "",
                "updateDate": "2020-11-03 00:00:00",
                "payToName": "",
                "paymentBank": "HSBC",
                "draftComment": "",
                "sectionCode": "SC01",
                "updateGpn": "20230064818",
                "financeOrder": 6,
                "voucherId": "AP0007660",
                "step2UpdateDate": "          ",
                "requestDate": "2022-09-19",
                "generalOrder": 6,
                "paymentReqDate": "2022-09-20",
                "approvalId": 19149,
                "currency": "KRW",
                "gfisVoucherId": "",
                "paymentSchDate": "2022-11-16",
                "refVoucherId": "AP0007660",
                "createDate": "2020-09-19 00:00:00",
                "provisionVoucherId": "",
                "totPaymentAmt": 100000.00,
                "paymentBankName": "HSBC(일반 vendor)",
                "gdsUser": "",
                "entityCode": "KR91",
                "mercuryPo": "",
                "ap2SapInvoiceNo": "K2209190001",
                "ensId": "RR00011469",
                "statusCd": "CP",
                "totAmt": 100000.00,
                "gdsOrder": 6,
                "invoiceDate": "2022-09-19",
                "paymentYn": "N",
                "step3UpdateDate": "          ",
                "autoPayStDate": "",
                "autoPayEdDate": "",
                "financeComment": "",
                "changeAttachfileYn": "N",
                "financeApprovalId": 19150,
                "paymentDate": "",
                "entity": "Ernst & Young Han Young"
            }
        }
    },
    '/payment/api/selectAttachFileList.do': {
        data: [
            {
                "subCategory": "BD",
                "updateDate": 1622709877177,
                "createGpn": "KR010019413",
                "attachFilePath": "\\\\KRSEORMPINFFL1\\koreaportal$\\PRD\\DWP_FILES\\APVOUCHER\\8730\\AP0005044.PNG",
                "description": "원계약 입금증",
                "fileSeq": 1,
                "updateGpn": "KR010019413",
                "createGpnName": "임상미",
                "updateGpnName": "임상미",
                "attachFileName": "AP0005044.PNG",
                "subCategoryName": "원계약 입금확인서류",
                "attachFileOrginName": "AP0005044.PNG",
                "category": "APVOUCHER",
                "attachFileType": "APVOUCHER",
                "fileId": 8730,
                "createDate": 1622709877177
            },
            {
                "subCategory": "BD",
                "updateDate": 1622709877177,
                "createGpn": "KR010019413",
                "attachFilePath": "\\\\KRSEORMPINFFL1\\koreaportal$\\PRD\\DWP_FILES\\APVOUCHER\\8730\\AP0005044.PNG",
                "description": "원계약 입금증",
                "fileSeq": 1,
                "updateGpn": "KR010019413",
                "createGpnName": "임상미",
                "updateGpnName": "임상미",
                "attachFileName": "AP0005044.PNG",
                "subCategoryName": "원계약 입금확인서류",
                "attachFileOrginName": "AP0005044.PNG",
                "category": "APVOUCHER",
                "attachFileType": "APVOUCHER",
                "fileId": 8730,
                "createDate": 1622709877177
            }
        ]
    },
    '/payment/api/selectExpertNetworkList.do': {
        data: [
            {
                "updateGpnEmail": "Yoseop.Jo@kr.ey.com",
                "subject": "ADV 오류 테스트",
                "engagementName": "TAX/SIC/FY24/ADV/Project Yoghurt",
                "vendorId": 575,
                "updateGpnName": "조요섭",
                "engagementManagerGpnName": "이재영",
                "createGpnEmail": "Yoseop.Jo@kr.ey.com",
                "specificRequirement": "2",
                "createGpn": "KR010019113",
                "preferredScheduleStart": "2024-05-01",
                "engagementPartnerServiceLine": "TAX",
                "interviewDate": "2024-05-01 ~ 2024-05-31",
                "expertiseField": "QA, MSAT(Manufacturing Science And Technology) preferred",
                "experienceYears": "5",
                "transcriptYn": "",
                "sequence": 1,
                "preferredPosition": "4",
                "standardRate": "5500000",
                "engagementPartnerGpn": "KR010004250",
                "ensIdSequence": "E00072-01",
                "vendorKoreanName": "가이드포인트글로벌",
                "engagementId": "67634248",
                "engagementPartnerSubServiceLine": "ITTS-ICTA/TTA",
                "status": "APPROVAL",
                "updateDate": 1714688895773,
                "approvalDate": 1714688895773,
                "clientName": "PERMIRA VII INVESTMENT PLATFORM LIMITED",
                "targetArea": "Target Area / Region / Country #1",
                "engagementEntity": "HAC",
                "transLanguage1": "Select Language #1",
                "updateGpn": "KR010019113",
                "consultationsHours": 3,
                "transLanguage2": "",
                "transLanguage3": "",
                "outline": "1",
                "targetCompany5": "",
                "targetCompany4": "",
                "interviewPrice": 5500000,
                "engagementManagerGpn": "KR010011304",
                "engagementPartnerGpnEmail": "shuck-il.cho@kr.ey.com",
                "currency": "KRW",
                "approvalGpn": "KR010019113",
                "targetCompany3": "",
                "targetCompany2": "",
                "targetCompany1": "Priority 1 #1",
                "createDate": 1714688664210,
                "consultationsType": "Type of Consultation #1",
                "ensId": "E00072",
                "interviewCount": 1,
                "engagementManagerGpnEmail": "Jaeyoung.Lee@kr.ey.com",
                "preferredScheduleEnd": "2024-05-31",
                "createGpnName": "조요섭",
                "holdingPositionYn": "N",
                "questionnaires": "1. Platform Architecture\r\nOverall system architecture & DevOps environment(CI / CD Automation, service launching, etc.)\r\nSystem error monitoring & prevention(Methods, tools, etc.)\r\n\r\n2. Processes & Organization\r\ne- Commerce platform operating processes(Overall operating as well as service request response, system error handling, etc.)\r\nRelevant organization(IT development / operations, DevOps, new service launching, global operations, etc.)\r\nRelevant organization(IT development / operations, DevOps, new service launching, global operations, etc.) ",
                "attachFileId": 5507,
                "engagementPartnerGpnName": "조석일",
                "recordingYn": "",
                "consultationsNumber": 0
            }
        ]
    },
    '/payment/api/expertNetworkApprovalFile.do': {
        data: [
            {
                "subCategory": "RES",
                "attachFileId": 5507,
                "fileSequence": 1,
                "ensId": "E00072",
                "vendorId": 575,
                "description": "가이드포인트글로벌",
                "fileCreateDate": 1714688697860,
                "ensSequence": 1,
                "category": "EXPERTNETWORKREQUEST",
                "fileVendorKoreanName": "가이드포인트글로벌",
                "attachFileName": "ConsultInquiryList (13).xlsx"
            },
            {
                "subCategory": "RES",
                "attachFileId": 5507,
                "fileSequence": 2,
                "ensId": "E00072",
                "vendorId": 575,
                "description": "가이드포인트글로벌",
                "fileCreateDate": 1714688697860,
                "ensSequence": 1,
                "category": "EXPERTNETWORKREQUEST",
                "fileVendorKoreanName": "가이드포인트글로벌",
                "attachFileName": "ConsultInquiryList (13).xlsx"
            }
        ]
    },
    '/timeSheet/selectUnApprEowList.do': {
        data: {
            "result": {
                count: 6,
                eowDateList: [
                    {
                        CNT: 4,
                        EOW_DATE: '2024-08-09'
                    },
                    {
                        CNT: 1,
                        EOW_DATE: '2024-08-23'
                    },
                    {
                        CNT: 1,
                        EOW_DATE: '2024-08-30'
                    }
                ]
            }
        }
    },
    '/timeSheet/retrieveUnApprEngagementList.do': (data) => {
        const result1 = [
            {
                "REJECTED_REPORT": 0,
                "PLANNED_PERSONS": 7,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 0,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "DRAFT_REPORT": 7,
                "PROJECT_ACCUMULATED_HOURS": 752.0,
                "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/영진약품",
                "TOTAL_REPORT": 7,
                "ENGAGEMENT_CODE": "67811986",
                "APPROVED_REPORT": 0,
                "RETAIN_CONNECTED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "ACTUAL_HOURS": 0.0,
                "ACTUAL_PERSONS": 0,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "MERC_ENGAGEMENT_CODE": "E-67811986",
                "INIT_PLAN_TIME": 0,
                "PLANNED_HOURS": 206.0
            },
            {
                "REJECTED_REPORT": 0,
                "PLANNED_PERSONS": 2,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 1,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "DRAFT_REPORT": 2,
                "PROJECT_ACCUMULATED_HOURS": 1663.0,
                "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/한국서부발전",
                "TOTAL_REPORT": 2,
                "ENGAGEMENT_CODE": "67810779",
                "APPROVED_REPORT": 0,
                "RETAIN_CONNECTED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "ACTUAL_HOURS": 0.0,
                "ACTUAL_PERSONS": 0,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "MERC_ENGAGEMENT_CODE": "E-67810779",
                "INIT_PLAN_TIME": 0,
                "PLANNED_HOURS": 32.0
            },
            {
                "REJECTED_REPORT": 0,
                "DRAFT_REPORT": 1,
                "EOW_DATE": "2024-08-30",
                "PROJECT_ACCUMULATED_HOURS": 3156.0,
                "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/한국수력원자력",
                "TOTAL_REPORT": 2,
                "ENGAGEMENT_CODE": "67799387",
                "APPROVED_REPORT": 0,
                "RETAIN_CONNECTED_REPORT": 0,
                "GPN_WORKINGTYPE_LIST": [
                    {
                        "WORKING_TYPE": "standard",
                        "GPN": "KR010023861",
                        "ACTUAL_HOURS_AVERAGE": 40.0,
                        "DETAILS": [
                            {
                                "P": 0.0,
                                "C": 40.0,
                                "OVER_8": 0.0,
                                "OVER_12": 0.0,
                                "OVERTIME": 0.0,
                                "EOW_DATE": "2024-08-30"
                            }
                        ],
                        "WEEK_IN_PERIOD": 1,
                        "END_DATE": "2024-08-30",
                        "START_DATE": "2024-08-24",
                        "ACTUAL_OVERTIME_AVERAGE": 0.0,
                        "ACTUAL_OVERTIME": 0.0,
                        "TOTAL_WEEKS": 1,
                        "TOTAL_HOURS": 40.0,
                        "ACTUAL_HOURS": 40.0,
                        "ACTUAL_DATE": "2024-08-30",
                        "TOTAL_OVERTIME": 0.0,
                        "TOTAL_HOURS_AVERAGE": 40.0,
                        "TOTAL_OVERTIME_AVERAGE": 0.0
                    }
                ],
                "ACTUAL_PERSONS": 1,
                "MERC_ENGAGEMENT_CODE": "E-67799387",
                "PLANNED_HOURS": 8.0,
                "PLANNED_PERSONS": 1,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 0,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "FIXED_REPORT_DATE": "2025-03-31",
                "ACTUAL_HOURS": 24.0,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "INIT_PLAN_TIME": 0
            },
            {
                "REJECTED_REPORT": 0,
                "PLANNED_PERSONS": 3,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 0,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "DRAFT_REPORT": 3,
                "PROJECT_ACCUMULATED_HOURS": 0.0,
                "ENGAGEMENT_NAME": "2023(12)/박정익/임의/아르고에너지코리아홀딩스",
                "TOTAL_REPORT": 3,
                "ENGAGEMENT_CODE": "68424307",
                "APPROVED_REPORT": 0,
                "RETAIN_CONNECTED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "ACTUAL_HOURS": 0.0,
                "ACTUAL_PERSONS": 0,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "MERC_ENGAGEMENT_CODE": "E-68424307",
                "INIT_PLAN_TIME": 0,
                "PLANNED_HOURS": 52.0
            },
        ];

        const result2 = [
            {
                "REJECTED_REPORT": 0,
                "PLANNED_PERSONS": 8,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 0,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "DRAFT_REPORT": 8,
                "PROJECT_ACCUMULATED_HOURS": 44.0,
                "ENGAGEMENT_NAME": "2022-2023/박정익/임의감사/세미파이브",
                "TOTAL_REPORT": 8,
                "ENGAGEMENT_CODE": "68440691",
                "APPROVED_REPORT": 0,
                "RETAIN_CONNECTED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "ACTUAL_HOURS": 0.0,
                "ACTUAL_PERSONS": 0,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "MERC_ENGAGEMENT_CODE": "E-68440691",
                "INIT_PLAN_TIME": 0,
                "PLANNED_HOURS": 288.0
            },
        ];

        const result3 = [
            {
                "REJECTED_REPORT": 0,
                "PLANNED_PERSONS": 14,
                "OVER_52HOURS_LIST": [],
                "OVER_52HOURS_PERSONS": 0,
                "FIXED_ENG": "N",
                "SAVED_REPORT": 0,
                "DRAFT_REPORT": 14,
                "PROJECT_ACCUMULATED_HOURS": 5524.0,
                "ENGAGEMENT_NAME": "2024(12)/박정익/외감/KT&G",
                "TOTAL_REPORT": 15,
                "ENGAGEMENT_CODE": "67804911",
                "APPROVED_REPORT": 1,
                "RETAIN_CONNECTED_REPORT": 0,
                "PROJECT_ESTIMATED_HOURS": 0.0,
                "REQUESTED_REPORT": 1,
                "CR_FIXED_REPORT_DATE": "",
                "CR_FIXED_ENG": "",
                "FIXED_REPORT_DATE": "2025-03-04",
                "ACTUAL_HOURS": 16.0,
                "ACTUAL_PERSONS": 1,
                "ENGAGEMENT_OWNER_GPN": "KR010015753",
                "MERC_ENGAGEMENT_CODE": "E-67804911",
                "INIT_PLAN_TIME": 0,
                "PLANNED_HOURS": 420.0
            },
        ];

        if (data.endDate === '2024-08-09') {
            return { data: { result: result1 } };
        } else if (data.endDate === '2024-08-23') {
            return { data: { result: result2 } };
        } else if (data.endDate === '2024-08-30') {
            return { data: { result: result3 } };
        }
    },
    '/timeSheet/retrieveUnApprTimeReportByEngagement.do': {
        data: {
            "result": [
                {
                    "ACTIVITY_NAME": "Quarterly Review_Specialist",
                    "Tu_D": 8.0,
                    "DEMAND_ACTIVITY_CODE": "QRA3",
                    "GPN": "KR010022730",
                    "Tu_A": 8.0,
                    "ACTUAL_ENG_CODE": "68054921",
                    "GPN_NM": "이예솔",
                    "Fr_A": 8.0,
                    "Fr_D": 0.0,
                    "STATUS": "requested",
                    "Tu_R": 0.0,
                    "Sa_D": 0.0,
                    "Sa_A": 0.0,
                    "EY_RANK": "66",
                    "We_A": 8.0,
                    "GUI": "3422947",
                    "We_D": 8.0,
                    "TYPE": "REVIESED",
                    "DEMAND_DESCRIPTION": "",
                    "Fr_R": 0.0,
                    "EP_GPN": "KR010015753",
                    "Mo_A": 8.0,
                    "MERC_DEMAND_ENG_CODE": "E-68054921",
                    "Mo_D": 8.0,
                    "REVIEW_YN": "Y",
                    "TR_DESCRIPTION": "TESTTESTTEST",
                    "SUB_ACTIVITY_CODE": "DVC",
                    "ACTIVITY_CODE": "QRA3",
                    "MERC_ACTUAL_ENG_CODE": "E-68054921",
                    "Mo_R": 0.0,
                    "REQUEST_NO": 2576874,
                    "DEMAND_GLOB_SVC_CD": "10067",
                    "GLOB_SVC_CD": "10067",
                    "RETAIN_ENG_CODE": "68054921",
                    "Th_R": 0.0,
                    "DEMAND_ENG_CODE": "68054921",
                    "WORKING_TYPE": null,
                    "RETAIN_CONNECTION": 0,
                    "LPN": "22730     ",
                    "EOW_DATE": 1723129200000,
                    "DESCRIPTION": "",
                    "SEQ_NO": 4,
                    "GPN_GRADE": "직원                                    ",
                    "Su_D": 0.0,
                    "Su_A": 0.0,
                    "DEMAND_EP_NAME": "박정익",
                    "Sa_R": 0.0,
                    "GPN_SL": "Consulting",
                    "GPN_SSL": "CNS-Firmwide",
                    "We_R": 0.0,
                    "DEMAND_ACTIVITY_NAME": "Quarterly Review_Specialist",
                    "DEMAND_SUB_ACTIVITY_CODE": "DVC",
                    "DEMAND_EP_GPN": "KR010015753",
                    "EP_NAME": "박정익",
                    "Th_A": 8.0,
                    "TRANSFER_YN": "Y",
                    "Su_R": 0.0,
                    "APPROVED": "true",
                    "Th_D": 0.0
                },
                {
                    "ACTIVITY_NAME": "Year-end Audit_Specialist",
                    "Tu_D": 8.0,
                    "DEMAND_ACTIVITY_CODE": "QRA2",
                    "GPN": "KR010023861",
                    "Tu_A": 8.0,
                    "ACTUAL_ENG_CODE": "68054921",
                    "GPN_NM": "정혜원",
                    "REQ_DATE": 1724965197997,
                    "Fr_A": 8.0,
                    "Fr_D": 8.0,
                    "STATUS": "requested",
                    "Tu_R": 0.0,
                    "Sa_D": 0.0,
                    "Sa_A": 0.0,
                    "EY_RANK": "66",
                    "We_A": 8.0,
                    "GUI": "3530383",
                    "We_D": 8.0,
                    "TYPE": "REVIESED",
                    "DEMAND_DESCRIPTION": "테스트",
                    "Fr_R": 0.0,
                    "EP_GPN": "KR010004229",
                    "Mo_A": 8.0,
                    "MERC_DEMAND_ENG_CODE": "E-68054921",
                    "Mo_D": 8.0,
                    "TR_DESCRIPTION": "description 작성함.",
                    "SUB_ACTIVITY_CODE": "DVC",
                    "ACTIVITY_CODE": "YE03",
                    "MERC_ACTUAL_ENG_CODE": "E-68054921",
                    "Mo_R": 0.0,
                    "REQUEST_NO": 2576873,
                    "DEMAND_GLOB_SVC_CD": "10067",
                    "GLOB_SVC_CD": "10067",
                    "RETAIN_ENG_CODE": "68054921",
                    "Th_R": 0.0,
                    "DEMAND_ENG_CODE": "68054921",
                    "WORKING_TYPE": null,
                    "APPR_DATE": 1724864561823,
                    "RETAIN_CONNECTION": 0,
                    "LPN": "23861     ",
                    "EOW_DATE": 1723129200000,
                    "DESCRIPTION": "",
                    "SEQ_NO": 10,
                    "GPN_GRADE": "직원                                    ",
                    "Su_D": 0.0,
                    "Su_A": 0.0,
                    "DEMAND_EP_NAME": "박정익",
                    "Sa_R": 0.0,
                    "GPN_SL": "Consulting",
                    "GPN_SSL": "CNS-Firmwide",
                    "We_R": 0.0,
                    "DEMAND_ACTIVITY_NAME": "Quarterly Review_Auditor",
                    "DEMAND_EP_GPN": "KR010015753",
                    "EP_NAME": "김형범",
                    "Th_A": 8.0,
                    "TRANSFER_YN": "Y",
                    "Su_R": 0.0,
                    "APPROVED": "true",
                    "Th_D": 8.0
                }
            ]
        }
    },
    '/timeSheet/retrieveEngagementList.do': {
        data: {
            "result": [
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 7,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 7,
                    "PROJECT_ACCUMULATED_HOURS": 752.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/영진약품",
                    "TOTAL_REPORT": 7,
                    "ENGAGEMENT_CODE": "67811986",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-67811986",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 206.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 2,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 2,
                    "PROJECT_ACCUMULATED_HOURS": 1663.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/한국서부발전",
                    "TOTAL_REPORT": 2,
                    "ENGAGEMENT_CODE": "67810779",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-67810779",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 32.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "DRAFT_REPORT": 1,
                    "EOW_DATE": "2024-08-30",
                    "PROJECT_ACCUMULATED_HOURS": 3156.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/외부감사/한국수력원자력",
                    "TOTAL_REPORT": 2,
                    "ENGAGEMENT_CODE": "67799387",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "GPN_WORKINGTYPE_LIST": [
                        {
                            "WORKING_TYPE": "standard",
                            "GPN": "KR010023861",
                            "ACTUAL_HOURS_AVERAGE": 40.0,
                            "DETAILS": [
                                {
                                    "P": 0.0,
                                    "C": 40.0,
                                    "OVER_8": 0.0,
                                    "OVER_12": 0.0,
                                    "OVERTIME": 0.0,
                                    "EOW_DATE": "2024-08-30"
                                }
                            ],
                            "WEEK_IN_PERIOD": 1,
                            "END_DATE": "2024-08-30",
                            "START_DATE": "2024-08-24",
                            "ACTUAL_OVERTIME_AVERAGE": 0.0,
                            "ACTUAL_OVERTIME": 0.0,
                            "TOTAL_WEEKS": 1,
                            "TOTAL_HOURS": 40.0,
                            "ACTUAL_HOURS": 40.0,
                            "ACTUAL_DATE": "2024-08-30",
                            "TOTAL_OVERTIME": 0.0,
                            "TOTAL_HOURS_AVERAGE": 40.0,
                            "TOTAL_OVERTIME_AVERAGE": 0.0
                        }
                    ],
                    "ACTUAL_PERSONS": 1,
                    "MERC_ENGAGEMENT_CODE": "E-67799387",
                    "PLANNED_HOURS": 8.0,
                    "PLANNED_PERSONS": 1,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 1,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "2025-03-31",
                    "ACTUAL_HOURS": 24.0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "INIT_PLAN_TIME": 0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 3,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 3,
                    "PROJECT_ACCUMULATED_HOURS": 0.0,
                    "ENGAGEMENT_NAME": "2023(12)/박정익/임의/아르고에너지코리아홀딩스",
                    "TOTAL_REPORT": 3,
                    "ENGAGEMENT_CODE": "68424307",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-68424307",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 52.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 8,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 8,
                    "PROJECT_ACCUMULATED_HOURS": 44.0,
                    "ENGAGEMENT_NAME": "2022-2023/박정익/임의감사/세미파이브",
                    "TOTAL_REPORT": 8,
                    "ENGAGEMENT_CODE": "68440691",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-68440691",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 288.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 14,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 14,
                    "PROJECT_ACCUMULATED_HOURS": 5524.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/외감/KT&G",
                    "TOTAL_REPORT": 15,
                    "ENGAGEMENT_CODE": "67804911",
                    "APPROVED_REPORT": 1,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "2025-03-04",
                    "ACTUAL_HOURS": 16.0,
                    "ACTUAL_PERSONS": 1,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-67804911",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 420.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 1,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 1,
                    "PROJECT_ACCUMULATED_HOURS": 822.5,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/임의감사/Yakult Honsha",
                    "TOTAL_REPORT": 1,
                    "ENGAGEMENT_CODE": "67810248",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "2025-04-18",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-67810248",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 8.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 3,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 3,
                    "PROJECT_ACCUMULATED_HOURS": 490.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/기타법정감사/한전원자력연료",
                    "TOTAL_REPORT": 3,
                    "ENGAGEMENT_CODE": "67814481",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "FIXED_REPORT_DATE": "2025-03-10",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-67814481",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 120.0
                },
                {
                    "REJECTED_REPORT": 0,
                    "PLANNED_PERSONS": 5,
                    "OVER_52HOURS_LIST": [],
                    "OVER_52HOURS_PERSONS": 0,
                    "FIXED_ENG": "N",
                    "SAVED_REPORT": 0,
                    "DRAFT_REPORT": 5,
                    "PROJECT_ACCUMULATED_HOURS": 304.0,
                    "ENGAGEMENT_NAME": "2024(12)/박정익/K-SOX내부회계자문/CS Wind",
                    "TOTAL_REPORT": 5,
                    "ENGAGEMENT_CODE": "68170609",
                    "APPROVED_REPORT": 0,
                    "RETAIN_CONNECTED_REPORT": 0,
                    "PROJECT_ESTIMATED_HOURS": 0.0,
                    "REQUESTED_REPORT": 0,
                    "CR_FIXED_REPORT_DATE": "",
                    "CR_FIXED_ENG": "",
                    "ACTUAL_HOURS": 0.0,
                    "ACTUAL_PERSONS": 0,
                    "ENGAGEMENT_OWNER_GPN": "KR010015753",
                    "MERC_ENGAGEMENT_CODE": "E-68170609",
                    "INIT_PLAN_TIME": 0,
                    "PLANNED_HOURS": 152.0
                }
            ]
        }

    },
    '/timeSheet/retrieveTimeReportByEngagement.do': {
        data: {
            "result": [
                {
                    "ACTIVITY_NAME": "Quarterly Review_Specialist",
                    "Tu_D": 8.0,
                    "DEMAND_ACTIVITY_CODE": "QRA3",
                    "GPN": "KR010022730",
                    "Tu_A": 8.0,
                    "ACTUAL_ENG_CODE": "68054921",
                    "GPN_NM": "이예솔",
                    "Fr_A": 8.0,
                    "Fr_D": 0.0,
                    "STATUS": "requested",
                    "Tu_R": 0.0,
                    "Sa_D": 0.0,
                    "Sa_A": 0.0,
                    "EY_RANK": "66",
                    "We_A": 8.0,
                    "GUI": "3422947",
                    "We_D": 8.0,
                    "TYPE": "REVIESED",
                    "DEMAND_DESCRIPTION": "",
                    "Fr_R": 0.0,
                    "EP_GPN": "KR010015753",
                    "Mo_A": 8.0,
                    "MERC_DEMAND_ENG_CODE": "E-68054921",
                    "Mo_D": 8.0,
                    "REVIEW_YN": "Y",
                    "TR_DESCRIPTION": "TESTTESTTEST",
                    "SUB_ACTIVITY_CODE": "DVC",
                    "ACTIVITY_CODE": "QRA3",
                    "MERC_ACTUAL_ENG_CODE": "E-68054921",
                    "Mo_R": 0.0,
                    "REQUEST_NO": 2576874,
                    "DEMAND_GLOB_SVC_CD": "10067",
                    "GLOB_SVC_CD": "10067",
                    "RETAIN_ENG_CODE": "68054921",
                    "Th_R": 0.0,
                    "DEMAND_ENG_CODE": "68054921",
                    "WORKING_TYPE": null,
                    "RETAIN_CONNECTION": 0,
                    "LPN": "22730     ",
                    "EOW_DATE": 1723129200000,
                    "DESCRIPTION": "",
                    "SEQ_NO": 4,
                    "GPN_GRADE": "직원                                    ",
                    "Su_D": 0.0,
                    "Su_A": 0.0,
                    "DEMAND_EP_NAME": "박정익",
                    "Sa_R": 0.0,
                    "GPN_SL": "Consulting",
                    "GPN_SSL": "CNS-Firmwide",
                    "We_R": 0.0,
                    "DEMAND_ACTIVITY_NAME": "Quarterly Review_Specialist",
                    "DEMAND_SUB_ACTIVITY_CODE": "DVC",
                    "DEMAND_EP_GPN": "KR010015753",
                    "EP_NAME": "박정익",
                    "Th_A": 8.0,
                    "TRANSFER_YN": "Y",
                    "Su_R": 0.0,
                    "APPROVED": "true",
                    "Th_D": 0.0
                },
                {
                    "ACTIVITY_NAME": "Year-end Audit_Specialist",
                    "Tu_D": 8.0,
                    "DEMAND_ACTIVITY_CODE": "QRA2",
                    "GPN": "KR010023861",
                    "Tu_A": 8.0,
                    "ACTUAL_ENG_CODE": "68054921",
                    "GPN_NM": "정혜원",
                    "REQ_DATE": 1724965197997,
                    "Fr_A": 8.0,
                    "Fr_D": 8.0,
                    "STATUS": "requested",
                    "Tu_R": 0.0,
                    "Sa_D": 0.0,
                    "Sa_A": 0.0,
                    "EY_RANK": "66",
                    "We_A": 8.0,
                    "GUI": "3530383",
                    "We_D": 8.0,
                    "TYPE": "REVIESED",
                    "DEMAND_DESCRIPTION": "테스트",
                    "Fr_R": 0.0,
                    "EP_GPN": "KR010004229",
                    "Mo_A": 8.0,
                    "MERC_DEMAND_ENG_CODE": "E-68054921",
                    "Mo_D": 8.0,
                    "TR_DESCRIPTION": "description 작성함.",
                    "SUB_ACTIVITY_CODE": "DVC",
                    "ACTIVITY_CODE": "YE03",
                    "MERC_ACTUAL_ENG_CODE": "E-68054921",
                    "Mo_R": 0.0,
                    "REQUEST_NO": 2576873,
                    "DEMAND_GLOB_SVC_CD": "10067",
                    "GLOB_SVC_CD": "10067",
                    "RETAIN_ENG_CODE": "68054921",
                    "Th_R": 0.0,
                    "DEMAND_ENG_CODE": "68054921",
                    "WORKING_TYPE": null,
                    "APPR_DATE": 1724864561823,
                    "RETAIN_CONNECTION": 0,
                    "LPN": "23861     ",
                    "EOW_DATE": 1723129200000,
                    "DESCRIPTION": "",
                    "SEQ_NO": 10,
                    "GPN_GRADE": "직원                                    ",
                    "Su_D": 0.0,
                    "Su_A": 0.0,
                    "DEMAND_EP_NAME": "박정익",
                    "Sa_R": 0.0,
                    "GPN_SL": "Consulting",
                    "GPN_SSL": "CNS-Firmwide",
                    "We_R": 0.0,
                    "DEMAND_ACTIVITY_NAME": "Quarterly Review_Auditor",
                    "DEMAND_EP_GPN": "KR010015753",
                    "EP_NAME": "김형범",
                    "Th_A": 8.0,
                    "TRANSFER_YN": "Y",
                    "Su_R": 0.0,
                    "APPROVED": "true",
                    "Th_D": 8.0
                }
            ]
        }
    },
    '/roundRobin2/api/selectRoundRobinList.do': (data) => {
        const listData = [
            {
                "templateType": "FREE",
                "templateNo": "9",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000053",
                "statusCdName": "승인 진행중",
                "updateGpn": "20230064818",
                "roundRobinName": "사후조서 보완 관련 승인 요청의 건_회사명",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "templateName": "[ASU PPG] 사후조서 보완 관련 승인 요청",
                "drafterEmail": "Seungwhui.Lee@kr.ey.com",
                "requestDate": "2024-10-22",
                "createDate": "2024-10-22",
                "fileId": 0,
                "statusCode": "RA"
            },
            {
                "templateType": "FREE",
                "templateNo": "13",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000052",
                "statusCdName": "승인 진행중",
                "updateGpn": "20230064818",
                "roundRobinName": "공용법인카드 사용신청서",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "templateName": "[재경실] 공용법인카드 사용신청서",
                "drafterEmail": "Seungwhui.Lee@kr.ey.com",
                "requestDate": "2024-10-22",
                "createDate": "2024-10-22",
                "fileId": 10003,
                "statusCode": "RA"
            },
            {
                "templateType": "FREE",
                "templateNo": "1",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000051",
                "statusCdName": "승인 진행중",
                "updateGpn": "20230064818",
                "roundRobinName": "폼기안서",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "templateName": "자유형 템플릿 1",
                "drafterEmail": "Seungwhui.Lee@kr.ey.com",
                "requestDate": "2024-10-22",
                "createDate": "2024-10-22",
                "fileId": 10002,
                "statusCode": "RA"
            }
        ]

        const detailData = [
            {
                "templateType": "FREE",
                "templateNo": "9",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000053",
                "statusCdName": "승인 진행중",
                "updateGpn": "20230064818",
                "roundRobinName": "사후조서 보완 관련 승인 요청의 건_회사명",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "templateName": "[ASU PPG] 사후조서 보완 관련 승인 요청",
                "drafterEmail": "Seungwhui.Lee@kr.ey.com",
                "requestDate": "2024-10-22",
                "createDate": "2024-10-22",
                "fileId": 0,
                "statusCode": "RA"
            },
            {
                "template": {
                    "templateType": "FREE",
                    "template": {
                        "TEMPLATE_NO": "9",
                        "TEMPLATE": "<p>.</p>\n\n<table cellspacing=\"0\" class=\"MsoTableGrid\" style=\"border-collapse:collapse; border:none; width:602px\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">1. </span><span style=\"font-size:11.0pt\">고객회사명</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:1px solid black; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">2. Client Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">3. Engagement Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">4. </span><span style=\"font-size:11.0pt\">재무제표일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">5. </span><span style=\"font-size:11.0pt\">감사보고서일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">6. </span><span style=\"font-size:11.0pt\">아카이브일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">7. ARC Form number</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">8. ARC</span><span style=\"font-size:11.0pt\">에 문서를 추가한 일자 (문서가 ARC(Archive Record Center)에 추가된 날짜는 문서 추가에 대해 Regional PPD 가 승인한<br />\n\t\t\t날짜와 같거나 그 이후가 되어야 합니다.)</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">9. </span><span style=\"font-size:11.0pt\">사후조서 보완 사유</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">&nbsp;</p>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n"
                    },
                    "templateName": "[ASU PPG] 사후조서 보완 관련 승인 요청",
                    "templateTitle": "사후조서 보완 관련 승인 요청의 건_회사명",
                    "editorHtml": "<textarea name=\"editor1\" id=\"editor1\" ></textarea>"
                }
            },
            {
                "detail": [
                    {
                        "objectName": "content",
                        "objectValue": "<p>.</p>\n\n<table cellspacing=\"0\" class=\"MsoTableGrid\" style=\"border-collapse:collapse; border:none; width:602px\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">1. </span><span style=\"font-size:11.0pt\">고객회사명</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:1px solid black; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">1</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">2. Client Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">2</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">3. Engagement Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">3</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">4. </span><span style=\"font-size:11.0pt\">재무제표일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">4</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">5. </span><span style=\"font-size:11.0pt\">감사보고서일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">5</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">6. </span><span style=\"font-size:11.0pt\">아카이브일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">6</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">7. ARC Form number</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">7</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">8. ARC</span><span style=\"font-size:11.0pt\">에 문서를 추가한 일자 (문서가 ARC(Archive Record Center)에 추가된 날짜는 문서 추가에 대해 Regional PPD 가 승인한<br />\n\t\t\t날짜와 같거나 그 이후가 되어야 합니다.)</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">8</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">9. </span><span style=\"font-size:11.0pt\">사후조서 보완 사유</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">9</p>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n"
                    }
                ]
            }
        ]

        if (data.roundRobinId) {
            return { data: detailData }
        }
        else {
            return { data: listData }
        }
    },
    '/roundRobin2/api/selectRoundRobinApprovalList.do': {
        data: [
            {
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000053",
                "minSeq": 2,
                "requestDate": "2024-10-22",
                "statusCdName": "승인 진행중",
                "roundRobinName": "사후조서 보완 관련 승인 요청의 건_회사명",
                "fileId": 0,
                "statusCode": "RA"
            },
            {
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000052",
                "minSeq": 1,
                "requestDate": "2024-10-22",
                "statusCdName": "승인 진행중",
                "roundRobinName": "공용법인카드 사용신청서",
                "fileId": 10003,
                "statusCode": "RA"
            },
            {
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000051",
                "minSeq": 2,
                "requestDate": "2024-10-22",
                "statusCdName": "승인 진행중",
                "roundRobinName": "폼기안서",
                "fileId": 10002,
                "statusCode": "RA"
            }
        ]
    },
    '/roundRobin2/api/selectRoundRobinApproval.do': (data) => {
        const detail =
        {
            RR00000053: {
                "templateType": "FREE",
                "templateNo": "9",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000053",
                "approvalCheck": 0,
                "roundRobinContent": [
                    {
                        "objectName": "content",
                        "objectValue": "<p>.</p>\n\n<table cellspacing=\"0\" class=\"MsoTableGrid\" style=\"border-collapse:collapse; border:none; width:602px\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">1. </span><span style=\"font-size:11.0pt\">고객회사명</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:1px solid black; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">1</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">2. Client Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">2</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">3. Engagement Code</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">3</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">4. </span><span style=\"font-size:11.0pt\">재무제표일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">4</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">5. </span><span style=\"font-size:11.0pt\">감사보고서일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">5</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">6. </span><span style=\"font-size:11.0pt\">아카이브일</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">6</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">7. ARC Form number</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">7</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">8. ARC</span><span style=\"font-size:11.0pt\">에 문서를 추가한 일자 (문서가 ARC(Archive Record Center)에 추가된 날짜는 문서 추가에 대해 Regional PPD 가 승인한<br />\n\t\t\t날짜와 같거나 그 이후가 되어야 합니다.)</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">8</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">9. </span><span style=\"font-size:11.0pt\">사후조서 보완 사유</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">9</p>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n"
                    }
                ],
                "statusCdName": "승인 진행중",
                "roundRobinName": "사후조서 보완 관련 승인 요청의 건_회사명",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "requestDate": "2024-10-22",
                "fileId": 0,
                "statusCode": "RA"
            },
            RR00000052: {
                "templateType": "FREE",
                "templateNo": "13",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000052",
                "approvalCheck": 0,
                "roundRobinContent": [
                    {
                        "objectName": "content",
                        "objectValue": "<table cellspacing=\"0\" class=\"MsoTableGrid\" style=\"border-collapse:collapse; border:none; width:602px\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:1px solid black; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">요청자 소속법인</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:1px solid black; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">1</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">요청자 성명/사번</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">2</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\">요청자 소속 부서</span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">3</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">사용용도/가맹점</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">4</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">사용예정 금액</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">5</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">결제일자</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">6</p>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:491px\">\n\t\t\t<p style=\"text-align:left\"><span style=\"font-size:10pt\"><span style=\"font-family:&quot;맑은 고딕&quot;\"><span style=\"font-size:11.0pt\"><span style=\"color:black\">AP Voucher </span></span><span style=\"font-size:11.0pt\"><span style=\"color:black\">번호</span></span></span></span></p>\n\t\t\t</td>\n\t\t\t<td style=\"border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; height:23px; vertical-align:top; width:111px\">\n\t\t\t<p style=\"text-align:left\">7</p>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<p style=\"text-align:justify\">&nbsp;</p>\n"
                    }
                ],
                "statusCdName": "승인 완료",
                "roundRobinName": "공용법인카드 사용신청서",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "requestDate": "2024-10-22",
                "fileId": 10003,
                "statusCode": "RC"
            },
            RR00000051: {
                "templateType": "FORM",
                "templateNo": "4",
                "requestGpn": "20230064818",
                "roundRobinId": "RR00000060",
                "approvalCheck": 1,
                "roundRobinContent": [
                    {
                        "bind": "gpn",
                        "isAllRow": "N",
                        "isLeft": "Y",
                        "label": "카드 소유자",
                        "value": "20230064818"
                    },
                    {
                        "bind": "cardNo",
                        "isAllRow": "N",
                        "isLeft": "N",
                        "label": "카드 번호",
                        "value": "111,111,111,111"
                    },
                    {
                        "bind": "eMail",
                        "isAllRow": "N",
                        "isLeft": "Y",
                        "label": "연락처(이메일)",
                        "value": "Seungwhui.Lee@kr.ey.com"
                    },
                    {
                        "bind": "serviceLineName",
                        "isAllRow": "N",
                        "isLeft": "N",
                        "label": "Service Line",
                        "value": "CBS"
                    },
                    {
                        "bind": "curLimit",
                        "isAllRow": "N",
                        "isLeft": "Y",
                        "label": "현재 한도 금액",
                        "value": "100000"
                    },
                    {
                        "bind": "reqLimit",
                        "isAllRow": "N",
                        "isLeft": "N",
                        "label": "요청 한도 금액",
                        "value": "150000"
                    },
                    {
                        "bind": "increaseAmount",
                        "isAllRow": "N",
                        "isLeft": "Y",
                        "label": "증액 금액",
                        "value": "50,000"
                    },
                    {
                        "bind": "increasePeriodStart",
                        "isAllRow": "N",
                        "isLeft": "N",
                        "label": "증액 기간",
                        "value": "2024-10-31"
                    },
                    {
                        "bind": "projectEid",
                        "isAllRow": "N",
                        "isLeft": "Y",
                        "label": "Engagement Code",
                        "value": "E-67479090"
                    },
                    {
                        "bind": "epName",
                        "isAllRow": "N",
                        "isLeft": "N",
                        "label": "Engagement Partner",
                        "value": "강민석"
                    },
                    {
                        "bind": "increaseReason",
                        "isAllRow": "Y",
                        "isLeft": "Y",
                        "label": "증액 사유",
                        "value": "테스트"
                    }
                ],
                "statusCdName": "승인 진행중",
                "roundRobinName": "법인카드 한도 증액 신청서",
                "requestName": "이승휘",
                "requestDept": "CBS General-IT",
                "templateName": "[재경실] 법인카드 한도 증액 신청서",
                "requestDate": "2024-10-24",
                "fileId": 0,
                "statusCode": "RA"
            }
        }
        return { data: detail[data.roundRobinId] }
    },
    '/roundRobin2/api/selectApprovals.do': {
        data: [
            {
                "positionName": "직원",
                "updateDate": "2024-10-22",
                "approvalSeq": 1,
                "gpn": "111111111111",
                "approvalStatusCodeName": "승인 완료",
                "serviceLineName": "",
                "approvalRequestDate": "2024-10-22",
                "approvalDesc": "",
                "approvalType": "APPROVAL",
                "approvalStatusCode": "COMPLETE",
                "approvalGpnName": "",
                "approverInfo": "홍길동"
            },
            {
                "positionName": "직원",
                "updateDate": "2024-10-22",
                "approvalSeq": 1,
                "gpn": "111111111111",
                "approvalStatusCodeName": "승인 반려",
                "serviceLineName": "",
                "approvalRequestDate": "2024-10-22",
                "approvalDesc": "",
                "approvalType": "APPROVAL",
                "approvalStatusCode": "COMPLETE",
                "approvalGpnName": "",
                "approverInfo": "홍길동"
            },
            {
                "positionName": "",
                "updateDate": "          ",
                "approvalSeq": 2,
                "gpn": "20230064818",
                "approvalStatusCodeName": "",
                "serviceLineName": "",
                "approvalRequestDate": "2024-10-22",
                "approvalDesc": "",
                "approvalType": "APPROVAL",
                "approvalGpnName": "",
                "approverInfo": "이승휘"
            },
            {
                "positionName": "",
                "updateDate": "          ",
                "approvalSeq": 3,
                "gpn": "",
                "approvalStatusCodeName": "",
                "serviceLineName": "Assurance",
                "approvalRequestDate": "2024-10-22",
                "approvalDesc": "",
                "approvalType": "APPROVAL",
                "approvalGpnName": "",
                "approverInfo": "SL Quality Leader"
            }
        ]
    },
    '/roundRobin2/api/selectAttachFileList.do': {
        data: [
            {
                "updateDate": 1729545859940,
                "createGpn": "20230064818",
                "attachFilePath": "C:\\UAT\\DWP_FILES\\WRITEROUNDROBIN\\10003\\1. 표준계약서.txt",
                "description": "첨부파일",
                "fileSeq": 1,
                "updateGpn": "20230064818",
                "createGpnName": "이승휘",
                "updateGpnName": "이승휘",
                "attachFileName": "1. 표준계약서.txt",
                "attachFileOrginName": "1. 표준계약서.txt",
                "attachFileType": "WRITEROUNDROBIN",
                "fileId": 10003,
                "createDate": 1729545859940
            },
        ]
    },
    '/qrmNotices/QRMNoticesOpenCheck.do': {
        data: {
            "securitiesCompany": [
                {
                    "commonCodeName": "(주)BS투자증권",
                    "commonCode": "544"
                },
                {
                    "commonCodeName": "교보증권（주）",
                    "commonCode": "509"
                },
                {
                    "commonCodeName": "노무라금융투자",
                    "commonCode": "171"
                },
                {
                    "commonCodeName": "다이와증권캐피탈마켓",
                    "commonCode": "537"
                },
                {
                    "commonCodeName": "대신증권（주）",
                    "commonCode": "514"
                },
                {
                    "commonCodeName": "대우증권（주）",
                    "commonCode": "511"
                },
                {
                    "commonCodeName": "동부증권（주）",
                    "commonCode": "527"
                },
                {
                    "commonCodeName": "동양종합금융증권（주）",
                    "commonCode": "601"
                },
                {
                    "commonCodeName": "리딩투자증권 주식회사",
                    "commonCode": "531"
                },
                {
                    "commonCodeName": "메리린치증권",
                    "commonCode": "535"
                },
                {
                    "commonCodeName": "메리츠종합금융증권（주）",
                    "commonCode": "519"
                },
                {
                    "commonCodeName": "미래에셋증권주식회사",
                    "commonCode": "501"
                },
                {
                    "commonCodeName": "바로투자증권주식회사",
                    "commonCode": "532"
                },
                {
                    "commonCodeName": "부국증권(주)",
                    "commonCode": "513"
                },
                {
                    "commonCodeName": "비엔지증권",
                    "commonCode": "539"
                },
                {
                    "commonCodeName": "비엔피파리바증권",
                    "commonCode": "541"
                },
                {
                    "commonCodeName": "삼성증권주식회사",
                    "commonCode": "529"
                },
                {
                    "commonCodeName": "솔로몬투자증권 주식회사",
                    "commonCode": "525"
                },
                {
                    "commonCodeName": "신영증권（주）",
                    "commonCode": "515"
                },
                {
                    "commonCodeName": "신한금융투자（주）",
                    "commonCode": "170"
                },
                {
                    "commonCodeName": "아이비케이투자증권（주）",
                    "commonCode": "505"
                },
                {
                    "commonCodeName": "애플투자증권주식회사",
                    "commonCode": "507"
                },
                {
                    "commonCodeName": "에스지증권",
                    "commonCode": "536"
                },
                {
                    "commonCodeName": "에스케이증권주식회사",
                    "commonCode": "524"
                },
                {
                    "commonCodeName": "에이치엠씨투자증권주식회사",
                    "commonCode": "522"
                },
                {
                    "commonCodeName": "엔에이치투자증권（주）",
                    "commonCode": "528"
                },
                {
                    "commonCodeName": "엘아이지투자증권 주식회사",
                    "commonCode": "506"
                },
                {
                    "commonCodeName": "우리투자증권（주）",
                    "commonCode": "508"
                },
                {
                    "commonCodeName": "유안타증권",
                    "commonCode": "209"
                },
                {
                    "commonCodeName": "유진투자증권（주）",
                    "commonCode": "521"
                },
                {
                    "commonCodeName": "이트레이드증권（주）",
                    "commonCode": "502"
                },
                {
                    "commonCodeName": "주식회사 골든브릿지투자증권",
                    "commonCode": "516"
                },
                {
                    "commonCodeName": "케이비투자증권 주식회사",
                    "commonCode": "526"
                },
                {
                    "commonCodeName": "코리아RB증권",
                    "commonCode": "538"
                },
                {
                    "commonCodeName": "키움증권（주）",
                    "commonCode": "503"
                },
                {
                    "commonCodeName": "토러스 투자증권（주）",
                    "commonCode": "504"
                },
                {
                    "commonCodeName": "하나대투증권（주）",
                    "commonCode": "512"
                },
                {
                    "commonCodeName": "하이투자증권（주）",
                    "commonCode": "533"
                },
                {
                    "commonCodeName": "한국투자증권（주）",
                    "commonCode": "510"
                },
                {
                    "commonCodeName": "한국포스증권 주식회사",
                    "commonCode": "550"
                },
                {
                    "commonCodeName": "한맥투자증권（주）",
                    "commonCode": "530"
                },
                {
                    "commonCodeName": "한양증권(주)",
                    "commonCode": "517"
                },
                {
                    "commonCodeName": "한화증권주식회사",
                    "commonCode": "518"
                },
                {
                    "commonCodeName": "한화투자증권(푸르덴셜투자증권)",
                    "commonCode": "523"
                },
                {
                    "commonCodeName": "현대증권（주）",
                    "commonCode": "520"
                },
                {
                    "commonCodeName": "현대차증권",
                    "commonCode": "999"
                },
                {
                    "commonCodeName": "흥국증권",
                    "commonCode": "540"
                },
                {
                    "commonCodeName": "BOS증권",
                    "commonCode": "543"
                },
                {
                    "commonCodeName": "JP모간증권",
                    "commonCode": "534"
                },
                {
                    "commonCodeName": "KTB투자증권",
                    "commonCode": "542"
                }
            ],
            "QRMNoticesOpenCheck": {
                "NoticeOpenStatus": 1
            }
        }
    },
    '/qrmNotices/QRMNotices2OpenCheck.do': {
        data: {
            "securitiesCompany": [
                {
                    "commonCodeName": "(주)BS투자증권",
                    "commonCode": "544"
                },
                {
                    "commonCodeName": "교보증권（주）",
                    "commonCode": "509"
                },
                {
                    "commonCodeName": "노무라금융투자",
                    "commonCode": "171"
                },
                {
                    "commonCodeName": "다이와증권캐피탈마켓",
                    "commonCode": "537"
                },
                {
                    "commonCodeName": "대신증권（주）",
                    "commonCode": "514"
                },
                {
                    "commonCodeName": "대우증권（주）",
                    "commonCode": "511"
                },
                {
                    "commonCodeName": "동부증권（주）",
                    "commonCode": "527"
                },
                {
                    "commonCodeName": "동양종합금융증권（주）",
                    "commonCode": "601"
                },
                {
                    "commonCodeName": "리딩투자증권 주식회사",
                    "commonCode": "531"
                },
                {
                    "commonCodeName": "메리린치증권",
                    "commonCode": "535"
                },
                {
                    "commonCodeName": "메리츠종합금융증권（주）",
                    "commonCode": "519"
                },
                {
                    "commonCodeName": "미래에셋증권주식회사",
                    "commonCode": "501"
                },
                {
                    "commonCodeName": "바로투자증권주식회사",
                    "commonCode": "532"
                },
                {
                    "commonCodeName": "부국증권(주)",
                    "commonCode": "513"
                },
                {
                    "commonCodeName": "비엔지증권",
                    "commonCode": "539"
                },
                {
                    "commonCodeName": "비엔피파리바증권",
                    "commonCode": "541"
                },
                {
                    "commonCodeName": "삼성증권주식회사",
                    "commonCode": "529"
                },
                {
                    "commonCodeName": "솔로몬투자증권 주식회사",
                    "commonCode": "525"
                },
                {
                    "commonCodeName": "신영증권（주）",
                    "commonCode": "515"
                },
                {
                    "commonCodeName": "신한금융투자（주）",
                    "commonCode": "170"
                },
                {
                    "commonCodeName": "아이비케이투자증권（주）",
                    "commonCode": "505"
                },
                {
                    "commonCodeName": "애플투자증권주식회사",
                    "commonCode": "507"
                },
                {
                    "commonCodeName": "에스지증권",
                    "commonCode": "536"
                },
                {
                    "commonCodeName": "에스케이증권주식회사",
                    "commonCode": "524"
                },
                {
                    "commonCodeName": "에이치엠씨투자증권주식회사",
                    "commonCode": "522"
                },
                {
                    "commonCodeName": "엔에이치투자증권（주）",
                    "commonCode": "528"
                },
                {
                    "commonCodeName": "엘아이지투자증권 주식회사",
                    "commonCode": "506"
                },
                {
                    "commonCodeName": "우리투자증권（주）",
                    "commonCode": "508"
                },
                {
                    "commonCodeName": "유안타증권",
                    "commonCode": "209"
                },
                {
                    "commonCodeName": "유진투자증권（주）",
                    "commonCode": "521"
                },
                {
                    "commonCodeName": "이트레이드증권（주）",
                    "commonCode": "502"
                },
                {
                    "commonCodeName": "주식회사 골든브릿지투자증권",
                    "commonCode": "516"
                },
                {
                    "commonCodeName": "케이비투자증권 주식회사",
                    "commonCode": "526"
                },
                {
                    "commonCodeName": "코리아RB증권",
                    "commonCode": "538"
                },
                {
                    "commonCodeName": "키움증권（주）",
                    "commonCode": "503"
                },
                {
                    "commonCodeName": "토러스 투자증권（주）",
                    "commonCode": "504"
                },
                {
                    "commonCodeName": "하나대투증권（주）",
                    "commonCode": "512"
                },
                {
                    "commonCodeName": "하이투자증권（주）",
                    "commonCode": "533"
                },
                {
                    "commonCodeName": "한국투자증권（주）",
                    "commonCode": "510"
                },
                {
                    "commonCodeName": "한국포스증권 주식회사",
                    "commonCode": "550"
                },
                {
                    "commonCodeName": "한맥투자증권（주）",
                    "commonCode": "530"
                },
                {
                    "commonCodeName": "한양증권(주)",
                    "commonCode": "517"
                },
                {
                    "commonCodeName": "한화증권주식회사",
                    "commonCode": "518"
                },
                {
                    "commonCodeName": "한화투자증권(푸르덴셜투자증권)",
                    "commonCode": "523"
                },
                {
                    "commonCodeName": "현대증권（주）",
                    "commonCode": "520"
                },
                {
                    "commonCodeName": "현대차증권",
                    "commonCode": "999"
                },
                {
                    "commonCodeName": "흥국증권",
                    "commonCode": "540"
                },
                {
                    "commonCodeName": "BOS증권",
                    "commonCode": "543"
                },
                {
                    "commonCodeName": "JP모간증권",
                    "commonCode": "534"
                },
                {
                    "commonCodeName": "KTB투자증권",
                    "commonCode": "542"
                }
            ],
            "QRMNoticesOpenCheck": {
                "NoticeOpenStatus": 1
            }
        }
    },
    '/ispNotices/ISPRegularNoticesOpenCheck.do': {
        data: {
            "ISPNoticesOpenCheck": {
                "DEPT_NAME": "CBS General-IT",
                "GPN": "20230064818",
                "UPDATE_DATE": 1728924401030,
                "END_DATE": "2024-11-01",
                "START_DATE": "2024-10-14",
                "LPN": "24358     ",
                "EMAIL": "Seungwhui.Lee@kr.ey.com",
                "COMPANY": "한영회계법인",
                "NAME": "이승휘",
                "CREATE_DATE": 1728924401030,
                "YEAR": "2024",
                "SUBMIT_YN": "N",
                "TYPE": "신규",
                "SEQ": 2
            }
        }
    },
    '/timeSheet/retrieveMercuryCodeOptions.do': (data) => {
        const audit = {
            "result": [
                {
                    "VALUE": "10067"
                },
                {
                    "VALUE": "10390"
                },
                {
                    "VALUE": "10391"
                },
                {
                    "VALUE": "10393"
                },
                {
                    "VALUE": "35"
                }
            ]
        };

        if (data.name === 'AUDIT_GLOB_SVC_CD') {
            return {
                data: audit
            };
        }
    },
    '/timeSheet/retrieveWorkingHours.do': {
        data: {
            "result": true,
            "message": [
                {
                    "WORKING_TYPE": "standard",
                    "GPN": "20230064818",
                    "ACTUAL_HOURS_AVERAGE": 40.0,
                    "DETAILS": [
                        {
                            "P": 0.0,
                            "C": 40.0,
                            "OVER_8": 0.0,
                            "OVER_12": 0.0,
                            "OVERTIME": 0.0,
                            "EOW_DATE": "2024-10-18"
                        }
                    ],
                    "WEEK_IN_PERIOD": 1,
                    "END_DATE": "2024-10-18",
                    "START_DATE": "2024-10-12",
                    "ACTUAL_OVERTIME_AVERAGE": 0.0,
                    "ACTUAL_OVERTIME": 0.0,
                    "TOTAL_WEEKS": 1,
                    "TOTAL_HOURS": 40.0,
                    "ACTUAL_HOURS": 40.0,
                    "ACTUAL_DATE": "2024-10-18",
                    "TOTAL_OVERTIME": 0.0,
                    "TOTAL_HOURS_AVERAGE": 40.0,
                    "TOTAL_OVERTIME_AVERAGE": 0.0
                }
            ],
            "description": "Success"
        }
    }
};

export default PubData;