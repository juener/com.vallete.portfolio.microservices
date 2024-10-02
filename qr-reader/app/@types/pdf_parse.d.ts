declare module 'pdf-parse' {
  export default function pdf(data: Buffer): Promise<{ text: string }>
}
