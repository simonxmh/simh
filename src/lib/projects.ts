import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const projectsDirectory = path.join(process.cwd(), "src/pages/projects");

export type ProjectContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
};

let projectCache: ProjectContent[];

function fetchProjectContent(): ProjectContent[] {
  if (projectCache) {
    return projectCache;
  }
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory);
  const allprojectsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        tags: string[];
        slug: string;
      };
      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort projects by date
  projectCache = allprojectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return projectCache;
}

export function countprojects(tag?: string): number {
  return fetchProjectContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

export function listProjectContent(
  page: number,
  limit: number,
  tag?: string
): ProjectContent[] {
  return fetchProjectContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
