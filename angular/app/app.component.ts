// Importar el núcleo de Angular
import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from './services/login.service';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'my-app',
    templateUrl: 'app/view/layout.html',
    providers: [LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AppComponent {
	public identity;
	public token;

	public searchString: string;

	constructor(
		private _loginService: LoginService,
		private _route: ActivatedRoute,
		private _router: Router
	){}	

	ngOnInit(){
		this.identity = this._loginService.getIdentity();
		this.token = this._loginService.getToken();
	}

	search(){
		if(this.searchString != null){
			this._router.navigate(["/search", this.searchString]);
		}else{
			this._router.navigate(["/index"]);
		}
	}

}
