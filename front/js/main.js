import apiConfig from './config.js'

// 動画リストを読み込む関数
async function loadVideos() {
    try {
        const response = await fetch(`${apiConfig.apiBaseURL}/videos`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const videos = await response.json();
        const listElement = document.getElementById('video-list');
        
        listElement.innerHTML = videos.map(video => `
            <button class="video-detail" onclick="playVideo('${video.id}')">
                <div class="video-card">
                    <div class="card-thumbnail">
                        <img src="${video.thumb}" alt="${video.name}">
                    </div>
                    <div class="card-title">
                        <p>${video.name}</p>
                    </div>
                    <div class="card-date">
                        <p>TODO:日付をAPI取得</p>
                    </div>
                    <div class="play-icon">
                        <img src="img/play.svg" alt="play">
                    </div>
                </div>
            </button>
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
