import React from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import CADVisual from "./CADVisual";
import { categories } from "../mock/mock";

const ProjectCard = ({ project, index, onOpen }) => {
  const categoryLabel =
    categories.find((c) => c.id === project.category)?.label ||
    project.category;

  return (
    <button
      onClick={onOpen}
      className="group text-left border border-border bg-card/60 hover:border-foreground/60 fade-up flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Visual */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40 border-b border-border">
        <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]">
          <CADVisual type={project.type} />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10" />
        {/* Top chips */}
        <div className="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 border border-border">
          {project.code}
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 border border-border bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Expand className="w-3.5 h-3.5" />
        </div>
        {/* Bottom tick */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 tick-border opacity-70" />
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-lg font-medium leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--olive))] shrink-0 mt-1" />
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {categoryLabel}
          </span>
          <div className="flex gap-1">
            {project.tools.slice(0, 2).map((t) => (
              <span
                key={t}
                className="mono text-[10px] px-1.5 py-0.5 bg-muted border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
