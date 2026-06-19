// メニュー開閉
function toggleMenu() {
    const menu = document.getElementById('drawerMenu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// ヘッダーとフッターをただ読み込むだけ
document.addEventListener("DOMContentLoaded", () => {
    const headerHolder = document.getElementById('header-holder');
    if (headerHolder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => { headerHolder.innerHTML = data; });
    }

    const footerHolder = document.getElementById('footer-holder');
    if (footerHolder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => { footerHolder.innerHTML = data; });
    }
});
