<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\User;
use BackendBundle\Entity\Video;

class VideoController extends Controller {
	/* public function pruebasAction() {
	  echo "Hola controlador de videos :D";
	  die();
	  } */

	public function newAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash
		$authCheck = $helpers->authCheck($hash); //se llama al metodod authCheck q esta en los helpers

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true);
			$json = $request->get("json", null); //se recoge la variable q llega por post
			$params = json_decode($json); //decodificar esa variable recogida

			if ($json != null) {
				$createdAt = new \Datetime("now");
				$updatedAt = new \Datetime("now");
				$image = null; //imagen q tendra en miniatura el video
				$video_path = null;

				$user_id = ($identity->sub != null) ? $identity->sub : null;
				$title = (isset($params->title)) ? $params->title : null;
				$description = (isset($params->description)) ? $params->description : null;
				$status = (isset($params->status)) ? $params->status : null;

				if ($user_id != null && $title != null) {
					$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager
					$user = $em->getRepository("BackendBundle:User")->findOneBy(//se usa findby para ver si el email no es repetido
							array(
								"id" => $user_id
					));

					$video = new Video();
					$video->setUser($user); //video esta relacionada con user
					$video->setTitle($title);
					$video->setDescription($description);
					$video->setStatus($status);
					$video->setCreatedAt($createdAt);
					$video->setUpdatedAt($updatedAt);

					$em->persist($video);
					$em->flush(); //se guarda en la BD

					$video = $em->getRepository("BackendBundle:Video")->findOneBy(//se usa findby para ver si el email no es repetido
							array(
								"user" => $user,
								"title" => $title,
								"status" => $status,
								"createdAt" => $createdAt
					));

					$data = array(
						"status" => "success",
						"code" => 200,
						"data" => $video
					);
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "Video not created!!!"
					);
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Video not created, parametros fallidos!!!"
				);
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
	
}
