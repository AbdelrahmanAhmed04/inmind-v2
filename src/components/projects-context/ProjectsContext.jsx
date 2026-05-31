import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // fetch once here instead of inside Projects.jsx
  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Helper to extract a sortable timestamp (ms) from various possible fields
        function extractTimestampMs(item) {
          const keys = [
            "modifiedAt",
            "updatedAt",
            "updated",
            "modified",
            "timestamp",
            "createdAt",
            "date",
          ];
          for (const k of keys) {
            const v = item[k];
            if (!v && v !== 0) continue;
            // Firestore Timestamp
            if (
              typeof v === "object" &&
              v !== null &&
              typeof v.toDate === "function"
            ) {
              try {
                return v.toDate().getTime();
              } catch (e) {
                continue;
              }
            }
            if (v instanceof Date) return v.getTime();
            if (typeof v === "number") {
              // if looks like seconds (10 digits), convert to ms
              if (v < 1e12) return v * 1000;
              return v;
            }
            if (typeof v === "string") {
              const parsed = Date.parse(v);
              if (!Number.isNaN(parsed)) return parsed;
            }
          }
          return 0;
        }

        // Sort newest first by available timestamp-like fields
        data.sort((a, b) => extractTimestampMs(b) - extractTimestampMs(a));

        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
