from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from time import sleep
import json

# 크롬 드라이버 자동 다운로드 및 실행
driver = webdriver.Chrome(ChromeDriverManager().install())
# 크롬 드라이버 옵션 설정
chrome_options = Options()
chrome_options.add_argument("--headless")  # headless 모드 활성화

# 크롬 드라이버 자동 다운로드 및 실행
driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
# 웹사이트 접속
driver.get('http://sharehub.kr/sharemap/sharemapProductList.do')



page_number = 1

while True:
    # "board-list photo" 클래스 내의 form 태그 안의 ul 태그 내의 li 요소들 선택
    li_elements = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.board-list.photo ul li'))
    )
    try:
        with open('data.json', 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):  # 파일이 없거나 JSON 형식이 아닌 경우
        existing_data = []

    data_list = existing_data

    # 선택된 li 요소들의 내용 출력
    for li in li_elements:
        # 이미지 URL 추출
        img_url = li.find_element(By.CSS_SELECTOR, '.list-img img').get_attribute('src')
        
        # 제목 및 상세 정보 추출
        title = li.find_element(By.CSS_SELECTOR, '.info.img .title').text
        category_model = li.find_elements(By.CSS_SELECTOR, '.title-sub span')
        category = category_model[0].text if len(category_model) > 0 else None
        model = category_model[1].text if len(category_model) > 1 else None
        place_time = li.find_elements(By.CSS_SELECTOR, '.title-sub span')
        place = place_time[2].text if len(place_time) > 2 else None
        time = place_time[3].text if len(place_time) > 3 else None
        phone_fee = li.find_elements(By.CSS_SELECTOR, '.title-sub span')
        phone = phone_fee[4].text if len(phone_fee) > 4 else None
        fee = phone_fee[5].text if len(phone_fee) > 5 else None

        data = {
            "img_url": img_url,
            "title": title,
            "category": category,
            "model": model,
            "place": place,
            "time": time,
            "phone": phone,
            "fee": fee
        }
        data_list.append(data)

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False, indent=4)

    # 다음 페이지로 이동하기 위한 숫자 버튼을 찾기
    try:
        print(f'페이지 : {page_number+1}')
        next_page_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f".page-nav a[onclick='fn_search({page_number + 1});return false; ']"))
        )
        next_page_button.click()
        page_number += 1

    # 다음 페이지 버튼을 찾지 못하는 경우 (마지막 페이지인 경우)
    except TimeoutError:
        print("Crawling completed or next page button not found.")
        break
    sleep(1)

# 드라이버 종료
driver.quit()