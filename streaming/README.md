# Streaming Server

- 静的に配置した HLS 、サムネイル画像を配信するWebサーバーのホストコンテナ
- listen port: 80

### ディレクトリ構成

プロジェクトの以下のディレクトリに配置された、動画タイトルと動画IDを紐づけるcatalog.json、動画サムネイル、hls コンテンツをコンテナ上に格納する。

- /streaming
    - catalog.json
    - /thumbs
        - `{動画ID}.jpg`
    - /hls
        - `/{動画ID}`
            - output.m3u8
            - output1.ts
            - ...
        - ...

#### catalog.json の形式

```json
[
    {
        "id": "動画ID",
        "name": "動画名"
    },
    ...
]
```

## Usage

コンテナのビルド、起動は docker-compose.yaml で行う。
以下は、配信するコンテナの事前準備手順と、単体での動作確認を行う場合の手順を示したもの。

### Prepare m3u8 playlist
#### Dependencies
- [ffmpeg](https://www.ffmpeg.org/)
- [jq](https://jqlang.org/)

#### 手順

1. 動画ファイルを用意し、下記スクリプトを実行する。実行するとm3u8プレイリスト、.tsファイル、サムネイル画像が所定のディレクトリに配置される。

    - iPhone で撮影した動画ファイルの例

    ```console
    // input.MOV を動画ID output 、動画タイトル title で所定の位置に配置
    $ bash make-playlist-thumbnail.sh input.MOV output title
    ```

### For verify streaming container individualy

以下に、コンテナイメージを単体で起動し、localの 8080 番ポートに streaming コンテナの 80 番ポートをポートフォワーディングし、配信コンテンツが表示されることを確認する手順を示す

1. コンテナイメージをビルドする

    ```console
    $ podman build -t streaming:latest .
    ```

1. ビルドしたイメージからコンテナを起動する
    - Podmanのルートレスモードでコンテナを起動する場合、8080番ポートにポートフォワーディングする
        - ホストOSの80番ポートにポートフォワーディングするためにはルート権限が必要となるため

    ```console
    $ podman run -d -p 8080:80 streaming:latest
    ```

### Note

ホストOSのブラウザの下記URLにアクセスすると配置された静的コンテンツを確認できる

http://localhost/hls/output.m3u8:8080
