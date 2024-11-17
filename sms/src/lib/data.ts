export const role = "admin";
export const NO_AVATAR_URL = "/image/noavatar.png";
export const ITEM_PAR_PAGE = 10;
export const SITE_NAME = "School Management System";
export const SITE_URL = "http://localhost:3000";
export const SITE_TITLE = "School Management System";
export const SITE_DESCRIPTION = "School Management System";
export const SITE_IMAGE = "/image/logo.png";
export const SITE_AUTHOR = "School Management System";
export const SITE_TWITTER = "@school";
export const SITE_FACEBOOK = "school";
export const SITE_INSTAGRAM = "school";
export const SITE_YOUTUBE = "school";
export const SITE_PHONE = "123456789";
export const SITE_EMAIL = "sms@gmai;.com";
export const SITE_ADDRESS = "Dhaka, Bangladesh";
export const SITE_FAX = "123456789";
export const SITE_COPYRIGHT = "School Management System";
export const SITE_POWERED_BY = "School Management System";
export const SCHOOL_NAME = "School Management System";
export const SCHOOL_CODE = "123456";
export const SCHOOL_EIIN = "EN23456";
export const SCHOOL_MESSAGE = "A School of Creative Learning";
export const SCHOOL_LOGO = "/image/logo.png";
export const GENEREL_SESSION =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.q2-bjp-bIbC1KcsegBorKoJvi6BU7tJOGfaLqLVIeT0";
export const SCHOOL_INTRO = `17th October, 1961. The then Station Commander Colonel Ahmed Ali Sheik, T.P.K. – invited the then President of Pakistan Field Martial Md. Ayub Khan. NPK, H.J. to inaugurate the foundation of this institution. According to the society registration act XXI 1860, this institution was established by Chittagong Cantonment Public School Foundation. From 23rd October 1961 this institution started its journey. After that many gracious and affluent men came forward to make this great endeavor successful with monetary and moral support. Behind it there were sincerity and generosity. 

Rtd. Lt. Colonel M. Sordar Khan (Army Education Corps) was appointed as the first Principal of this institution. He had the experience of academic and administrative works of cadet College and Public School. At last with 24 students and 03 teachers the academic curriculum started. At the beginning of 1970 many highly educated and experienced persons were appointed as the teachers. At that time foreign teachers were also appointed to teach foreign language.

On 1st January, 1971, this institution achieved its first recognition from Secondary and Higher secondary Board of Education, Camilla. Then in class IX humanities group was introduced. During the liberation war of 1971, this institution had to face a great loss. After the independence this institution again started its journey with the effort of the teachers, Board of Trustee and the Board of Governors.

This institution was re-established on 17 March, 1972, with the initiative of the then Brigadier General Mir Showkat Ali BU, psc. Students, teachers, guardians and all the members of the governing body worked jointly to give her the real feature. Next time this institution came under the direct supervision of Bangladesh Army for continuing its gradual acclivity.

`;
export const SCHOOL_SHORTNAME = "CCPSC";
export const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Times = [
  {
    time: "10:00-11:00",
  },
  {
    time: "11:00-12:00",
  },
  {
    time: "12:00-1:00",
  },
  {
    time: "2:00-3:00",
  },
  {
    time: "3:00-4:00",
  },
];

export const ScheduleHours = [
  {
    hour: 1,
    name: "1st Hour",
  },
  {
    hour: 2,
    name: "2nd Hour",
  },
  {
    hour: 3,
    name: "3rd Hour",
  },
  {
    hour: 4,
    name: "4th Hour",
  },
  {
    hour: 5,
    name: "5th Hour",
  },
];

export const DaysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

export const MenuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "LayoutDashboard",
        label: "Dashboard",
        href: "/dashboard",
        visiable: ["ADMIN"],
      },
      {
        icon: "User",
        label: "Profile",
        href: "/profile",
        visiable: ["TEACHER", "STUDENT"],
      },
      {
        icon: "Building",
        label: "Building",
        href: "/dashboard/buildings",
        visiable: ["ADMIN"],
      },
      {
        icon: "School",
        label: "Class",
        href: "/dashboard/class",
        visiable: ["ADMIN"],
      },

      {
        icon: "Book",
        label: "Course",
        href: "/dashboard/course",
        visiable: ["ADMIN", "TEACHER"],
      },

      {
        icon: "User",
        label: "Teachers",
        href: "/dashboard/teachers?page=1",
        visiable: ["ADMIN", "TEACHER"],
      },

      {
        icon: "Users",
        label: "Students",
        href: "/dashboard/students?page=1",
        visiable: ["ADMIN", "TEACHER"],
      },

      {
        icon: "BookCheck",
        label: "Sections",
        href: "/dashboard/sections",
        visiable: ["ADMIN"],
      },

      {
        icon: "BookCheck",
        label: "Exams",
        href: "/dashboard/exams",
        visiable: ["ADMIN", "TEACHER", "STUDENT"],
      },

      {
        icon: "BookCheck",
        label: "Result",
        href: "/dashboard/results",
        visiable: ["ADMIN", "TEACHER", "STUDENT"],
      },

      {
        icon: "Calendar",
        label: "Attendence",
        href: "/dashboard/attendance",
        visiable: ["ADMIN"],
      },

      {
        icon: "MessageSquare",
        label: "Notices",
        href: "/dashboard/notices",
        visiable: ["ADMIN"],
      },
    ],
  },
];

export const Infrastructures = [
  {
    title: "Academic",
    items: [
      {
        content:
          "1×2 storied Main building (Classrooms 14, Teachers room 03 & Others 21, Total-38)",
      },
      {
        content:
          "1×4 storied Hons building -01 (Classrooms 11, Teachers room 02 & Others 08, Total-21)",
      },
      {
        content:
          "1×6 storied College building (Classrooms 29, Teachers room 13 & Others 11, Total-53)",
      },
      {
        content:
          "1×5 storied School building (Classrooms 29, Teachers room 04 & Others 12, Total-45)",
      },
      {
        content:
          "1×1 storied Nursery building (Classrooms 06, Teachers room 00 & Others 04, Total-10)",
      },
    ],
  },
  {
    title: "Residential",
    items: [
      {
        content: "1×2 Storied Principal’s Quarter (Duplex)",
      },
      {
        content: "1×1 Storied Teachers’ Quarter (2 Flats)",
      },
      {
        content: "1×2 Storied Teachers’ Quarter (4 Flats)",
      },
    ],
  },
];

export const GradeValues = {
  "A+": 5.0,
  A: 4.0,
  "A-": 3.5,
  B: 3.0,
  C: 2.5,
  D: 1.0,
  F: 0.0,
};
