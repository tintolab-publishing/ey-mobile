/* eslint-disable react/prop-types */
import { createContext, useState, useRef } from 'react';
import EasyObj from '../dataset/EasyObj';
import useSendAxios from '../hook/useSendAxios';
import PubData from './PubData';
import Loading from '../component/loading/Loading';
import Alert from '../../modal/Alert';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // const APP_ENV = 'UAT';
    const APP_ENV = 'DEV';
    // const APP_ENV = 'PUB';

    const [auth, setAuth] = useState();

    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        onClick: undefined,
        lastFoucusRef: null
    });

    const showAlert = (msg, onClick, lastFoucusRef = null) => {
        setAlert({ show: true, msg, onClick, lastFoucusRef });
    };

    const hideAlert = () => {
        if (alert.lastFoucusRef) {
            alert.lastFoucusRef.focus();
        }
        alert.onClick && alert.onClick();
        setAlert({ show: false, msg: '', onClick: undefined, lastFoucusRef: null });
    };

    const introModal = EasyObj({
        security: false,
        stockConfirm1: false,
        stockConfirm2: false
    });

    const loading = EasyObj(
        {
            isLoading: false,
            loadingCounter: 0
        }
    );
    const userInfo = EasyObj();
    const sharedData = EasyObj();

    const updateLoading = (increment) => {
        loading.loadingCounter += increment;
        loading.isLoading = loading.loadingCounter > 0;
    };

    const setLoading = (value) => {
        loading.isLoading = value;
        loading.loadingCounter = value ? 1 : 0;
    };

    const sendAxios = useSendAxios(updateLoading);

    const axios = async (reqObj) => {
        if (APP_ENV === 'PUB') {
            // URL에서 경로와 쿼리 문자열 분리
            const [path, queryString] = reqObj.url.split('?');

            let params = {};

            if (queryString) {
                const queryParams = new URLSearchParams(queryString);
                for (const [key, value] of queryParams) {
                    params[key] = value;
                }
            }

            if (reqObj.method === 'POST' && reqObj.data instanceof URLSearchParams) {
                for (const [key, value] of reqObj.data) {
                    params[key] = value;
                }
            } else if (reqObj.data) {
                params = { ...params, ...reqObj.data };
            }

            if (typeof PubData[path] === 'function') {
                // 함수인 경우 요청 데이터와 쿼리 파라미터를 전달하여 호출
                return PubData[path](params);
            } else {
                const response = PubData[path];
                if (response) {
                    return response;
                } else {
                    console.warn(`No mock data found for URL: ${path}`);
                    return { data: {} };
                }
            }
        }
        else {
            if (!reqObj.onError) {
                reqObj.onError = (error) => {
                    console.error('Default error handling:', error);
                    showAlert(error.message);
                };
            }

            const result = await sendAxios(reqObj);
            return result;
        }
    };

    const formatDate = (input, format = 'YYYY-MM-DD') => {
        const parseDate = (str) => {
            if (str instanceof Date) return str;
            if (typeof str !== 'string') return new Date(str);

            // ISO 8601 형식 (예: "2024-09-06T08:38:01") 처리
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
                // 시간대 정보가 없는 경우 로컬 시간으로 해석
                return new Date(str.replace('T', ' '));
            }

            if (/^\d+$/.test(str)) {
                const year = str.substr(0, 4);
                const month = str.substr(4, 2);
                const day = str.substr(6, 2);
                const hour = str.substr(8, 2) || '00';
                const minute = str.substr(10, 2) || '00';
                const second = str.substr(12, 2) || '00';
                return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
            }

            return new Date(str);
        };

        const date = parseDate(input);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date input');
        }

        const pad = (num, length = 2) => String(num).padStart(length, '0');

        const tokens = {
            YYYY: () => String(date.getFullYear()),
            YY: () => String(date.getFullYear()).slice(-2),
            MMMM: () => date.toLocaleString('default', { month: 'long' }),
            MMM: () => date.toLocaleString('default', { month: 'short' }),
            MM: () => pad(date.getMonth() + 1),
            M: () => String(date.getMonth() + 1),
            DDDD: () => date.toLocaleString('default', { weekday: 'long' }),
            DDD: () => date.toLocaleString('default', { weekday: 'short' }),
            DD: () => pad(date.getDate()),
            D: () => String(date.getDate()),
            HH: () => pad(date.getHours()),
            H: () => String(date.getHours()),
            hh: () => pad(date.getHours() % 12 || 12),
            h: () => String(date.getHours() % 12 || 12),
            mm: () => pad(date.getMinutes()),
            m: () => String(date.getMinutes()),
            ss: () => pad(date.getSeconds()),
            s: () => String(date.getSeconds()),
            SSS: () => pad(date.getMilliseconds(), 3),
            A: () => date.getHours() < 12 ? '오전' : '오후',
            a: () => date.getHours() < 12 ? 'am' : 'pm'
        };

        const tokenRegex = new RegExp(Object.keys(tokens).join('|'), 'g');

        return format.replace(tokenRegex, (match) => tokens[match]());
    };

    const getUserInfo = async () => {
        const api = await axios({
            url: '/main/selectMyInfo.do',
            method: 'POST'
        });
        userInfo.copy(api.data.myInfo);
    };

    const getPeopleInfo = async (searchWord) => {
        const api = await axios({
            url: '/main/selectPeopleInfo.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                searchWord: searchWord
            },
        });
        return api.data.resultList;
    };

    return (
        <AppContext.Provider value={{
            auth, setLoading, setAuth, sharedData, formatDate, APP_ENV,
            axios, getUserInfo, userInfo, getPeopleInfo, introModal,
            alert, showAlert, hideAlert
        }}>
            {loading.isLoading && <Loading />}
            {children}
            {alert.show && <Alert text={alert.msg} onClick={hideAlert} />}
        </AppContext.Provider>
    );
};
