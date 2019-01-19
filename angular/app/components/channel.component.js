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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('../services/login.service');
var video_service_1 = require('../services/video.service');
var ChannelComponent = (function () {
    function ChannelComponent(_loginService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Canal";
        this.pagePrev = 1;
        this.pageNext = 1;
    }
    ChannelComponent.prototype.ngOnInit = function () {
        this.loading = "show";
        this.identity = this._loginService.getIdentity();
        this.getChannelVideos();
    };
    ChannelComponent.prototype.getChannelVideos = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var user = params["user"];
            if (!user) {
                user = _this.identity.sub;
            }
            var page = +params["page"];
            if (!page) {
                page = 1;
            }
            _this.loading = "show";
            _this._videoService.getChannel(user, page).subscribe(function (response) {
                _this.status = response.status;
                if (_this.status != "success") {
                    _this.status = "error";
                }
                else {
                    _this.videos = response.data.videos;
                    _this.userChannel = response.data.user;
                    _this.loading = 'hide';
                    _this.pages = [];
                    for (var i = 0; i < response.total_pages; i++) {
                        _this.pages.push(i);
                    }
                    if (page >= 2) {
                        _this.pagePrev = (page - 1);
                    }
                    else {
                        _this.pagePrev = page;
                    }
                    if (page < response.total_pages || page == 1) {
                        _this.pageNext = (page + 1);
                    }
                    else {
                        _this.pageNext = page;
                    }
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
    ChannelComponent = __decorate([
        core_1.Component({
            selector: 'channel',
            templateUrl: 'app/view/channel.html',
            providers: [login_service_1.LoginService, video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], ChannelComponent);
    return ChannelComponent;
}());
exports.ChannelComponent = ChannelComponent;
//# sourceMappingURL=channel.component.js.map