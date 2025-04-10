// src/data/mockData.js

export const mentors = [
    { id: 'm1', name: 'Dr. Evelyn Reed' },
    { id: 'm2', name: 'Mr. Samuel Green' },
    { id: 'm3', name: 'Ms. Aisha Khan' },
    { id: 'm4', name: 'Mr. Ben Carter' },
  ];
  
  export const students = [
    {
      id: 's1',
      name: 'Alice Wonderland',
      grade: 5,
      demographics: { dob: '2015-06-10', address: '12 Rabbit Hole Lane', contact: '555-1234' },
      abc: {
        antecedent: 'Loud noises, sudden changes in routine.',
        behaviour: 'Withdrawal, covers ears, may cry.',
        consequence: 'Provide noise-cancelling headphones, move to quiet corner, offer favorite calming toy (soft rabbit). Use visual schedule.',
      },
      grades: { english: 5, math: 5, science: 4 },
      batches: { mind: 'A', cbcs: 'B', lifeSkills: 'A' },
    },
    {
      id: 's2',
      name: 'Bob The Builder',
      grade: 6,
      demographics: { dob: '2014-02-15', address: '45 Construction Ave', contact: '555-5678' },
      abc: {
        antecedent: 'Being asked to stop a preferred activity (building blocks).',
        behaviour: 'Refusal, verbal protest ("No!"), throws objects.',
        consequence: 'Give 5-minute warning before transitions. Use "First/Then" board (First tidy up, Then outdoor play). Offer choices.',
      },
      grades: { english: 6, math: 6, science: 6 },
      batches: { mind: 'B', cbcs: 'A', lifeSkills: 'B' },
    },
    {
      id: 's3',
      name: 'Charlie Chaplin',
      grade: 4,
      demographics: { dob: '2016-09-20', address: '78 Silent Film St', contact: '555-9012' },
      abc: {
        antecedent: 'Group activities requiring verbal participation.',
        behaviour: 'Becomes silent, avoids eye contact, may hide.',
        consequence: 'Allow non-verbal participation options (drawing, pointing). Praise small steps in interaction. Pair with a supportive peer.',
      },
      grades: { english: 4, math: 5, science: 4 },
      batches: { mind: 'A', cbcs: 'C', lifeSkills: 'C' },
    },
    {
      id: 's4',
      name: 'Diana Prince',
      grade: 7,
      demographics: { dob: '2013-11-01', address: '1 Paradise Island', contact: '555-3456' },
      abc: {
        antecedent: 'Perceived unfairness in games or tasks.',
        behaviour: 'Argumentative, seeks justice, strong emotional reaction.',
        consequence: 'Acknowledge feelings ("I see you feel that was unfair"). Clearly explain rules beforehand. Practice conflict resolution steps.',
      },
      grades: { english: 7, math: 7, science: 7 },
      batches: { mind: 'C', cbcs: 'D', lifeSkills: 'D' },
    },
    {
      id: 's5',
      name: 'Ethan Hunt',
      grade: 5,
      demographics: { dob: '2015-03-25', address: '9 Mission Road', contact: '555-7890' },
      abc: {
          antecedent: 'Unstructured free time, lack of clear task.',
          behaviour: 'Restlessness, seeks sensory input (climbing, running), distracts others.',
          consequence: 'Provide structured choices during free time. Offer movement breaks (e.g., errand for teacher). Use fidget tools.',
      },
      grades: { english: 5, math: 6, science: 5 },
      batches: { mind: 'B', cbcs: 'B', lifeSkills: 'A' },
    },
  ];
  
  export const sessions = {
    academic: [
      // Grade 4
      { id: 'eng-4-read-comp', subject: 'English', grade: 4, name: 'Reading Comprehension Strategies', concepts: ['Main Idea', 'Supporting Details'], techniques: ['Highlighting', 'Summarizing'] },
      { id: 'eng-4-grammar-1', subject: 'English', grade: 4, name: 'Nouns and Verbs', concepts: ['Identifying Nouns', 'Identifying Verbs'], techniques: ['Sentence Diagramming (basic)', 'Worksheet Practice'] },
      { id: 'math-4-multiply', subject: 'Math', grade: 4, name: 'Multiplication Facts (0-12)', concepts: ['Commutative Property', 'Fact Families'], techniques: ['Flashcards', 'Online Games'] },
      { id: 'sci-4-plants', subject: 'Science', grade: 4, name: 'Parts of a Plant', concepts: ['Roots', 'Stem', 'Leaves', 'Flower'], techniques: ['Diagram Labeling', 'Nature Walk Observation'] },
      // Grade 5
      { id: 'eng-5-writing-p', subject: 'English', grade: 5, name: 'Paragraph Writing', concepts: ['Topic Sentence', 'Supporting Sentences', 'Concluding Sentence'], techniques: ['Graphic Organizers', 'Peer Review'] },
      { id: 'math-5-fractions', subject: 'Math', grade: 5, name: 'Introduction to Fractions', concepts: ['Numerator', 'Denominator', 'Equivalent Fractions'], techniques: ['Manipulatives (fraction circles)', 'Number Line'] },
      { id: 'sci-5-ecosystems', subject: 'Science', grade: 5, name: 'Ecosystems', concepts: ['Producers', 'Consumers', 'Decomposers'], techniques: ['Food Web Diagram', 'Group Discussion'] },
      // Grade 6
      { id: 'eng-6-figurative', subject: 'English', grade: 6, name: 'Figurative Language', concepts: ['Simile', 'Metaphor', 'Personification'], techniques: ['Poetry Analysis', 'Creative Writing'] },
      { id: 'math-6-decimals', subject: 'Math', grade: 6, name: 'Decimal Operations', concepts: ['Addition', 'Subtraction', 'Multiplication'], techniques: ['Real-world Problems (money)', 'Grid Paper Visualization'] },
      { id: 'sci-6-energy', subject: 'Science', grade: 6, name: 'Forms of Energy', concepts: ['Kinetic', 'Potential', 'Thermal', 'Light'], techniques: ['Simple Experiments', 'Concept Mapping'] },
      // Grade 7
      { id: 'eng-7-research', subject: 'English', grade: 7, name: 'Basic Research Skills', concepts: ['Credible Sources', 'Note-taking', 'Summarizing'], techniques: ['Library Database Search', 'Annotation Practice'] },
      { id: 'math-7-algebra-intro', subject: 'Math', grade: 7, name: 'Introduction to Algebra', concepts: ['Variables', 'Expressions', 'Solving Simple Equations'], techniques: ['Balance Scale Model', 'Step-by-step Examples'] },
      { id: 'sci-7-cells', subject: 'Science', grade: 7, name: 'Cell Structures', concepts: ['Nucleus', 'Cytoplasm', 'Cell Membrane (Animal/Plant differences)'], techniques: ['Microscope Lab', '3D Model Building'] },
   ],
    body: [
      { id: 'body-tt', name: 'Table Tennis', type: 'Body' },
      { id: 'body-bb', name: 'Basketball Drills', type: 'Body' },
      { id: 'body-fb', name: 'Football Skills', type: 'Body' },
      { id: 'body-dance', name: 'Creative Dance', type: 'Body' },
      { id: 'body-yoga', name: 'Yoga & Stretching', type: 'Body' },
      { id: 'body-track', name: 'Track & Field Basics', type: 'Body' },
      { id: 'body-free', name: 'Free Play (Outdoor)', type: 'Body' },
      { id: 'body-circuit', name: 'Circuit Training', type: 'Body' },
    ],
    mind: [
      { id: 'mind-meditate', name: 'Guided Meditation', type: 'Mind' },
      { id: 'mind-puzzle', name: 'Logic Puzzles', type: 'Mind' },
      { id: 'mind-memory', name: 'Memory Games', type: 'Mind' },
      { id: 'mind-breathing', name: 'Mindful Breathing', type: 'Mind' },
      { id: 'mind-strategy', name: 'Strategy Board Games', type: 'Mind' },
      { id: 'mind-creative', name: 'Creative Visualization', type: 'Mind' },
      { id: 'mind-journal', name: 'Reflective Journaling', type: 'Mind' },
      { id: 'mind-debate', name: 'Debate Club (Intro)', type: 'Mind' },
   ],
    cbcs: [ // Choice Based Credit System Activities? (Assuming activity based)
      { id: 'cbcs-art', name: 'Painting & Drawing', type: 'CBCS' },
      { id: 'cbcs-music', name: 'Introduction to Keyboard', type: 'CBCS' },
      { id: 'cbcs-coding', name: 'Block Coding (Scratch)', type: 'CBCS' },
      { id: 'cbcs-drama', name: 'Improvisation Theatre', type: 'CBCS' },
      { id: 'cbcs-pottery', name: 'Clay Modeling', type: 'CBCS' },
      { id: 'cbcs-photography', name: 'Basic Photography', type: 'CBCS' },
   ],
    lifeSkills: [
      { id: 'ls-comm', name: 'Active Listening', type: 'LifeSkills' },
      { id: 'ls-collab', name: 'Teamwork Challenge', type: 'LifeSkills' },
      { id: 'ls-resolve', name: 'Conflict Resolution Scenarios', type: 'LifeSkills' },
      { id: 'ls-manage-time', name: 'Time Management Basics', type: 'LifeSkills' },
      { id: 'ls-decision', name: 'Decision Making Practice', type: 'LifeSkills' },
      { id: 'ls-hygiene', name: 'Personal Hygiene & Health', type: 'LifeSkills' },
   ],
  };
  
  // Example Timetable Structure (Simpler: Assigns Mentor + Students to Slot)
  export const initialTimetable = {
    monday: {
      slot1: { mentorId: 'm1', studentIds: ['s1', 's3'] },
      slot2: { mentorId: 'm2', studentIds: ['s2', 's5'] },
      slot3: { mentorId: 'm3', studentIds: ['s4'] },
      slot4: null, // Unassigned
      slot5: { mentorId: 'm1', studentIds: ['s2'] },
    },
    tuesday: {
      slot1: { mentorId: 'm4', studentIds: ['s4', 's5'] },
      slot2: { mentorId: 'm1', studentIds: ['s1'] },
      slot3: { mentorId: 'm2', studentIds: ['s2', 's3'] },
      slot4: { mentorId: 'm3', studentIds: ['s1', 's4'] },
      slot5: null,
    },
    wednesday: { /* ... more assignments ... */ },
    thursday: { /* ... more assignments ... */ },
    friday: { /* ... more assignments ... */ },
  };
  
  // Example Weekly Plan Structure (Assigns specific sessions to students for a week)
  export const initialWeeklyPlans = {
    // Key could be 'YYYY-MM-DD' (start date of the week)
    '2025-04-14': { // Example for week starting April 14th, 2025
      s1: { // Alice Wonderland
        english: ['eng-5-writing-p'], // Max 3
        math: ['math-5-fractions'], // Max 3
        science: [], // Max 3 (assigned 0 this week)
        body: ['body-yoga', 'body-dance', 'body-tt'], // Max 6
        mind: ['mind-meditate', 'mind-puzzle', 'mind-breathing', 'mind-journal'], // Max 6
        cbcs: ['cbcs-art'], // CBCS/LifeSkills sessions might be assigned based on batch needs, not strict count
        lifeSkills: ['ls-comm'],
      },
      s2: { // Bob The Builder
        english: ['eng-6-figurative'],
        math: ['math-6-decimals'],
        science: ['sci-6-energy'],
        body: ['body-bb', 'body-fb', 'body-track', 'body-circuit'],
        mind: ['mind-strategy', 'mind-memory', 'mind-debate'],
        cbcs: ['cbcs-coding'],
        lifeSkills: ['ls-collab'],
      },
      // ... plans for other students (s3, s4, s5)
    },
    // ... plans for other weeks
  };
  
  // Example Daily Report Structure
  export const initialDailyReports = [
      // Reports are typically added, not predefined, but here's an example object structure
      // {
      //   date: '2025-04-10', // Today's date
      //   studentId: 's1',
      //   mentorId: 'm1', // Mentor who observed/reported
      //   demeanor: 'Generally positive, participated well in yoga, quiet during reading.',
      //   sessionsCompleted: {
      //     body: { sessionId: 'body-yoga', details: 'Followed instructions well, seemed relaxed.' },
      //     mind: { sessionId: 'mind-meditate', details: 'Stayed calm for 5 minutes.'},
      //     intellect: {
      //       english: { sessionId: 'eng-5-writing-p', details: 'Completed topic sentence exercise.' },
      //       math: null, // No math session recorded today
      //       science: { sessionId: 'sci-5-ecosystems', details: 'Asked good questions about producers.'},
      //     },
      //     cbcs: null,
      //     lifeSkills: { sessionId: 'ls-comm', details: 'Practiced active listening in pair activity.'}
      //   }
      // }
  ];
  
  // Helper function to get student names from IDs
  export const getStudentNames = (studentIds, studentList) => {
      return studentIds.map(id => studentList.find(s => s.id === id)?.name || 'Unknown Student').join(', ');
  };
  
  // Helper function to get mentor name from ID
  export const getMentorName = (mentorId, mentorList) => {
      return mentorList.find(m => m.id === mentorId)?.name || 'Unknown Mentor';
  };
  
  // Helper to find session name by ID
  export const getSessionNameById = (sessionId) => {
      for (const category in sessions) {
          const session = sessions[category].find(s => s.id === sessionId);
          if (session) return session.name;
      }
      return 'Unknown Session';
  }
  
  // Helper to get Academic Session Details
  export const getAcademicSessionDetails = (sessionId) => {
      return sessions.academic.find(s => s.id === sessionId);
  }