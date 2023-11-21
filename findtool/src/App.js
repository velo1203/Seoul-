import React, {useState, useEffect} from 'react';
import {useInView} from 'react-intersection-observer'; // react-intersection-observer 라이브러리를 사용
import axios from './AxiosConfig';
import Navbar from './Component/Navbar';
import HeroSection from './Component/HeroSection';
import ProductPage from './Component/ProductPage';
import SearchComponent from './Component/Search';
import './App.css'

function App() {
    const [products, setProducts] = useState([]); // 상품 목록을 담을 상태
    const [page, setPage] = useState(1); // 현재 페이지를 나타내는 상태
    const [fetching, setFetching] = useState(true); // 데이터를 가져오고 있는지 상태를 나타내는 상태]
    const [searchQuery, setSearchQuery] = useState(''); // 추가: 검색 쿼리 상태
    // inView는 요소가 보이는지 아닌지를 판단, ref는 해당 요소에 연결될 참조
    const [ref, inView] = useInView({
        threshold: 0, // 얼마나 많은 부분이 보여야 inView가 true가 되는지 설정 (0은 어느정도라도 보이면 true)
    });

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `/get_product?search=${searchQuery}&page=${page}`
                );
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...response.data
                ]);
            } catch (error) {
                console.log('Error fetching products:', error);
            } finally {
                setFetching(false);
            }
        };

        if (fetching) {
            fetchProducts();
        }
    }, [fetching, page, searchQuery]); // 추가: searchQuery 의존성

    // 스크롤 위치를 감지하는 useEffect
    useEffect(() => {
        // inView가 true이고 fetching이 아닐 경우
        if (inView && !fetching) {
            setFetching(true); // 다음 데이터를 가져오기 위해 fetching을 true로 설정
            setPage((prevPage) => prevPage + 1); // 페이지 번호를 증가
        }
    }, [inView]);
    useEffect(() => {
      setProducts([]); // 검색어가 바뀌면 상품 목록 초기화
      setPage(1); // 페이지도 초기화
      setFetching(true); // 새로운 데이터를 불러올 준비
    }, [searchQuery]);
    

    return (
        <div className="App">
            <Navbar/>
            <HeroSection/>
            <SearchComponent onSearch={setSearchQuery}/> {/* 추가: 검색 컴포넌트 */}
            <ProductPage products={products}/>
            <div className='loading' ref={ref}>로딩중..</div>
        </div>
    );
}

export default App;
