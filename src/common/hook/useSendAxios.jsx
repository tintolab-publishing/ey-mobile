import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../share/AppContext';

const useSendAxios = (updateLoading) => {
    const navigate = useNavigate();
    const cmn = useContext(AppContext);

    const defaultErrorHandler = useCallback((error) => {
        // console.error('An error occurred:', error);        
        alert(error);
        // navigate('/login');
    }, [navigate]);

    const sendAxios = useCallback(async (reqOption) => {
        try {
            updateLoading(1);

            let data = reqOption.data;
            let url = reqOption.url;
            let headers = reqOption.additional?.headers || {};

            switch (reqOption.type) {
                case 'queryString':
                    data = Object.keys(reqOption.data)
                        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqOption.data[key])}`)
                        .join('&');
                    url = `${url}?${data}`;
                    data = '';
                    break;
                case 'urlEncoded':
                    {
                        const params = new URLSearchParams();
                        Object.entries(reqOption.data).forEach(([key, value]) => {
                            if (Array.isArray(value)) {
                                value.forEach(item => {
                                    params.append(`${key}[]`, item);
                                });
                            } else {
                                params.append(key, value);
                            }
                        });
                        data = params.toString();
                        headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        break;
                    }
                case 'json':
                default:
                    headers['Content-Type'] = 'application/json';
                    break;
            }


            const response = await axios({
                url: `/api${url}`,
                method: reqOption.method,
                data: data,
                responseType: reqOption.responseType,
                headers: headers,
                ...reqOption.additional
            });
            return response;
        } catch (error) {
            let errorMessage = 'An unknown error occurred';

            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const data = error.response?.data;

                // HTML 응답에서 error_sub 내용 파싱
                if (typeof data === 'string' && data.includes('error_sub')) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const errorSubElement = doc.querySelector('.error_sub');
                    if (errorSubElement) {
                        const fullErrorText = errorSubElement.textContent;
                        const exceptionIndex = fullErrorText.indexOf('Exception:');
                        errorMessage = exceptionIndex !== -1
                            ? fullErrorText.substring(exceptionIndex + 10).trim()
                            : fullErrorText;
                    }
                } else {
                    switch (status) {
                        case 400:
                            errorMessage = 'Bad Request: The server could not understand the request.';
                            break;
                        case 401:
                            errorMessage = 'Unauthorized: Authentication is required and has failed or has not been provided.';
                            break;
                        case 403:
                            errorMessage = 'Forbidden: You do not have the necessary permissions for this resource.';
                            break;
                        case 404:
                            errorMessage = 'Not Found: The requested resource could not be found.';
                            break;
                        case 500:
                            errorMessage = `Internal Server Error from ${reqOption.url}`;
                            break;
                        case 502:
                            errorMessage = `Bad Gateway from ${reqOption.url}`
                            break;
                        case 504:
                            errorMessage = `Gateway Timeout from ${reqOption.url}`
                            break;
                        default:
                            errorMessage = `Request failed from ${reqOption.url}`;
                    }
                }
            }
            console.log(error);
            const enhancedError = new Error(errorMessage);
            enhancedError.originalError = error;

            if (reqOption.onError) {
                reqOption.onError(enhancedError);
            } else {
                defaultErrorHandler(enhancedError);
            }
            return Promise.reject(enhancedError);
        } finally {
            updateLoading(-1);
        }
    }, [defaultErrorHandler, updateLoading]);

    return sendAxios;
};

export default useSendAxios;
