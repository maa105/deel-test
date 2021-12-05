const Sequelize = require("sequelize");
/**
 * @param {import('sequelize').Sequelize} sequelize - the sequelize instance
 * @param {String} modelName - the model name
 * @returns {[String, Object, Object]} - the sequelize.define arguments
 */
const getModelDefenition = (sequelize, modelFileName) => {
  const [
    modelName,
    modelFields,
    modelOptions,
  ] = require(`../defenitions/${modelFileName}`);
  for (var fieldName in modelFields) {
    const currField = modelFields[fieldName];
    if (Array.isArray(currField.type)) {
      const [DataType, SQLType, TypeLength] = currField.type;
      currField.type =
        SQLType === "UUID"
          ? "UNIQUEIDENTIFIER"
          : TypeLength == null
          ? Sequelize[DataType][SQLType]
          : Sequelize[DataType][SQLType](TypeLength);
    }
    if (Array.isArray(currField.defaultValue)) {
      const [Sequelize, Fn, FnName] = currField.defaultValue;
      currField.defaultValue = !Fn
        ? Sequelize[Sequelize]
        : !FnName
        ? Sequelize[Sequelize][Fn]
        : Sequelize[Sequelize][Fn](FnName);
    }
  }
  modelOptions.sequelize = sequelize;
  return [modelName, modelFields, modelOptions];
};

exports.getModelDefenition = getModelDefenition;
