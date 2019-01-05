<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;

class DefaultController extends Controller
{
    
    public function indexAction(Request $request)
    {
        
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }
	
	public function loginAction(Request $request)
	{
		$helpers = $this->get("app.helpers");
		$jwt_auth = $this->get("app.jwt_auth");   //aqui se llaman los servicios, es la seguridad para el token q exista el usuario
		//recibir json por POST
		$json = $request->get("json", null); //se recoge la variable q llega por post
				
		if ($json!=null)
		{	
		$params = json_decode($json); //decodificar esa variable recogida
		
		$email = (isset($params->email)) ? $params->email : null;
		$password = (isset($params->password)) ? $params->password : null;
		$getHash = (isset($params->gethash)) ? $params->gethash : null;
		//var_dump($email);
		//var_dump($password);
		
		
		//validador de symfony
		$emailContraint = new Assert\Email();
		$emailContraint->message="this email is not valid !!";
		$validate_email = $this->get("validator")->validate($email, $emailContraint);
		
		//Cifrar el password usando el hash de php
		$pwd= hash('sha256', $password);
		
		if(count($validate_email)==0 && $password !=null){
			//echo "data success";
			
			if($getHash==null){
				$signup=$jwt_auth->signup($email, $pwd);
			}else{
				$signup=$jwt_auth->signup($email, $pwd, true);
			}
			//var_dump($signup);	para probar q imprime lo q se esta mandando
			//die();
			return new \Symfony\Component\HttpFoundation\JsonResponse($signup); //retorna en json
		}else {
			return $helpers->json(array(
				"status"=>"error",
				"data"=>"Login not valid!!"
			));
		}
	    
		} else {
			return $helpers->json(array(
				"status"=>"error",
				"data"=>"Send json with post!!"
			));
		}
		
		die();
    }
	public function pruebasAction(Request $request)
    {
        //utilizando el servicio q esta en helpers
		$helpers = $this->get("app.helpers");
		//$jwt_auth = $this->get("app.jwt_auth"); //llamando al servicio jwt de tokens, se comenta xq ahora lo hace helpers
		
		$hash = $request->get("authorization", null);
		$check=$helpers->authCheck($hash, true); //al agregarle el parametro de true decodifica todos los datos
		
		var_dump($check);
		die();
		/*$em = $this->getDoctrine()->getManager(); //esto es para un entity manager y se puede comenzar a trabajar con entidades
		$users = $em->getRepository('BackendBundle:User')->findAll();//sacar todos los usuarios o registros de la tabla user

		return $helpers->json($users); //retorna en json
		*/


		//var_dump($users); //var_dump imprime informacion de variables
		//die(); //para q no pida crear una vista
		
		//$pruebas = array("id"=>1, "nombre"=>"mercy");
		//return $this->json($users);
		
    }
	
}
