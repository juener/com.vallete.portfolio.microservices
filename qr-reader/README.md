# WIA Read QRCode Project

Use the /app/validators/ocr_pdf_validator.ts to set the body / form-data (file + options)

## 
- [x] Read PNG QRCodes inside a receipt;
- [x] Also read PDF with the same kind of content;
- [ ] Read QRCodes even in a bad quality;
- [x] OCR a PDF document;
- [x] OCR a PDF document which was scanned, and if it's needed convert to PNG to OCR it.

### 20241002
- I implemented an OCR on PDF files and got it even if the PDF origin came from an image;
- I implemented an OCR on PDF files even if the PDF has more than one page;
- I implemented a set of options as contrast, brightness, scale to get better results

### 20241001
- I implemented an OCR on PDF files and I got it when the PDF was made by some document;
- I tried to implement an OCR on PDF files when the doc was scanned, however, it's not available yet
- I implemented a PDF conversion to PNG, and tried to read the QRCode and OCR the image, but for this process it lost some quality and it was not possible to read the QRCode or OCR it.

### 20240928
- I implemented a qrcode reader using PNG images;
- It's able to read good quality of QRCodes, but, may be a problem low quality qrcodes;
- I implemented a translation of the content of the qrcode in a readble JSON.

### How to invoke it
![](./public/postman.png)


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