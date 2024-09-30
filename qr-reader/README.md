# WIA Read QRCode Project

## 
- [x] Read PNG QRCodes inside a receipt;
- [ ] Also read PDF with the same kind of content;
- [ ] Read QRCodes even in a bad quality.

### 20240928
- I implemented a qrcode reader using PNG images;
- It's able to read good quality of QRCodes, but, may be a problem low quality qrcodes;
- I implemented a translation of the content of the qrcode in a readble JSON.

Original request:
" Para o ficheiro que está em anexo, deves ler o QRCode e obter a informação deste.
A informação da informação está em: https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Novas_regras_faturacao/Documents/Especificacoes_Tecnicas_Codigo_QR.pdf
Ter em atenção que pode ser necessário fazer um tratamento à imagem para que o QRCode seja mais legível "

Website: 
- https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Novas_regras_faturacao/Documents/Especificacoes_Tecnicas_Codigo_QR.pdf

My thoughts:
  I searched on Google what's the best way to do that, and I found this article at Medium:
  https://sivarampg.medium.com/reading-qr-codes-in-pdf-files-using-javascript-3b26f9c514a0
  Basically, it's explaining we should transform pdf to image, and there is a library that converts qrcode inside the image in text. 
  However, the problem here was implement a reader which could handle low quality qrcodes, so I spent time finding some library to enhance the quality of the image, but this was not enough. 

Problems:
- The QRCode sometimes may be in a low quality.

Libraries:
- npm init adonisjs@latest qr-reader -- --kit=api --auth-guard=access_tokens 
- npm i pdf2pic 
- npm i pngjs
- npm i jsqr

Calls:
Use the "REST Client" extension for VSCode, and edit/use the existent client.http file.
Obs: When you click at "send request" click only once and wait for its response. 
Response:
```
{
    "qrCodeData": {
        "nifDoEmitente": "123456",
        "nifDoAdquirente": "654321",
        "paisDoAdquirente": "PT",
        "tipoDeDocumento": "FS",
        "estadoDoDocumento": "N",
        "dataDoDocumento": "20240801",
        "idDoDocumento": "FS 123433/43321",
        "ATCUD": "LOKKM44W-12345",
        "espacoFiscal": "PT",
        "baseTributavelDeIvaTaxaNormal": "12.20",
        "totalIvaTaxaNormal": "2.80",
        "totalDeImpostos": "2.80",
        "totalDoDocumentoComImpostos": "15.00",
        "caracteresDoHash": "EIWW",
        "numDoCertificado": "0100"
    }
}
```