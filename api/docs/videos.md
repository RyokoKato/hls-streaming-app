## 動画一覧API

- streaming コンテナに配置された動画一覧を返却するAPI

##### パス

- `/api/videos`

##### レスポンス: 200

|パラメタ名 |型 |説明 | レスポンス例 |備考 |
|---|---|---|---|---|
|name |String |動画タイトル |`アシタカとサン / 久石譲` |
|id |String |動画ID | `20260304` |
|created_at |String |動画更新日 | `2026-03-30 03:36:57` | 書式: `YYYY-mm-dd HH:MM:SS` |
|thumb |String |サムネイル画像URL | `https://${.env.STREAMING_DOMAIN_NAME}/thumbs/20260304.jpg` |

##### レスポンス: Error

- (T.B.D.)
