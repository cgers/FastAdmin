interface LimsCustomer {
	IDENTITY: string;
	GROUP_ID: string;
	NAME: string;
	COMPANY_NAME: string;
	ADDRESS1: string;
	ADDRESS2: string;
	ADDRESS3: string;
	ADDRESS4: string;
	ADDRESS5: string;
	ADDRESS6: string;
	CONTACT: string;
	PHONE_NUM: string;
	MODIFIED_ON: Date;
	MODIFIED_BY: string;
	MODIFIABLE: string;
	REMOVEFLAG: string;
	SUSPENDFLAG: string;
	DESCRIPTION: string;
	WEB_PAGE: string;
	EMAIL: string;
	HAS_ATTACHMENTS: string;
	COUNTRY: string;
	POSTCODE: string;
	DATE_LAST_USED: Date;
	PHOENIX_CUSTOMER_ID: number;
	PHOENIX_CONTACT_ID: number;
}

export default LimsCustomer;
