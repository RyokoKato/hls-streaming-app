## Reverse Proxy Server

- コンテナネットワークのDNSを使って、以下のホストコンテナのWebサービスへのプロキシを行う。
    - front
        - streaming コンテナの VOD を表示するフロントエンドサーバ
    - api
        - streaming コンテナに配置されている動画一覧情報を返却するAPIサーバー
    - streaming
        - m3u8, ts ファイルを格納するリソースサーバー
- listen port: 80, 443

## Usage

コンテナのビルド、起動は docker-compose.yaml を用いて行う。
