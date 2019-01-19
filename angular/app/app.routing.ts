import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login.component";
import { RegisterComponent } from "./components/register.component";
import { DefaultComponent } from "./components/default.component";
import { UserEditComponent } from "./components/user.edit.component";
import { VideoNewComponent } from "./components/video.new.component";
import { VideoDetailComponent } from "./components/video.detail.component";
import { VideoEditComponent } from "./components/video.edit.component";
import { SearchComponent } from "./components/search.component";
import { ChannelComponent } from "./components/channel.component";

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/index',
      pathMatch: 'full'
    },
	{path: 'index', component: DefaultComponent},
	{path: 'index/:page', component: DefaultComponent},
	{path: 'login', component: LoginComponent},
	{path: 'login/:id', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'user-edit', component: UserEditComponent},
	{path: 'create-video', component: VideoNewComponent},
	{path: 'video/:id', component: VideoDetailComponent},
	{path: 'edit-video/:id', component: VideoEditComponent},
	{path: 'search', component: SearchComponent},
	{path: 'search/:search', component: SearchComponent},
	{path: 'search/:search/:page', component: SearchComponent},
	{path: 'channel', component: ChannelComponent},
	{path: 'channel/:user', component: ChannelComponent},
	{path: 'channel/:user/:page', component: ChannelComponent}
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);