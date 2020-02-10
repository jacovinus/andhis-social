export class User {
    constructor(
        public _id:string,
        public name:string,
        public surname:string,
        public nick:string,
        public email:string,
        public description:string,
        public password:string,
        public role:string,
        public image:string,
        public gettoken:string,
        public created_at:string,
        public updated_at:string
    ){

    }
}
