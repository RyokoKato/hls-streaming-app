/// yyyymmddString
/// `YYYY-MM-dd HH:mm:ss` 形式の日付を受け取り `YYYY/MM/dd` を返却する
/// - parameters
///  - dateString: `YYYY-MM-dd HH:mm:ss` 形式の日付文字列
/// - returns
///  - `YYYY/MM/dd` 形式の日付文字列
export default function yyyymmddString(dateString) {
    let date = new Date(dateString);

    let year = date.getFullYear().toString();
    let month = date.getMonth().toString().padStart(2, '0');
    let day = date.getDay().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
}
