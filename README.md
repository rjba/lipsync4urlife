# lipsync4urlife
Application utilisant l'API de Genius pour rechercher et trouver des paroles de chansons avec le nom de la chanson et/ou le nom de l'artiste. 

3 fonctionnalités sont présentes sur l'application: 
1. la recherche de chansons avec nom de la chanson ou nom de l'artiste pour accéder aux paroles: une barre de recherche est présente sur la page d'accueil de l'application ("/") et affiche les résultats avec les chansons en fonction de notre recherche
2. la fiche d'informations pour chaque artiste: sur la page des paroles d'une chanson, le nom de l'artiste est cliquable et permet d'accéder à une fiche d'informations sur cet artiste (photo, noms, surnoms, description, liens de ses réseaux sociaux) et un accès à toutes les chansons de cet artiste
3. la liste des chansons de chaque artiste: toutes les chansons répertoriées sur le site de Genius pour un artiste donné

Pour lancer l'application deux choix: 
1. Cloner le projet depuis ce github.  
  a. définissez un .env où vous définirrez les clés d'api nécessaire  
  b. Dans le répertoire de l'application clonée, en ligne de commande, executer "npm install" pour installer tous les packets nécessaires au fonctionnement de l'application.  
  c. Puis executer "npm start". L'application sera accessible sur le port 3000 en local, localhost:3000 dans un navigateur.  
  d. Pour lancer les tests, dans le répertoire de l'application, en ligne de commande, executer "npm test".  
2. Récuppérer sur le dockerhub l'image de notre application : https://hub.docker.com/repository/docker/rjba/lipsync4urlife
  a. Au runtime du container, ajouter en variables d'environnements les clés d'api avec les noms suivants RAPID_API_KEY et GENIUS_CLIENT_KEY  
  b. voici la commande à passer pour lancer l'image  
  docker run -p 3000:3000 -e RAPID_API_KEY=valeur_cle_api GENIUS_CLIENT_KEY=valeur_cle_api nom_image

