# !/bin/bash -e

PLAYLIST_DIRECTORY="hls"
THUMBNAIL_DIRECTORY="thumbs"
CATALOG_FILE="catalog.json"

if [ $# -ne 3 ]; then
    echo "Usage: $0 path_to_input_movie output_name movie_title"
    exit 1;
fi

### playlist
if [ ! -d $PLAYLIST_DIRECTORY ]; then
    mkdir $PLAYLIST_DIRECTORY
fi

if [ -d $PLAYLIST_DIRECTORY/$2 ]; then
    echo "Error: $2 is already exists."
    exit 1;
fi

echo "Make directory: $PLAYLIST_DIRECTORY/$2"
mkdir $PLAYLIST_DIRECTORY/$2

echo "Making .m3u8, .ts frou input video: $1"
ffmpeg -i $1 \
-map 0:v:0 \
-map 0:a:0 \
-c:v libx264 \
-c:a aac \
-f hls \
-hls_time 10 \
-hls_list_size 0 \
"$PLAYLIST_DIRECTORY/$2/output.m3u8"

### thumbnail
if [ ! -d $THUMBNAIL_DIRECTORY ]; then
    echo "make directory for thumbnails"
    mkdir $THUMBNAIL_DIRECTORY
fi

echo "Making thumbnail from input video: $1"
ffmpeg -i $1 -ss 00:00:01 -vframes 1 -f image2 $THUMBNAIL_DIRECTORY/$2.jpg

### catalog.json
if [ ! -e $CATALOG_FILE ]; then
    echo "make movie list catalog..."
    touch $CATALOG_FILE
    echo "[]" >> $CATALOG_FILE
fi

ID_KEY="id"
NAME_KEY="name"

echo "adding $3 (id: $2) to catalog.json"
CURRENT_JSON=$(cat $CATALOG_FILE)
NEW_ELEMENT="[{\"$ID_KEY\": \"$2\", \"$NAME_KEY\": \"$3\"}]"
UPDATED_JSON=$(echo $CURRENT_JSON | jq ". + $NEW_ELEMENT")

echo "updating catalog.json:\n $UPDATED_JSON"
echo $UPDATED_JSON > $CATALOG_FILE
