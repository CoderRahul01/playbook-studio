import { c as createLucideIcon, j as jsxRuntimeExports, d as cn, L as Link, B as BookOpen, r as reactExports, e as useNavigate, P as Plus, l as Skeleton } from "./index-rRcYy_Bl.js";
import { a as Badge, L as Layers, C as ChevronRight, u as useActor, b as useQuery, c as createActor, B as Button } from "./badge-CrUbumsw.js";
import { n as normalizePlaybook, S as Search } from "./playbook-D7y5CiKT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
];
const Library = createLucideIcon("library", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function PlaybookCard({ playbook, index }) {
  const dateStr = new Date(
    Number(playbook.createdAt / 1000000n)
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const screenshotUrl = playbook.screenshot.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/playbook/$id",
      params: { id: playbook.id.toString() },
      "data-ocid": `playbook.card.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden hover:border-primary/40 transition-smooth shadow-card hover:shadow-elevated cursor-pointer group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 bg-muted/40 overflow-hidden", children: [
          screenshotUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: screenshotUrl,
              alt: playbook.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs font-mono bg-background/80 backdrop-blur-sm border-border",
              children: playbook.platformName
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold font-display text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-smooth", children: playbook.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed", children: playbook.taskGoal }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
                playbook.steps.length,
                " steps"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                dateStr
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" })
          ] })
        ] })
      ] })
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function usePlaybooks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.listPlaybooks();
      return raw.map(normalizePlaybook);
    },
    enabled: !!actor && !isFetching
  });
}
function LibraryPage() {
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const { data: playbooks = [], isLoading } = usePlaybooks();
  const filtered = reactExports.useMemo(() => {
    if (!query.trim()) return playbooks;
    const q = query.toLowerCase();
    return playbooks.filter(
      (p) => p.title.toLowerCase().includes(q) || p.taskGoal.toLowerCase().includes(q) || p.platformName.toLowerCase().includes(q)
    );
  }, [playbooks, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "library.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 mt-0.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-subheading text-foreground", children: "Your Playbooks" }),
                !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-primary/15 border border-primary/25 px-2 text-xs font-semibold text-primary font-mono",
                    "data-ocid": "library.count_badge",
                    children: playbooks.length
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading playbooks…" : playbooks.length === 0 ? "No playbooks saved yet" : `${playbooks.length} playbook${playbooks.length !== 1 ? "s" : ""} saved` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2 flex-shrink-0",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "library.create_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Create New"
              ]
            }
          )
        ] }),
        !isLoading && playbooks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Search by title, goal, or platform…",
              className: "pl-9",
              "data-ocid": "library.search_input"
            }
          )
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
            "data-ocid": "library.loading_state",
            children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl overflow-hidden border border-border bg-card space-y-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
                    ] })
                  ] })
                ]
              },
              key
            ))
          }
        ),
        !isLoading && playbooks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "library.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-muted-foreground" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-subheading text-foreground mb-2", children: "No playbooks yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed", children: "Upload a screenshot and describe your goal to generate your first step-by-step walkthrough." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "gap-2",
                  onClick: () => navigate({ to: "/" }),
                  "data-ocid": "library.empty_create_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Create Your First Playbook"
                  ]
                }
              )
            ]
          }
        ),
        !isLoading && playbooks.length > 0 && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-16 text-center",
            "data-ocid": "library.no_results_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "No playbooks match “",
                query,
                "”"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQuery(""),
                  className: "text-xs text-primary underline underline-offset-2 mt-2 hover:no-underline transition-smooth",
                  "data-ocid": "library.clear_search_button",
                  children: "Clear search"
                }
              )
            ]
          }
        ),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
            "data-ocid": "library.playbook_list",
            children: filtered.map((playbook, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlaybookCard,
              {
                playbook,
                index
              },
              playbook.id.toString()
            ))
          }
        )
      ]
    }
  );
}
export {
  LibraryPage as default
};
