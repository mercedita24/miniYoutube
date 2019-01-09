<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\User;

/* controlara los datos q le lleguen de la VISTA o sea desde el cliente, estos datos los va a manipular
  y se los va a pasar al MODELO de usuario y ya la entidad y el modelo de usuario va a interactuar con la BD
  y le enviaran los datos de nuevo al controlador los va a manipular de nuevo y se los enviara al cliente
 */

class UserController extends Controller {

	//funcion para crear y registrar usuarios
	public function newAction(Request $request) {
		$helpers = $this->get("app.helpers");
		$json = $request->get("json", null); //se recoge la variable q llega por post
		$params = json_decode($json); //decodificar esa variable recogida
		$data = array(
			"status" => "error",
			"code" => 400,
			"msg" => "User not Created"
		);

		if ($json != null) {
			$createdAt = new \Datetime("now");
			$image = null;
			$role = "user";
			$email = (isset($params->email)) ? $params->email : null;
			$name = (isset($params->name) && ctype_alpha($params->name)) ? $params->name : null;
			$surname = (isset($params->surname) && ctype_alpha($params->surname)) ? $params->surname : null;
			$password = (isset($params->password)) ? $params->password : null;

			$emailContraint = new Assert\Email();
			$emailContraint->message = "this email is not valid !!";
			$validate_email = $this->get("validator")->validate($email, $emailContraint);

			//validar que todos los campos esten rellenos
			if ($email != null && count($validate_email) == 0 && $password != NULL && $name != null && $surname != null) {
				$user = new User();
				//Set para asignarle un valor a las propiedades de la clase
				//se le esta dando valor al objeto user
				$user->setCreatedAt($createdAt);
				$user->setImage($image);
				$user->setRole($role);
				$user->setEmail($email);
				$user->setName($name);
				$user->setSurname($surname);

				//Cifrar el password usando el hash de php
				$pwd = hash('sha256', $password);
				$user->setPassword($pwd); //se le pasa la variable $pwd xq es la q ya esta cifrada

				$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager
				$isset_user = $em->getRepository("BackendBundle:User")->findBy(//se usa findby para ver si el email no es repetido
						array(
							"email" => $email
				));
				if (count($isset_user) == 0) {  //si isset_user da cero es xq no existe en la BD y lo vamos a guardar como nuevo
					$em->persist($user);
					$em->flush();

					$data["status"] = 'success';
					$data["code"] = 200;
					$data["msg"] = 'New User Created!!';
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "User not Created, duplicated!"
					);
				}
			}
		}
		return $helpers->json($data);
	}

	public function editAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash
		$authCheck = $helpers->authCheck($hash); //se llama al metodod authCheck q esta en los helpers

		if ($authCheck == true) { //si al decodificarlo da true entonces ya podremos editar el usuario
			$identity = $helpers->authCheck($hash, true);
			$em = $this->getDoctrine()->getManager(); //buscar en la BD para saber q usuario a hecho la peticion
			$user = $em->getRepository("BackendBundle:User")->findOneBy(array(
				"id" => $identity->sub
			));

			$json = $request->get("json", null); //se recoge la variable q llega por post
			$params = json_decode($json); //decodificar esa variable recogida
			$data = array(
				"status" => "error",
				"code" => 400,
				"msg" => "User not Update ash"
			);

			if ($json != null) {
				$createdAt = new \Datetime("now");
				$image = null;
				$role = "user";
				$email = (isset($params->email)) ? $params->email : null;
				$name = (isset($params->name) && ctype_alpha($params->name)) ? $params->name : null;
				$surname = (isset($params->surname) && ctype_alpha($params->surname)) ? $params->surname : null;
				$password = (isset($params->password)) ? $params->password : null;

				$emailContraint = new Assert\Email();
				$emailContraint->message = "this email is not valid !!";
				$validate_email = $this->get("validator")->validate($email, $emailContraint);

				//validar que todos los campos esten rellenos
				if ($email != null) {
					//&& count($validate_email) == 0 && $name != null && $surname != null..... le quite esta validacion en el if
					//porque no permitia actualizar con el mismo email T_T
					//Set para asignarle un valor a las propiedades de la clase
					//se le esta dando valor al objeto user
					$user->setCreatedAt($createdAt);
					$user->setImage($image);
					$user->setRole($role);
					$user->setEmail($email);
					$user->setName($name);
					$user->setSurname($surname);

					if ($password != null) {
						//Cifrar el password usando el hash de php
						$pwd = hash('sha256', $password);
						$user->setPassword($pwd); //se le pasa la variable $pwd xq es la q ya esta cifrada
					}
					$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager
					$isset_user = $em->getRepository("BackendBundle:User")->findBy(//se usa findby para ver si el email no es repetido
							array(
								"email" => $email
					));
					if (count($isset_user) == 0 || $identity->email == $email) {  //si isset_user da cero es xq no existe en la BD y lo vamos a guardar como nuevo
						$em->persist($user);
						$em->flush(); //se guarda en la BD

						$data["status"] = 'success';
						$data["code"] = 200;
						$data["msg"] = 'User Updated!!';
					} else {
						$data = array(
							"status" => "error",
							"code" => 400,
							"msg" => "User not Updated buuuuuuuuuu!"
						);
					}
				}
			}
		} else {
			$data = array(
				"status" => "error",
				"code" => 400,
				"msg" => "Authorization not valid!!!"
			);
		}
		return $helpers->json($data);
	}

	public function uploadImageAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash q llega por token
		$authCheck = $helpers->authCheck($hash); //comprbar q el hash q llega por post es correcto

		if ($authCheck) {
			$identity = $helpers->authCheck($hash, true); //decodificar el token y devolvera los datos del usuario

			$em = $this->getDoctrine()->getManager(); //buscar en la BD para saber q usuario a hecho la peticion
			$user = $em->getRepository("BackendBundle:User")->findOneBy(array(
				"id" => $identity->sub
			)); //esto es como un Query when el id del usuario = a id del token
			//para subir la imagen
			$file = $request->files->get("image"); //el objeto file ya existe en php y tiene metodos (en postman se pasa image)

			if (!empty($file) && $file != null) {
				$ext = $file->guessExtension(); //extension del fichero q se a subido

				if ($ext == "jpeg" || $ext == "png" || $ext == "jpg" || $ext == "gif") {

					$file_name = time() . "." . $ext;
					$file->move("uploads/users", $file_name);

					$user->setImage($file_name);

					$em->persist($user);
					$em->flush(); //se guarda en la BD

					$data = array(
						"status" => "success",
						"code" => 200,
						"msg" => "Image for User uploaded success!!!"
					);
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "file not valid!!!"
					);
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Image for User NOT upload!!!"
				);
			}
		} else {
			$data = array(
				"status" => "error",
				"code" => 400,
				"msg" => "Authorization not valid!!!"
			);
		}

		return $helpers->json($data); //se retorna en json
	}

}
