// web 환경에서 사용되는 Alert
export default function Alert(
   title: string,
   desc: string,
   onNegativePress = () => {},
   onPositivePress = () => {}
) {
   let res;
   if (title) {
      res = window.confirm(`${title}\n${desc}`);
   } else {
      res = window.confirm(`${desc}`);
   }
   if (res) onPositivePress();
   else onNegativePress();
}
