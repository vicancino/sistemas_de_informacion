import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Project from "./Project.model";

@Table({
	tableName: "Income",
})
class Income extends Model {
	// Id del Ingreso
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	// Id del Proyecto
	@ForeignKey(() => Project)
	@Column({
		type: DataType.INTEGER,
	})
	declare Project_Id: number;

	@BelongsTo(() => Project)
	declare ProjectId: Project;

	// Razon del ingreso
	@Column({
		type: DataType.STRING,
	})
	declare Reason: string;

	// Cantidad del ingreso
	@Column({
		type: DataType.INTEGER,
	})
	declare Amount: number;
}

export default Income;
