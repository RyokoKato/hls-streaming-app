import apiConfig from './config.js'

// 動画リストを読み込む関数
async function loadVideos() {
    try {
        const response = await fetch(`${apiConfig.apiBaseURL}/videos`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const videos = await response.json();
        const listElement = document.getElementById('video-list');
        
        listElement.innerHTML = videos.map(video => `
            <div class="video-card">
                <img src="${video.thumb}" alt="${video.name}" height="200">
                <p>${video.name}</p>
                <button onclick="playVideo('${video.id}')">再生</button>
            </div>
        `).join('');

    } catch (error) {
        console.error('Failed to load videos:', error);
    }
}

function playVideo(id) {
    console.log("Move to detail page:", id);
    window.location.href = `html/detail.html?id=${id}`;
}

// 実行
loadVideos();

// Methods for HTML
window.playVideo = playVideo;
