import { useState, type CSSProperties } from "react";
import profilePic from "../../assets/kaybennet_pfp.jpg";

const BIRTHDAY = new Date(2003, 11, 29); // month is 0-based → 29 December

const GRADES = [
  { label: "Abitur", grade: 1.4 },
  { label: "B.Sc.", grade: 1.5 },
  { label: "B. Thesis", grade: 1.0 },
];

// German scale: 1.0 (best) → 4.0 (pass). Returns 0–100 for the bar.
const gradeToPercent = (g: number) => ((4 - g) / 3) * 100;

function getAge(birthday: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) age--;
  return age;
}

export function PortraitCard() {
  const [flipped, setFlipped] = useState(false);

  const age = getAge(BIRTHDAY);
  const bornLabel = BIRTHDAY.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const delay = (step: number): CSSProperties => ({
    transitionDelay: flipped ? `${280 + step * 70}ms` : "0ms",
  });
  const reveal = (step: number, extra = "") => ({
    style: delay(step),
    className: `transition-[opacity,translate] duration-500 ease-smooth motion-reduce:transition-none ${
      flipped ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
    } ${extra}`,
  });

  return (
    <div className="group relative h-90 w-75 perspective-distant">
      <div
        className={`relative size-full transform-3d transition-[transform,translate,scale] duration-700 ease-smooth group-hover:-translate-y-1.5 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          className="elevate absolute inset-0 overflow-hidden rounded-2xl backface-hidden"
        >
          <img
            src={profilePic}
            alt="Kay Bennet Städing"
            className="size-full object-cover transition-[scale] duration-700 ease-smooth group-hover:scale-105 motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-smooth group-hover:translate-x-full motion-reduce:hidden"
          />
          <span className="absolute inset-x-0 bottom-4 mx-auto w-fit translate-y-2 rounded-full bg-background/50 px-3 py-1 font-mono text-xs text-foreground opacity-0 shadow-glass backdrop-blur-xl transition-[opacity,translate] duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100">
            Click to flip ↻
          </span>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className="elevate absolute inset-0 rotate-y-180 overflow-hidden rounded-2xl backface-hidden"
        >
          <img
            src={profilePic}
            alt=""
            className="absolute inset-0 size-full scale-125 object-cover blur-2xl"
          />
          <div className="absolute inset-0 bg-background/70 bg-linear-to-b from-white/20 to-white/5 dark:from-white/5 dark:to-transparent" />
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/25 blur-3xl" />

          <div className="relative flex size-full flex-col gap-4 p-5">
            {/* Header */}
            <div {...reveal(0, "flex items-center gap-3")}>
              <img
                src={profilePic}
                alt=""
                className="size-11 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/20"
              />
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-tight font-semibold">
                  Kay Bennet Staeding
                </h3>
                <p className="font-mono text-xs text-muted">
                  M.Sc. Student · Hannover
                </p>
              </div>
            </div>

            {/* Age / born row */}
            <dl
              {...reveal(
                1,
                "flex divide-x divide-foreground/10 rounded-xl bg-background/55 py-2.5 shadow-glass",
              )}
            >
              <div className="flex-1 px-3">
                <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Age
                </dt>
                <dd className="font-display text-lg leading-tight font-bold">
                  {age}
                </dd>
              </div>
              <div className="flex-1 px-3">
                <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Born
                </dt>
                <dd className="font-display text-lg leading-tight font-bold">
                  {bornLabel}
                </dd>
              </div>
            </dl>

            {/* Grades */}
            <section aria-label="Grades">
              <div {...reveal(2, "mb-2 flex items-baseline justify-between")}>
                <h4 className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Grades
                </h4>
                <span className="font-mono text-[10px] text-muted">
                  1.0 = best
                </span>
              </div>

              <dl className="grid grid-cols-3 gap-2">
                {GRADES.map(({ label, grade }, i) => {
                  return (
                    <div
                      key={label}
                      {...reveal(
                        3 + i,
                        `rounded-xl px-2.5 pt-2 pb-2.5 shadow-glass ${"bg-background/55"}`,
                      )}
                    >
                      <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">
                        {label}
                      </dt>
                      <dd
                        className={`font-display text-2xl leading-tight font-bold`}
                      >
                        {grade.toFixed(1)}
                      </dd>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-smooth motion-reduce:transition-none"
                          style={{
                            width: flipped ? `${gradeToPercent(grade)}%` : "0%",
                            ...delay(4 + i),
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </dl>
            </section>

            <span
              {...reveal(6, "mt-auto self-center font-mono text-xs text-muted")}
            >
              Click to flip back ↻
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show photo" : "Show details about Kay"}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      />
    </div>
  );
}
