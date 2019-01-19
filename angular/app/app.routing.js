"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var default_component_1 = require("./components/default.component");
var user_edit_component_1 = require("./components/user.edit.component");
var video_new_component_1 = require("./components/video.new.component");
var video_detail_component_1 = require("./components/video.detail.component");
var video_edit_component_1 = require("./components/video.edit.component");
var search_component_1 = require("./components/search.component");
var channel_component_1 = require("./components/channel.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    { path: 'index', component: default_component_1.DefaultComponent },
    { path: 'index/:page', component: default_component_1.DefaultComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:id', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'user-edit', component: user_edit_component_1.UserEditComponent },
    { path: 'create-video', component: video_new_component_1.VideoNewComponent },
    { path: 'video/:id', component: video_detail_component_1.VideoDetailComponent },
    { path: 'edit-video/:id', component: video_edit_component_1.VideoEditComponent },
    { path: 'search', component: search_component_1.SearchComponent },
    { path: 'search/:search', component: search_component_1.SearchComponent },
    { path: 'search/:search/:page', component: search_component_1.SearchComponent },
    { path: 'channel', component: channel_component_1.ChannelComponent },
    { path: 'channel/:user', component: channel_component_1.ChannelComponent },
    { path: 'channel/:user/:page', component: channel_component_1.ChannelComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map