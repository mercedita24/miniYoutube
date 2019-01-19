import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from "../services/login.service";
import {CommentService} from "../services/comment.service";

import {User} from "../model/user";
import {Video} from "../model/video";

@Component({
	selector: "comments",
	templateUrl: "app/view/comments.html",
	providers: [LoginService, CommentService]
})

export class CommentsComponent implements OnInit{
	public titulo: string = "Comentarios";
	public identity;
	public comment;
	public errorMessage;
	public status;
	public commentList;
	public statusComments;
	public loading = 'show';

	constructor(
		private _loginService: LoginService,
		private _commentService: CommentService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		this.identity = this._loginService.getIdentity();

		this._route.params.forEach((params: Params) => {
				let id = +params["id"];
				
				this.comment = {
					"video_id": id,
					"body": ""
				};

				// Conseguir comentarios
				this.getComments(id);
			}
		);
		
	}

	onSubmit(){
		this.loading = 'show';

		let token = this._loginService.getToken();
		this._commentService.create(token, this.comment).subscribe(
			response => {
				this.status = response.status;
				if(this.status != "success"){
					this.status = "error";
				}else{
					this.comment.body = "";

					// Recargar los comentarios
					this.getComments(this.comment.video_id);
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
	}


	getComments(video_id){
		this.loading = 'show';
		this._commentService.getCommentsOfVideo(video_id).subscribe(
			response => {
				this.statusComments = response.status;

				if(this.statusComments != "success"){
					this.statusComments = "error";
				}else{
					this.commentList = response.data;
 				}

 				this.loading = 'hide';
			},
			error => {
				this.errorMessage = <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert("Error en la petición");
				}
			}	
		);
	}

	deleteComment(id){
		let comment_panel = <HTMLElement>document.querySelector(".comment-panel-"+id);
		if(comment_panel != null){
			comment_panel.style.display = "none";
		}

		let token = this._loginService.getToken();
		this._commentService.delete(token, id).subscribe(
			response => {
				this.statusComments = response.status;

				if(this.statusComments != "success"){
					this.statusComments = "error";
				}else{
					
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
	}


}