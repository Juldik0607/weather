import axios from "axios";

const searchWikidataEntity = async (city, lang = "ru") => {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
    city
  )}&language=${lang}&format=json&type=item&origin=*`;

  try {
    const res = await axios.get(url);
    const items = res.data.search;

    const match = items.find((item) => {
      const desc = item.description?.toLowerCase();
      return (
        desc &&
        (desc.includes("город") ||
          desc.includes("місто") ||
          desc.includes("city") ||
          desc.includes("human settlement"))
      );
    });

    return match?.id || null;
  } catch (err) {
    console.warn("Wikidata search error:", err);
    return null;
  }
};

const getLabelFromWikidata = async (entityId, lang = "ru") => {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`;
  try {
    const res = await axios.get(url);
    const data = res.data.entities[entityId];
    return data.labels?.[lang]?.value || null;
  } catch (err) {
    console.warn("Ошибка получения label из Wikidata:", err);
    return null;
  }
};

const fetchWikipediaSummary = async (lang, title) => {
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title
  )}`;
  try {
    const res = await axios.get(url);
    return res.data.extract;
  } catch (err) {
    console.warn(`Wikipedia summary error (${lang}, ${title}):`, err);
    return null;
  }
};

export const getCitySummary = async (city) => {
  const langs = ["ru", "uk"];

  for (const lang of langs) {
    const entityId = await searchWikidataEntity(city, lang);
    if (!entityId) continue;

    const label = await getLabelFromWikidata(entityId, lang);
    if (!label) continue;

    const summary = await fetchWikipediaSummary(lang, label);
    if (summary) return summary;
  }

  return "Описание недоступно.";
};
