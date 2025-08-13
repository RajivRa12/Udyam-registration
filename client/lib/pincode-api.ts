// PIN code API utility for auto-filling city/state information
export interface PincodeData {
  pincode: string;
  city: string;
  state: string;
  district: string;
  country: string;
}

export interface PincodeApiResponse {
  success: boolean;
  data?: PincodeData;
  error?: string;
}

// Mock data for demonstration - in a real app, this would call an actual API
const mockPincodeData: Record<string, PincodeData> = {
  "110001": {
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi",
    district: "Central Delhi",
    country: "India"
  },
  "400001": {
    pincode: "400001",
    city: "Mumbai",
    state: "Maharashtra",
    district: "Mumbai City",
    country: "India"
  },
  "560001": {
    pincode: "560001",
    city: "Bangalore",
    state: "Karnataka",
    district: "Bangalore Urban",
    country: "India"
  },
  "600001": {
    pincode: "600001",
    city: "Chennai",
    state: "Tamil Nadu",
    district: "Chennai",
    country: "India"
  },
  "700001": {
    pincode: "700001",
    city: "Kolkata",
    state: "West Bengal",
    district: "Kolkata",
    country: "India"
  },
  "500001": {
    pincode: "500001",
    city: "Hyderabad",
    state: "Telangana",
    district: "Hyderabad",
    country: "India"
  },
  "411001": {
    pincode: "411001",
    city: "Pune",
    state: "Maharashtra",
    district: "Pune",
    country: "India"
  },
  "302001": {
    pincode: "302001",
    city: "Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    country: "India"
  },
  "380001": {
    pincode: "380001",
    city: "Ahmedabad",
    state: "Gujarat",
    district: "Ahmedabad",
    country: "India"
  },
  "226001": {
    pincode: "226001",
    city: "Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    country: "India"
  }
};

export const fetchPincodeData = async (pincode: string): Promise<PincodeApiResponse> => {
  try {
    // Validate pincode format
    if (!/^\d{6}$/.test(pincode)) {
      return {
        success: false,
        error: "Invalid PIN code format. Please enter a 6-digit PIN code."
      };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check mock data
    const data = mockPincodeData[pincode];
    
    if (data) {
      return {
        success: true,
        data
      };
    } else {
      return {
        success: false,
        error: "PIN code not found. Please enter manually."
      };
    }

    // In a real application, you would call an actual API like:
    /*
    const response = await fetch(`https://api.postpin.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (response.ok && data.length > 0) {
      const locationData = data[0];
      return {
        success: true,
        data: {
          pincode: locationData.Pincode,
          city: locationData.City,
          state: locationData.State,
          district: locationData.District,
          country: "India"
        }
      };
    } else {
      return {
        success: false,
        error: "PIN code not found"
      };
    }
    */
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch PIN code data. Please try again."
    };
  }
};

// Utility function to get all states (for dropdowns)
export const getIndianStates = (): Array<{ value: string; label: string }> => {
  return [
    { value: "andhra_pradesh", label: "Andhra Pradesh" },
    { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal_pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya_pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil_nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar_pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west_bengal", label: "West Bengal" },
    { value: "delhi", label: "Delhi" },
    { value: "jammu_kashmir", label: "Jammu & Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "puducherry", label: "Puducherry" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "dadra_nagar_haveli", label: "Dadra & Nagar Haveli" },
    { value: "daman_diu", label: "Daman & Diu" },
    { value: "lakshadweep", label: "Lakshadweep" },
    { value: "andaman_nicobar", label: "Andaman & Nicobar Islands" }
  ];
};
