import datetime
import os
import psycopg2
from psycopg2.extras import DictCursor
from psycopg2.extensions import connection

### Environment Variable
DB_HOST = os.getenv('DATABASE_HOST')
DB_NAME = os.getenv('DATABASE_NAME')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASS = os.getenv('POSTGRES_PASSWORD')
STREAMING_DOMAIN_NAME = os.getenv('STREAMING_DOMAIN_NAME')

### Values
THUMBNAIL_BASE_PATH = f"https://{STREAMING_DOMAIN_NAME}/thumbs"
PLAYLIST_BASE_PATH = f"https://{STREAMING_DOMAIN_NAME}/hls"
PLAYLIST_NAME = "output.m3u8"

### connectDB
## return:
##   - connection
def connectDB() -> connection:
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

### videolist
## return:
## - 以下の要素からなるarray
### - 動画ID (str)
### - 動画タイトル (str)
### - 動画更新日 (datetime)
### - サムネイルURL (str)
def videolist() -> list[dict[str, str]]:
    with connectDB() as conn:
        with conn.cursor(cursor_factory=DictCursor) as cur:
            sql = "SELECT * FROM videos;"
            cur.execute(sql)

            rows = cur.fetchall()

            list = []
            for row in rows:
                createdAt = row['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                list.append(
                    {
                        "id": row['id'],
                        "name": row['name'],
                        "created_at": createdAt,
                        "thumb": f"{THUMBNAIL_BASE_PATH}/{row['id']}.jpg"
                    }
                )

            return list

### videodetail
## returns
## - Tuple
##   - 動画タイトル (str)
##   - 動画更新日 (datetime)
##   - 動画URL (str)
def videodetail(id: str) -> dict[str, str]:
    with connectDB() as conn:
        with conn.cursor(cursor_factory=DictCursor) as cur:
            sql = f"SELECT name, created_at FROM videos WHERE id = \'{id}\';"
            cur.execute(sql)

            row = cur.fetchone();

            createdAt = row['created_at'].strftime("%Y-%m-%d %H:%M:%S")
            dict = {
                "name": row['name'],
                "created_at": createdAt,
                "url": f"{PLAYLIST_BASE_PATH}/{id}/{PLAYLIST_NAME}"
            }

            return dict
