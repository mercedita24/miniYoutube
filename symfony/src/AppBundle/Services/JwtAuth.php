<?php

namespace AppBundle\Services;
use Firebase\JWT\JWT;

class JwtAuth {

	public $manager;
	public $key;
	//llamar al servicio de entity manager
	
	public function __construct($manager) {
		$this->manager=$manager;
		$this->key="clave secreta";
	}
	
	//metodo para hacer la autenticacion
	
	public function signup($email,$password, $getHash=NULL) { //los dos primeros parametros son obligatorios el ultimo es opcional y es para el token
		$key=$this->key;
		
		//para saber si el usuario existe y el email y pass son correctos
		$user=$this->manager->getRepository('BackendBundle:User')->findOneBy(
				array(
					"email"=>$email,                //esto es como un SELECT * FROM USER WHERE EMAIL=$email AND PASSWORD=$password
					"password"=>$password
				)
			);
		
		$signup=false;
		if(is_object($user)){
			$signup=true;
		}
		if($signup==true){
			
			$token = array (
				"sub" => $user->getId(),
				"email" => $user->getEmail(),
				"name" => $user->getName(),
				"surname" => $user->getSurname(),
				"password" => $user->getPassword(),
				"image" => $user->getImage(),
				"iat" => time(),
				"exp" => time() + (7 * 24 * 60 * 60) //se le suma una semana para la expiracion del token
			);
			
			//decodificar los datos y q nos devuelva un hash
			$jwt = JWT::encode($token, $key, 'HS256');
			//devolver los datos limpios
			$decoded = JWT::decode($jwt, $key, array('HS256'));
			
			if($getHash!=null){
				return $jwt;
			}else{
				return $decoded;
			}
			
			//return array("status"=>"success", "data"=>"Login success !!");
		}else {
			return array("status"=>"error", "data"=>"Login Failed !!");
		}
		
	}
	//el metodo verifica si el token que recibe es correcto
	//$getIdentity se encarga de ver si devuelve los datos decodificados(datos en limpio) o si devuelve true o false
	public function checkToken($jwt, $getIdentity = false){
		$key=$this->key;
		$auth=false; //por defecto estara en falso el token osea incorrecto y cuando sea correcto se cambiara a true
		
		try {
			$decoded = JWT::decode($jwt, $key, array('HS256'));
		} catch (\UnexpectedValueException $e) {
			$auth=false;
		} catch (\DomainException $e) {
			$auth=false;
		}
		//si existe la propiedad email del objeto $decoded es xq el token es correcto
		//sub es el ID del usuario
		if(isset($decoded->sub)){
			$auth=true;
		}
		else {
			$auth=false;
		}
		if($getIdentity==true){
			return $decoded;
		}else{
			return $auth;
		}
	}
}

