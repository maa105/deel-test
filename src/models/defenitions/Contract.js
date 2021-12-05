module.exports = [
  "Contract",
  {
    id: {
      autoIncrement: true,
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      primaryKey: true,
    },
    terms: {
      type: ["DataTypes", "TEXT"],
      allowNull: false,
    },
    status: {
      type: ["DataTypes", "TEXT"],
      allowNull: true,
    },
    ContractorId: {
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      references: {
        model: "Profiles",
        key: "id",
      },
    },
    ClientId: {
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      references: {
        model: "Profiles",
        key: "id",
      },
    },
  },
  {
    tableName: "Contracts",
    timestamps: true,
  },
];
