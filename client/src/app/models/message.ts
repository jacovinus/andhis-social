export class Message {
    constructor(
        public _id:string,
        public emitter,
        public receiver,
        public viewed:string,
        public text:string,
        public created_at:string
    ){}
}
