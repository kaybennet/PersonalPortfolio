import { formatStarted, getImages } from "./ProjectImages";

export function GridEntry({ project: p }: { project: PersonalProject }) {
  const cover = getImages(p.id)[0];

  return (
    <li className="flex flex-col overflow-hidden rounded-lg border border-slate-200">
      {cover && (
        <img
          src={cover.src}
          alt={`${p.title}: ${cover.name}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{p.title}</h2>
          <p className="text-sm text-slate-500">
            Started {formatStarted(p.started)}
          </p>
        </div>

        {p.comment && (
          <p className="line-clamp-3 text-[0.95rem]">{p.comment}</p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {p.languages.map((lang) => (
              <li
                key={lang}
                className="rounded-full border border-slate-300 px-2.5 py-0.5 text-sm"
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
