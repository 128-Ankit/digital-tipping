const Employee = require("../models/employeeModel");
const Hotel = require("../models/hotelModel");

const addEmployee = async (req, res) => {
  const { name, bankDetails, hotelId } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Create new employee
    const employee = new Employee({ name, bankDetails, hotel: hotelId });
    const savedEmployee = await employee.save();

    // Add the employee to the hotel's employee list
    hotel.employees.push(savedEmployee._id);
    await hotel.save();

    res.status(201).json({ message: "Employee added successfully", employee: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeesByHotel = async (req, res) => {
  try {
    console.log("Hotel ID from params:", req.params.hotelId);
    const employees = await Employee.find({ hotel: req.params.hotelId });
    console.log("Fetched Employees:", employees);

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    console.log("Request Params:", req.params);
    const { employeeId } = req.params;
    console.log("Employee ID from params:", employeeId);

    if (!employeeId) {
      console.log("No Employee ID provided.");
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const employee = await Employee.findById(employeeId).populate('hotel');

    if (!employee) {
      console.log("Fetched Employee: empty");
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Fetched Employee:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: error.message });
  }
};



// Export the functions
module.exports = { addEmployee, getEmployeesByHotel, getEmployeeById };
