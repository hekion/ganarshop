// メニュー開閉のグローバル関数
function toggleMenu() {
    const menu = document.getElementById('drawerMenu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// コンポーネントを差し込む関数
document.addEventListener("DOMContentLoaded", () => {
    // ヘッダーの読み込み
    const headerHolder = document.getElementById('header-holder');
    if (headerHolder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerHolder.innerHTML = data;
                // ページごとのヘッダー微調整（タイトルや戻るボタン）を実行
                adjustHeaderForPage();
            });
    }

    // フッターの読み込み
    const footerHolder = document.getElementById('footer-holder');
    if (footerHolder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerHolder.innerHTML = data;
            });
    }
});

// 各ページに応じたヘッダーのテキストや表示の出し分けルール
function adjustHeaderForPage() {
    const path = window.location.pathname;
    const pageTitleEl = document.getElementById('pageTitle');
    const backBtnEl = document.getElementById('headerBackBtn');

    if (!pageTitleEl) return;

    // 1. トップページの場合
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        pageTitleEl.innerText = "GANAR OFFICIAL SHOP";
        if (backBtnEl) backBtnEl.style.display = 'none'; // トップは戻るボタン不要
    } 
    // 2. 商品詳細ページの場合
    else if (path.includes('product.html')) {
        pageTitleEl.innerText = "ITEM DETAIL";
        if (backBtnEl) {
            backBtnEl.innerText = "戻る ▷";
            backBtnEl.className = "header-back-link";
        }
    } 
    // 3. 選手一覧ページの場合
    else if (path.includes('players.html')) {
        pageTitleEl.innerText = "PLAYERS LIST";
        if (backBtnEl) {
            backBtnEl.href = "index.html";
            backBtnEl.innerText = "TOP ▷";
        }
    } 
    // 4. カテゴリ商品一覧ページの場合
    else if (path.includes('category.html')) {
        if (backBtnEl) {
            backBtnEl.href = "index.html";
            backBtnEl.innerText = "SHOP ▷";
        }
        // クエリパラメータに応じてタイトルを動的変更
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        const cat = params.get('category');
        const player = params.get('player');

        if (type === 'new') pageTitleEl.innerText = "NEW ARRIVALS";
        else if (type === 'recommend') pageTitleEl.innerText = "RECOMMEND ITEMS";
        else if (cat === 'uniform') pageTitleEl.innerText = "UNIFORM";
        else if (cat === 'towel') pageTitleEl.innerText = "TOWEL";
        else if (cat === 'goods') pageTitleEl.innerText = "GOODS";
        else if (player) pageTitleEl.innerText = "PLAYER GOODS";
        else pageTitleEl.innerText = "ITEMS";
    }
}
