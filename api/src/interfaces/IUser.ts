/*
*  The interface to User
*/

interface IUser {
	idUser?: number;
	idUserGuid?: string;
	idTitle?:number;
	name?: string;
	surname?: string;
	birthday?: Date;
	userName?: string;	
	eMail: string;
	password: string;
	mobile?: string;
	isActive?: number;	
	accountDisabledOn?: Date;
	accountDisabledBy?: number;
	isSFAuthEnabled?: number;
	lastLogin?: Date;
}

export default IUser;
