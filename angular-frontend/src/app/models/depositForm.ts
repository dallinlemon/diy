export default class {
    constructor(
		public Name: string,
		public Amount: number,
    public DepType: 'Credit' | 'Debit',
		public Date: Date,
		public Description: string,
		public Category: string
	) { }
}