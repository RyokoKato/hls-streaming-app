import apiConfig from './config.js';
import yyyymmddString from './date.js';

// 動画リストを読み込む関数
async function loadVideos() {
    try {
        const response = await fetch(`${apiConfig.apiBaseURL}/videos`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const videos = await response.json();
        const listElement = document.getElementById('video-list');

        const playButton = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
            <g>
            	<path class="st0" d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256c141.374,0,256-114.626,256-256
                            C512,114.625,397.374,0,256,0z M351.062,258.898l-144,85.945c-1.031,0.626-2.344,0.657-3.406,0.031
                            c-1.031-0.594-1.687-1.702-1.687-2.937v-85.946v-85.946c0-1.218,0.656-2.343,1.687-2.938c1.062-0.609,2.375-0.578,3.406,0.031
                            l144,85.962c1.031,0.586,1.641,1.718,1.641,2.89C352.703,257.187,352.094,258.297,351.062,258.898z"></path>
            </g>
        </svg>
        `;
        
        listElement.innerHTML = videos.map((video) => {
            let dateText = yyyymmddString(video.created_at);

            return `
                <button class="video-detail" onclick="playVideo('${video.id}')">
                    <div class="video-card">
                        <div class="card-thumbnail">
                            <img src="${video.thumb}" alt="${video.name}">
                        </div>
                        <div class="card-title">
                            <p>${video.name}</p>
                        </div>
                        <div class="card-date">
                            <p>${dateText}</p>
                        </div>
                        <div class="play-icon">
                            ${playButton}
                        </div>
                    </div>
                </button>
                `
            }
        ).join('');

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
