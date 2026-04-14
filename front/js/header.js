import apiConfig from "./config.js";

async function setHomePage() {
    const headerElement = document.getElementById('header');

    headerElement.innerHTML = `
    <button class="logo-button" onclick="moveToHome()">
        <h1>hls-streaming-app</h1>
    </button>
    `;    
}

function moveToHome() {
    const homeURL = `${apiConfig.frontBaseURL}`;
    window.location.href = homeURL;
}

// 実行
setHomePage();

// Methods for HTML
window.moveToHome = moveToHome;
