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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var default_component_1 = require("./components/default.component");
var user_edit_component_1 = require("./components/user.edit.component");
var video_new_component_1 = require("./components/video.new.component");
var video_detail_component_1 = require("./components/video.detail.component");
var video_edit_component_1 = require("./components/video.edit.component");
var search_component_1 = require("./components/search.component");
var channel_component_1 = require("./components/channel.component");
var comments_component_1 = require("./components/comments.component");
var generate_date_pipe_1 = require("./pipes/generate.date.pipe");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                default_component_1.DefaultComponent,
                user_edit_component_1.UserEditComponent,
                video_new_component_1.VideoNewComponent,
                video_detail_component_1.VideoDetailComponent,
                video_edit_component_1.VideoEditComponent,
                search_component_1.SearchComponent,
                channel_component_1.ChannelComponent,
                comments_component_1.CommentsComponent,
                generate_date_pipe_1.GenerateDatePipe
            ],
            providers: [
                app_routing_1.appRoutingProviders
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map