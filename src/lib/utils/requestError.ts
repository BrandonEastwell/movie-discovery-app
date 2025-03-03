export default class requestError extends Error {
    public status;
    public body;
    constructor(message:any, status:any, body:any) {
        super(message)
        this.status = status;
        this.body = body;
    }
}