import http from "http";

const server = http.createServer((req, res) => {
    if (req.url === "/sse") {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*"
        });
        let counter = 0

        const timer = setInterval(() => {
            if (counter > 20) {
                res.write(`event: close\n`);
                res.write(`data: close\n\n`);
                return
            }
            res.write(`data: ${counter}\n`);
            res.write(`id: ${counter}\n\n`);
            counter++
        }, 100);

        req.on('close', () => {
            clearInterval(timer);
            console.log('Client disconnected');
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
