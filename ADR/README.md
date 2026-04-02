## Architecture Decision Record
- 技術選定にあたっての方針を記載したもの

### 利用技術

お金をかけないことを第一に、下記の技術を使う。
- コンテナのホスティングサービス
  - podman
  - コンテナネットワークを構築するため、docker-compose.yaml を用いてコンテナイメージのビルド、コンテナの起動を行う
    - 各コンテナのビルドは、Dockerfileを用いる

#### サーバー群
|名称 |コンテナ名 |利用するベースイメージ | 利用用途 |
|---|---|---|---|
|リバースプロキシサーバー |[reverse-proxy](../reverse-proxy/) |nginx |フロントサーバー、APIサーバーへプロキシパスする |
|フロントサーバー |[front](../front/) |nginx |サーバーに配置したHTMLファイル, Javascriptを用いて streaming サーバのm3u8プレイリストを視聴する |
|API サーバー |[api](../api/) |Flask | database サーバの動画情報をAPIとして返却するサーバー |
|ストリーミングサーバー |[streaming](../streaming/) |nginx |サーバに配置した m3u8, ts ファイルを配信するサーバー |
|データベースサーバー |[database](../database/) |postgres |streaming サーバに配置された動画情報を管理するDBサーバー |
|証明書の更新サーバー |[certbot](../certbot/) |certbot/dns-cloudflare |リバースプロキシサーバーの証明書の自動更新を行うためのサーバー|

### 構成
ホストPCからフロントサーバー、APIサーバーに対し、リバースプロキシサーバー経由でアクセスを行う。
リバースプロキシに対し80番/443番ポートでアクセスがあったとき、ドメイン名から名前解決を行い、各種サーバーに接続させる。
すべてのコンテナは同一のコンテナネットワーク上に構築する。

- ホストOS: macOS
  - コンテナのホスティングサービス: Podman
    - network: streaming_net
    - コンテナ1: nginx
        - role: リバースプロキシサーバ
        - listen: 80, 443
    - コンテナ2: streaming
        - role: ストリーミングサーバ
        - listen: なし (80 をコンテナネットワーク内部で公開)
    - コンテナ3: front
        - role: フロントエンドサーバ
        - listen: なし (80 をコンテナネットワーク内部で公開)
    - コンテナ4: api
        - role: APIサーバー
        - listen: なし (5000 をコンテナネットワーク内部で公開)
    - コンテナ5: database
        - role: DBサーバー
        - listen: なし (5432 をコンテナネットワーク内部で公開)
    - コンテナ6: certbot
        - role: 証明書の自動更新サーバ, DNS-01
        - listen: なし

通信:
    nginx → reverse-proxy:80, reverse-proxy:443

### ポートフォワーディング

ポート公開:

host (macOS):
    `${.env.REVERSE_PROXY_DOMAIN_NAME}:80`
    `${.env.REVERSE_PROXY_DOMAIN_NAME}:443`

↓

reverse-proxy container:
    port 80
    port 443

↓

- streaming container:
    port 80

- frontend container:
    port 80

- api container:
    port 5000

### 環境変数の扱い
- ドメイン名やメールアドレス、DBの接続情報は .env ファイルに環境変数として記載する
- ソースコードへの埋め込みが必要な場合、コンテナ起動前の entrypoint.sh で各コンテナに配置したソースコードを置き換える
