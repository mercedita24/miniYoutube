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
// Importar el núcleo de Angular
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('./services/login.service');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var AppComponent = (function () {
    function AppComponent(_loginService, _route, _router) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.identity = this._loginService.getIdentity();
        this.token = this._loginService.getToken();
    };
    AppComponent.prototype.search = function () {
        if (this.searchString != null) {
            this._router.navigate(["/search", this.searchString]);
        }
        else {
            this._router.navigate(["/index"]);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/view/layout.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map