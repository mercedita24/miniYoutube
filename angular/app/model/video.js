"use strict";
var Video = (function () {
    function Video(id, title, description, status, image, videoPath, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.image = image;
        this.videoPath = videoPath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    return Video;
}());
exports.Video = Video;
//# sourceMappingURL=video.js.map