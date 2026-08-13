"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  openJobsCount: number;
  rating: number;
  founded: string;
  website: string;
};

type Job = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedTime: string;
  description: string;
  tags: string[];
  department: string;
  rating: number;
  matchScore: number;
  roleDetails: string;
  requirements: string[];
  benefits: string[];
};

const stats = [
  { value: "12k+", label: "Active Postings", icon: Briefcase },
  { value: "450+", label: "Tech Companies", icon: Building2 },
  { value: "98.4%", label: "Match Accuracy", icon: Sparkles },
  { value: "$145k", label: "Avg Tech Salary", icon: Users },
];

const categories = [
  { title: "Software Engineering", count: "142 Open Roles", keyword: "Engineering" },
  { title: "Product Design", count: "58 Open Roles", keyword: "Design" },
  { title: "AI & Machine Learning", count: "39 Open Roles", keyword: "AI" },
  { title: "Product Management", count: "74 Open Roles", keyword: "Product Management" },
  { title: "Marketing & Sales", count: "48 Open Roles", keyword: "Marketing" },
  { title: "Customer Support", count: "62 Open Roles", keyword: "Support" },
];

const companies: Company[] = [
  {
    id: "c1",
    name: "Stripeflow",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Financial Technology",
    size: "1,000 - 5,000 employees",
    location: "San Francisco, CA",
    description:
      "Stripeflow is building the modern financial infrastructure for the internet. Millions of companies use Stripeflow to accept payments, send payouts, and manage their businesses online.",
    openJobsCount: 3,
    rating: 4.8,
    founded: "2015",
    website: "https://stripeflow.co",
  },
  {
    id: "c2",
    name: "NeuralSphere",
    logo: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Artificial Intelligence",
    size: "100 - 500 employees",
    location: "Seattle, WA",
    description:
      "NeuralSphere is an advanced research and product company dedicated to developing highly capable AI systems that serve humanity.",
    openJobsCount: 2,
    rating: 4.9,
    founded: "2020",
    website: "https://neuralsphere.ai",
  },
  {
    id: "c3",
    name: "EcoSustain",
    logo: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Environmental Services",
    size: "50 - 200 employees",
    location: "Denver, CO",
    description:
      "EcoSustain accelerates the transition to smart carbon tracking and sustainable resource management through modern cloud monitoring tools.",
    openJobsCount: 1,
    rating: 4.5,
    founded: "2018",
    website: "https://ecosustain.earth",
  },
  {
    id: "c4",
    name: "VeloDigital",
    logo: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Digital Agency & Design",
    size: "500 - 1,000 employees",
    location: "New York, NY",
    description:
      "VeloDigital crafts high-fidelity mobile apps, modern web platforms, and digital brand identities for leading brands.",
    openJobsCount: 2,
    rating: 4.6,
    founded: "2012",
    website: "https://velodigital.design",
  },
];

const jobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Engineer",
    companyId: "c1",
    companyName: "Stripeflow",
    companyLogo: companies[0].logo,
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    salary: "$140k - $185k",
    experience: "5+ years",
    postedTime: "2 hours ago",
    description:
      "Build pixel-perfect user interfaces, modular React codebases, and robust styling systems with Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    department: "Engineering",
    rating: 4.8,
    matchScore: 94,
    roleDetails:
      "Lead the implementation of a new business dashboard UI and collaborate closely with product designers to bridge the gap between concepts and high-performance web applications.",
    requirements: [
      "Expert-level React, TypeScript, and modern state management experience.",
      "Strong eye for detail, UX interactions, and responsive web layouts.",
      "Familiarity with build pipelines, bundling tools, and linting systems.",
      "Excellent communication and collaboration skills.",
    ],
    benefits: [
      "Comprehensive medical, dental, and vision coverage.",
      "Generous 401(k) matching program.",
      "Flexible PTO policy and paid company holidays.",
      "Annual learning and development stipend.",
    ],
  },
  {
    id: "j2",
    title: "AI Product Designer",
    companyId: "c2",
    companyName: "NeuralSphere",
    companyLogo: companies[1].logo,
    location: "Seattle, WA (Remote)",
    type: "Remote",
    salary: "$130k - $165k",
    experience: "3+ years",
    postedTime: "1 day ago",
    description:
      "Shape the future of human-AI collaboration by designing intuitive interfaces for advanced conversational systems and developer dashboards.",
    tags: ["Product Design", "Figma", "AI/ML UX", "Wireframing"],
    department: "Design",
    rating: 4.9,
    matchScore: 88,
    roleDetails:
      "Design next-generation canvas interfaces, smart prompt aids, and feedback loops that guide AI reasoning for enterprise users.",
    requirements: [
      "A strong portfolio with interactive systems and balanced layouts.",
      "Experience designing complex B2B SaaS platforms or AI tools.",
      "Comfortable prototyping high-fidelity interactions in Figma.",
      "Curiosity about natural language processing and agent architectures.",
    ],
    benefits: [
      "Remote-first setup with a home office stipend.",
      "Equity grant packages with high upside potential.",
      "Wellness stipend for gym memberships or meditation apps.",
      "Biannual company retreats.",
    ],
  },
  {
    id: "j3",
    title: "Full Stack Developer",
    companyId: "c4",
    companyName: "VeloDigital",
    companyLogo: companies[3].logo,
    location: "New York, NY (On-site)",
    type: "Full-time",
    salary: "$110k - $150k",
    experience: "3+ years",
    postedTime: "3 days ago",
    description:
      "Build scalable backends and polished interactive web frontends for high-growth consumer startups and enterprise clients.",
    tags: ["Node.js", "React", "PostgreSQL", "Express"],
    department: "Engineering",
    rating: 4.6,
    matchScore: 75,
    roleDetails:
      "Move fluidly across the stack: optimize schemas, implement high-fidelity design specs, and ship production-ready product experiences.",
    requirements: [
      "Proficiency in Node.js, Express, and SQL databases.",
      "Solid experience with React, TypeScript, and Tailwind utilities.",
      "Experience with REST APIs, WebSockets, and OAuth services.",
      "Ability to thrive in a fast-paced agency environment.",
    ],
    benefits: [
      "Creative studio space with premium snacks and coffee.",
      "Health, dental, and life insurance.",
      "Commuter benefits and transit support.",
      "Annual team-building outings.",
    ],
  },
  {
    id: "j4",
    title: "Sustainability Software Consultant",
    companyId: "c3",
    companyName: "EcoSustain",
    companyLogo: companies[2].logo,
    location: "Denver, CO (Hybrid)",
    type: "Contract",
    salary: "$85 - $115 / hr",
    experience: "4+ years",
    postedTime: "5 days ago",
    description:
      "Provide architectural consulting and implementation assistance to carbon emissions tracking partners.",
    tags: ["Carbon Math", "Client Facing", "API Integration", "Cloud"],
    department: "Consulting",
    rating: 4.5,
    matchScore: 62,
    roleDetails:
      "Bridge the gap between climate science data sets and enterprise clients by writing integration scripts and leading technical workshops.",
    requirements: [
      "Background in Software Engineering or Solutions Architecture.",
      "Interest in environmental metrics or ESG accounting.",
      "Proficiency in JavaScript or TypeScript.",
      "Outstanding customer-facing communication skills.",
    ],
    benefits: [
      "Flexible hourly schedule with guaranteed minimum hours.",
      "Hybrid collaborative office days in Denver.",
      "Inclusion in team events and sustainability initiatives.",
    ],
  },
  {
    id: "j5",
    title: "Lead ML / Backend Research Engineer",
    companyId: "c2",
    companyName: "NeuralSphere",
    companyLogo: companies[1].logo,
    location: "Seattle, WA (Remote)",
    type: "Full-time",
    salary: "$190k - $240k",
    experience: "7+ years",
    postedTime: "1 week ago",
    description:
      "Drive core LLM training pipelines, post-training alignment, and orchestration models.",
    tags: ["Python", "PyTorch", "LLMs", "Distributed Systems"],
    department: "Research",
    rating: 4.9,
    matchScore: 91,
    roleDetails:
      "Work on the bleeding edge of foundation model development, optimizing cluster training efficiency and designing reward loops.",
    requirements: [
      "Master's or Ph.D. in Computer Science, Machine Learning, or equivalent.",
      "Proven track record of scaling training runs across hundreds of GPUs/TPUs.",
      "Expert-level Python and deep learning framework proficiency.",
      "Publications at top ML conferences is a plus.",
    ],
    benefits: [
      "Industry-leading equity packages.",
      "Unlimited wellness days and health benefits.",
      "Top-tier hardware configurations.",
      "Relocation assistance if hybrid work is preferred.",
    ],
  },
  {
    id: "j6",
    title: "Intern UI/UX Developer",
    companyId: "c4",
    companyName: "VeloDigital",
    companyLogo: companies[3].logo,
    location: "New York, NY (Hybrid)",
    type: "Internship",
    salary: "$35 - $45 / hr",
    experience: "0-2 years",
    postedTime: "2 days ago",
    description:
      "Work with senior UI engineers to build responsive interfaces, prototype interactions, and test usability.",
    tags: ["HTML/CSS", "JavaScript", "React", "Figma"],
    department: "Design",
    rating: 4.6,
    matchScore: 82,
    roleDetails:
      "This paid internship offers deep mentorship, production work, and direct exposure to real client repositories.",
    requirements: [
      "Strong foundational understanding of HTML, CSS, JavaScript, and React basics.",
      "Ability to translate Figma designs into responsive layouts.",
      "Eagerness to learn, ask questions, and implement feedback.",
      "Currently enrolled in or recently graduated from a CS or Design program.",
    ],
    benefits: [
      "1-on-1 mentorship with senior engineers and designers.",
      "Path to full-time transition upon completion.",
      "Participation in creative workshops and company events.",
    ],
  },
];

function renderIcon(Icon: typeof Briefcase) {
  return <Icon className="h-4 w-4" />;
}

export default function PublicLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory, selectedJobId]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchKeyword = searchQuery
        ? [job.title, job.companyName, job.description, ...job.tags].some((value) =>
            value.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : true;

      const matchLocation = locationQuery ? job.location.toLowerCase().includes(locationQuery.toLowerCase()) : true;
      const matchCategory = selectedCategory
        ? [job.department, job.title, ...job.tags].some((value) =>
            value.toLowerCase().includes(selectedCategory.toLowerCase()),
          )
        : true;

      return matchKeyword && matchLocation && matchCategory;
    });
  }, [searchQuery, locationQuery, selectedCategory]);

  const selectedJob = filteredJobs.find((job) => job.id === selectedJobId) ?? filteredJobs[0] ?? jobs[0];
  const selectedCompany = companies.find((company) => company.id === selectedJob.companyId) ?? companies[0];

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg shadow-foreground/10">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">CareerConnect</p>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">AI Job Board</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="#featured-jobs" className="transition-colors hover:text-foreground">Jobs</a>
            <a href="#companies" className="transition-colors hover:text-foreground">Companies</a>
            <a href="#highlights" className="transition-colors hover:text-foreground">Highlights</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>

          <a
            href="#featured-jobs"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary/90"
          >
            Browse Roles
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary-soft/55 via-background to-background" />
          <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-soft/70 blur-3xl" />
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                AI-powered job matching for modern teams
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl"
              >
                Find the job you are <span className="text-primary">genuinely aligned</span> with.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg"
              >
                CareerConnect AI combines a polished public experience with structured search and alignment signals to connect talent with the right teams.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                onSubmit={handleSearchSubmit}
                className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-[1.75rem] border border-foreground/10 bg-background p-3 shadow-[0_24px_80px_-28px_rgba(6,6,6,0.35)] md:grid-cols-[1.2fr_1fr_auto]"
              >
                <label className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-primary-soft/30 px-4 py-3 text-left focus-within:border-primary">
                  <Search className="h-5 w-5 text-muted" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Job title, keywords, or skills"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-primary-soft/30 px-4 py-3 text-left focus-within:border-primary">
                  <MapPin className="h-5 w-5 text-muted" />
                  <input
                    value={locationQuery}
                    onChange={(event) => setLocationQuery(event.target.value)}
                    placeholder="City, state, or remote"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary/90"
                >
                  Search Jobs
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
                <span className="font-medium text-foreground/80">Trending:</span>
                {["React", "TypeScript", "AI/ML UX", "Figma", "Node.js"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="rounded-full border border-foreground/10 bg-background px-3 py-1.5 font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} whileHover={{ y: -4 }} className="text-center sm:border-r sm:border-foreground/5 sm:last:border-r-0">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  {renderIcon(stat.icon)}
                </div>
                <p className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Browse by domain</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Explore opportunities by specialty</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
              Use the category chips to narrow the public homepage experience before the portal routes are added.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category.keyword;

              return (
                <motion.button
                  key={category.keyword}
                  type="button"
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedCategory((value) => (value === category.keyword ? "" : category.keyword))}
                  className={`group flex items-start gap-4 rounded-3xl border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary-soft/55 shadow-sm"
                      : "border-foreground/10 bg-background hover:border-foreground/20 hover:shadow-md"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background transition-transform group-hover:scale-105">
                    {category.title.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{category.title}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">{category.count}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section id="featured-jobs" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Featured jobs</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Recent and highly aligned positions</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Filtered by keyword, location, and category. Clicking a card updates the spotlight panel below.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Reset filters
            </button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {filteredJobs.map((job) => {
              const isSelected = job.id === selectedJob.id;

              return (
                <motion.button
                  key={job.id}
                  type="button"
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`relative flex h-full flex-col rounded-3xl border p-6 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary-soft/40 shadow-lg shadow-primary/10"
                      : "border-foreground/10 bg-background hover:border-foreground/20 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={job.companyLogo} alt={job.companyName} className="h-11 w-11 rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{job.companyName}</p>
                      <p className="flex items-center gap-1 text-xs font-medium text-muted">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {job.rating}
                      </p>
                    </div>

                    <span className="ml-auto rounded-full border border-primary/20 bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {job.matchScore}% match
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{job.title}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </p>
                    <p className="text-sm leading-7 text-foreground/80">{job.description}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/10 bg-primary-soft/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/80">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 text-sm">
                    <span className="font-semibold text-foreground">{job.salary}</span>
                    <span className="text-muted">{job.postedTime}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedJob.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="mt-8 grid gap-6 rounded-4xl border border-foreground/10 bg-background p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    <Sparkles className="h-4 w-4" />
                    Selected role spotlight
                  </span>
                  <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {selectedJob.type}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{selectedJob.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <span className="font-semibold text-foreground">{selectedJob.companyName}</span>
                  <span>•</span>
                  <span>{selectedJob.location}</span>
                </p>

                <div className="mt-6 space-y-5 text-sm leading-7 text-foreground/80">
                  <p>{selectedJob.roleDetails}</p>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Requirements</h4>
                    <ul className="mt-3 space-y-2">
                      {selectedJob.requirements.map((requirement) => (
                        <li key={requirement} className="rounded-2xl border border-foreground/10 bg-primary-soft/30 px-4 py-3">
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl bg-foreground p-6 text-background">
                <div className="flex items-center gap-3">
                  <img src={selectedJob.companyLogo} alt={selectedJob.companyName} className="h-14 w-14 rounded-2xl object-cover" />
                  <div>
                    <p className="text-lg font-semibold">{selectedCompany.name}</p>
                    <p className="text-sm text-background/70">{selectedCompany.industry}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-background/10 bg-background/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-background/60">Salary</p>
                    <p className="mt-2 font-semibold">{selectedJob.salary}</p>
                  </div>
                  <div className="rounded-2xl border border-background/10 bg-background/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-background/60">Experience</p>
                    <p className="mt-2 font-semibold">{selectedJob.experience}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-background/60">Benefits</p>
                    <ul className="mt-3 space-y-2 text-sm text-background/85">
                      {selectedJob.benefits.slice(0, 4).map((benefit) => (
                        <li key={benefit} className="rounded-2xl border border-background/10 bg-background/5 px-4 py-3">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.25rem] border border-primary/20 bg-primary-soft/20 p-5">
                    <p className="text-sm font-semibold text-primary">AI match signal</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-background">{selectedJob.matchScore}%</p>
                    <p className="mt-2 text-sm leading-7 text-background/75">
                      Public-facing alignment score sourced from the exported React experience.
                    </p>
                  </div>
                </div>
              </aside>
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="companies" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Companies</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Verified tech employers</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {companies.map((company) => (
              <motion.article
                key={company.id}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <img src={company.logo} alt={company.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">{company.name}</h3>
                      <p className="mt-1 text-sm text-muted">{company.industry}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {company.rating}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-foreground/80">{company.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted">
                  <div className="rounded-2xl bg-primary-soft/30 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Location</p>
                    <p className="mt-2 font-medium text-foreground">{company.location}</p>
                  </div>
                  <div className="rounded-2xl bg-primary-soft/30 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Open roles</p>
                    <p className="mt-2 font-medium text-foreground">{company.openJobsCount}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="highlights" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-foreground px-6 py-10 text-background shadow-[0_30px_90px_-35px_rgba(6,6,6,0.9)] sm:px-10 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-soft">
                  <Sparkles className="h-4 w-4" />
                  Dynamic match engine
                </div>
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Curious how aligned your experience is?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-background/75 sm:text-base">
                  The exported React experience is now embedded as the public homepage, ready to sit in front of authentication, portals, and future AI modules.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href="#featured-jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary-soft"
                >
                  Check matching roles
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-background/10 bg-background/5 px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/10"
                >
                  Contact team
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <footer className="rounded-4xl border border-foreground/10 bg-background p-6 sm:p-10">
            <div className="grid gap-10 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">CareerConnect</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted">AI Job Board</p>
                  </div>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-7 text-foreground/80">
                  Transforming the recruitment journey with alignment signals, clean public browsing, and a scalable foundation for portal development.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Search jobs</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {[
                    "Browse All Roles",
                    "Remote Opportunities",
                    "High-Salary Engineering",
                    "Product Design Positions",
                  ].map((link) => (
                    <li key={link}>
                      <a href="#featured-jobs" className="transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Partners</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {[
                    "Companies Directory",
                    "Success Stories",
                    "Hiring Solutions",
                    "Press & Media",
                  ].map((link) => (
                    <li key={link}>
                      <a href="#companies" className="transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Legal</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {[
                    "Terms of Service",
                    "Privacy Policy",
                    "Cookie Preferences",
                    "Trust & Safety Guidelines",
                  ].map((link) => (
                    <li key={link}>
                      <a href="#top" className="transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} CareerConnect AI. All rights reserved.</p>
              <div className="flex gap-5">
                <a href="#top" className="transition-colors hover:text-foreground">Twitter</a>
                <a href="#top" className="transition-colors hover:text-foreground">LinkedIn</a>
                <a href="#top" className="transition-colors hover:text-foreground">GitHub</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}