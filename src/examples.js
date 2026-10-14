export const examples = [
  {
    id: "stance",
    title: "Stance",
    source: "A statement about housing policy",
    document:
      "The city council proposed limiting annual rent increases to two percent. I support this measure because it would help tenants remain in their homes.",
    question: "What is the author’s stance toward the proposed limit on annual rent increases?",
    options: ["Support", "Oppose", "Unclear"],
    selected: "Support",
  },
  {
    id: "policy",
    title: "Policy topics",
    source: "A council announcement",
    document:
      "The council will increase funding for bus services and introduce more frequent connections to the city centre.",
    question: "Which policy area is discussed?",
    options: ["Transport", "Education", "Healthcare"],
    selected: "Transport",
  },
  {
    id: "framing",
    title: "Framing",
    source: "An argument about climate policy",
    document:
      "Investing in clean energy will create skilled jobs, support local businesses, and make our economy more competitive.",
    question: "Which frame does this argument use?",
    options: ["Economic", "Public health", "National security"],
    selected: "Economic",
  },
];

export const datasets = [
  {
    name: "Manifesto",
    category: "Politics & policy",
    topic: "Political programmes",
    slug: "manifesto",
  },
  {
    name: "SemEval Stance",
    category: "Politics & policy",
    topic: "Stance toward a target",
    slug: "semeval-2016-stance",
  },
  {
    name: "UK Acts",
    category: "Politics & policy",
    topic: "Legislation",
    slug: "uk-acts",
  },
  {
    name: "UK PMQs",
    category: "Politics & policy",
    topic: "Parliamentary questions",
    slug: "uk-pmqs",
  },
  {
    name: "DEMIG",
    category: "Politics & policy",
    topic: "Migration policy",
    slug: "demig",
  },
  {
    name: "BABE",
    category: "Media & society",
    topic: "Media bias",
    slug: "babe",
  },
  {
    name: "BASIL",
    category: "Media & society",
    topic: "Bias in news",
    slug: "basil",
  },
  {
    name: "Moral Foundations",
    category: "Media & society",
    topic: "Moral language",
    slug: "mfrc",
  },
  {
    name: "Social Bias Frames",
    category: "Media & society",
    topic: "Social bias",
    slug: "social-bias-frames",
  },
  {
    name: "CAD",
    category: "Media & society",
    topic: "Abusive language",
    slug: "cad",
  },
  {
    name: "EDOS",
    category: "Media & society",
    topic: "Online sexism",
    slug: "edos",
  },
  {
    name: "ValueEval",
    category: "Media & society",
    topic: "Human values",
    slug: "valueeval",
  },
  {
    name: "Measuring Hate Speech",
    category: "Media & society",
    topic: "Hate speech",
    slug: "measuring-hate-speech",
  },
  {
    name: "Environmental Claims",
    category: "Institutions & economy",
    topic: "Environmental language",
    slug: "environmental-claims",
  },
  {
    name: "FOMC",
    category: "Institutions & economy",
    topic: "Monetary policy",
    slug: "fomc",
  },
  {
    name: "OPP-115",
    category: "Institutions & economy",
    topic: "Privacy policies",
    slug: "opp-115",
  },
];
