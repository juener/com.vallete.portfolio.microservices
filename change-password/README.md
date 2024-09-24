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
- npm i zod
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