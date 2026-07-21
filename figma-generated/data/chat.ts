import type { ChatConversation } from "../types";

export const chatConversations: ChatConversation[] = [
  {
    id: "c1",
    participantId: "t1",
    lastMessage: "Well done on your CT result!",
    lastTime: "2h",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "s2408-01",
        text: "Good morning sir. I had a question about the Carnot cycle derivation.",
        time: "Yesterday 10:02 AM",
      },
      {
        id: "m2",
        senderId: "t1",
        text: "Good morning Rafid. Sure, go ahead.",
        time: "Yesterday 10:15 AM",
      },
      {
        id: "m3",
        senderId: "s2408-01",
        text: "In the T-S diagram, why does the isothermal expansion show a horizontal line if entropy is changing?",
        time: "Yesterday 10:17 AM",
      },
      {
        id: "m4",
        senderId: "t1",
        text: "Good question! During isothermal expansion, temperature stays constant but heat IS being added — so entropy increases. The horizontal line represents constant temperature, not constant entropy. The entropy change is on the x-axis.",
        time: "Yesterday 10:22 AM",
      },
      {
        id: "m5",
        senderId: "s2408-01",
        text: "Oh that makes so much sense now! Thank you sir.",
        time: "Yesterday 10:24 AM",
      },
      {
        id: "m6",
        senderId: "t1",
        text: "Well done on your CT result by the way! 28/30 is excellent.",
        time: "2 hours ago",
      },
    ],
  },
  {
    id: "c2",
    participantId: "s2408-04",
    lastMessage: "Are you coming to the library tonight?",
    lastTime: "5h",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "s2408-04",
        text: "Hey! Study group at the library tonight at 8?",
        time: "Today 3:00 PM",
      },
      {
        id: "m2",
        senderId: "s2408-01",
        text: "Yeah definitely! CT10 is coming up fast.",
        time: "Today 3:05 PM",
      },
      {
        id: "m3",
        senderId: "s2408-04",
        text: "Bringing my fluid mechanics notes. Can you bring the thermo practice sheets?",
        time: "Today 3:07 PM",
      },
      {
        id: "m4",
        senderId: "s2408-01",
        text: "Sure, I have the full set from last cycle.",
        time: "Today 3:10 PM",
      },
      {
        id: "m5",
        senderId: "s2408-04",
        text: "Are you coming to the library tonight?",
        time: "Today 5:30 PM",
      },
    ],
  },
  {
    id: "c3",
    participantId: "a1",
    lastMessage: "Best of luck for your exams!",
    lastTime: "2d",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "s2408-01",
        text: "Sir, I saw your post about visiting campus. It was really inspiring!",
        time: "2 days ago",
      },
      {
        id: "m2",
        senderId: "a1",
        text: "Thank you! The energy in the department is always something special. What year are you in?",
        time: "2 days ago",
      },
      {
        id: "m3",
        senderId: "s2408-01",
        text: "3rd year, 24 series. We just started our sessionals.",
        time: "2 days ago",
      },
      {
        id: "m4",
        senderId: "a1",
        text: "Ah the best years! Take the sessionals seriously — practical skills matter most in industry. Best of luck for your exams!",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "c4",
    participantId: "t2",
    lastMessage: "No prerequisites needed!",
    lastTime: "1d",
    unread: 1,
    messages: [
      {
        id: "m1",
        senderId: "s2408-01",
        text: "Sir, I'm really interested in the CFD workshop. Will we cover turbulence modelling?",
        time: "Yesterday 9:00 AM",
      },
      {
        id: "m2",
        senderId: "t2",
        text: "We will briefly touch on it, yes. The focus will be on setting up simulations and interpreting results.",
        time: "Yesterday 9:30 AM",
      },
      {
        id: "m3",
        senderId: "s2408-01",
        text: "Perfect. What software version should I download?",
        time: "Yesterday 9:35 AM",
      },
      {
        id: "m4",
        senderId: "t2",
        text: "No prerequisites needed! Lab computers will have everything set up.",
        time: "Yesterday 10:00 AM",
      },
    ],
  },
];
