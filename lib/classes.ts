export interface InstructionalClass {
  date: string;
  time: string;
  type: 'in-person' | 'virtual';
}

export interface CourseClass {
  id: string;
  name?: string;
  isFull: boolean;
  startDate: string;
  endDate: string;
  orientation: {
    date: string;
    time: string;
  };
  instructionalClasses: InstructionalClass[];
  finalTest: {
    date: string;
    time: string;
  };
}

// Removed fetchClasses, now in app/actions.ts
