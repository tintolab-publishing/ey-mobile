import { useContext, useState } from 'react';
import { AppContext } from '../../common/share/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/component/button/Button';

const LoginDev = ({ path }) => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

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
        console.log(result1);
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

    const onLogin = async () => {
        console.log('getSession');
        const response = await getSession(username);
        if (response === 'success') {
            cmn.setAuth(true);
            console.log('success');
            // After
            if (window.performance && performance.memory) {
                const memory = performance.memory;
                console.log(`Memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100} MB`);
            }
            navigate(path || '/dashboard');
        } else {
            alert('login failed');
            // 여기에 로그인 실패 처리를 추가할 수 있습니다.
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">개발자 로그인</h2>
                <input
                    type="text"
                    placeholder="아이디 입력"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                />
                <Button
                    onClick={onLogin}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    로그인
                </Button>
            </div>
        </div>
    );
};

export default LoginDev;