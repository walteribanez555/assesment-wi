export type Shift = {
  id: string;
  startTime: string;
  endTime: string;
  location: string;
  requiredStaff: number;
  assignedStaff: string[];
  notes?: string;
  status: "open" | "filled" | "completed";
};

export type Location = {
  id: string;
  name: string;
  address: string;
  capacity: number;
};

export type User = {
  id: string;
  name: string;
  role: string;
  availability: string[];
};
