import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from '../services/login.service';
  
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit {
	public titulo: string = "Identificate";
	public user;
	public errorMessage;
	public identity;
	public token;


	constructor(
		private _loginService: LoginService,
		private _route: ActivatedRoute,
		private _router: Router
	){}	

	ngOnInit(){

		this._route.params.forEach((params: Params) => {
			let logout = +params["id"];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');
				this.identity = null;
				this.token = null;

				window.location.href = "/login";
				// this._router.navigate(["/index"]);
			}
		});


		this.user = {
			"email": "",
			"password": "",
			"gethash": "false"
		};

		let identity = this._loginService.getIdentity();
		if(identity != null && identity.sub){
			this._router.navigate(["/index"]);
		}


	}

	onSubmit(){
		console.log(this.user);
		this._loginService.signup(this.user).subscribe(
				response => {
					let identity = response;
					this.identity = identity;

					if(this.identity.length <= 1){
						alert("Error en el servidor");
					}else{
						if(!this.identity.status){
							localStorage.setItem('identity', JSON.stringify(identity));
							
							// GET TOKEN
							this.user.gethash = "true";
							this._loginService.signup(this.user).subscribe(
									response => {
										let token = response;
										this.token = token;

										if(this.token.length <= 0){
											alert("Error en el servidor");
										}else{
											if(!this.token.status){
												localStorage.setItem('token', token);

												// REDIRECCION
												window.location.href = "/";
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
	}
}
