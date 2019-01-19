import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }         from './app.component';
import { routing, appRoutingProviders }  from './app.routing';

import { LoginComponent } from "./components/login.component";
import { RegisterComponent } from "./components/register.component";
import { DefaultComponent } from "./components/default.component";
import { UserEditComponent } from "./components/user.edit.component";
import { VideoNewComponent } from "./components/video.new.component";
import { VideoDetailComponent } from "./components/video.detail.component";
import { VideoEditComponent } from "./components/video.edit.component";
import { SearchComponent } from "./components/search.component";
import { ChannelComponent } from "./components/channel.component";
import { CommentsComponent } from "./components/comments.component";
import {GenerateDatePipe} from "./pipes/generate.date.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    UserEditComponent,
    VideoNewComponent,
    VideoDetailComponent,
    VideoEditComponent,
    SearchComponent,
    ChannelComponent,
    CommentsComponent,
    GenerateDatePipe
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}