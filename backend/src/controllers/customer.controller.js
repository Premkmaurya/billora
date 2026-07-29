const customerRepository = require("../repositories/customer.repository");

const getOrganizationId = (req) => {
  return String(req.user?.organizationId || req.user?._id || req.user?.id || "");
};

const getCustomers = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await customerRepository.findCustomers({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: result.customers,
      meta: result.meta,
      stats: result.stats,
      customers: result.customers,
      items: result.customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      errors: [error.message],
    });
  }
};

const searchCustomers = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await customerRepository.searchCustomers({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Customers searched successfully",
      data: result.customers,
      meta: result.meta,
      stats: result.stats,
      customers: result.customers,
      items: result.customers,
    });
  } catch (error) {
    console.error("Error searching customers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search customers",
      errors: [error.message],
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const customer = await customerRepository.findCustomerById({ id, organizationId });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer fetched successfully",
      data: customer,
      customer,
    });
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
      errors: [error.message],
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const customer = await customerRepository.createCustomer({
      ...req.body,
      organizationId,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
      customer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create customer",
      errors: [error.message],
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const customer = await customerRepository.updateCustomer({
      id,
      organizationId,
      payload: req.body,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
      customer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      errors: [error.message],
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const deleted = await customerRepository.softDeleteCustomer({ id, organizationId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      errors: [error.message],
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
};
