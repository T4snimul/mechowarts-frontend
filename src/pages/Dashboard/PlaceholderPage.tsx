import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardNavItem } from "@/config/dashboard-nav";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type PlaceholderPageProps = {
  title: string;
  description: string;
  links?: DashboardNavItem[];
};

const getSkeletonLabels = (title: string) => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("schedule") || lowerTitle.includes("week")) {
    return ["Class routine", "Lab slot", "Deadline"];
  }

  if (lowerTitle.includes("calculator")) {
    return ["Course mark", "Credit", "Target grade"];
  }

  if (lowerTitle.includes("timer")) {
    return ["Focus session", "Break", "Progress"];
  }

  if (lowerTitle.includes("map")) {
    return ["Alumni profile", "Location", "Batch"];
  }

  if (lowerTitle.includes("chat")) {
    return ["Recent thread", "Group message", "Announcement"];
  }

  if (lowerTitle.includes("series") || lowerTitle.includes("family")) {
    return ["Batch notice", "Shared contact", "Resource"];
  }

  if (lowerTitle.includes("cover")) {
    return ["Course info", "Submitted by", "Preview"];
  }

  return ["Pinned item", "Recent update", "Draft section"];
};

export function PlaceholderPage({
  title,
  description,
  links = [],
}: PlaceholderPageProps) {
  const hasLinks = links.length > 0;
  const skeletonLabels = getSkeletonLabels(title);

  return (
    <section className="my-2 space-y-5">
      <div className="max-w-3xl space-y-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {hasLinks ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <Link key={link.url} to={link.url}>
              <Card className="h-full transition-colors hover:border-primary/40 hover:bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3">
                    <span className="truncate">{link.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-primary" />
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{title} workspace</CardTitle>
              <CardDescription>
                A focused layout placeholder for this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skeletonLabels.map((label, index) => (
                <div key={label} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium">{label}</span>
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className={index === 0 ? "h-20" : "h-12"} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick stats</CardTitle>
              <CardDescription>Summary blocks will land here.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-24" />
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
