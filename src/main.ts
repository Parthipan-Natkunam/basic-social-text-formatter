import "./app.css";

const container = document.getElementById("app");

if (container) {
  container.innerHTML = `
    <rich-text-editor/>
    `;
} else {
  console.error("Container not found");
  document.body.innerHTML =
    "<p class='load-error'>⚠️ <strong>Error:</strong> Container Missing. Contact The Admin</p>";
}
