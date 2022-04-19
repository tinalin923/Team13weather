// 調整 footer 高度
window.addEventListener("DOMContentLoaded", function () {
    // 選定頁面中 footer
    const footer = document.querySelector(".footer");

    const footerHeight = function () {
        const { top, bottom } = footer.getBoundingClientRect();
        heightToBottom = window.innerHeight - top;
        // console.log(top+" , "+bottom+" , "+window.innerHeight)
        // 設定footer高度
        footer.style.height = heightToBottom + "px";
    }

    footerHeight();
    window.addEventListener("resize", footerHeight);
})