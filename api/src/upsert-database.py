import psycopg2
import requests
import os

DB_HOST = os.getenv('DATABASE_HOST')
DB_NAME = os.getenv('DATABASE_NAME')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASS = os.getenv('POSTGRES_PASSWORD')

def sync():
    try:
        # catalog.json を取得
        catalog_url = "http://streaming:80/catalog.json"

        response = requests.get(catalog_url)
        catalog = response.json()

        print(f"{catalog}")

        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS
        )
        cur = conn.cursor()

        # 2. Upsert（あれば名前を更新、なければ挿入）
        for item in catalog:
            cur.execute("""
                INSERT INTO videos (id, name)
                VALUES (%s, %s)
                ON CONFLICT (id) 
                DO UPDATE SET name = EXCLUDED.name;
            """, (item['id'], item['name']))

        conn.commit()
        print(f"Successfully synced {len(catalog)} videos.")
        
    except Exception as e:
        print(f"Sync failed: {e}")
    finally:
        if 'conn' in locals():
            cur.close()
            conn.close()

if __name__ == "__main__":
    sync()

