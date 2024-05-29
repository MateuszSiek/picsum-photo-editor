export interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface ImageEditProps {
  width: number;
  height: number;
  blur: number;
  grayscale: boolean;
}
