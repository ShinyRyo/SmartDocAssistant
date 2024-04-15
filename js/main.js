import { getDocuments, embedFn, findBestPassage } from './apiFunctions.js';

// メイン関数を定義
async function main(apiKey) {
    const model = 'models/embedding-001';
    const api = apiKey;  // APIキーを使用
    const documents = getDocuments();  // 文書を取得
    const query = "具体的な質問内容";  // ここに質問を設定することができます

    try {
        const bestPassage = await findBestPassage(query, documents, model, api);
        document.getElementById('output').textContent = `Best Passage: ${bestPassage}`;
    } catch (error) {
        document.getElementById('output').textContent = `Error: ${error.message}`;
    }
}

// ページのボタンがクリックされた時に実行される関数
function runMain() {
    const apiKey = document.getElementById('api-key').value;  // ユーザーが入力したAPIキーを取得
    if (!apiKey) {
        alert('APIキーを入力してください');
        return;
    }
    main(apiKey);
}

document.getElementById('submit-button').addEventListener('click', runMain);
