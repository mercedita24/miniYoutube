"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var VideoService = (function () {
    function VideoService(_http) {
        this._http = _http;
        this.url = "http://localhost/curso-fullstack/symfony/web/app_dev.php";
    }
    VideoService.prototype.create = function (token, video) {
        var json = JSON.stringify(video);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/video/new", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VideoService.prototype.update = function (token, video, id) {
        var json = JSON.stringify(video);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/video/edit/" + id, params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VideoService.prototype.getVideo = function (id) {
        return this._http.get(this.url + "/video/detail/" + id).map(function (res) { return res.json(); });
    };
    VideoService.prototype.getLastsVideos = function () {
        return this._http.get(this.url + "/video/lasts-videos").map(function (res) { return res.json(); });
    };
    VideoService.prototype.getVideos = function (page) {
        if (page === void 0) { page = null; }
        if (page == null) {
            page = 1;
        }
        return this._http.get(this.url + "/video/list?page=" + page).map(function (res) { return res.json(); });
    };
    VideoService.prototype.search = function (search, page) {
        if (search === void 0) { search = null; }
        if (page === void 0) { page = null; }
        if (page == null) {
            page = 1;
        }
        var http;
        if (search == null) {
            http = this._http.get(this.url + "/video/search").map(function (res) { return res.json(); });
        }
        else {
            http = this._http.get(this.url + "/video/search/" + search + "?page=" + page)
                .map(function (res) { return res.json(); });
        }
        return http;
    };
    VideoService.prototype.getChannel = function (user, page) {
        if (page === void 0) { page = null; }
        if (page == null) {
            page = 1;
        }
        return this._http.get(this.url + "/user/channel/" + user + "?page=" + page).map(function (res) { return res.json(); });
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map