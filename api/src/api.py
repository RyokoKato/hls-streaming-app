from flask import Flask, jsonify, request
import getdatabase

app = Flask(__name__)

@app.route('/api/videos')
def get_videos():
    videos = getdatabase.videolist()
    return jsonify(videos)

@app.route('/api/video')
def get_video():
    query = request.args.get('id')
    print(f"id:{query}")

    video = getdatabase.videodetail(query)
    return jsonify(video)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
