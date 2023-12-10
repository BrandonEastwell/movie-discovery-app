import express, {Request, Response} from 'express';
const app = express();  // create express app
import { fileURLToPath } from 'url';
import path from "path";

const filename = fileURLToPath(import.meta.url); //path to this file
const dirname = path.dirname(filename); //same as __dirname but can be used in es modules

//middleware
app.use(express.static(path.join(dirname + "../../frontend")));
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(dirname + "../../frontend", "index.html"));
});

let port= process.env.PORT;
if (port == null || port == "") {
    // @ts-ignore
    port = 8000;
}

app.listen(port);
console.log("server started on port http://localhost:8000")