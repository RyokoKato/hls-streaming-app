## Database Server

- 動画ID、動画タイトルを管理するデータベースサーバー
- PostgreSQLのパスワード、ユーザ名などの変数を設定する必要がある

### 環境変数の設定

プロジェクトルートに .env ファイルを作成し、以下の環境変数の値を設定する。

```env
## Database Container
### name of DB host container
DATABASE_HOST=<DBのホスト名>

### database environment variables
DATABASE_NAME=<DB名>
POSTGRES_USER=<DBのユーザ名>
POSTGRES_PASSWORD=<DBのパスワード>
```

## DBのテーブル一覧

- [init.sql](init.sql) を参照

### 構築方法

- docker-compose.yaml を用いて構築する
