interface SampleJob {
	idSampleJob?: number;
	IdCustomer: number;
	idPortalUser: number;
	Asset?: string;
	PurchaseOrder?: string;
	CustomerReference?: string;
	Description?: string;
	idServiceLevel?: number;
	JobComments?: string;
	idPortalSchedule?: number;
	IsHazardous?: string;
	DeliveryMode?: string;
	Class?: string;
	Vessel?: string;
	ShippingContainer?: string;
	UNNo?: string;
	ExpectedDispatchDate?: Date;
	DispatchedBy?: number;
	DispatchedOn?: Date;
	DestAddress1?: string;
	DestAddress2?: string;
	DestAddress3?: string;
	DestAddress4?: string;
	PostCode?: string;
	idCountry?: number;
	isJobCancelled?: string;
	JobCancelledBy?: number;
	JobCancelledOn?: Date;
	JobCancelledReason?: string;
}

export default SampleJob;
