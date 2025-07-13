import MainLayout from '../common/layout/MainLayout';
import Dashboard from './dashboard/Dashboard';
import List from '../List';
import Login from './login/Login';
import Procurement from './procurement/Procurement';
import DetailProcurement from './procurement/DetailProcurement';
import DetailLayout from '../common/layout/DetailLayout';
import TmsSubmit from './tmsSubmit/TmsSubmit';
import TmsApproval from './tmsApproval/TmsApproval';
import Payment from './payment/Payment';
import DetailPayment from './payment/DetailPayment';
import LoginDev from './login/LoginForDev';
import RoundRobin from './roundRobin/RoundRobin';
import DetailRoundRobin from './roundRobin/DetailRoundRobin';
import IndepResponse from './indepResponse/IndepResponse';

const RouteIndex = {
    /* /list */
    list: {
        name: "컴포넌트",
        component: List,
    },

    /* /login */
    login: {
        name: '로그인',
        component: Login,
    },

    /* /loginForDevEnvWithoutAuth  */
    loginForDevEnvWithoutAuth: {
        name: '로그인',
        component: LoginDev,
    },

    /* /dashboard */
    dashboard: {
        name: "대쉬보드",
        component: Dashboard,
        layout: MainLayout,
    },

    /* /payment */
    payment: {
        name: "AP 승인",
        component: Payment,
        layout: MainLayout,

        /* /payment/detail */
        detail: {
            name: "AP 승인",
            component: DetailPayment,
            layout: DetailLayout
        }
    },

    /* /procurement */
    procurement: {
        name: "구매 승인",
        component: Procurement,
        layout: MainLayout,

        /* /procurement/detail */
        detail: {
            name: "구매 승인",
            component: DetailProcurement,
            layout: DetailLayout
        }
    },

    /* /roundRobin */
    roundRobin: {
        name: "기안서 승인",
        component: RoundRobin,
        layout: MainLayout,

        /* /roundRobin/detail */
        detail: {
            name: "기안서 승인",
            component: DetailRoundRobin,
            layout: DetailLayout
        }
    },

    /* /tmsSubmit */
    tmsSubmit: {
        name: "TimeSheet 작성",
        component: TmsSubmit,
        layout: MainLayout,
    },

    /* /tmsApproval */
    tmsApproval: {
        name: "TimeSheet 승인",
        component: TmsApproval,
        layout: MainLayout,
    },

    /* /indepResponse */
    indepResponse: {
        name: "독립성 확인 답변 작성",
        component: IndepResponse,
        layout: MainLayout,
    },
};

export default RouteIndex;
