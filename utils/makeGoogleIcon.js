export default function makeGoogleIcon(image, size) {
   return new window.google.maps.MarkerImage(
      image,
      null,
      null,
      null,
      new window.google.maps.Size(...size)
   );
}
