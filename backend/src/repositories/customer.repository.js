const Customer = require("../models/customer.model");

const buildCustomerQuery = async ({ organizationId, search, isActive }) => {
  const query = { organizationId };

  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  if (search) {
    const searchable = search.trim();
    query.$or = [
      { name: { $regex: searchable, $options: "i" } },
      { normalizedName: { $regex: searchable, $options: "i" } },
      { phone: { $regex: searchable, $options: "i" } },
      { email: { $regex: searchable, $options: "i" } },
      { gstNumber: { $regex: searchable, $options: "i" } },
    ];
  }

  return query;
};

const findCustomers = async ({ organizationId, search, isActive, page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" }) => {
  const query = await buildCustomerQuery({ organizationId, search, isActive });
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [customers, total] = await Promise.all([
    Customer.find(query).sort(sort).skip(skip).limit(limit),
    Customer.countDocuments(query),
  ]);

  return {
    customers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findCustomerById = async ({ id, organizationId }) => {
  return Customer.findOne({ _id: id, organizationId });
};

const createCustomer = async (payload) => {
  return Customer.create(payload);
};

const updateCustomer = async ({ id, organizationId, payload }) => {
  return Customer.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: payload },
    { new: true, runValidators: true }
  );
};

const softDeleteCustomer = async ({ id, organizationId }) => {
  return Customer.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: { isActive: false } },
    { new: true }
  );
};

module.exports = {
  findCustomers,
  findCustomerById,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
};
