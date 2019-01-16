<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\User;
use BackendBundle\Entity\Video;
use BackendBundle\Entity\Comment;

class CommentController extends Controller {

	//metodo para agregar comentarios a un video
	public function newAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash
		$authCheck = $helpers->authCheck($hash); //se llama al metodod authCheck q esta en los helpers

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true); //decodifica los datos
			$json = $request->get("json", null); //se recoge la variable q llega por post

			if ($json != null) {

				$params = json_decode($json); //decodificar esa variable recogida

				$createdAt = new \Datetime("now");
				$user_id = (isset($identity->sub)) ? $identity->sub : null; //si existe le damos el valor a la variable pamars->id
				$video_id = (isset($params->video_id)) ? $params->video_id : null;
				$body = (isset($params->body)) ? $params->body : null;

				if ($user_id != null && $video_id != null) {
					$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager
					$user = $em->getRepository("BackendBundle:User")->findOneBy(//se usa findby para ver si el email no es repetido
							array(
								"id" => $user_id
					));
					$video = $em->getRepository("BackendBundle:Video")->findOneBy(//se usa findby para ver si el email no es repetido
							array(
								"id" => $video_id
					));

					$comment = new Comment();
					$comment->setUser($user);
					$comment->setVideo($video);
					$comment->setBody($body);
					$comment->setCreatedAt($createdAt);

					$em->persist($comment);
					$em->flush(); //se guarda en la BD

					$data = array(
						"status" => "success",
						"code" => 200,
						"msg" => "Comentario creado!!!"
					);
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "Comentario no creado!!!"
					);
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "parametros fallidos!!!"
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

	public function deleteAction(Request $request, $id = null) {

		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash
		$authCheck = $helpers->authCheck($hash); //se llama al metodod authCheck q esta en los helpers

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true); //decodifica los datos

			$user_id = ($identity->sub != null) ? $identity->sub : null;

			$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager
			$comment = $em->getRepository("BackendBundle:Comment")->findOneBy(
					array(
						"id" => $id
			));

			if (is_object($comment) && $user_id != null) {
				//se asegurara q el dueño del comentario sea el dueño del video o es el dueño del creador del comentario
				if (isset($identity->sub) && ($identity->sub == $comment->getUser()->getId() ||
						$identity->sub == $comment->getVideo()->getUser()->getId())) {

					$em->remove($comment);
					$em->flush();

					$data = array(
						"status" => "success",
						"code" => 200,
						"msg" => "comment deleted!!!"
					);
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "comment not deleted!!!"
					);
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "comment not deleted!!!"
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
