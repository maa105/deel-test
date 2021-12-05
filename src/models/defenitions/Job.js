module.exports = [
  "Job",
  {
    id: {
      autoIncrement: true,
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      primaryKey: true,
    },
    description: {
      type: ["DataTypes", "TEXT"],
      allowNull: false,
    },
    price: {
      type: ["DataTypes", "DECIMAL", 12, 2],
      allowNull: false,
    },
    paid: {
      type: ["DataTypes", "BOOLEAN"],
      allowNull: true,
    },
    paymentDate: {
      type: ["DataTypes", "DATE"],
      allowNull: true,
    },
    ContractId: {
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      references: {
        model: "Contracts",
        key: "id",
      },
    },
  },
  {
    tableName: "Jobs",
    timestamps: true,
  },
];
