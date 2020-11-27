module.exports = {
  /**
   * 分页工具
   * @param model 表名
   * @param type
   * @param count
   * @param page
   * @returns {Promise<*>}
   */
  async getPage({ model, type, count, page }) {
    return model
      .find({ type }, { chapterList: 0, __v: 0, _id: 0 })
      .sort({ id: 1 })
      .skip(page * count)
      .limit(count)
      .exec();
  },
  /**
   * 分页
   * @param query 查询条件
   * @param model
   * @param type
   * @param count
   * @param page
   * @param ignore
   * @param sort 排序
   * @returns {Promise<*>}
   */
  async paginationTools(query, { model, count, page }, ignore, sort) {
    return model
      .find(query, ignore)
      .sort(sort)
      .skip(page * count)
      .limit(count)
      .exec();
  },

  /**
   * 集合总数
   * @param model
   * @param type
   * @returns {Promise}
   */
  async modelCount(model, type, field) {
    const term = type ? { [field]: type } : null;
    return model
      .find(term)
      .countDocuments() // count 即将废弃尽量不要使用
      .exec();
  },

  /**
   * 实现自增
   * @param Model
   * @param sequenceName
   * @returns {Number}
   */
  async getNextSequenceValue(Model, sequenceName) {
    const query = {
      sequenceName,
    };
    const update = { $inc: { sequenceValue: 1 } };

    const sequenceDocument = await new Promise((resolve, reject) => {
      Model.findOneAndUpdate(query, update, { new: true }, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
    return sequenceDocument.sequenceValue;
  },
  /**
   *
   * @param {Model} Model 表
   * @param {Object} quert 查询条件
   * @param {Object} filter 过滤条件
   */
  findOne(Model, quert, filter) {
    return new Promise((resolve, reject) => {
      Model.findOne(quert, filter).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  /**
   * 更新表字段
   * updateOne
   * @param Model
   * @param query
   * @param update
   */
  updateOne(Model, query, update) {
    return new Promise((resolve, reject) => {
      Model.updateOne(query, update, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  /**
   *
   * @param {Model} Model 表
   * @param {Object} schema 表模型的字段
   */
  createModelOne(Model, schema) {
    const model = new Model(schema);
    return new Promise((resolve, reject) => {
      model.save((err, product) => {
        if (err) return reject(err);
        resolve(product);
      });
    });
  },
};
