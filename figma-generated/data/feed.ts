import type { FeedPost } from "../types";

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    authorId: "t1",
    content:
      "Dear students, as we approach the semester exams, remember: understanding the concept beats memorising formulae every time. In thermodynamics, if you understand why entropy always increases in an irreversible process, the rest follows naturally. Study smart. All the best!",
    timestamp: "2 hours ago",
    likes: 47,
    tag: "Advice",
    comments: [
      {
        authorId: "s2408-01",
        text: "Thank you sir, this is really motivating! Will keep this in mind for the upcoming CT.",
        time: "1 hr ago",
      },
      {
        authorId: "s2308-01",
        text: "This advice helped me a lot in my 2nd year. Conceptual understanding is truly everything.",
        time: "45 min ago",
      },
    ],
  },
  {
    id: "p2",
    authorId: "s2408-01",
    content:
      "Just got my CT-8 Thermodynamics result — secured 28/30! Couldn't have done it without the study group we formed in the library. Big thanks to everyone who shared notes. This department truly feels like a family #MTE2408",
    imageUrl:
      "https://images.unsplash.com/photo-1634219602697-08cff0fd2672?w=700&h=400&fit=crop&auto=format",
    imageAlt: "Group of male students together",
    timestamp: "5 hours ago",
    likes: 63,
    comments: [
      {
        authorId: "t1",
        text: "Well done Rafid! Your hard work is showing. Keep it up.",
        time: "4 hr ago",
      },
      {
        authorId: "s2408-04",
        text: "Congrats! 🎉 You deserved it. Study group was a great idea.",
        time: "3 hr ago",
      },
      {
        authorId: "a1",
        text: "Great score! That enthusiasm will take you far. Best of luck for the semester exams.",
        time: "2 hr ago",
      },
    ],
  },
  {
    id: "p3",
    authorId: "a2",
    content:
      "Excited to share that my first journal paper has been accepted at the Journal of Wind Energy! The research started from a curiosity sparked during Prof. Islam's fluid mechanics classes here at RUET. Never stop asking questions. #Research #MTE",
    timestamp: "Yesterday",
    likes: 112,
    tag: "Achievement",
    comments: [
      {
        authorId: "t2",
        text: "Congratulations Dr. Sharmin! This is a proud moment for the whole department. We always knew you would go far.",
        time: "23 hr ago",
      },
      {
        authorId: "s2308-01",
        text: "Incredible! This is so inspiring. Can we read the paper somewhere?",
        time: "20 hr ago",
      },
      {
        authorId: "s2408-01",
        text: "This is the kind of motivation we needed before exams. Thank you!",
        time: "18 hr ago",
      },
    ],
  },
  {
    id: "p4",
    authorId: "t2",
    content:
      "The CFD workshop scheduled for this Saturday in Lab-4 is open to all years. We will be running simulations on ANSYS Fluent. Bring your laptops. Limited seats — confirm attendance by tomorrow evening.",
    imageUrl:
      "https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=700&h=380&fit=crop&auto=format",
    imageAlt: "Engineering machinery in lab",
    timestamp: "Yesterday",
    likes: 34,
    tag: "Event",
    comments: [
      {
        authorId: "s2408-03",
        text: "Sir, will there be any prerequisites? I haven't used ANSYS before.",
        time: "22 hr ago",
      },
      {
        authorId: "t2",
        text: "No prerequisites needed, we will start from scratch. Just bring curiosity!",
        time: "21 hr ago",
      },
    ],
  },
  {
    id: "p5",
    authorId: "a1",
    content:
      "Visited the campus last week for the first time in 3 years — so many new faces, same old spirit. The department has grown so much. To the current students: these years go by fast. Make the most of every class, every lab session, every late-night study session.",
    imageUrl:
      "https://images.unsplash.com/photo-1779903597856-bfc922997e63?w=700&h=380&fit=crop&auto=format",
    imageAlt: "Male students sitting outdoors on campus",
    timestamp: "2 days ago",
    likes: 89,
    tag: "Nostalgia",
    comments: [
      {
        authorId: "s2308-01",
        text: "We hope to visit someday with similar fond memories. Thank you for coming back!",
        time: "2 days ago",
      },
      {
        authorId: "t1",
        text: "Always great to see alumni come back. The department misses you Kamal!",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "p6",
    authorId: "s2308-01",
    content:
      "Final year thesis defence in 3 weeks. Nervous but ready. Four years of hard work coming down to this moment. Wish me luck MTE Family! 🤞",
    timestamp: "3 days ago",
    likes: 55,
    comments: [
      {
        authorId: "t3",
        text: "You have worked extremely hard Shahriar. Just stay calm and trust your preparation.",
        time: "3 days ago",
      },
      {
        authorId: "s2408-01",
        text: "You've got this! We're all rooting for you 💪",
        time: "3 days ago",
      },
    ],
  },
];
