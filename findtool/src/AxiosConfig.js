// AxiosConfig.js 라는 파일을 만들어 이 안에 설정을 저장합니다.
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버의 기본 URL
  timeout: 1000, // 요청에 대한 타임아웃 시간 (밀리초)
  headers: {'X-Custom-Header': 'some-value'} // 요청에 포함될 커스텀 헤더
});

export default instance;
