/*
 * Modulo de rastreamento leve para paginas estaticas.
 * Resolve origem por query string/referrer e persiste canal + UTMs no localStorage.
 */
(() => {
  if (typeof window === "undefined") return;
  if (window.Tracking) return;

  // Chave unica para reaproveitar os dados de origem durante toda a sessao.
  const STORAGE_KEY = "diagnosticoads:tracking";
  // Fallback aplicado quando nao ha UTM ou referrer reconhecido.
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

  /**
   * Retorna acesso seguro ao localStorage em navegadores que permitem persistencia.
   *
   * @returns Storage|null
   */
  const safeStorage = () => {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  };

  /**
   * Normaliza valores textuais de query params.
   *
   * @param {unknown} value - Valor bruto recebido da URL.
   * @returns {string|null} Texto limpo ou null quando vazio/invalido.
   */
  const normalize = (value) => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  };

  /**
   * Extrai channel e UTMs diretamente da URL atual.
   *
   * @returns {{channel?: string|null, utm_source?: string|null, utm_medium?: string|null, utm_campaign?: string|null}}
   */
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

  /**
   * Identifica canal com base no dominio de referencia (referrer).
   *
   * @returns {string|null} Canal mapeado ou null quando nao identificado.
   */
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

  /**
   * Consolida dados de tracking em um formato unico para persistencia.
   *
   * @returns {{channel: string, source: string, medium: string, campaign: string}}
   */
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

  /**
   * Le o objeto persistido no navegador.
   *
   * @returns {Record<string, unknown>|null}
   */
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

  /**
   * Persiste o tracking calculado para reaproveitar em paginas/formularios.
   *
   * @param {Record<string, unknown>} data - Payload de tracking consolidado.
   * @returns {void}
   */
  const persist = (data) => {
    const storage = safeStorage();
    if (!storage) return;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Silencioso para nao quebrar o fluxo.
    }
  };

  /**
   * Inicializa o tracking sem sobrescrever dados ja persistidos.
   *
   * @returns {Record<string, unknown>} Tracking efetivo da sessao.
   */
  const init = () => {
    const existing = readStored();
    if (existing) return existing;
    const data = buildTracking();
    persist(data);
    return data;
  };

  /**
   * Recupera o tracking pronto para consumo por integracoes.
   *
   * @returns {{channel: string, source: string, medium: string, campaign: string}}
   */
  const get = () => {
    const stored = readStored();
    return stored ? { ...DEFAULTS, ...stored } : { ...DEFAULTS };
  };

  // API publica usada pelo HTML e pelo formulario para envio ao webhook.
  window.Tracking = {
    init,
    get,
    parseUrl: parseFromUrl,
  };
})();
