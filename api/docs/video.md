## 動画詳細API

- 指定された動画IDの動画詳細を返却するAPI

##### パス

- `/api/video?id=${video_id}`

|クエリパラメタ名|型 |パラメタ例 |説明 |
|---|---|---|---|
|id |String |`20250304` |動画ID |

##### レスポンス: 200

|パラメタ名 |型 |説明 | レスポンス例 |備考 |
|---|---|---|---|---|
|name |String |動画タイトル |`"アシタカとサン / 久石譲"` |
|created_at |String |動画更新日 | `2026-03-30 03:36:57` | 書式: `YYYY-mm-dd HH:MM:SS` |
|url |String |動画URL | `"https://${.env.STREAMING_DOMAIN_NAME}/hls/20260304/output.m3u8"` |

##### レスポンス: Error

- (T.B.D.)
