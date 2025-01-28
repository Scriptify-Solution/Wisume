import { useCallback } from "react";

const CACHE_PREFIX = "resume_";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const useResumeCaching = () => {
  // Cache resume data
  const cacheResume = useCallback((resumeId, data) => {
    try {
      localStorage.setItem(
        CACHE_PREFIX + resumeId,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.warn("Failed to cache resume:", error);
    }
  }, []);

  // Get cached resume data
  const getCachedResume = useCallback((resumeId) => {
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + resumeId);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);

      // Check if cache is expired
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_PREFIX + resumeId);
        return null;
      }

      return data;
    } catch (error) {
      console.warn("Failed to get cached resume:", error);
      return null;
    }
  }, []);

  return { cacheResume, getCachedResume };
};
