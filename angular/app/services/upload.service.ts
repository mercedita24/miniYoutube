import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UploadService{

	constructor(private _http: Http){}

	makeFileRequest(token, url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			var name_file_input = params[0];
			for(var i=0; i < files.length; i++){
				formData.append(name_file_input, files[i], files[i].name);
			}

			formData.append("authorization", token);

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}

				}
			}

			document.getElementById("upload-progress-bar").setAttribute("value", "0");
			document.getElementById("upload-progress-bar").style.width = "0%";

			xhr.upload.addEventListener("progress", function(event: any){
				var percent = (event.loaded / event.total) * 100;
				let prc = Math.round(percent).toString();

				document.getElementById("upload-progress-bar").setAttribute("value", prc);
				document.getElementById("upload-progress-bar").style.width = prc+"%";
				document.getElementById("status").innerHTML = Math.round(percent)+" % subido... por favor espera a que termine";
			}, false);

			xhr.addEventListener("load", function(){
				document.getElementById("status").innerHTML = "Subida completada";
				let prc = "100";
				document.getElementById("upload-progress-bar").setAttribute("value", prc);
				document.getElementById("upload-progress-bar").setAttribute("aria-valuenow", prc);
				document.getElementById("upload-progress-bar").style.width = prc+"%";
			}, false);

			xhr.addEventListener("error", function(){
				document.getElementById("status").innerHTML = "Error en la subida";
			}, false);

			xhr.addEventListener("abort", function(){
				document.getElementById("status").innerHTML = "Subida abortada";
			}, false);

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}