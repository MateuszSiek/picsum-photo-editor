import { PicsumImage } from "./types";

export function loadPicsumImages() {
  return fetch("https://picsum.photos/v2/list")
    .then((res) => res.json())
    .then((data) => data as PicsumImage[]);
}
