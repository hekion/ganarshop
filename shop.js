// 仮のデータプール（将来的にShopify APIから取得するデータ構造に寄せています）
const mockProducts = [
    { id: 'p1', name: 'レプリカユニフォーム2026', price: '¥12,000', player: 'fukui', category: 'uniform', soldOut: false },
    { id: 'p2', name: '推し選手マフラータオル', price: '¥2,500', player: 'fukui', category: 'towel', soldOut: false },
    { id: 'p3', name: 'GANAR ロゴステッカー', price: '¥500', player: '12', category: 'goods', soldOut: false },
    { id: 'p4', name: '背番号アクリルキーホルダー', price: '¥800', player: 'sekino', category: 'goods', soldOut: true }
];

// ページ読み込み時に自動で走る初期化ルーチン
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. 一覧ページ（category.html）の処理
    const container = document.getElementById('products-container');
    if (container) {
        const playerParam = urlParams.get('player');
        const categoryParam = urlParams.get('category');
        
        let filteredProducts = mockProducts;
        
        if (playerParam) {
            filteredProducts = mockProducts.filter(p => p.player === playerParam);
            const playerBar = document.getElementById('player-bar');
            const playerName = document.getElementById('player-name');
            if (playerBar && playerName) {
                playerBar.style.display = 'flex';
                playerName.innerText = `${playerParam.toUpperCase()} 選手グッズ`;
            }
        } else if (categoryParam) {
            filteredProducts = mockProducts.filter(p => p.category === categoryParam);
        }
        
        // 2列グリッドのHTMLを生成して流し込む
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const btnHtml = product.soldOut 
                ? `<button class="quick-add-btn" style="background:#ccc; font-size:0.6rem;" disabled>SOLDOUT</button>`
                : `<button class="quick-add-btn" onclick="addToCart('${product.name}')">＋🛒</button>`;

            card.innerHTML = `
                <div class="product-img" onclick="location.href='product.html?id=${product.id}'">🛍️ IMAGE</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                </div>
                ${btnHtml}
            `;
            container.appendChild(card);
        });
    }

    // 2. 詳細ページ（product.html）の処理
    const productId = urlParams.get('id');
    const titleEl = document.getElementById('p-title');
    const priceEl = document.getElementById('p-price');
    
    if (titleEl && priceEl) {
        const idToFind = productId || 'p1'; // パラメータが空ならp1をデフォルトに
        const selectedProduct = mockProducts.find(p => p.id === idToFind);
        
        if (selectedProduct) {
            titleEl.innerText = selectedProduct.name;
            priceEl.innerText = selectedProduct.price;
        }
    }
});

// 爆速ドロワーカートの演出アニメーション処理
function addToCart(name) {
    const drawer = document.getElementById('cart-drawer');
    const msg = document.getElementById('cart-msg');
    if (drawer && msg) {
        msg.innerText = `【${name}】を追加しました`;
        drawer.classList.add('show');
        setTimeout(() => {
            drawer.classList.remove('show');
        }, 3000);
    }
}
