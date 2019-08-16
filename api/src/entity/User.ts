import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import  IUser  from "../interfaces/IUser";
import { hashPassword, comparePassword } from "../helper/bcryptJs";
import  isEmpty from "../helper/isEmpty";

@Entity("user")
class User extends BaseEntity implements IUser {
	@PrimaryGeneratedColumn() public idUser: number;
	@Column({ type: "char", length: 16 }) public idUserGuid: string;
	@Column({type: "varchar"}) public userName: string;
	@Column("varchar") public eMail: string;
	@Column("varchar") public password: string;
	@Column("varchar") public mobile: string;
	@Column("tinyint") public isActive: number;
	@Column("datetime") public accountDisabledOn: Date;
	@Column("int") public accountDisabledBy: number;
	@Column("tinyint") public isSfAuthEnabled: number;
	@Column("datetime") public lastLogin: Date;

	constructor(UserName:string, eMail: string, HashedPassword: string, createdBy: number, createdOn: Date) {
		super(createdBy, createdOn);
		this.userName = UserName;
		this.isActive = 1;
		this.eMail = eMail;
		this.isSfAuthEnabled = 0;
		this.lastLogin = new Date();		
		this.password = HashedPassword;
	}
}

export default User;
