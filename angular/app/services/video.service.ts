import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class VideoService{

	public url = "http://localhost/curso-fullstack/symfony/web/app_dev.php";
	public identity;
	public token;

	constructor(private _http: Http){}

	create(token, video){
		let json = JSON.stringify(video);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/video/new", params, {headers: headers})
						 .map(res => res.json());
	}

	update(token, video, id){
		let json = JSON.stringify(video);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/video/edit/"+id, params, {headers: headers})
						 .map(res => res.json());
	}

	getVideo(id){
		return this._http.get(this.url+"/video/detail/"+id).map(res => res.json());
	}

	getLastsVideos(){
		return this._http.get(this.url+"/video/lasts-videos").map(res => res.json());
	}

	getVideos(page = null){
		if(page == null){
			page = 1;
		}

		return this._http.get(this.url+"/video/list?page="+page).map(res => res.json());
	}

	search(search = null, page = null){
		if(page == null){
			page = 1;
		}

		let http: any;
		if(search == null){
			http = this._http.get(this.url+"/video/search").map(res => res.json());
		}else{
			http = this._http.get(this.url+"/video/search/"+search+"?page="+page)
			       .map(res => res.json());
		}

		return http;
	}

	getChannel(user, page = null){
		if(page == null){
			page = 1;
		}

		return this._http.get(this.url+"/user/channel/"+user+"?page="+page).map(res => res.json());
	}

}