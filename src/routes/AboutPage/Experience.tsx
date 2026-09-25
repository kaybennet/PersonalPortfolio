const glass =
  "bg-surface/25 bg-linear-to-b from-white/30 to-white/0 dark:from-white/[0.05] " +
  "backdrop-blur-2xl backdrop-saturate-120 shadow-glass " +
  "transition-[translate,box-shadow] duration-300 ease-smooth " +
  "hover:-translate-y-1 hover:shadow-glass-hover motion-reduce:transition-none";

const courses = [
  { name: "Programming II", detail: "Teaching OOP via Java" },
  { name: "Fundamentals of Computer Science", detail: "Teaching C and Python" },
  {
    name: "Human-Computer Interaction",
    detail: "JavaScript, Design and evaluation",
  },
  {
    name: "Fundamentals of Digital Systems",
    detail: "Basics of Binary Logic and hardware components",
  },
];

export default function Experience() {
  return (
    <section className="py-4">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Experience
      </h2>
      <p className="mt-6 text-lg text-foreground/80">
        Since 2024 I've tutored for different computer science courses at the
        university.
      </p>

      <ul className="mt-6 grid gap-4 grid-cols-4">
        {courses.map((c, i) => (
          <li
            key={c.name}
            className={`group flex items-center gap-4 rounded-2xl p-5 ${glass}`}
          >
            <div className="min-w-0">
              <p className="font-semibold">{c.name}</p>
              <p className="mt-0.5 text-sm text-muted">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
