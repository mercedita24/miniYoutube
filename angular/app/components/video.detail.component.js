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
var router_1 = require('@angular/router');
var login_service_1 = require("../services/login.service");
var video_service_1 = require("../services/video.service");
var VideoDetailComponent = (function () {
    function VideoDetailComponent(_loginService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.loading = 'show';
    }
    VideoDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.identity = this._loginService.getIdentity();
        this._route.params.forEach(function (params) {
            _this.loading = 'show';
            var id = +params["id"];
            _this._videoService.getVideo(id).subscribe(function (response) {
                _this.video = response.data;
                _this.status = response.status;
                if (_this.status != "success") {
                    _this._router.navigate(["/index"]);
                }
                _this.loading = 'hide';
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            _this._videoService.getLastsVideos().subscribe(function (response) {
                _this.lastsVideos = response.data;
                _this.statusLastsVideos = response.status;
                if (_this.statusLastsVideos != "success") {
                    _this._router.navigate(["/index"]);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    VideoDetailComponent = __decorate([
        core_1.Component({
            selector: "video-detail",
            templateUrl: "app/view/video.detail.html",
            providers: [login_service_1.LoginService, video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], VideoDetailComponent);
    return VideoDetailComponent;
}());
exports.VideoDetailComponent = VideoDetailComponent;
//# sourceMappingURL=video.detail.component.js.map