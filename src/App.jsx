import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import NotFoundPage from './page/NotFoundPage';
import RouteIndex from './page/RouteIndex';
import { AppProvider } from './common/share/AppContext';
import Login from './page/login/Login';
import { AppContext } from './common/share/AppContext';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './common/sso/msalConfig';
import { MsalProvider } from '@azure/msal-react';
import LoginDev from './page/login/LoginForDev';

const LocationWrapper = () => {
  const location = useLocation();

  const cmn = useContext(AppContext);

  if (!cmn.auth && location.pathname !== '/loginForDevEnvWithoutAuth') {
    if (cmn.APP_ENV === 'DEV') {
      return <LoginDev path={location.pathname} />
    }
    else {
      return <Login path={location.pathname} />
    }
  }

  const getRouteFromPath = (path) => {
    if (path === '/' || path === '') {
      return { parentPath: null, currentRoute: RouteIndex.dashboard };
    }

    const pathParts = path.split('/').filter(part => part !== '');
    let parentPath = "/" + pathParts.slice(0, pathParts.length - 1).join('/');
    let currentRoute = RouteIndex;

    for (const part of pathParts) {
      if (currentRoute[part]) {
        currentRoute = currentRoute[part];
      } else {
        return { parentPath: null, currentRoute: null };
      }
    }

    return { parentPath, currentRoute };
  };

  const renderWithLayouts = (getRoute, layouts = []) => {
    const Component = getRoute.currentRoute.component;
    const name = getRoute.currentRoute.name;
    const parentPath = getRoute.parentPath;

    return layouts.reduceRight((children, Layout) => {
      return <Layout name={name} parentPath={parentPath}>{children}</Layout>;
    }, <Component />);
  };

  const getRoute = getRouteFromPath(location.pathname);
  const currentRoute = getRoute.currentRoute;
  if (!currentRoute || !currentRoute.component) {
    return <Navigate to="/notFound" replace />;
  }

  const layouts = Array.isArray(currentRoute.layout) ? currentRoute.layout : [currentRoute.layout].filter(Boolean);

  return renderWithLayouts(getRoute, layouts);

};

const App = () => {
  const [msalInstance, setMsalInstance] = useState();

  useEffect(() => {
    const init = async () => {
      const msalInstance = new PublicClientApplication(msalConfig);
      await msalInstance.initialize();
      setMsalInstance(msalInstance);
    }

    init();
  }, [])

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 컴포넌트가 마운트될 때와 리사이즈 이벤트 발생 시 setScreenSize 호출
  useEffect(() => {
    // 화면 크기 초기 설정
    setScreenSize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', setScreenSize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('resize', setScreenSize);
  }, []);

  if (!msalInstance) {
    return null;
  }

  return (
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <AppProvider>

          <Routes>
            <Route path="notFound" element={<NotFoundPage />} />
            <Route path="*" element={<LocationWrapper />} />
          </Routes>
        </AppProvider>
      </MsalProvider>
    </BrowserRouter >
  );
};

export default App;