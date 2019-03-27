export interface ITicketStats {
  total: number;
  minWait: number;
  maxWait: number;
  avgWait: number;
  totalAbandon: number;
  totalComplete: number;
  avgSessionTime: number;
  totalNoTutor: number;
  totalNotEnded: number;
  totalCurWaiting: number;
  freqHour: Array<{
    total: 0;
    course: {
      [key: string]: number;
    };
    category: {
      [key: string]: number;
    };
  }>;
  freqDay: Array<{
    total: 0;
    course: {
      [key: string]: number;
    };
    category: {
      [key: string]: number;
    };
  }>;
  freqStudents: {
    [key: string]: number;
  };
  freqTutors: {
    [key: string]: number;
  };
  freqCourses: {
    [key: string]: number;
  };
}
