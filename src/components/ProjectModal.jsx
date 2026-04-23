import React, { useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import CADVisual from "./CADVisual";
import { categories } from "../mock/mock";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;
  const categoryLabel =
    categories.find((c) => c.id === project.category)?.label ||
    project.category;

  return (
    <div
      className="fixed inset-0 z-[60] fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-5xl max-h-[92vh] overflow-auto bg-background border border-border">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-8 h-14 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {project.code}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--olive))]">
                {categoryLabel}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 border border-border flex items-center justify-center hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-border">
              <div className="aspect-[4/3] bg-muted/40">
                <CADVisual type={project.type} />
              </div>
              <div className="px-5 md:px-8 py-4 flex items-center justify-between border-t border-border">
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Fig. 01 · {project.type}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Tol ±0.05 mm
                </span>
              </div>
            </div>

            <div className="md:col-span-2 p-6 md:p-8">
              <h3 className="display text-2xl md:text-3xl font-medium leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3">
                {project.description}
              </p>

              <div className="mt-8 space-y-6">
                <Block label="Process" text={project.process} />
                <Block label="Result" text={project.result} />
                <div>
                  <p className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                    Tools used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="mono text-[11px] px-2 py-1 bg-muted border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-10 inline-flex items-center justify-center gap-2 h-11 px-5 bg-foreground text-background text-sm hover:bg-foreground/85 w-full"
              >
                Discuss a similar project
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Block = ({ label, text }) => (
  <div>
    <p className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
      {label}
    </p>
    <p className="text-sm leading-relaxed text-foreground/85">{text}</p>
  </div>
);

export default ProjectModal;
