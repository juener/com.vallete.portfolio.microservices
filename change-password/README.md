# WIA Project with AdonisJS

## TODO:
- [x] Generate and validate JWT
- [ ] JWT with roles 
- [x] Set the docker up
- [x] Connection with database 
- [x] CRUD user
- [x] /autoridade-tributaria/change-password 
- [x] Reimplement from personalized errors to native error
- [ ] Implement Swagger or similar
- [ ] Implement unit and functional tests

### 20240927
- I implemented the whole crud for the user entity
- I implemented the exceptions handler and its response codes 

The requester didn't let me know what is the purpose of this project, and they need to let me know whether they want to implement the other tasks (roles, swagger, tests, etc) since the requester already sent another task to do.

### 20240926
- I created the layer services to separate the controllers and services
- I created the connection with the Postgresql 
- I set the docker up 
- I changed the /autoridade-tributaria endpoint
- I created the /session/login to generate JWT
- I implemented the isAuthenticated on the endpoints which require be authenticated
- 
- I will change the way the personalized errors were created, and use the native way 
- I will remove the response codes from the controller and integrate the errors with them 
- I will integrate the roles, despite I am already sending the roles through token 

### 20240924
Feature: Change the password from the Autoridade Tributária (Portugal)

Original request:
" Estamos a usar https://adonisjs.com.
Uma aplicação que pode efectuar é acederes ao portal da autoridade tributária e mudares a tua senha por outra.
Aqui tens vários níveis de dificuldade.
o objectivo é teres uma função que recebe dois parâmetros, UID, PWD e PWD_NEW e com essa informação vai ao portal da AT e alterar para a nova senha.
Se existir um erro deve responder com códigos correspondentes "

Website: 
- https://www.portaldasfinancas.gov.pt/at/html/index.html

My thoughts:
  I tried to find some public api, and I found: https://dados.gov.pt/en/docapi/
  there are some endpoints for /users and /me, but none of them update the password
  
  So, I remembered I used the puppeteer (https://pptr.dev) to simulate an user
  behavior for another project, and I started mapping the elements, clicks and typing.

Problems:
  When removed the parameter headless: true, it started returning an error:
  { "message": "Execution context was destroyed, most likely because of a navigation." }
  And I found the solution using the following issue:
  https://github.com/puppeteer/puppeteer/issues/3323

Libraries:
- npm init adonisjs@latest change-password -- --kit=api --auth-guard=access_tokens 
- npm i puppeteer

Calls:
Use the "REST Client" extension for VSCode, and edit/use the existent client.http file.
Obs: When you click at "send request" click only once and wait for its response. 
Response:
```
HTTP/1.1 200 OK
content-length: 57
content-type: application/json; charset=utf-8
Date: Tue, 24 Sep 2024 07:01:56 GMT
Connection: close

{
  "message": "The password has been changed successfully."
}
```