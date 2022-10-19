const validateResource = (resourceSchema) => async (req, res, next) => {
  try {
    await resourceSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export default validateResource;
