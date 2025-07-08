import { useEffect, useContext, useRef } from 'react';
import { loginRequest } from '../../common/sso/msalConfig';
import { AppContext } from '../../common/share/AppContext';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Button from '../../common/component/button/Button';

const Login = ({ path }) => {
    const { instance } = useMsal();
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const called = useRef(false);

    const getSession = async (username) => {

        const req = {
            url: '/login/loginProcess.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                email: username,
                mobile: 'Y',
                msal: 'ok',
            },
        };

        const result1 = await cmn.axios(req);
        if (cmn.APP_ENV === 'UAT') {
            if (result1.data.login === 'success') {
                return 'success';
            }
        }
        const redirect1 = result1.request.responseURL.replace(window.location.origin, '');
        if (redirect1 === '/login/mobileLoginSuccess.do') {
            const result2 = await cmn.axios({ url: redirect1, method: 'get' });
            const redirect2 = result2.request.responseURL.replace(window.location.origin, '');
            if (redirect2 === '/main/successMobile.do') {
                const result3 = await cmn.axios({ url: redirect2, method: 'get' });
                if (result3.data.login === 'success') {
                    return 'success';
                }
            }
        }
        return 'fail';
    }

    useEffect(() => {
        const authenticate = async () => {
            if (called.current) return;
            called.current = true;
            console.log(`running by ${cmn.APP_ENV}`);
            try {
                if (cmn.APP_ENV === 'PUB') {
                    cmn.setAuth(true);
                    navigate('/dashboard');
                }
                else if (cmn.APP_ENV === 'UAT') {
                    const accounts = instance.getAllAccounts();
                    let loginResponse;

                    if (accounts.length > 0) {
                        loginResponse = { account: accounts[0] };
                    } else {
                        loginResponse = await instance.loginPopup(loginRequest);
                    }

                    console.log('getSession');
                    const response = await getSession(loginResponse.account.username);
                    if (response === 'success') {
                        cmn.setAuth(true);
                        console.log('success');
                        navigate(path || '/dashboard');
                    }
                }
                else if (cmn.APP_ENV === 'DEV') {
                    if (cmn.auth) {
                        navigate(path || '/dashboard');
                        return;
                    }
                    navigate('/loginForDevEnvWithoutAuth');
                }
            } catch (error) {
                console.error('인증 처리 중 에러:', error);
            }
        };
        authenticate();

    }, []);

    const onLogin = async () => {
        const username = document.querySelector('input[type="text"]').value;
        console.log(username);

        console.log('getSession');
        const response = await getSession(username);
        if (response === 'success') {
            cmn.setAuth(true);
            console.log('success');
            navigate('/dashboard');
        }
    }

    return null;
};

export default Login;
