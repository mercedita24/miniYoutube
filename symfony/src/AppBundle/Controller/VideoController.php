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
			$identity = $helpers->authCheck($hash, true);//decodifica los datos
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
					$user = $em->getRepository("BackendBundle:User")->findOneBy(
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

					$video = $em->getRepository("BackendBundle:Video")->findOneBy(
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

	public function editAction(Request $request, $id = null) {
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

				$video_id = $id;
				$user_id = ($identity->sub != null) ? $identity->sub : null;
				$title = (isset($params->title)) ? $params->title : null;
				$description = (isset($params->description)) ? $params->description : null;
				$status = (isset($params->status)) ? $params->status : null;

				if ($user_id != null && $title != null) {
					$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager

					$video = $em->getRepository("BackendBundle:Video")->findOneBy(
							array(
								"id" => $video_id
					));

					if (isset($identity->sub) && $identity->sub == $video->getUser()->getId()) { //se verifica q el id del usuario q a creado el video sea el correcto recibido en el token
						$video->setTitle($title);
						$video->setDescription($description);
						$video->setStatus($status);
						$video->setUpdatedAt($updatedAt);

						$em->persist($video);
						$em->flush(); //se guarda en la BD

						$data = array(
							"status" => "success",
							"code" => 200,
							"msg" => "video updated success!!"
						);
					} else {
						$data = array(
							"status" => "error",
							"code" => 400,
							"msg" => "Video not updated, You not owner :( !!!"
						);
					}
				} else {
					$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "Video not updated!!!"
					);
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Video not updated, parametros fallidos!!!"
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

	public function uploadAction(Request $request, $id) {

		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null); //se recoge el hash
		$authCheck = $helpers->authCheck($hash); //se llama al metodod authCheck q esta en los helpers

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true);

			$video_id = $id;

			$em = $this->getDoctrine()->getManager(); //se manda a llamar al entity manager

			$video = $em->getRepository("BackendBundle:Video")->findOneBy(
					array(
						"id" => $video_id
			));

			if ($video_id != null && isset($identity->sub) && $identity->sub == $video->getUser()->getId()) {

				$file = $request->files->get('image', null);
				$file_video = $request->files->get('video', null);

				if ($file != null && !empty($file)) {
					$ext = $file->guessExtension();

					if ($ext == "png" || $ext == "jpeg" || $ext == "jpg" || $ext == "gif") {
						$file_name = time() . "." . $ext;
						$path_of_file = "uploads/video_image/video_" . $video_id;
						$file->move($path_of_file, $file_name);

						$video->setImage($file_name);
						$em->persist($video);
						$em->flush();

						$data = array(
							"status" => "success",
							"code" => 200,
							"msg" => "Image file uploaded !!!"
						);
					} else {
						$data = array(
							"status" => "error",
							"code" => 400,
							"msg" => "Formato incorrecto"
						);
					}
				} else { //si no se sube una imagen es por q se esta subiendo un video
					if ($file_video != null && !empty($file_video)) {
						$ext = $file_video->guessExtension();

						if ($ext == "mp4" || $ext == "avi") {
							$file_name = time() . "." . $ext;
							$path_of_file = "uploads/video_files/video_" . $video_id;
							$file_video->move($path_of_file, $file_name);

							$video->setVideoPath($file_name);

							$em->persist($video);
							$em->flush();

							$data = array(
								"status" => "success",
								"code" => 200,
								"msg" => "Video file uploaded !!!"
							);
						} else {
							$data = array(
								"status" => "error",
								"code" => 400,
								"msg" => "Formato incorrectoooooooooooo"
							);
						}
					}
				}
			} else {
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Video not updated, You not owner :( !!!"
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

	//metodo para el admin q nos liste los videos q tenemos en BD
	public function videosAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$em = $this->getDoctrine()->getManager();

		//dql es un pseudo lenguaje para trabajar con objetos en doctrine
		$dql = "SELECT v FROM BackendBundle:Video v ORDER BY v.id DESC";

		//crear al final la consulta
		$query = $em->createQuery($dql);

		$page = $request->query->getInt("page", 1); //primero la pagina 1
		//cargando servicio del paginador
		$paginator = $this->get("knp_paginator");

		//numero de videos por pagina igual a 6
		$items_per_page = 6;

		//lanzamos la paginacion
		$pagination = $paginator->paginate($query, $page, $items_per_page);

		$total_items_count = $pagination->getTotalItemCount();

		$data = array(
			"status" => "success",
			"total_item_count" => $total_items_count,
			"page_actual" => $page,
			"items_per_page" => $items_per_page,
			"total_pages" => ceil($total_items_count / $items_per_page),
			"data" => $pagination
		);

		return $helpers->json($data);
	}

	//metodo para mostrar los ultimos 5 videos subidos
	public function lastsVideosAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$em = $this->getDoctrine()->getManager();

		//dql es un pseudo lenguaje para trabajar con objetos en doctrine
		$dql = "SELECT v FROM BackendBundle:Video v ORDER BY v.createdAt DESC";

		//crear al final la consulta
		$query = $em->createQuery($dql)->setMaxResults(5);
		$videos = $query->getResult();

		$data = array(
			"status" => 'success',
			"data" => $videos
		);

		return $helpers->json($data);
	}

	//metodo para ver el detalle de un video especifico por el parametro ID
	public function videoAction(Request $request, $id = null) {
		$helpers = $this->get("app.helpers");
		$em = $this->getDoctrine()->getManager();

		$video = $em->getRepository("BackendBundle:Video")->findOneBy(array(
			"id" => $id
		));

		if ($video) {
			$data = array();
			$data["status"] = 'success';
			$data["code"] = 200;
			$data["data"] = $video;
		} else {
			$data = array(
				"status" => 'error',
				"code" => 400,
				"msg" => "Video no existe"
			);
		}

		return $helpers->json($data);
	}

	//metodo para hacer una busqueda de video atravez de un parametro como palabra clave
	public function searchAction(Request $request, $search = null) {
		$helpers = $this->get("app.helpers");

		$em = $this->getDoctrine()->getManager();


		if ($search != null) {
			$dql = "SELECT v FROM BackendBundle:Video v "
					. "WHERE v.title LIKE :search OR "
					. "v.description LIKE :search ORDER BY v.id DESC";
			$query = $em->createQuery($dql)
					->setParameter("search", "%$search%");
		} else {
			$dql = "SELECT v FROM BackendBundle:Video v ORDER BY v.id DESC";
			$query = $em->createQuery($dql);
		}


		$page = $request->query->getInt("page", 1);
		$paginator = $this->get("knp_paginator");
		$items_per_page = 6;

		$pagination = $paginator->paginate($query, $page, $items_per_page);
		$total_items_count = $pagination->getTotalItemCount();

		$data = array(
			"status" => "success",
			"total_items_count" => $total_items_count,
			"page_actual" => $page,
			"items_per_page" => $items_per_page,
			"total_pages" => ceil($total_items_count / $items_per_page),
			"data" => $pagination
		);

		return $helpers->json($data);
	}
	
	
}
