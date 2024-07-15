const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const monthFractions = {
  "January": 0 / 12,
  "February": 1 / 12,
  "March": 2 / 12,
  "April": 3 / 12,
  "May": 4 / 12,
  "June": 5 / 12,
  "July": 6 / 12,
  "August": 7 / 12,
  "September": 8 / 12,
  "October": 9 / 12,
  "November": 10 / 12,
  "December": 11 / 12,
};

export const education = [
    { title: "Boston University", 
      content: "Bachelor of Science, Mechanical Engineering", 
      startYear: 2019, 
      startMonth: "September",
      endYear: 2023, 
      endMonth: "May"
    },
    { title: "Boston University", 
      content: "Master of Science, Computer Engineering", 
      startYear: 2023,
      startMonth: "September",
      endYear: 2024, 
      endMonth: "May"
    },
  ];

 export const work = [
    { title: "Deep Learning Engineer", 
      content: "Toyon Research Corporation", 
      startYear: 2024, 
      startMonth: "June",
      endYear: currentYear,
      endMonth: Object.keys(monthFractions)[currentMonth],
    },
    { title: "Graduate Research Assistant", 
      content: "Computational Imaging Systems Lab", 
      startYear: 2023, 
      startMonth: "September",
      endYear: 2024,
      endMonth: "May",
    },
    { title: "Research Assistant", 
      content: "Red Hat Collabratory", 
      startYear: 2023, 
      startMonth: "January",
      endYear:2023,
      endMonth:"May",
    },
    { title: "Evaluation and Test Engineering Intern", 
      content: "GE Aerospace", 
      startYear: 2022, 
      startMonth: "May",
      endYear: 2022,
      endMonth: "August",
    },
    { title: "Engineering Intern", 
      content: "Whitcraft Manufacturing", 
      startYear: 2021, 
      startMonth: "June",
      endYear: 2021,
      endMonth: "August",
    },
  ];