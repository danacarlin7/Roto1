export class Pages{
	constructor(
		public title : String,
		public slug : String,
		public content: String
		){}
}

export class EditPage{
	constructor(
		public title : String,
		public slug : String,
		public content: String,
		public id : String
		){}
}