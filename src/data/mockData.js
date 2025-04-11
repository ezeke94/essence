// src/data/mockData.js

export const mentors = [
    {
        id: 'm1',
        name: 'Dr. Evelyn Reed',
        role: 'Cluster Head',
        email: 'evelyn.reed@centre.edu',
        contact: '555-0101',
        assignedStudents: ['s2', 's7'] // Matches primary mentorship
    },
    {
        id: 'm2',
        name: 'Mr. Samuel Green',
        role: 'Mentor',
        email: 'samuel.green@centre.edu',
        contact: '555-0102',
        assignedStudents: ['s4'] // Matches primary mentorship
    },
    {
        id: 'm3',
        name: 'Ms. Aisha Khan',
        role: 'Mentor',
        email: 'aisha.khan@centre.edu',
        contact: '555-0103',
        assignedStudents: ['s1', 's6'] // Matches primary mentorship
    },
    {
        id: 'm4',
        name: 'Mr. Ben Carter',
        role: 'Trainee Mentor',
        email: 'ben.carter@centre.edu',
        contact: '555-0104',
        assignedStudents: ['s3', 's5'] // Matches primary mentorship
    }
];

export const students = [
    {
      id: 's1',
      name: 'Alice Wonderland',
      primaryMentorId: 'm3',
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
      primaryMentorId: 'm1',
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
      primaryMentorId: 'm4',
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
      primaryMentorId: 'm2',
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
      primaryMentorId: 'm4',
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
    {
        id: 's6',
        name: 'Freya Norse',
        primaryMentorId: 'm3',
        grade: 6,
        demographics: { dob: '2014-08-15', address: '23 Viking Lane', contact: '555-4321' },
        abc: {
            antecedent: 'Complex multi-step instructions, group projects.',
            behaviour: 'Becomes overwhelmed, shuts down, may leave activity.',
            consequence: 'Break down instructions into smaller steps. Use visual checklist. Assign specific role in group work.'
        },
        grades: { english: 6, math: 5, science: 6 },
        batches: { mind: 'B', cbcs: 'A', lifeSkills: 'B' }
    },
    {
        id: 's7',
        name: 'George Galaxy',
        primaryMentorId: 'm1',
        grade: 4,
        demographics: { dob: '2016-04-05', address: '42 Starship Street', contact: '555-8765' },
        abc: {
            antecedent: 'Abstract concepts, non-visual learning materials.',
            behaviour: 'Loses focus, starts doodling, asks unrelated questions.',
            consequence: 'Use visual aids and concrete examples. Incorporate drawing into learning activities.'
        },
        grades: { english: 4, math: 5, science: 4 },
        batches: { mind: 'A', cbcs: 'C', lifeSkills: 'B' }
    }
  ];
  
  export const sessions = {
    academic: [
      // Grade 4
      { id: 'eng-4-read-comp', subject: 'English', grade: 4, name: 'Reading Comprehension Strategies', concepts: ['Main Idea', 'Supporting Details'], techniques: ['Highlighting', 'Summarizing'] },
      { id: 'eng-4-grammar-1', subject: 'English', grade: 4, name: 'Nouns and Verbs', concepts: ['Identifying Nouns', 'Identifying Verbs'], techniques: ['Sentence Diagramming (basic)', 'Worksheet Practice'] },
      { id: 'math-4-multiply', subject: 'Math', grade: 4, name: 'Multiplication Facts (0-12)', concepts: ['Commutative Property', 'Fact Families'], techniques: ['Flashcards', 'Online Games'] },
      { id: 'sci-4-plants', subject: 'Science', grade: 4, name: 'Parts of a Plant', concepts: ['Roots', 'Stem', 'Leaves', 'Flower'], techniques: ['Diagram Labeling', 'Nature Walk Observation'] },
      { id: 'eng-4-poetry', subject: 'English', grade: 4, name: 'Poetry Basics', concepts: ['Rhyme', 'Rhythm', 'Stanzas'], techniques: ['Read Aloud', 'Pattern Recognition'] },
      { id: 'math-4-geometry', subject: 'Math', grade: 4, name: '2D Shapes', concepts: ['Angles', 'Sides', 'Symmetry'], techniques: ['Shape Drawing', 'Pattern Blocks'] },
      // Grade 5
      { id: 'eng-5-writing-p', subject: 'English', grade: 5, name: 'Paragraph Writing', concepts: ['Topic Sentence', 'Supporting Sentences', 'Concluding Sentence'], techniques: ['Graphic Organizers', 'Peer Review'] },
      { id: 'math-5-fractions', subject: 'Math', grade: 5, name: 'Introduction to Fractions', concepts: ['Numerator', 'Denominator', 'Equivalent Fractions'], techniques: ['Manipulatives (fraction circles)', 'Number Line'] },
      { id: 'sci-5-ecosystems', subject: 'Science', grade: 5, name: 'Ecosystems', concepts: ['Producers', 'Consumers', 'Decomposers'], techniques: ['Food Web Diagram', 'Group Discussion'] },
      { id: 'sci-5-weather', subject: 'Science', grade: 5, name: 'Weather Patterns', concepts: ['Temperature', 'Precipitation', 'Wind'], techniques: ['Weather Journal', 'Simple Experiments'] },
      { id: 'math-5-measurement', subject: 'Math', grade: 5, name: 'Units of Measurement', concepts: ['Length', 'Weight', 'Volume'], techniques: ['Practical Measuring', 'Unit Conversion'] },
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
      { id: 'body-swim', name: 'Swimming Basics', type: 'Body' },
      { id: 'body-martial', name: 'Martial Arts Fundamentals', type: 'Body' },
      { id: 'body-balance', name: 'Balance & Coordination', type: 'Body' },
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
      { id: 'mind-chess', name: 'Chess Fundamentals', type: 'Mind' },
      { id: 'mind-mindmap', name: 'Mind Mapping', type: 'Mind' },
      { id: 'mind-emotion', name: 'Emotional Intelligence', type: 'Mind' },
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
        session1: [],
        session2: [],
        session3: [],
        session4: [],
        session5: [],
        session6: []
    },
    // ...existing days...
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
    '2025-04-21': { // Week after the existing one
        s6: {
            english: ['eng-6-figurative'],
            math: ['math-6-decimals', 'math-5-measurement'],
            science: ['sci-6-energy'],
            body: ['body-martial', 'body-balance', 'body-yoga'],
            mind: ['mind-chess', 'mind-emotion', 'mind-mindmap'],
            cbcs: ['cbcs-drama'],
            lifeSkills: ['ls-collab', 'ls-resolve']
        },
        s7: {
            english: ['eng-4-poetry', 'eng-4-read-comp'],
            math: ['math-4-geometry', 'math-4-multiply'],
            science: ['sci-4-plants'],
            body: ['body-swim', 'body-balance', 'body-dance'],
            mind: ['mind-puzzle', 'mind-memory'],
            cbcs: ['cbcs-art'],
            lifeSkills: ['ls-comm']
        }
    }
  };
  
  // Example Daily Report Structure
  export const initialDailyReports = [
    {
        id: 'dr1',
        date: '2025-04-14',
        studentId: 's6',
        mentorId: 'm2',
        isPublished: true,
        demeanor: 'Showed great enthusiasm in martial arts class. Remained focused during math.',
        completedSessions: {
            body: { sessionId: 'body-martial', details: 'Learned basic stances and movements' },
            mind: { sessionId: 'mind-chess', details: 'Successfully completed basic chess strategies' },
            math: { sessionId: 'math-6-decimals', details: 'Completed worksheet with 85% accuracy' }
        }
    },
    {
        id: 'dr2',
        date: '2025-04-14',
        studentId: 's7',
        mentorId: 'm3',
        isPublished: true,
        demeanor: 'Very creative during poetry session. Needed support in geometry.',
        completedSessions: {
            english: { sessionId: 'eng-4-poetry', details: 'Wrote a creative poem about space' },
            math: { sessionId: 'math-4-geometry', details: 'Struggled with angle measurement' },
            body: { sessionId: 'body-swim', details: 'Gaining confidence in water' }
        }
    }
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

  export const initialSettings = {
      sessionsPerDay: 5
  };