/**
 * Pre-computed statistics from the IBM HR Employee Attrition dataset (1,470 records).
 * Organized by dimension so the insight engine can generate dynamic conclusions
 * based on current filter state without loading the full CSV.
 */

export const DATASET = {
  total: 1470,
  attritionYes: 237,
  attritionNo: 1233,
  attritionRate: 16.1,
  avgAge: 36.9,
  avgMonthlyIncome: 6503,
  avgYearsAtCompany: 7.0,

  byDepartment: {
    'Sales': { total: 446, attrition: 92, rate: 20.6, avgIncome: 6959, avgAge: 37.0 },
    'Research & Development': { total: 961, attrition: 133, rate: 13.8, avgIncome: 6281, avgAge: 36.9 },
    'Human Resources': { total: 63, attrition: 12, rate: 19.0, avgIncome: 6654, avgAge: 37.5 },
  },

  byRole: {
    'Sales Representative': { total: 83, attrition: 33, rate: 39.8, avgIncome: 2626 },
    'Laboratory Technician': { total: 259, attrition: 62, rate: 23.9, avgIncome: 3237 },
    'Human Resources': { total: 52, attrition: 12, rate: 23.1, avgIncome: 3807 },
    'Sales Executive': { total: 326, attrition: 57, rate: 17.5, avgIncome: 6924 },
    'Research Scientist': { total: 292, attrition: 47, rate: 16.1, avgIncome: 3240 },
    'Healthcare Representative': { total: 131, attrition: 9, rate: 6.9, avgIncome: 7528 },
    'Manufacturing Director': { total: 145, attrition: 10, rate: 6.9, avgIncome: 7342 },
    'Manager': { total: 102, attrition: 5, rate: 4.9, avgIncome: 17182 },
    'Research Director': { total: 80, attrition: 2, rate: 2.5, avgIncome: 15947 },
  },

  byOvertime: {
    'Yes': { total: 416, attrition: 127, rate: 30.5 },
    'No': { total: 1054, attrition: 110, rate: 10.4 },
  },

  byAgeBand: {
    'Under 25': { total: 97, attrition: 38, rate: 39.2 },
    '25-34': { total: 554, attrition: 112, rate: 20.2 },
    '35-44': { total: 505, attrition: 51, rate: 10.1 },
    '45-54': { total: 246, attrition: 25, rate: 10.2 },
    '55+': { total: 69, attrition: 11, rate: 15.9 },
  },

  byJobSatisfaction: {
    1: { total: 289, attrition: 66, rate: 22.8 },
    2: { total: 280, attrition: 46, rate: 16.4 },
    3: { total: 442, attrition: 73, rate: 16.5 },
    4: { total: 459, attrition: 52, rate: 11.3 },
  },

  byWorkLifeBalance: {
    1: { total: 80, attrition: 25, rate: 31.2 },
    2: { total: 344, attrition: 64, rate: 18.6 },
    3: { total: 893, attrition: 127, rate: 14.2 },
    4: { total: 153, attrition: 21, rate: 13.7 },
  },

  byBusinessTravel: {
    'Travel_Frequently': { total: 277, attrition: 69, rate: 24.9 },
    'Travel_Rarely': { total: 1043, attrition: 156, rate: 15.0 },
    'Non-Travel': { total: 150, attrition: 12, rate: 8.0 },
  },

  byGender: {
    'Male': { total: 882, attrition: 150, rate: 17.0 },
    'Female': { total: 588, attrition: 87, rate: 14.8 },
  },

  byEducationField: {
    'Life Sciences': { total: 606, attrition: 89, rate: 14.7 },
    'Medical': { total: 464, attrition: 63, rate: 13.6 },
    'Marketing': { total: 159, attrition: 35, rate: 22.0 },
    'Technical Degree': { total: 132, attrition: 32, rate: 24.2 },
    'Human Resources': { total: 27, attrition: 7, rate: 25.9 },
    'Other': { total: 82, attrition: 11, rate: 13.4 },
  },

  byMaritalStatus: {
    'Single': { total: 470, attrition: 120, rate: 25.5 },
    'Married': { total: 673, attrition: 84, rate: 12.5 },
    'Divorced': { total: 327, attrition: 33, rate: 10.1 },
  },

  byIncomeBand: {
    'Under $3K': { total: 389, attrition: 99, rate: 25.4 },
    '$3K-$6K': { total: 456, attrition: 76, rate: 16.7 },
    '$6K-$10K': { total: 306, attrition: 38, rate: 12.4 },
    '$10K+': { total: 319, attrition: 24, rate: 7.5 },
  },

  byDistanceBand: {
    'Near (0-5)': { total: 563, attrition: 72, rate: 12.8 },
    'Mid (6-15)': { total: 480, attrition: 81, rate: 16.9 },
    'Far (16+)': { total: 427, attrition: 84, rate: 19.7 },
  },
};
