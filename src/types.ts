// Base types
type URN = string;
type ISODateString = string;
type URL = string;
type UUID = string;
type Status = "active" | "inactive" | "archived" | "false";

// Common base entity type
type BaseEntity = {
  _mrn?: URN;
  _createdDate?: ISODateString;
  _updatedDate?: ISODateString;
  _createdBy?: URN;
  _archived?: Status;
  _id: UUID;
};

// Common date-related types
type MonthlyData = {
  monthYear: string;
  usedInMonth: string;
  usedUpTo: string;
};

type TargetHours = {
  month: string;
  targetHours: string;
};

type EarnedVacationDays = {
  monthYear: string;
  earnedVacationDays: string;
};

// Timelog type
type Timelog = BaseEntity & {
  date: string;
  timeTo: string;
  personForFilter: URN;
  assignment: string;
  project: URN;
  description: string;
  type: string;
  timeFrom: string;
  duration: string;
  person: URN;
};

// Employee type
type Address = {
  country: string;
  streetName: string;
  locality: string;
};

type Document = {
  image: URL;
};

type Employees = BaseEntity & {
  birthday: string;
  firstname: string;
  lastname: string;
  email: string;
  jobTitle: URN;
  costsByMonth: URN;
  authUser: URN;
  usedVacationDays: {
    result: MonthlyData[];
    _applicationId: UUID;
  };
  potentialEarnings: URN;
  statusAggregation: {
    monthlySalary: string | null;
    yearlyVacationDays: string | null;
    jobTitle: string | null;
    weeklyWorkingHours: string | null;
    jobType: string | null;
    status: string;
  };
  jobType: URN;
  photo: URL;
  targetWorkingHours: {
    targetByMonth: TargetHours[];
    _applicationId: UUID;
  };
  holidayPerYear: URN;
  slackId: string;
  workforceUtilisation: URN;
  name: string;
  salutation: string;
  earnedVacationDays: {
    result: EarnedVacationDays[];
    _applicationId: UUID;
  };
  searchValue: string;
};

// Termination type
type Termination = {
  date: string;
  subject: string;
  document: URL;
  markdown: string;
  effectiveDate: string;
};

// Employment Contracts type
type EmploymentContracts = BaseEntity & {
  date: string;
  termination: Termination;
  subject: string;
  document: URL;
  contact: URN;
  markdown: string;
  name: string;
  parameters: {
    monthlySalary: string;
    yearlyVacationDays: string;
    jobTitle: string;
    weeklyWorkingHours: string;
    jobType: string;
    effectiveDate: string;
  };
  searchValue: string;
};

// SourceDataType encompassing all types
export type SourceDataType = {
  timelog?: Timelog;
  employmentContracts?: EmploymentContracts;
  employees?: Employees;
};

// Type for Table Column and Row Data
export type TableDataType = {
  ticketId: string;
  userId: string;
  timeBooked: string;
  bookingDate: string;
};
