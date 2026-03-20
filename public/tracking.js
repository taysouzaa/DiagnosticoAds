// tracking.js - rastreamento leve de origem (channel + UTMs) para paginas estaticas
(() => {
  if (typeof window === "undefined") return;
  if (window.Tracking) return;

  const STORAGE_KEY = "diagnosticoads:tracking";
  const DEFAULTS = {
    channel: "direto",
    source: "direto",
    medium: "none",
    campaign: "none",
  };

  // Escalavel: adicione novos canais e dominos aqui.
  const REFERRER_CHANNELS = [
    { channel: "youtube", hosts: ["youtube.com", "youtu.be"] },
    { channel: "instagram", hosts: ["instagram.com", "l.instagram.com"] },
  ];

  const safeStorage = () => {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  };

  const normalize = (value) => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  };

  // Função isolada para parsing da URL.
  const parseFromUrl = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        channel: normalize(params.get("channel")),
        utm_source: normalize(params.get("utm_source")),
        utm_medium: normalize(params.get("utm_medium")),
        utm_campaign: normalize(params.get("utm_campaign")),
      };
    } catch {
      return {};
    }
  };

  const channelFromReferrer = () => {
    const referrer = (document.referrer || "").toLowerCase();
    if (!referrer) return null;
    for (const entry of REFERRER_CHANNELS) {
      for (const host of entry.hosts) {
        if (referrer.includes(host)) return entry.channel;
      }
    }
    return null;
  };

  const buildTracking = () => {
    const fromUrl = parseFromUrl();
    let channel = fromUrl.channel || channelFromReferrer();

    // Se nao houver channel, usa utm_source como fallback de canal.
    if (!channel && fromUrl.utm_source) {
      channel = fromUrl.utm_source;
    }

    const source = fromUrl.utm_source || (channel ? channel : null) || DEFAULTS.source;
    const medium = fromUrl.utm_medium || (channel ? "organic" : null) || DEFAULTS.medium;
    const campaign = fromUrl.utm_campaign || (channel ? "canal" : null) || DEFAULTS.campaign;

    return {
      channel: channel || DEFAULTS.channel,
      source,
      medium,
      campaign,
    };
  };

  const readStored = () => {
    const storage = safeStorage();
    if (!storage) return null;
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  };

  const persist = (data) => {
    const storage = safeStorage();
    if (!storage) return;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Silencioso para nao quebrar o fluxo.
    }
  };

  // Inicializa sem sobrescrever se ja existir (persistencia).
  const init = () => {
    const existing = readStored();
    if (existing) return existing;
    const data = buildTracking();
    persist(data);
    return data;
  };

  const get = () => {
    const stored = readStored();
    return stored ? { ...DEFAULTS, ...stored } : { ...DEFAULTS };
  };

  window.Tracking = {
    init,
    get,
    parseUrl: parseFromUrl,
  };
})();
