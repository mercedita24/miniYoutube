import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from '../services/login.service';
import {VideoService} from '../services/video.service';
 
@Component({
    selector: 'search',
    templateUrl: 'app/view/search.html',
    providers: [LoginService, VideoService]
})
 
export class SearchComponent { 
	public titulo = "Busqueda: ";
	public identity;
	public videos;
	public errorMessage;
	public status;
	public loading;
	public pages;
	public pagePrev = 1;
	public pageNext = 1;
	public searchString: string;

	constructor(
		private _loginService: LoginService,
		private _videoService: VideoService,
		private _route: ActivatedRoute,
		private _router: Router
	){}	

	ngOnInit(){
		this.loading = "show";

		this.identity = this._loginService.getIdentity();
		this.getSearchVideos();
	}

	getSearchVideos(){

		this._route.params.forEach((params: Params) => {
			let search:any = params["search"];

			if(!search || search.trim().length == 0){
				search = null;
				this._router.navigate(["/index"]);
			}

			let page:any = +params["page"];
			if(!page){
				page = 1;
			}

			this.searchString = search;
			this.loading = "show";
			this._videoService.search(search, page).subscribe(
				response => {
						this.status = response.status;
					
						if(this.status != "success"){
							this.status = "error";
						}else{
							this.videos = response.data;
							this.loading = 'hide';

							this.pages = [];
							for(let i = 0; i < response.total_pages; i++){
								this.pages.push(i);
							}

							if(page >= 2){
								this.pagePrev = (page - 1);
							}else{
								this.pagePrev = page;
							}

							if(page < response.total_pages || page == 1){
								this.pageNext = (page + 1);
							}else{
								this.pageNext = page;
							}

						}
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
			);

		});
	}

}