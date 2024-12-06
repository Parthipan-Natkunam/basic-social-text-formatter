import "./app.css";
import RichTextEditor from "./lib/components/RichTextEditor.svelte";

const container = document.getElementById("app");

if(container){
    container.innerHTML = `
    <social-post-formatter/>
    `;
} else {
    console.error("Container not found");
    document.body.innerHTML =
      "<p class='load-error'>⚠️ <strong>Error:</strong> Container Missing. Contact The Admin</p>";
}
