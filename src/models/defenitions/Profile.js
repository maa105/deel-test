module.exports = [
  "Profile",
  {
    id: {
      autoIncrement: true,
      type: ["DataTypes", "INTEGER"],
      allowNull: true,
      primaryKey: true,
    },
    firstName: {
      type: ["DataTypes", "STRING", 255],
      allowNull: false,
    },
    lastName: {
      type: ["DataTypes", "STRING", 255],
      allowNull: false,
    },
    profession: {
      type: ["DataTypes", "STRING", 255],
      allowNull: false,
    },
    balance: {
      type: ["DataTypes", "DECIMAL", 12, 2],
      allowNull: true,
    },
    type: {
      type: ["DataTypes", "TEXT"],
      allowNull: true,
    },
  },
  {
    tableName: "Profiles",
    timestamps: true,
  },
];
