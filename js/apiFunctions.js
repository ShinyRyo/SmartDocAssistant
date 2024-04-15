// 文書データを取得する関数
export function getDocuments() {
    return [
        "クライメートコントロールシステムの操作 Googlecarには、車内の温度や風量を調節できるクライメートコントロールシステムが装備されています。空調システムを操作するには、センターコンソールにあるボタンとノブを使用します。",
        "Googlecarには、ナビゲーション、エンターテインメント、クライメートコントロールなど、さまざまな機能にアクセスできる大型タッチスクリーンディスプレイが装備されています。タッチスクリーンディスプレイを使用するには、目的のアイコンをタッチするだけです。",
        "シフトチェンジ Googlecarにはオートマチックトランスミッションが搭載されています。ギアをシフトするには、シフトレバーを希望の位置に動かします。パーク、リバース、ニュートラル、ドライブ、ローなどのポジションがあります。",
        "火焔猫燐は、東方Projectの人気キャラクターの一人で、彼女は多くのゲームやメディアで見られます。彼女の魅力と特徴を掘り下げてみましょう。火焔猫燐は、妖怪の種族「火車」に属しています。彼女は「地獄の輪禍」「死体ツアーコンダクター」「背信棄義の死猫」「究極探偵の助手猫」といった二つ名で知られ、その能力は「死体を持ち去る」ことに特化しています。",
        "トカマ・クラブは「東方M-1ぐらんぷり」における漫才コンビで、第4回大会と第6回大会に出場した経験があります。このコンビはユニークで、彼らの漫才はファンから高い評価を受けています。トカマ・クラブは、火焔猫燐と霊烏路空（おくう）によって結成され、漫才中にはお互いの特徴を生かしたユーモアが特徴です。",
        "霊烏路空（おくう）は、東方Projectのキャラクターで、多くの作品に登場しています。彼女の独特な背景、能力、そして性格について詳しく見ていきましょう。霊烏路空は、妖怪の種族「地獄鴉」と「八咫烏」との融合体で、「東方地霊殿」の6面ボスとして登場しました。彼女の能力は核融合を操ることです。"
    ];
}


// テキストの埋め込みを取得する関数
export async function embedFn(text, model, apiKey) {
    const response = await fetch('https://api.example.com/embed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: model, content: text, taskType: "retrieval_document" })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`API Error: ${data.message}`);
    }
    return data.embedding;
}

// 最適なパッセージを見つける関数
export async function findBestPassage(query, documents, model, apiKey) {
    const queryEmbedding = await embedFn(query, model, apiKey);
    const documentEmbeddings = await Promise.all(documents.map(doc => embedFn(doc, model, apiKey)));
    let bestIndex = 0;
    let highestDotProduct = -Infinity;
    documentEmbeddings.forEach((embed, index) => {
        const dotProduct = dot(embed, queryEmbedding);
        if (dotProduct > highestDotProduct) {
            highestDotProduct = dotProduct;
            bestIndex = index;
        }
    });
    return documents[bestIndex];
}

// ドット積を計算する関数（内部使用のため非公開）
function dot(a, b) {
    return a.reduce((sum, val, idx) => sum + val * b[idx], 0);
}
