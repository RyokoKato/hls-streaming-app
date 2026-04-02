import apiConfig from './config.js'

// 動画詳細を読み込む関数
const params = new URLSearchParams(window.location.search)
const videoID = params.get('id')

async function loadVideoDetail(videoID) {
    try {
        const response = await fetch(`${apiConfig.apiBaseURL}/video?id=${videoID}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const video = await response.json();
        const listElement = document.getElementById('video-detail');

        listElement.innerHTML = `
            <div class="video-detail">
                <h1>${video.name}</h1>
                <video controls width="600">
                    <source src="${video.url}" type="application/vnd.apple.mpegurl">
                </video>
            </div>
        `;
    } catch (error) {
        const listElement = document.getElementById('video-detail');

        listElement.innerHTML = `
            <div class="video-detail">
                <h1>Video not Found...</h1>
            </div>
        `;
        console.error('Failed to load videos:', error);
    }   
}

loadVideoDetail(videoID);
