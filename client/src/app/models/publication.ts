export class Publication {
    constructor(
        public _id:string,
        public user,
        public title:string,
        public text:string,
        public file:string,
        public likes: string,
        public inhotlist: string,
        public created_at:string,
        public updated_at:string
    ){}
}
