declare module 'pdf-extract' {
  const pdfExtract: (
    filePath: string,
    options: any,
    callback: (error: any) => void
  ) => {
    on: (event: string, listener: (data: any) => void) => void
  }
  export default pdfExtract
}
