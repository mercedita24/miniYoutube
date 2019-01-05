<?php

namespace AppBundle\Services;
class Helpers {
	public $jwt_auth;
	public function __construct($jwt_auth) {
		$this->jwt_auth = $jwt_auth;
	}
	public function authCheck($hash, $getIdentity = false){
		$jwt_auth= $this->jwt_auth;
		$auth=false;
		if($hash !=null){
			if($getIdentity == false){
			$checkToken=$jwt_auth->checkToken($hash);
			if($checkToken==true){
				$auth=true;
			}
		}else{
			$checkToken=$jwt_auth->checkToken($hash, true);
			if(is_object($checkToken)){
				$auth=$checkToken;
			}
		}
		}
		return $auth;
	}
	//convertir cualquier dato q le pasemos a JSON
	public function json($data) 
	{
		$normalizers = array (new \Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer());
		$encoders = array ("json" => new \Symfony\Component\Serializer\Encoder\JsonEncoder());
		$serializers = new \Symfony\Component\Serializer\Serializer($normalizers, $encoders);
		$json = $serializers->serialize($data, 'json');
		
		$response = new \Symfony\Component\HttpFoundation\Response();
		$response->setContent($json);
		$response->headers->set("Content-Type", "application/json");
		
		return $response;
				
		
	}
}
