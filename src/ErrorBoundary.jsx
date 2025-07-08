import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // 상태를 업데이트하여 다음 렌더링에서 대체 UI가 표시되도록 합니다.
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ hasError: true, error: error, errorInfo: errorInfo });
    }

    render() {
        // if (this.state.hasError) {
        //     // 오류 발생 시 렌더링할 대체 UI
        //     return <h1>Something went wrong.</h1>;
        // }
        if (this.state.hasError) {
            console.error("예외 발생:", this.state.error, this.state.errorInfo);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

// 사용 예시:
// <ErrorBoundary>
//   <MyComponent />
// </ErrorBoundary>
