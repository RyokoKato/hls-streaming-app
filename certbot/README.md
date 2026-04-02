## Certbot Server
Let's Encryptを用いて Cloudflare API 経由で証明書を自動更新し、共有ボリュームに配置するコンテナ
コンテナ初回生成時、12時間ごとにサーバー証明書の自動更新チェックを行う
証明書の更新が必要な場合は、Dockerソケットを介してリバースプロキシサーバーのnginxをリロードする

### 事前準備
1. Cloudflare Register から自ドメインを取得する
    - `hogehogeuser.com` とする
1. Cloudflare のダッシュボードから、取得した自ドメインに対し下記の権限をつけた API Token を発行する
    - Permission
        - Zone -> DNS -> Edit
        - Zone -> Zone -> Read
    - Zone Resource
        - Specific Zone -> <自ドメイン名>
1. 発行した API Token を `certbot/cloudflare.ini` に記載する
    - セキュリティ上の観点から .gitignore に記載しているので git 管理されない
    - (T.B.D.) Ansible Vault とかで暗号化する？

    ```ini
    dns_cloudflare_api_token = <発行したAPIトークン>
    ```

### 構築手順
- docker-compose.yaml を用いて構築する
