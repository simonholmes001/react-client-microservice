const chokidar = require("chokidar");

const watcher = chokidar.watch("./messages/rabbitmq_message.json", {
  persistent: true,
});

function Watcher() {
  watcher
    .on("add", (path) => console.log(`File ${path} has been added`))
    .on("change", (path) => console.log(`File ${path} has been changed`))
    .on("unlink", (path) => console.log(`File ${path} has been removed`));
}

module.exports = { Watcher };