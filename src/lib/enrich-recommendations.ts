import { DJRecommendation } from "@/types";
import { mergeDjMediaIntoRecommendations } from "@/lib/dj-media-merge";

export async function enrichRecommendationsWithSpotify(
  recs: DJRecommendation[],
  _accessToken?: string
): Promise<DJRecommendation[]> {
  return mergeDjMediaIntoRecommendations(recs);
}
