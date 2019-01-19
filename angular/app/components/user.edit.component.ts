import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from '../services/login.service';
import {UploadService} from '../services/upload.service';
import {User} from '../model/user';

 
@Component({
    selector: 'user-edit',
    templateUrl: 'app/view/user.edit.html',
    providers: [LoginService, UploadService]
})
 
export class UserEditComponent implements OnInit{ 
	public titulo:string = "Actualizar mis datos";
	public user: User;
	public errorMessage;
	public status;
	public identity;
	public newPwd;

	constructor(
		private _loginService: LoginService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		let identity = this._loginService.getIdentity();
		this.identity = identity;

		if(identity == null){
			this._router.navigate(["/index"]);

		}else{
			this.user = new User(identity.sub, 
				                 identity.role, 
				                 identity.name,
				                 identity.surname,
				                 identity.email,
				                 identity.password, 
				                 "null");
		}
	}

	onSubmit(){
		console.log(this.user);

		this.newPwd = this.user.password;
		if(this.user.password == this.identity.password){
			this.user.password = "";
		}

		this._loginService.update_user(this.user).subscribe(
			response => {
				this.status = response.status;

				if(this.status != "success"){
					this.status = "error";
				}else{
					
					if(this.newPwd == this.identity.password){
						this.user.password = this.identity.password;
					}

					localStorage.setItem('identity', JSON.stringify(this.user));
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

	public filesToUpload: Array<File>;
	public resultUpload;

	fileChangeEvent(fileInput: any){
		console.log("Evento change lanzado");
		this.filesToUpload = <Array<File>>fileInput.target.files;

		let token = this._loginService.getToken();
		let url = "http://localhost/curso-fullstack/symfony/web/app_dev.php/user/upload-image-user";
		this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
			(result) => {
				this.resultUpload = result;
				console.log(this.resultUpload);
			},
			(error) => {
				console.log(error);
			});

	}


}
