import json
import sqlite3

# JSON 데이터 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# SQLite3 데이터베이스 연결 및 테이블 생성
conn = sqlite3.connect('data.db')
c = conn.cursor()
c.execute('''
CREATE TABLE IF NOT EXISTS data_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT,
    title TEXT,
    category TEXT,
    model TEXT,
    place TEXT,
    time TEXT,
    phone TEXT,
    fee TEXT
);
''')
conn.commit()

# JSON 데이터를 SQLite3 데이터베이스에 삽입
for item in json_data:
    c.execute('''
    INSERT INTO data_table (img_url, title, category, model, place, time, phone, fee)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (item['img_url'], item['title'], item['category'], item['model'], item['place'], item['time'], item['phone'], item['fee']))
conn.commit()

# 데이터베이스 연결 종료
conn.close()
