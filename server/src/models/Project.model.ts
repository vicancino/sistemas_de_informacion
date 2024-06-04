import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Client from "./Client.model";

@Table({
	tableName: "Projetcs",
})
class Project extends Model {
	// Id del projecto
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Column({
		type: DataType.STRING,
	})
	declare Project_Name: string;

	@ForeignKey(() => Client)
	@Column({
		type: DataType.INTEGER,
	})
	declare Client_Id: number;

	@BelongsTo(() => Client)
	declare ClientId: Client;
}

export default Project;
