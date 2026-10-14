import { fmtLatex } from "../../util/helpers";
import { NOW_TEXT } from "../../content";

export default function Now() {
  return (
    <section className="">
      <h2 className="section-title-center">
        Right now
      </h2>
      <p className="mt-3 max-w-prose text-lg text-muted max-md:mx-auto max-md:text-center">
        {fmtLatex(NOW_TEXT)}
      </p>
    </section>
  );
}
