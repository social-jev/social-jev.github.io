const setup = `from social_jev import Query, SocialJev

model = SocialJev.from_pretrained(
    "social-jev/social-jev-0.6B-preview"
)
query = Query(
    text="Does the author support expanding bus service?",
    options=["Supports", "Opposes"],
)
`;

export const usageExamples = [
  {
    label: "Inference",
    description: "A typed request specifies the state, query, and candidate answers. Each query returns a Result with the selected answer and its candidate probabilities.",
  },
  {
    label: "Evaluate",
    description: "Compare SocialJev’s predictions with your human labels to see how well it works on your task.",
    note: "Uses the package’s evaluation branch API.",
    code: setup + `
examples = [
    {"state": "We should add more bus routes.", "label": 0},
    {"state": "The city should cancel the plan.", "label": 1},
]
evaluation = model.evaluate(query=query, data=examples)
print(evaluation.score)`,
  },
  {
    label: "Compute",
    description: "Run inference on a rented GPU using the same Request and Result interface. This example uses Modal.",
    note: "Requires the package’s compute integration and a configured Modal account.",
    code: `from social_jev import Query, Request, SocialJev
from social_jev.integrations import Modal

request = Request(
    state="The council expanded the bus network.",
    queries=[Query(
        text="Which policy area does this concern?",
        options=["Transport", "Education", "Healthcare"],
    )],
)

with Modal(gpu="H100!"):
    model = SocialJev.from_pretrained(
        "social-jev/social-jev-0.6B-preview", backend="vllm"
    )
    print(model.query(request)[0][0].choice)`,
  },
  {
    label: "Optimize",
    description: "Use labelled examples to search for better wording for your query and options without changing the model weights.",
    note: "Uses the package’s optimization branch API and a configured reflection model.",
    code: `# query, trainset and valset use the Evaluate example format.
from social_jev import SocialJev

model = SocialJev.from_pretrained(
    "social-jev/social-jev-0.6B-preview"
)
optimization = model.optimize(
    query=query,
    trainset=trainset,
    valset=valset,
    max_metric_calls=50,
    scheduler=None,
)
print(optimization.query)`,
  },
  {
    label: "Train",
    description: "Fine-tune a SocialJev checkpoint on labelled requests when inference and query optimization fall short.",
    note: "Uses the package’s training branch API.",
    code: `from social_jev import SocialJev
from social_jev.training import TrainConfig

# train_samples and val_samples contain labelled Sample objects.
model = SocialJev.train(
    repo="social-jev/social-jev-0.6B-preview",
    trainset=lambda: iter(train_samples),
    valset=lambda: iter(val_samples),
    config=TrainConfig(steps=100),
)`,
  },
];
