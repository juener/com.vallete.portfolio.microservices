declare module 'pdf-poppler' {
  export interface ConvertOptions {
    format?: string
    out_dir?: string
    out_prefix?: string
    page?: number | string
    scale?: number
    file_type?: string
    [key: string]: any
  }

  export function convert(pdfPath: string, options?: ConvertOptions): Promise<string[]>
}
