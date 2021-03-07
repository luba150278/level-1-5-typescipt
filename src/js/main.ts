import { sayHello } from "./greet";
function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  if (elt != null) elt.innerText = sayHello(name);
  console.log('YYYY');
}
showHello("greeting", "TypeScript");

